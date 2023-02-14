const express = require('express');
const path = require('path');
const notes = require('./db/db.json');

const app = express();
const PORT = process.env.port || 3001;
const api = require('./routes/index.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/api/notes', (req, res) => {
    res.json(notes.slice(1));
});


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
