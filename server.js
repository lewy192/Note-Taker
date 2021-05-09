const express = require("express");
const fs = require("fs");
const app = express();

// db import
const db = require("./db/db.json");

const PORT = 8080;

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
    res.json(db);
});

app.post("/api/notes", (req, res) => {
    let notesJson = fs.readFileSync("./db/db.json");
    let notes = JSON.parse(notesJson);
    notes.push(req.body);
    notesJson = JSON.stringify(notes);

    fs.writeFileSync("./db/db.json", notesJson);
});

app.listen(PORT, () => {
    console.log(`listening on port" ${PORT}`);
});
