'use client';

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:4001'); // Update as needed

export default function LiveUsers() {
  const [userCount, setUserCount] = useState(0);
  const [activities, setActivities] = useState<string[]>([]);

  useEffect(() => {
    socket.on('users:count', (count: number) => {
      setUserCount(count);
    });

    socket.on('activity:log', (message: string) => {
      setActivities(prev => [message, ...prev].slice(0, 5)); // Only keep last 5
    });

    return () => {
      socket.off('users:count');
      socket.off('activity:log');
    };
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-white w-full text-center space-y-10 relative overflow-hidden">
      <h2 className="text-4xl font-bold text-blue-700 tracking-tight">Live User Activity</h2>
      <div className="flex justify-center items-center gap-3 text-2xl font-semibold text-blue-800">
        <span>Users Online:</span>
        <div className="flex gap-1">
          {String(userCount).split('').map((digit, i) => (
            <span
              key={i}
              className="bg-white text-blue-700 px-2 py-1 rounded-md shadow-md text-2xl font-mono transform transition-transform duration-300 scale-110"
            >
              {digit}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-lg mx-auto text-left mt-8 space-y-3 bg-white p-6 rounded-lg shadow-lg border border-blue-100">
        <h3 className="text-lg font-semibold text-blue-600 mb-2">Recent Activity</h3>
        <div className="space-y-2">
          {activities.map((act, i) => (
            <div
              key={i}
              className="text-sm text-gray-600 animate-fadeIn border-l-4 border-blue-300 pl-2"
              style={{ animationDelay: `${i * 0.05}s`, animationFillMode: 'both' }}
            >
              • {act}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </section>
  );
}