const { User, Thought } = require('../models');

module.exports = {
    getThoughts (req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },

//Get thought by Id
getSingleThought (req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
    .then((thought) => 
        !thought
            ? res.status(404).json({ message: 'Sorry, no thought with that ID'})
            : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
},

async createThought (req, res) {
    try {
   const thought = await Thought.create(req.body)
          res.json(thought)
          console.log(thought)
        return User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thoughts: thought._id }},
            {new: true}
        );
    } catch (err) {
     console.log(err.message)
     res.status(500).json(err)}
 },

 deleteThought (req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
    .then(() => res.json({ message: 'Perish the thought!'}))
    .catch((err) => res.status(500).json(err));
},

updateThought(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        // { runValidators: true, new: true },
    )
        .then((thought) => 
            !thought
                ? res.status (404).json({ message: 'Sorry, no thought with this ID' })
                : res.json(thought)
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
},

async createReaction (req, res) {
    try {
        console.log('You are adding a reaction')
        const reaction = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body} },
            { runValidators: true, new: true }
        )
        res.json(reaction)
        console.log(reaction)
    } catch (err) {
        console.log(err.message)
        res.status(500).json(err)
    }
},

deleteReaction (req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: req.body } },
        { runValidators: true, new: true }
        )

    .then((reaction) =>
    !reaction
    ? res
        .status(404)
        .json({ message: 'No reaction found with that ID '})
    : res.json(reaction)
    )
    .catch((err) => res.status(500).json(err));
    },
};

