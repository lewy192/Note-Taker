const express = require("express");
const fs = require("fs");
const app = express();

// db import
const db = require("./db/db.json");

var PORT = process.env.PORT || 3001;

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
});

app.get("/notes", (req, res) => {
    res.sendFile(`${__dirname}/public/notes.html`);
});

// api calls

app.get("/api/notes", (req, res) => {
    let notesJson = fs.readFileSync("./db/db.json");
    let notes = JSON.parse(notesJson);
    res.send(notes.slice(1));
});

app.post("/api/notes", (req, res) => {
    let notesJson = fs.readFileSync("./db/db.json");
    let notes = JSON.parse(notesJson);
    let newNote = req.body;
    newNote["id"] = notes[0].id;
    notes[0].id += 1;
    // TODO: store with unique ID
    notes.push(newNote);
    notesJson = JSON.stringify(notes);

    fs.writeFileSync("./db/db.json", notesJson);
    res.end("Notes Updated");
});

app.listen(PORT, () => {
    console.log(`listening on port" ${PORT}`);
});
