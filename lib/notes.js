const fs = require('fs');
const path = require('path');

function createNewNote(body, notesArray) {
  
    const notesEl = body;
    notesArray.push(notesEl);
    fs.writeFileSync(
      path.join(__dirname, "..", "db" , "db.json"),
      JSON.stringify(notesArray, null , 3)
    );
    console.log(notesArray);
    return notesEl;
  }

  function validateNotes(notes) {
    if (!notes.title) {
      return false;
    }
    if (!notes.text) {
      return false;
    }
    return true;
  }
  module.exports = {createNewNote, validateNotes}