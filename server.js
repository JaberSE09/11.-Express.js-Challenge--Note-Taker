const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const path = require("path");
const notes = require("./db/db.json");
const fs = require("fs");
const { createNewNote, validateNotes } = require("./lib/notes");
const uuid = require("uuid");
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.static("public"));
app.use(express.json());

const notesHTML = path.join(__dirname, "public", "notes.html");
const indexHTML = path.join(__dirname, "public", "index.html");

app.get("/notes", (req, res) => res.sendFile(notesHTML));
app.get("*", (req, res) => res.sendFile(indexHTML));
app.get("/api/notes", (req, res) => res.json(notes));
app.post("/api/notes", (req, res) => {
  req.body.id = uuid.v4();

  if (!validateNotes(req.body)) {
    res.status(400).send("The note is not properly formatted.");
  } else {
    let noteEl = createNewNote(req.body, notes);
    res.json(noteEl);
  }
});

app.listen(PORT, () => {
  console.log(`API server now on port http://localhost:${PORT}`);
});
