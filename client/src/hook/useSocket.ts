import { useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

const backUrl = 'http://localhost:4000';

const sockets: { [key: string]: Socket } = {};
const useSocket = (room?: string): [Socket | undefined, () => void] => {
  const disconnect = useCallback(() => {
    if (room && sockets[room]) {
      sockets[room].disconnect();
      delete sockets[room];
    }
  }, [room]);
  if (!room) {
    return [undefined, disconnect];
  }
  if (!sockets[room]) {
    sockets[room] = io(`${backUrl}/ws-${room}`, {
      transports: ['websocket'],
    });
    console.info('create socket', room, sockets[room]);
  }

  return [sockets[room], disconnect];
};

export default useSocket;
