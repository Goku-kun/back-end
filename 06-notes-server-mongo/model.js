const mongoose = require("mongoose");

var NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    body: {
        type: String,
        minlength: 10,
    },
});

module.exports = mongoose.model("note", NoteSchema);
