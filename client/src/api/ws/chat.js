import { chatSocket }                    from './index.js';

export const emitSendMessage = ( chatId, message, from ) => {
    chatSocket.emit( 'message', chatId, message, from );
};

export const emitJoinToRoom = ( chatId ) => {
    chatSocket.emit( 'join', chatId );
};
