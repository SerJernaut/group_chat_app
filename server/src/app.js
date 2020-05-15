const path = require('path');
const { Server } = require('http');
const express = require('express');
const socketIO = require('socket.io');
const cors = require('cors');
const app = express();
const server = new Server(app);
const io = socketIO(server);
const router = require('./router');
const PORT = process.env.PORT || 3000;
const {Chat, User} = require('./models');

app.use(cors());
app.use(express.json());
/*
* static files
* */
app.use(express.static(path.join(__dirname, '../uploads')));
/*
* http routing
* */
app.use('/api', router);

/*
* WebSocket
* */
const chat = io.of('/chat').on('connection', function (socket) {

    socket.on('join', room => {
        socket.join( room );
    });

    socket.on( 'message', async ( chatId, msg, from ) => {
        try {
            const message = {body: msg, authorId: from};

            const chat = await Chat.findById(chatId);

            const user = await User.findById(from);
            if (chat && user) {

                chat.messages.push(message);
            }
            const savedChat = await chat.save();

            const chatWithNewMessageAndAuthorData = await Chat.findById(chatId).populate(
                'messages.authorId', {
                    chats: 0,
                }
            );

            const newMessages = chatWithNewMessageAndAuthorData.messages;
            const newMessage = newMessages[newMessages.length - 1];

            if (savedChat && newMessage) {
                io.of('/chat').to(chatId).emit('new_message', chatId, newMessage);
            }
        } catch (e) {
            throw e
        }
    });

    socket.on('startTyping', (_id, login, currentChat) => {
        socket.to(currentChat).emit('typing', _id, login, currentChat);

    });

    socket.on('stopTyping', (_id, currentChat) => {
        socket.to(currentChat).emit('stop_typing', _id, currentChat);
    });

    socket.on('newChat', () => {
        socket.broadcast.emit('new_chat');
    });

});

/*
* start server
* */
server.listen(PORT, () =>
  console.log(`Example app listening on port ${ PORT }!`),
);

module.exports = io;



