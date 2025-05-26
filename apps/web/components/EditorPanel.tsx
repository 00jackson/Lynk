'use client';

import Editor from '@monaco-editor/react';
import { useEffect, useRef, useState, useCallback } from 'react';
import { Socket } from 'socket.io-client';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/react';


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
    const userId = useRef(`user_${Math.random().toString(36).substr(2, 5)}`);

    const [output, setOutput] = useState('$ Output will appear here after run...');
    const [isExecuting, setIsExecuting] = useState(false);

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
        socket.emit('user:join', userId.current);

        socket.on('users:active', (users: string[]) => {
            setActiveUsers(users);
        });

        return () => {
            socket.emit('user:leave', userId.current);
        };
    }, [socket]);

    const handleEditorChange = (value: string | undefined) => {
        setCode(value || '');

        if (activityTimeout.current) {
            clearTimeout(activityTimeout.current);
        }

        setIsActive(true);
        socket.emit('user:typing', userId.current);
        activityTimeout.current = setTimeout(() => {
            setIsActive(false);
        }, 2000); // user inactive after 2s of no typing
    };

    return (
        <div className="h-full w-full relative">
            {/* Live dot */}
            <div className="absolute top-4 right-4 z-20 flex items-center space-x-1">
                {isActive && (
                    <div className="relative w-3 h-3">
                        <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75"></div>
                        <div className="relative w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                )}
                <span className="text-sm text-gray-600">{isActive ? 'Live' : 'Idle'}</span>
            </div>

            <div className="absolute top-16 right-4 z-20 flex flex-col items-end space-y-1">
                {activeUsers
                    .filter(id => id !== userId.current)
                    .map((id) => (
                        <div key={id} className="flex items-center space-x-2">
                            <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" />
                            <span className="text-xs text-gray-500">{id}</span>
                        </div>
                    ))}
            </div>

            <div className="absolute top-4 left-4 z-20 flex items-center mb-2">
                <Listbox value={language} onChange={setLanguage}>
                    <div className="relative mt-1">
                        <ListboxButton className="bg-gray-900 text-white px-3 py-1 rounded text-sm border border-gray-600">
                            {language.toUpperCase()}
                        </ListboxButton>
                        <ListboxOptions className="absolute mt-1 bg-white text-gray-800 rounded shadow-lg z-30 max-h-60 overflow-auto">
                            {languages.map((lang) => (
                                <ListboxOption
                                    key={lang}
                                    value={lang}
                                    className={({ active }) =>
                                        `px-4 py-2 cursor-pointer ${active ? 'bg-blue-100' : ''}`
                                    }
                                >
                                    {lang.toUpperCase()}
                                </ListboxOption>
                            ))}
                        </ListboxOptions>
                    </div>
                </Listbox>
                <button
                    className="ml-2 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-500 transition duration-200 shadow-sm disabled:opacity-50"
                    onClick={executeCode}
                    disabled={isExecuting}
                >
                    {isExecuting ? 'Running...' : 'Run ▶'}
                </button>
            </div>

            <Editor
                height="100%"
                language={language}
                theme="vs-dark"
                value={code}
                onChange={handleEditorChange}
                options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    scrollBeyondLastLine: false,
                    wordWrap: 'on',
                    padding: { top: 55 },
                }}
            />
            <div className="mt-4 bg-gray-500 text-green-400 font-mono text-sm p-4 rounded-lg shadow-inner border border-gray-700 w-full h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 whitespace-pre-wrap">
                {output}
            </div>
        </div>
    );
}