import {  Server } from 'socket.io';
import type { Server as HttpServer } from 'http';

export function setupSocket(server: HttpServer) {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  const activeUsers = new Set<string>();

  io.on('connection', (socket) => {
    console.log('[Socket] A user connected:', socket.id);

    socket.on('user:join', (userId: string) => {
      activeUsers.add(userId);
      io.emit('users:active', Array.from(activeUsers));
      console.log(`[Socket] ${userId} joined`);
    });

    socket.on('user:leave', (userId: string) => {
      activeUsers.delete(userId);
      io.emit('users:active', Array.from(activeUsers));
      console.log(`[Socket] ${userId} left`);
    });

    socket.on('user:typing', (userId: string) => {
      io.emit('users:active', Array.from(activeUsers));
    });

    socket.on('disconnect', () => {
      console.log('[Socket] A user disconnected:', socket.id);
    });
  });
}