const { Schema, model } = require('mongoose');

const userSchema = new Schema({
        username: { type: String, required: true, unique: true, trim: true },
        email: { 
        type: String, required: true, unique: true, 
        validate: [validateEmail, 'Please use a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please use a valid email address'],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought',
            }],
        friends: [userSchema],           
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    });

userSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends.length;
    });

const User = model('user', userSchema);

module.exports = User;