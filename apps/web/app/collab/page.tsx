'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { io, Socket } from 'socket.io-client';
// import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FiCopy, FiMaximize2, FiMinimize2, FiUsers, FiMessageSquare, FiVideo } from 'react-icons/fi';

// Define prop types for your components
type EditorPanelProps = {
  socket: Socket;
  roomId: string;
};

type ChatPanelProps = {
  socket: Socket;
  roomId: string;
};

type VideoPanelProps = {
  socket: Socket;
  roomId: string;
};

type ParticipantsPanelProps = {
  participants: string[];
};

const socket: Socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:4001', {
  transports: ['websocket'],
  autoConnect: false,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

// Update dynamic imports with proper typing
const EditorPanel = dynamic<EditorPanelProps>(() => import('@/components/EditorPanel'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-full">Loading editor...</div>
});

const ChatPanel = dynamic<ChatPanelProps>(() => import('@/components/ChatPanel'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-full">Loading chat...</div>
});

const VideoPanel = dynamic<VideoPanelProps>(() => import('@/components/VideoPanel'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-full">Loading video...</div>
});

const ParticipantsPanel = dynamic<ParticipantsPanelProps>(() => import('@/components/ParticipantsPanel'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-full">Loading participants...</div>
});

// ... rest of your component code remains the same ...

export default function CollaborationPage() {
  const [activeTab, setActiveTab] = useState<'chat' | 'video' | 'participants'>('chat');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [participants, setParticipants] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const roomId = 'abc123'; // In a real app, this would come from router params

  useEffect(() => {
    socket.connect();

    const onConnect = () => {
      console.log('[Socket] Connected with ID:', socket.id);
      setIsConnected(true);
      socket.emit('join-room', roomId);
    };

    const onDisconnect = () => {
      console.log('[Socket] Disconnected');
      setIsConnected(false);
    };

    const onParticipantsUpdate = (users: string[]) => {
      setParticipants(users);
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('participants-updated', onParticipantsUpdate);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('participants-updated', onParticipantsUpdate);
      socket.disconnect();
    };
  }, [roomId]);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!isFullscreen) {
      containerRef.current.requestFullscreen().catch(console.error);
    } else {
      document.exitFullscreen().catch(console.error);
    }
    setIsFullscreen(!isFullscreen);
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col bg-gray-100" ref={containerRef}>
      <header className="px-6 py-4 bg-gray-900 text-white flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold">Pair Programming Session</h1>
          <div className="flex items-center space-x-2">
            <span className={`h-2 w-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
            <span className="text-sm">{isConnected ? 'Connected' : 'Disconnected'}</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-gray-800 px-3 py-1 rounded-md">
            <span className="text-sm text-gray-300">Room ID: {roomId}</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(roomId);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="text-gray-300 hover:text-white transition-colors"
            >
              <FiCopy className="w-4 h-4" />
            </button>
            {copied && <span className="text-xs text-green-400 ml-1">Copied!</span>}
          </div>

          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-md hover:bg-gray-700 transition-colors"
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          >
            {isFullscreen ? (
              <FiMinimize2 className="w-5 h-5" />
            ) : (
              <FiMaximize2 className="w-5 h-5" />
            )}
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel: Code Editor */}
        <div className={`${isFullscreen ? 'w-full' : 'w-3/4'} bg-gray-50 border-r border-gray-200`}>
          <EditorPanel socket={socket} roomId={roomId} />
        </div>

        {/* Right Panel: Chat, Video, or Participants */}
        {!isFullscreen && (
          <div className="w-1/4 bg-white flex flex-col border-l border-gray-200">
            <div className="flex justify-between items-center p-2 border-b border-gray-200">
              <div className="flex space-x-1">
                <button
                  onClick={() => setActiveTab('chat')}
                  className={`p-2 rounded-md flex items-center space-x-1 ${activeTab === 'chat' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                >
                  <FiMessageSquare className="w-4 h-4" />
                  <span>Chat</span>
                </button>
                <button
                  onClick={() => setActiveTab('video')}
                  className={`p-2 rounded-md flex items-center space-x-1 ${activeTab === 'video' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                >
                  <FiVideo className="w-4 h-4" />
                  <span>Video</span>
                </button>
                <button
                  onClick={() => setActiveTab('participants')}
                  className={`p-2 rounded-md flex items-center space-x-1 relative ${activeTab === 'participants' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                >
                  <FiUsers className="w-4 h-4" />
                  <span>Participants</span>
                  {participants.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {participants.length}
                    </span>
                  )}
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {activeTab === 'chat' && <ChatPanel socket={socket} roomId={roomId} />}
              {activeTab === 'video' && <VideoPanel socket={socket} roomId={roomId} />}
              {activeTab === 'participants' && <ParticipantsPanel participants={participants} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}