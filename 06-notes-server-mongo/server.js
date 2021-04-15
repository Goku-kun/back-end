const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const Note = require("./model");

// environment variables and setup
const PORT = process.env.DEVELOPMENT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Middlewares
app.get("/notes", async function returnNotes(req, res) {
    var notes = await Note.find({}).lean().exec();
    res.status(200).json(notes);
});

app.post("/note", async function createNote(req, res, next) {
    var newNote = req.body;
    try {
        var createdNote = await Note.create(newNote);
    } catch (error) {
        next(new Error("Resource already exists."));
        return;
    }
    res.status(201).json(createdNote);
});

app.use(function errorHandler(error, req, res, next) {
    console.error(`${error.message} is the error.`);
    res.status(404).end("Resource already exists.");
});

// Connection logic
function connect() {
    return mongoose.connect("mongodb://localhost:27017/notesdatabase", {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });
}

connect().then(function connected() {
    app.listen(PORT, function serverOn() {
        console.log(
            `server running on port ${PORT}. Press ctrl + c to stop it.`
        );
    });
});
