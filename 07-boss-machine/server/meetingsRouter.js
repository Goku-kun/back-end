const express = require("express");
const db = require("./db");

const meetingsRouter = express.Router();

meetingsRouter
    .route("/")
    .get(function (req, res) {
        const meetings = db.getAllFromDatabase("meetings");
        res.send(meetings);
    })
    .post(function (req, res) {
        const meeting = db.createMeeting();
        db.addToDatabase("meetings", meeting);
        res.status(201).send(meeting);
    })
    .delete(function (req, res) {
        db.deleteAllFromDatabase("meetings");
        res.status(204).end();
    });

module.exports = meetingsRouter;
