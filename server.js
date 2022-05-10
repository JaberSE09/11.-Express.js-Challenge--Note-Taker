const express = require("express");
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");
let app = express();
let PORT = process.env.PORT || 3001;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
let notes = require("./db/db.json");
const indexHTML = path.join(__dirname, "public", "index.html");
const notesHTML = path.join(__dirname, "public", "notes.html");
const { createNewNote, validateNotes } = require("./lib/notes");

app.get("/notes", (req, res) => {
  res.sendFile(notesHTML);
});

app.get("/api/notes", (req, res) => {
  fs.readFile("db/db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    res.json(notes);
  });
});

app.listen(PORT, () => {
  console.log(`Start the app on http://localhost:${PORT}`);
});

app.post("/api/notes", (req, res) => {
  req.body.id = uuid.v4();

  if (!validateNotes(req.body)) {
    res.status(400).send("The note is not properly formatted.");
  } else {
    let noteEl = createNewNote(req.body, notes);
    res.json(noteEl);
  }
});

app.delete("/api/notes/:id", (req, res) => {
  notes.splice(req.params.id, 1);
  fs.writeFileSync(
    path.join(__dirname, "db", "db.json"),
    JSON.stringify(notes, null, 3)
  );
  return res.json(notes);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(indexHTML));
});
