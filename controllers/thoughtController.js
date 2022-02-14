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


};