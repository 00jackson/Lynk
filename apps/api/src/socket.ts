import { Socket, Server } from 'socket.io';
import type { Server as HttpServer } from 'http';

export function setupSocket(server: HttpServer) {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });

  const rooms: Record<string, string[]> = {};

  io.on('connection', (socket: Socket) => {
    console.log('[Socket] A user connected:', socket.id);

    socket.on('cursor:move', ({ roomId, userId, position }) => {
      socket.to(roomId).emit('cursor:update', { userId, position });
      
    });

    socket.on('join:room', ({ roomId, userId }) => {
      socket.join(roomId);
      if (!rooms[roomId]) rooms[roomId] = [];
      if (!rooms[roomId].includes(userId)) rooms[roomId].push(userId);
      io.to(roomId).emit('users:active', rooms[roomId]);
      console.log(`[Room ${roomId}] ${userId} joined`);
    });

    socket.on('leave:room', ({ roomId, userId }) => {
      socket.leave(roomId);
      if (rooms[roomId]) {
        rooms[roomId] = rooms[roomId].filter(id => id !== userId);
        io.to(roomId).emit('users:active', rooms[roomId]);
      }
      console.log(`[Room ${roomId}] ${userId} left`);
    });

    socket.on('chat:message', ({ roomId, message }) => {
      console.log(`[Chat] Message to ${roomId}:`, message);
      socket.to(roomId).emit('chat:message', message);
    });

    socket.on('disconnect', () => {
      console.log('[Socket] A user disconnected:', socket.id);
    });
  });
}