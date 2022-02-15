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
        .populate('thoughts')
        .populate('friends')
        .then((user) => 
            !user
                ? res.status(404).json({ message: 'Sorry, no user with that ID'})
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },


   async createUser (req, res) {
       try {
      const user = await User.create(req.body)
             res.json(user)
             console.log(user)
       } catch (err) {
        console.log(err.message)
        res.status(500).json(err)}
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
            { runValidators: true, new: true },
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


    

    async createFriend (req, res) {
        try {
            console.log('You are adding a friend')
            const friend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId} },
                { runValidators: true, new: true }
            )
            res.json(friend)
            console.log(friend)
        } catch (err) {
            console.log(err.message)
            res.status(500).json(err)
        }
    },

    deleteFriend (req, res) {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
        )

    .then((user) =>
    !user
    ? res
        .status(404)
        .json({ message: 'No user found with that ID '})
    : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
    },
};