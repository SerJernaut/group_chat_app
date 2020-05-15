import io from 'socket.io-client';

export const chatSocket = io('localhost:3000/chat');
/*export const chatSocket = io('ws://localhost:3000/chat');*/
