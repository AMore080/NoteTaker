const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');
const { uuid } = require('uuidv4');
const { parse } = require('path');
const PORT = process.env.PORT || 3001;

const app = express();
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('./public'));

app.get('/api/notes', (req,res) => {
    readFileAsync('./db/db.json','utf-8').then(function(data){
        notes = [].concat(JSON.parse(data))
        res.json(notes);
    })
});

app.post('/api/notes', (req,res) => {
    const note = req.body;
     readFileAsync('./db/db.json',"utf-8").then(function(data){
        const notes = [].concat(JSON.parse(data));
        note.id = uuid();
        notes.push(note);
        return notes;
    }).then(function(notes) {
        writeFileAsync('./db/db.json',JSON.stringify(notes))
        res.json(note);
    })
});

app.delete('/api/notes', (req,res) => {
    const delNote = parseInt(req.params.id);
    readFileAsync('./db/db.json','utf-8').then(function(data) {
        const notes = [].concat(JSON.parse(data));
        const newNotes = [];
        for(let i = 0; i < notes.length; i++) {
            if(delNote !== notes[i].id) {
                newNotes.push(notes[i])
            }
        }
        return newNotes;
    }).then(function(notes){
        writeFileAsync('./db/db.json',JSON.stringify(notes))
        res.send('Sucessfully saved')
    })
})

app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
})

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})


app.listen(PORT, function() {
    console.log(`App listening at http://localhost:${PORT}`)
});