'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:4001', {
  transports: ['websocket'],
  autoConnect: false,
});

const EditorPanel = dynamic(() => import('@/components/EditorPanel'), { ssr: false });
const ChatPanel = dynamic(() => import('@/components/ChatPanel'), { ssr: false });
const VideoPanel = dynamic(() => import('@/components/VideoPanel'), { ssr: false });

export default function CollaborationPage() {
  const [activeTab, setActiveTab] = useState<'chat' | 'video'>('chat');
  const roomId = 'abc123'; // could be dynamic later

  useEffect(() => {
    socket.connect();
    console.log('[Socket] Connecting to server...');

    socket.on('connect', () => {
      console.log('[Socket] Connected with ID:', socket.id);
    });

    socket.on('disconnect', () => {
      console.log('[Socket] Disconnected');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <header className="px-6 py-4 bg-gray-900 text-white flex justify-between items-center">
        <h1 className="text-xl font-bold">Live Collaboration Room</h1>
        <span className="text-sm text-gray-300">Room ID: {roomId}</span>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel: Code Editor */}
        <div className="w-3/5 border-r bg-gray-50 p-2 overflow-auto">
          <EditorPanel socket={socket} roomId={roomId} />
        </div>

        {/* Right Panel: Chat or Video */}
        <div className="w-2/5 bg-white flex flex-col">
          <div className="flex justify-center space-x-2 p-2 border-b">
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-4 py-2 rounded-md ${activeTab === 'chat' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              Chat
            </button>
            <button
              onClick={() => setActiveTab('video')}
              className={`px-4 py-2 rounded-md ${activeTab === 'video' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              Video
            </button>
          </div>

          <div className="flex-1 overflow-auto">
            {activeTab === 'chat' ? <ChatPanel /> : <VideoPanel />}
          </div>
        </div>
      </div>
    </div>
  );
}