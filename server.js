// NPM Packages
const express = require("express");
const fs = require("fs/promises");
const path = require("path");

// Add your port
const PORT = process.env.PORT || 3001;

// Start your express app
const app = express();
// Create your middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// HTML Routes
// Route for index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// Route for notes.html
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

//API Routes
// Get Route
app.get("/api/notes", async(req, res) => {
  // Logic to retrieve existing notes
  // ...

  // Example response with dummy notes
  const existingNotes = [
    { id: 1, title: "Note 1", text: "This is note 1" },
    { id: 2, title: "Note 2", text: "This is note 2" },
  ];

  const notesData = await fs.readFile("./db/db.json");
  const notes = JSON.parse (notesData)
  console.log (notes)
  //console.log(notesData);

  // Send the existing notes as the response
  res.json(notes);


});
// Post Route
app.post("/api/notes", (req, res) => {
  // Retrieve the new note data from the request body
  const newNote = req.body;

  // Logic to save the new note
  // ...

  // Example response with success message
  res.json({ message: "Note saved successfully" });
});

// Delete Route
app.delete("/api/notes/:id", (req, res) => {
  // Retrieve the note ID from the request parameters
  const noteId = req.params.id;

  // Logic to delete the note with the specified ID
  // ...

  // Example response with success message
  res.json({ message: "Note deleted successfully" });
});

// App.listen to start the server
app.listen(PORT, () => console.log(`listening on port: ${PORT}`));
