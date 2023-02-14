const notes = require('express').Router();

const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');
const fs = require("fs");
notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    console.log(req.body);

    const {title, text} = req.body;

    if (req.body) {
    const newNote = {
        title,
        text,
        id: uuid(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully`);
    } else {
    res.error('Error in adding note');
    }
});

notes.delete('/notes/:id', (req, res) => {
    for (let i = 0; i < notes.length; i++) {
        if (notes[i].id == req.params.id) {
            notes.splice(i, 1);
            break;
        }};

    fs.writeFileSync('db/db.json', JSON.stringify(data), (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Note deleted");
        }
    })
});

module.exports = notes;