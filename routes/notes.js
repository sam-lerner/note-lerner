const router = require('express').Router();
const store = require('../db/store');

// Retreiving the existing notes
router.get('/', (req, res) => {
    console.log(req.body);

    store.getNotes()
        .then(notes => {
            res.json(notes)
        })
        .catch(err => {
            res.status(404).json(err)
        })
});

// Deleting notes

router.delete('/:id', (req, res) => {
    store.removeNote(req.params.id)
        .then(() => res.json({ ok: true }))
        .catch(err => res.status(404).json(err))
});

// Adding new notes
router.post('/', (req, res) => {
    store.addNote(req.body)
        .then(note => {
            res.json(note)
        })
        .catch(err => res.status(404).json(err))
});

module.exports = router;