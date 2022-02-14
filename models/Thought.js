const { Schema, Types, model } = require('mongoose');
const dateFormat = require('../utils/helpers');
const moment = require('moment');
const { ObjectId } = require('bson');


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
        get: (momentDateFormat) => moment(momentDateFormat).format('MMM DD, YYYY [at] hh:mm a')
    }
},
{
    toJSON: {
        getters: true,
    },
    id: false,
})


const thoughtSchema = new Schema({
    thoughtText: { 
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (momentDateFormat) => moment(momentDateFormat).format('MMM DD, YYYY [at] hh:mm a')
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema],
},
{
    toJSON: {
        getters: true,
        virtuals: true,
    },
        id: false,
});

thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    });

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;