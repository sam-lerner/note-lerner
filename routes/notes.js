const notes = require('express').Router();
const db = require('../db/db.json');
const { writeToFile } = require('../helpers/fsUtils');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// Retreiving the existing notes
notes.get('/', (req, res) => {
    console.log(req.body);
    // res.status(200).json(db);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// Deleting notes
notes.delete('/:id', (req, res) => {
    console.log(req.body);
    const deletion = req.params.id;
    readFromFile('./db/db.json')
    .then((data)=> JSON.parse(data))
    .then((json) => {
        const result = json.filter((pop) => pop.id !== deletion);

        writeToFile('./db/db.json', result);

        res.json(`Item${deletion} has been deleted.`)
    });
});

// Adding new notes
notes.post('/', (req, res) => {
    console.log(req.body);
    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
        };
        readAndAppend(newNote, ('./db/db.json'));
        res.status(200);
    } else {
        res.error(404);
    }
});

module.exports = notes;