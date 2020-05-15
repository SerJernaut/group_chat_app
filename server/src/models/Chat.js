const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const {messageSchema} = require('../models/Message.js');

const userRef = {
    type: Schema.Types.ObjectId,
    ref: 'User',
};

const chatSchema = new Schema({
        name: {
            type: Schema.Types.String,
            required: true,
            match: /^\w{6,16}$/,
        },
        owner: {
            ...userRef,
            required: true,
        },
        users: [
            userRef,
        ],
        messages: [messageSchema],
    },
    {
        timestamp: true,
    });

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
