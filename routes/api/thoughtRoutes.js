const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    deleteThought,
    updateThought,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/')
.get(getThoughts)
.post(createThought);

// /api/thought/:thoughtId
router.route('/:thoughtId')
.get(getSingleThought)
.delete(deleteThought)
.put(updateThought);

module.exports = router;