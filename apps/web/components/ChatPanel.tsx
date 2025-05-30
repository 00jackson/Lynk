'use client';

import { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { nanoid } from 'nanoid/non-secure';
import { IoIosArrowRoundDown } from 'react-icons/io';

export default function ChatPanel() {
  const [messages, setMessages] = useState<{ user: string; text: string; time: string }[]>([]);
  const [input, setInput] = useState('');
  const socketRef = useRef<Socket | null>(null);
  const userId = useRef(`User_${nanoid(5)}`);
  const [userScrolledUp, setUserScrolledUp] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const roomId = useRef(sessionStorage.getItem('roomId') || 'abc123');

  useEffect(() => {
    socketRef.current = io('http://localhost:4001', {
      transports: ['websocket']
    });
    socketRef.current.emit('join:room', { roomId: roomId.current, role: 'chat' });

    socketRef.current.on('chat:message', (payload: { roomId: string; message: { user: string; text: string; time: string } }) => {
      if (payload.roomId === roomId.current) {
        setMessages((prev) => [...prev, payload.message]);
      }
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    const container = messagesContainerRef.current;
    const handleScroll = () => {
      if (!container) return;
      const { scrollTop, scrollHeight, clientHeight } = container;
      const nearBottom = scrollTop + clientHeight >= scrollHeight - 10;
      setUserScrolledUp(!nearBottom);
    };
    container?.addEventListener('scroll', handleScroll);
    return () => container?.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!userScrolledUp) {
      scrollToBottom();
    }
    sessionStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    const stored = sessionStorage.getItem('chatMessages');
    if (stored) {
      setMessages(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      sessionStorage.removeItem('chatMessages');
      setMessages([]);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const sendMessage = () => {
    if (input.trim() === '') return;
    const newMessage = {
      user: userId.current,
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prev) => [...prev, newMessage]);
    socketRef.current?.emit('chat:message', { roomId: roomId.current, message: newMessage });
    setInput('');
  };

  return (
    <div className="flex flex-col h-[calc(80vh)] space-y-1">
      <div className="relative flex-1 overflow-hidden">
        <div
          ref={messagesContainerRef}
          className="overflow-y-auto bg-white border rounded p-3 space-y-1 h-full"
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex flex-col text-sm ${
                msg.user === userId.current ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`inline-block px-4 py-2 rounded-2xl max-w-xs relative ${
                  msg.user === userId.current
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                <span className='px-1 mr-5'>{msg.text}</span>
                <span className="absolute text-[10px] bottom-1 right-2 text-gray-300">
                  {msg.time}
                </span>
              </div>
            </div>
          ))}
          {messages.length === 0 && (
            <p className="text-gray-500 italic">
              💬 Chat with your collaborators in real-time.
            </p>
          )}
          <div ref={messagesEndRef} />
        </div>

        {userScrolledUp && (
          <button
            onClick={scrollToBottom}
            className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-gray-400 text-white p-2 rounded-full shadow-md hover:bg-blue-600 transition animate-bounce"
          >
            <IoIosArrowRoundDown size={20} />
          </button>
        )}
      </div>
      <div className="flex gap-1">
        <input
          className="flex-1 border border-gray-300 rounded p-2 text-sm shadow-sm ml-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') sendMessage();
          }}
          placeholder="Type your message..."
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded shadow transition mr-1"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}