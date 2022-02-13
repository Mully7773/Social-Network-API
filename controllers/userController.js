const { rmSync } = require('fs');
const { User, Thought } = require('../models');

module.exports = {
    // Get all users
    getUsers (req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },

    // Get a single user
    //need to add populate
    getSingleUser (req, res) {
        User.findOne({ _id: req.params.userId })
        .select('-__v')
        .then((user) => 
            !user
                ? res.status(404).json({ message: 'Sorry, no user with that ID'})
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    //create a new user
    createUser (req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err))
    },

    deleteUser (req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
        .then((user) =>
            !user
            ? res.status(404).json({ message: 'Sorry, no user with that ID'})
            : Thought.deleteMany({ _id: { $in: user.thoughts } })
        )
        .then(() => res.json({ message: 'User and associated thoughts deleted!'}))
        .catch((err) => res.status(500).json(err));
    },
    updateUser (req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            // { runValidators: true, new: true },
        )
            .then((user) => 
                !user
                    ? res.status (404).json({ message: 'Sorry, no user with this ID' })
                    : res.json(user)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
};