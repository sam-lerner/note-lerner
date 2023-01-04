const uuid = require('../helpers/uuid');
const fs = require('fs');
const util = require('util');

// fs functions 
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

// Class constructor for all of our functions
class Store {
    // Read from the stored json
    read() {
        return readFile('db/db.json', 'utf8');
    }
    // Write to the stored json
    write(note) {
        return writeFile('db/db.json', JSON.stringify(note))
    }
    // Create a new note to store
    addNote(note) {
        const { title, text } = note

        if (!title || !text) {
            throw new Error("title and text cannot be blank")
        }

        const newNote = { title, text, id: uuid() }

        return this.getNotes()
            .then(notes => [...notes, newNote])
            .then(updatedNotes => this.write(updatedNotes))
            .then(() => this.newNote)
    }
    // Get notes (on page load and on store)
    getNotes() {
        return this.read()
            .then(notes => {
                return JSON.parse(notes) || [];
            })
    }
    // Delete a note
    removeNote(id) {
        return this.getNotes()
            .then(notes => notes.filter(note => note.id !== id))
            .then(keepNotes => this.write(keepNotes))
    }
};
module.exports = new Store