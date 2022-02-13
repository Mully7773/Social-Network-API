//Note: this schema could be placed inside the Thought.js model as a subdocument, but maybe this is more modular
const { ObjectId } = require('bson');
const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/helpers');

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: new Types.ObjectId(),
        // auto: true
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtDate => dateFormat(createdAtDate)
    }
},
{
    toJSON: {
        getters: true,
    },
    id: false,
})

module.exports = reactionSchema;