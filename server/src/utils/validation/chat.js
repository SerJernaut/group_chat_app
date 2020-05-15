const Joi                                        = require( '@hapi/joi');
const{ CHAT_NAME_PATTERN} = require( '../../constants');


const chatNamePatternMessage = 'Login should be 6 to 16 characters long, can contains letters, numbers or "- _" characters';

const createChatSchema = Joi.object({
    chatName: Joi.string().required().pattern(CHAT_NAME_PATTERN).message(chatNamePatternMessage).label('Chat name'),
});

module.exports = {
    createChatSchema,
};