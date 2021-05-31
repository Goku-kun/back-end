const express = require("express");
const db = require("./db");

const workRouter = express.Router({ mergeParams: true });

const work = [
    { id: 1, type: "lab", detail: "testing" },
    { id: 2, type: "art", detail: "finishing touches" },
];

workRouter.route("/").get(function (req, res) {
    //var work = db.getAllFromDatabase("minions");
    //console.log(work);

    if (work) {
        res.send(work);
    } else {
        res.status(404).send();
    }
});

module.exports = workRouter;
