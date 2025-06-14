'use client';
import Editor from '@monaco-editor/react';
import { useEffect, useRef, useState, useCallback } from 'react';
import { Socket } from 'socket.io-client';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/react';
import * as monaco from 'monaco-editor';

type Props = {
    socket: Socket;
    roomId: string;
};

export default function EditorPanel({ socket, roomId }: Props) {
    const [code, setCode] = useState('// Start coding...');
    const [isActive, setIsActive] = useState(false);
    const [language, setLanguage] = useState('javascript');
    const languages = ['javascript', 'python', 'c', 'cpp', 'java'];
    const activityTimeout = useRef<NodeJS.Timeout | null>(null);

    const [activeUsers, setActiveUsers] = useState<string[]>([]);
    const storedUserId = typeof window !== 'undefined' ? sessionStorage.getItem('userId') : null;
    const generatedUserId = `user_${Math.random().toString(36).substr(2, 5)}`;
    const userId = useRef(storedUserId || generatedUserId);

    // Output panel state
    const [outputHeight, setOutputHeight] = useState(20); // percentage
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && !storedUserId) {
            sessionStorage.setItem('userId', userId.current);
        }
    }, []);

    const [output, setOutput] = useState('$ Output will appear here after run...');
    const [isExecuting, setIsExecuting] = useState(false);

    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
    const [remoteCursors, setRemoteCursors] = useState<Record<string, string>>({});
    const decorationsRef = useRef<string[]>([]);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        document.body.style.cursor = 'row-resize';
        e.preventDefault();
    };

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!isDragging || !containerRef.current) return;
        
        const containerRect = containerRef.current.getBoundingClientRect();
        const newHeight = ((containerRect.bottom - e.clientY) / containerRect.height) * 100;
        
        // Limit output panel height between 15% and 50% of container
        const clampedHeight = Math.min(Math.max(newHeight, 15), 50);
        setOutputHeight(clampedHeight);
    }, [isDragging]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
        document.body.style.cursor = '';
    }, []);

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        } else {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, handleMouseMove, handleMouseUp]);

    const executeCode = useCallback(async () => {
        setIsExecuting(true);
        setOutput('$ Executing code...');

        try {
            const response = await fetch('http://localhost:4001/api/execute', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    language,
                    code,
                    stdin: '' // You can add stdin input later
                }),
            });

            const result = await response.json();
            console.log('[Execute Response]', result);

            const outputText =
              result.error
                ? `$ Error: ${result.error}\n${result.detail || ''}`
                : `$ ${result.output || result.run?.output || ''}\nExit Code: ${result.code ?? result.run?.code ?? 'N/A'}`;

            setOutput(outputText);
        } catch (err) {
            setOutput(`$ Failed to execute: ${err instanceof Error ? err.message : String(err)}`);
        } finally {
            setIsExecuting(false);
        }
    }, [code, language]);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const queryRoomId = queryParams.get('roomId');
        const queryUserId = queryParams.get('userId');
        const queryRole = queryParams.get('role') || 'editor';

        const finalRoomId = queryRoomId || roomId;
        const finalUserId = queryUserId || userId.current;

        socket.emit('join:room', {
            roomId: finalRoomId,
            userId: finalUserId,
            role: queryRole,
        });

        socket.on('users:active', (users: string[]) => {
            setActiveUsers(users);
        });

        socket.on('cursor:update', ({ userId: otherId, position }) => {
            if (editorRef.current && otherId !== finalUserId) {
                const range = new monaco.Range(
                    position.lineNumber,
                    position.column,
                    position.lineNumber,
                    position.column
                );
                const newDecorations = editorRef.current.deltaDecorations(
                    decorationsRef.current,
                    [{
                        range,
                        options: {
                            className: 'remote-cursor',
                            afterContentClassName: 'remote-cursor-label',
                        },
                    }]
                );
                decorationsRef.current = newDecorations;
            }
        });

        return () => {
            socket.emit('leave:room', { roomId: finalRoomId, userId: finalUserId });
            socket.off('users:active');
            socket.off('cursor:update');
        };
    }, [socket, roomId]);

    const handleEditorChange = (value: string | undefined) => {
        setCode(value || '');

        if (activityTimeout.current) {
            clearTimeout(activityTimeout.current);
        }

        setIsActive(true);
        socket.emit('user:typing', { roomId, userId: userId.current });
        activityTimeout.current = setTimeout(() => {
            setIsActive(false);
        }, 2000); // user inactive after 2s of no typing

        const selection = editorRef.current?.getSelection();
        if (selection) {
            socket.emit('cursor:move', {
                roomId,
                userId: userId.current,
                position: {
                    lineNumber: selection.positionLineNumber,
                    column: selection.positionColumn,
                },
            });
        }
    };

    return (
        <div className="h-full w-full relative flex flex-col" ref={containerRef}>
            {/* Editor Header */}
            <div className="flex justify-between items-center p-2 bg-gradient-to-r from-blue-900 to-violet-900 border-b border-violet-700">
                <div className="flex items-center space-x-2">
                    <Listbox value={language} onChange={setLanguage}>
                        <div className="relative">
                            <ListboxButton className="bg-white/10 text-white px-3 py-1 rounded text-sm border border-violet-400 hover:bg-white/20 transition">
                                {language.toUpperCase()}
                            </ListboxButton>
                            <ListboxOptions className="absolute mt-1 bg-white text-gray-800 rounded shadow-lg z-30 max-h-60 overflow-auto border border-violet-200">
                                {languages.map((lang) => (
                                    <ListboxOption
                                        key={lang}
                                        value={lang}
                                        className={({ active }) =>
                                            `px-4 py-2 cursor-pointer ${active ? 'bg-blue-100 text-violet-800' : ''}`
                                        }
                                    >
                                        {lang.toUpperCase()}
                                    </ListboxOption>
                                ))}
                            </ListboxOptions>
                        </div>
                    </Listbox>
                    <button
                        className="px-3 py-1 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded text-sm hover:from-blue-500 hover:to-violet-500 transition duration-200 shadow-sm disabled:opacity-50 flex items-center"
                        onClick={executeCode}
                        disabled={isExecuting}
                    >
                        {isExecuting ? (
                            <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Running...
                            </span>
                        ) : (
                            <>
                                <span>Run</span>
                                <span className="ml-1">▶</span>
                            </>
                        )}
                    </button>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                        {isActive && (
                            <div className="relative w-3 h-3">
                                <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75"></div>
                                <div className="relative w-3 h-3 bg-green-500 rounded-full"></div>
                            </div>
                        )}
                        <span className="text-sm text-white/80">{isActive ? 'Live' : 'Idle'}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                        {activeUsers
                            .filter(id => id !== userId.current)
                            .map((id) => (
                                <div key={id} className="flex items-center space-x-1">
                                    <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" />
                                    <span className="text-xs text-white/70">{id}</span>
                                </div>
                            ))}
                    </div>
                </div>
            </div>

            {/* Editor Area */}
            <div 
                className="flex-1 overflow-hidden" 
                style={{ height: `calc(100% - ${outputHeight}%)` }}
            >
                <Editor
                    height="100%"
                    language={language}
                    theme="vs-dark"
                    value={code}
                    onChange={handleEditorChange}
                    onMount={(editor) => {
                        editorRef.current = editor;
                    }}
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        scrollBeyondLastLine: false,
                        wordWrap: 'on',
                        padding: { top: 10 },
                    }}
                />
            </div>

            {/* Resize Handle */}
            <div 
                className="h-2 bg-violet-800 hover:bg-violet-600 cursor-row-resize flex items-center justify-center"
                onMouseDown={handleMouseDown}
            >
                <div className="w-8 h-0.5 bg-violet-400 rounded-full" />
            </div>

            {/* Output Panel */}
            <div 
                className="bg-gray-900 border-t border-violet-800 overflow-hidden flex flex-col"
                style={{ height: `${outputHeight}%` }}
            >
                <div className="p-3 font-mono text-sm text-green-400 overflow-y-auto flex-1 whitespace-pre-wrap">
                    {output}
                </div>
            </div>

            <style jsx global>{`
                .remote-cursor {
                    border-left: 2px solid #10b981;
                    margin-left: -1px;
                    height: 100%;
                }
                .remote-cursor-label::after {
                    content: '●';
                    color: #10b981;
                    font-size: 12px;
                    margin-left: 4px;
                }
                .monaco-editor .scroll-decoration {
                    box-shadow: none !important;
                }
            `}</style>
        </div>
    );
}