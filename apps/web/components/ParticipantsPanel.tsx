'use client';

import { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { nanoid } from 'nanoid/non-secure';
import { FiUser, FiUsers } from 'react-icons/fi';
import { useSearchParams } from 'next/navigation';

interface Participant {
  id: string;
  userId: string;
  joinedAt: Date;
  isActive: boolean;
}

const SOCKET_URL = 'http://localhost:4001';
const ACTIVE_THRESHOLD = 30000;

const EVENT_UPDATE = 'participants:update';
const EVENT_JOINED = 'participants:joined';
const EVENT_LEFT = 'participants:left';

export default function ParticipantsPanel() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isExpanded, setIsExpanded] = useState(true);
  const socketRef = useRef<Socket | null>(null);
  const searchParams = useSearchParams();
  const roomId = useRef(searchParams.get('roomId') || sessionStorage.getItem('roomId') || 'abc123');
  const userId = useRef(searchParams.get('userId') || `User_${nanoid(5)}`);

  useEffect(() => {
    socketRef.current = io(SOCKET_URL, {
      transports: ['websocket'],
      query: {
        roomId: roomId.current,
        userId: userId.current,
        role: 'participants',
      },
    });

    socketRef.current.on(EVENT_UPDATE, (updated: Participant[]) => {
      const now = Date.now();
      setParticipants(updated.map(p => ({
        ...p,
        joinedAt: new Date(p.joinedAt),
        isActive: now - new Date(p.joinedAt).getTime() < ACTIVE_THRESHOLD
      })));
    });

    socketRef.current.on(EVENT_JOINED, (newP: Participant) => {
      setParticipants(prev => [
        ...prev.filter(p => p.userId !== newP.userId),
        {
          ...newP,
          joinedAt: new Date(newP.joinedAt),
          isActive: true
        }
      ]);
    });

    socketRef.current.on(EVENT_LEFT, (leftId: string) => {
      setParticipants(prev => prev.filter(p => p.userId !== leftId));
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []); 

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setParticipants(prev => prev.map(p => ({
        ...p,
        isActive: now - p.joinedAt.getTime() < ACTIVE_THRESHOLD
      })));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden transition-all duration-300 ${isExpanded ? 'w-64' : 'w-12'}`}>
      <div 
        className="flex items-center justify-between p-3 bg-gray-50 border-b border-gray-200 cursor-pointer hover:bg-gray-100"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? (
          <div className="flex items-center space-x-2">
            <FiUsers className="text-gray-500" />
            <span className="font-medium text-gray-700">Participants ({participants.length})</span>
          </div>
        ) : (
          <FiUsers className="text-gray-500 mx-auto" />
        )}
      </div>

      {isExpanded && (
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {participants.length === 0 ? (
            <div className="text-center py-4 text-gray-400 text-sm">
              No participants yet
            </div>
          ) : (
            participants.map((participant) => (
              <div
                key={participant.userId}
                className="flex items-center p-2 rounded-lg bg-white shadow-sm border border-gray-100 hover:bg-blue-50 transition"
              >
                <div className="relative">
                  <img
                    src={`https://api.dicebear.com/7.x/identicon/svg?seed=${participant.userId}`}
                    alt="avatar"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                      participant.isActive ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  ></span>
                </div>
                <div className="ml-3 flex flex-col overflow-hidden">
                  <span className="text-sm font-medium text-gray-800 truncate">
                    {participant.userId}
                    {participant.userId === userId.current && (
                      <span className="ml-1 text-xs text-blue-500">(You)</span>
                    )}
                  </span>
                  <span className="text-xs text-gray-500">
                    {participant.isActive ? 'Online' : 'Offline'}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}