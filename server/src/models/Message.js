const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    body: {
        type: Schema.Types.String,
        default: '',
    },
    files: [Schema.Types.String],
}, {
    timestamp: true,
});

const Message = mongoose.model('Message', messageSchema);

module.exports = {
    messageSchema,
};