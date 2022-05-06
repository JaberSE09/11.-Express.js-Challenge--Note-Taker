const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const path = require("path");
const notes = require("./db/db.json");
const fs = require("fs");
app.use(express.json());
app.get("/api/notes", (req, res) => res.json(notes));
app.post("/api/notes", (req, res) =>{

} );

app.listen(PORT, () => {
  console.log(`API server now on port http://localhost${PORT}`);
});
