'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { nanoid } from 'nanoid/non-secure';
import { IoIosArrowRoundDown } from 'react-icons/io';
import { useSearchParams } from 'next/navigation';

export default function ChatPanel() {
  const [messages, setMessages] = useState<{ user: string; text: string; time: string }[]>([]);
  const [input, setInput] = useState('');
  const [userScrolledUp, setUserScrolledUp] = useState(false);
  const socketRef = useRef<Socket | null>(null);
  const searchParams = useSearchParams();
  const roomId = useRef(searchParams.get('roomId') || sessionStorage.getItem('roomId') || 'abc123');
  const userId = useRef(searchParams.get('userId') || `User_${nanoid(5)}`);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  // Initialize socket connection
  useEffect(() => {
    socketRef.current = io('http://localhost:4001', {
      transports: ['websocket'],
      query: {
        roomId: roomId.current,
        userId: userId.current,
        role: 'chat',
      },
    });

    socketRef.current.on('chat:message', (payload: { roomId: string; message: { user: string; text: string; time: string } }) => {
      if (payload.roomId === roomId.current) {
        setMessages((prev) => [...prev, payload.message]);
      }
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  // Handle scroll behavior
  useEffect(() => {
    const container = messagesContainerRef.current;
    const handleScroll = () => {
      if (!container) return;
      const { scrollTop, scrollHeight, clientHeight } = container;
      const nearBottom = scrollTop + clientHeight >= scrollHeight - 50;
      setUserScrolledUp(!nearBottom);
    };
    
    container?.addEventListener('scroll', handleScroll);
    return () => container?.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to bottom function with useCallback for optimization
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Auto-scroll when new messages arrive and user hasn't scrolled up
  useEffect(() => {
    if (!userScrolledUp) {
      scrollToBottom();
    }
    sessionStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages, userScrolledUp, scrollToBottom]);

  // Load messages from session storage on mount
  useEffect(() => {
    const stored = sessionStorage.getItem('chatMessages');
    if (stored) {
      setMessages(JSON.parse(stored));
    }
  }, []);

  // Clear messages every minute
  useEffect(() => {
    const interval = setInterval(() => {
      sessionStorage.removeItem('chatMessages');
      setMessages([]);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Send message function
  const sendMessage = useCallback(() => {
    if (input.trim() === '') return;
    const newMessage = {
      user: userId.current,
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prev) => [...prev, newMessage]);
    socketRef.current?.emit('chat:message', { roomId: roomId.current, message: newMessage });
    setInput('');
  }, [input]);

  // Handle Enter key press
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  }, [sendMessage]);

  return (
    <div className="flex flex-col h-[calc(80vh)] bg-gray-50 rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="relative flex-1 overflow-hidden">
        <div
          ref={messagesContainerRef}
          className="overflow-y-auto p-4 space-y-3 h-full bg-gradient-to-b from-gray-50 to-gray-100"
        >
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-400 text-center">
                💬 Start chatting with your collaborators
              </p>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={`${msg.time}-${idx}`}
                className={`flex ${msg.user === userId.current ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 shadow-sm ${
                    msg.user === userId.current
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-white text-gray-800 rounded-bl-none border border-gray-200'
                  }`}
                >
                  {msg.user !== userId.current && (
                    <div className="text-xs font-semibold text-gray-500 mb-1">
                      {msg.user}
                    </div>
                  )}
                  <div className="flex items-end gap-2">
                    <span className="flex-1">{msg.text}</span>
                    <span className={`text-xs ${msg.user === userId.current ? 'text-blue-200' : 'text-gray-400'}`}>
                      {msg.time}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {userScrolledUp && (
          <button
            onClick={scrollToBottom}
            className="absolute bottom-4 right-4 bg-gray-400 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105"
            aria-label="Scroll to bottom"
          >
            <IoIosArrowRoundDown size={20} />
          </button>
        )}
      </div>

      <div className="border-t border-gray-200 p-3 bg-white">
        <div className="flex gap-2">
          <input
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={sendMessage}
            disabled={!input.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}