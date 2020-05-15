const chatRouter = require('express').Router();
const ChatController = require('../controllers/chat.controller.js');
const UserController = require('../controllers/user.controller.js');
const createValidationMW = require('../middlewares/validation/createValidationMW.js');
const {createChatSchema} = require('./../utils/validation/chat.js');

chatRouter.route('/chat_list')
    .get(ChatController.getAllChats);

chatRouter.route('/chat(/:chatId)?')
    .post(
        createValidationMW(createChatSchema),
        ChatController.createChat)
    .get(ChatController.getChat);

chatRouter.route('/chat/:chatId/users')
    .post(ChatController.findChatById,
        UserController.fundUserById,
        ChatController.joinToChat);

chatRouter.route('/chat/:chatId/message(/:messageId)?')
    .post(ChatController.findChatById,
        UserController.fundUserById,
        ChatController.addMessageToChat)
    .get(ChatController.findChatWithMessages,
        UserController.fundUserById,
        ChatController.getChatMessages,
        );

module.exports = chatRouter;