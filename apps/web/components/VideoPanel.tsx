'use client';

import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

export default function VideoPanel() {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const roomId = 'abc123';

  useEffect(() => {
    const getOrSetUserId = () => {
      const existing = sessionStorage.getItem('lynk-user-id');
      if (existing) return existing;
      const newId = 'user_' + Math.random().toString(36).substring(2, 9);
      sessionStorage.setItem('lynk-user-id', newId);
      return newId;
    };
    const userId = getOrSetUserId();
    const socket = io('http://localhost:4001', {
      transports: ['websocket'],
      query: { roomId, userId, role: 'video' }
    });
    socketRef.current = socket;

    const setupConnection = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        const pc = new RTCPeerConnection({
          iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
        });
        peerConnection.current = pc;

        stream.getTracks().forEach(track => pc.addTrack(track, stream));

        pc.ontrack = event => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = event.streams[0];
          }
        };

        pc.onicecandidate = event => {
          if (event.candidate) {
            socket.emit('ice-candidate', event.candidate);
          }
        };

        socket.emit('join-room', { roomId });

        socket.on('joined-room', ({ isInitiator }: { isInitiator: boolean }) => {
          if (isInitiator && peerConnection.current?.signalingState === 'stable') {
            peerConnection.current.createOffer().then(offer => {
              return peerConnection.current?.setLocalDescription(offer).then(() => {
                socket.emit('offer', offer);
              });
            });
          }
        });

        socket.on('offer', async (offer) => {
          await pc.setRemoteDescription(new RTCSessionDescription(offer));
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          socket.emit('answer', answer);
        });

        socket.on('answer', async (answer) => {
          await pc.setRemoteDescription(new RTCSessionDescription(answer));
        });

        socket.on('ice-candidate', async (candidate) => {
          try {
            await pc.addIceCandidate(new RTCIceCandidate(candidate));
          } catch (err) {
            console.error('Failed to add ICE candidate:', err);
          }
        });

      } catch (err) {
        console.error('Media access error:', err);
      }
    };

    setupConnection();

    return () => {
      socket.disconnect();
      peerConnection.current?.close();
    };
  }, []);

  return (
    <div className="h-full w-full p-4 bg-white rounded-lg shadow-md flex flex-col gap-4">
      <div className="text-gray-800 font-semibold">🎥 Video Collaboration</div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-1">You</p>
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-64 bg-black rounded-md object-cover"
          />
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-1">Peer</p>
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="w-full h-64 bg-black rounded-md object-cover"
          />
        </div>
      </div>
    </div>
  );
}