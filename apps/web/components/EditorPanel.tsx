'use client';

import Editor from '@monaco-editor/react';
import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

export default function EditorPanel() {
  const [code, setCode] = useState('// Start coding...');
  const [isActive, setIsActive] = useState(false);
  const activityTimeout = useRef<NodeJS.Timeout | null>(null);

  const [activeUsers, setActiveUsers] = useState<string[]>([]);
  const socketRef = useRef<ReturnType<typeof io> | null>(null);
  const userId = useRef(`user_${Math.random().toString(36).substr(2, 5)}`); // temp ID

  useEffect(() => {
    socketRef.current = io('http://localhost:4001'); // Adjust URL as needed
    socketRef.current.emit('user:join', userId.current);

    socketRef.current.on('users:active', (users: string[]) => {
      setActiveUsers(users);
    });

    return () => {
      socketRef.current?.emit('user:leave', userId.current);
      socketRef.current?.disconnect();
    };
  }, []);

  const handleEditorChange = (value: string | undefined) => {
    setCode(value || '');

    if (activityTimeout.current) {
      clearTimeout(activityTimeout.current);
    }

    setIsActive(true);
    socketRef.current?.emit('user:typing', userId.current);
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

      <Editor
        height="100%"
        defaultLanguage="javascript"
        theme="vs-dark"
        value={code}
        onChange={handleEditorChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          scrollBeyondLastLine: false,
          wordWrap: 'on',
          padding: { top: 16 },
        }}
      />
    </div>
  );
}