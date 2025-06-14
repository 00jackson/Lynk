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
  const socketToRoom: Record<string, { roomId: string; userId: string }> = {};

  io.on('connection', (socket: Socket) => {
    const userId = socket.handshake.query.userId as string;
    console.log('[Socket] A user connected:', socket.id, 'UserID:', userId);

    socket.on('cursor:move', ({ roomId, position }) => {
      socket.to(roomId).emit('cursor:update', { userId, position });
    });

    socket.on('join:room', ({ roomId }) => {
      socket.join(roomId);
      socketToRoom[socket.id] = { roomId, userId };

      if (!rooms[roomId]) rooms[roomId] = [];
      if (!rooms[roomId].includes(userId)) rooms[roomId].push(userId);

      io.to(roomId).emit('users:active', rooms[roomId]);
      io.to(roomId).emit('participants:joined', { userId });
      io.to(roomId).emit('participants:update', rooms[roomId]);
      console.log(`[Room ${roomId}] ${userId} joined`);

      const socketsInRoom = io.sockets.adapter.rooms.get(roomId);
      const numSockets = socketsInRoom ? socketsInRoom.size : 0;
      if (numSockets === 2) {
        io.to(roomId).emit('webrtc:ready');
      }
    });

    socket.on('leave:room', ({ roomId }) => {
      socket.leave(roomId);
      delete socketToRoom[socket.id];

      if (rooms[roomId]) {
        rooms[roomId] = rooms[roomId].filter(id => id !== userId);
        io.to(roomId).emit('users:active', rooms[roomId]);
        io.to(roomId).emit('participants:left', { userId });
        io.to(roomId).emit('participants:update', rooms[roomId]);
      }
      console.log(`[Room ${roomId}] ${userId} left`);
    });

    socket.on('chat:message', ({ roomId, message }) => {
      console.log(`[Chat] Message to ${roomId} from ${userId}:`, message);
      io.to(roomId).emit('chat:message', { message, userId });
    });

    socket.on('webrtc:offer', ({ roomId, offer }) => {
      socket.to(roomId).emit('webrtc:offer', { offer, from: userId });
    });

    socket.on('webrtc:answer', ({ roomId, answer }) => {
      socket.to(roomId).emit('webrtc:answer', { answer, from: userId });
    });

    socket.on('webrtc:ice-candidate', ({ roomId, candidate }) => {
      socket.to(roomId).emit('webrtc:ice-candidate', { candidate, from: userId });
    });

    socket.on('disconnect', () => {
      const mapping = socketToRoom[socket.id];
      if (mapping) {
        const { roomId } = mapping;
        if (rooms[roomId]) {
          rooms[roomId] = rooms[roomId].filter(id => id !== userId);
          io.to(roomId).emit('users:active', rooms[roomId]);
          io.to(roomId).emit('participants:left', { userId });
          io.to(roomId).emit('participants:update', rooms[roomId]);
        }
        delete socketToRoom[socket.id];
        console.log(`[Room ${roomId}] ${userId} disconnected`);
      }
      console.log('[Socket] A user disconnected:', socket.id);
    });
  });
}