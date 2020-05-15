const {Chat, Message} = require('./../models');
const Controller = require('../utils/controller');
const{ BadRequestError, ResourceNotFoundError } = require('./../utils/errors');

class ChatController {
    constructor() {
        this._controller = new Controller(Chat);
    }

    createChat = async (req, res, next) => {
        try {
            const {headers: {authorization: userId}, body} = req;
            res.send(await this._controller.create({name: body.chatName, owner: userId, users: userId}));
        } catch (e) {
            next(e);
        }
    };

    findChatById = async (req, res, next) => {
        try {
            req.chat = await this._controller.read( req.params.chatId);
            next();
        } catch (e) {
            next( e );
        }
    };

    deleteChatById = async (req, res, next) => {
        try {
            res.send(await this._controller.delete( req.params.id ));
        } catch (e) {
            next( e );
        }
    };

    joinToChat = async (req, res, next) => {
        try {
            const {headers: {authorization: userId}, chat, user} = req;
            chat.users.push(userId);
            const savedChat = await chat.save();
            if (savedChat && user) {
                return res.send(savedChat);
            }
            new BadRequestError();
        } catch (e) {
            next(e);
        }
    };

    addMessageToChat = async (req, res, next) => {
        try {
            const {headers: {authorization: userId}, chat, user, body} = req;
            chat.messages.push({...body, authorId: userId});
            const savedChat = await chat.save();
            if (savedChat && user) {
                return res.send(savedChat);
            }
            new BadRequestError();
        } catch (e) {
            next(e);
        }
    };

    findChatWithMessages = async (req, res, next) => {
        try {
            const chat = await Chat.findById(req.params.chatId).
            populate(
                'messages.authorId', {
                    chats: 0,
                }
            );
            if (chat) {
                req.chat = chat;
                return next();
            }
            new ResourceNotFoundError();
        } catch (e) {
            next(e);
        }
    };

    getChatMessages = async (req, res, next) => {
        try {
            const {chat: {messages}, user} = req;

            if (messages && user) {
                return res.status(200).send(messages)
            }
            res.send('Chat not found or there is no message');
        } catch (e) {
            next(e);
        }
    };

    getAllChats = async (req, res, next) => {
        try {
            const chats = await Chat.find({},{
                messages: false,
                __v: false,
            });
            if (chats) {
                return res.status(200).send(chats)
            }
            res.send('Chats not found or you do not have any');
        } catch (e) {
            next(e);
        }
    };

    getChat = async (req, res, next) => {
        try {
            const chat = await Chat.findById(req.params.chatId).
            populate('users', {
                chats: 0,
            }).populate('owner', {
                chats: 0,
            });
            if (chat) {
                return res.send(chat);
            }
            new ResourceNotFoundError();
        } catch (e) {
            next(e);
        }
    };

}

module.exports = new ChatController();