const express = require("express");
const db = require("./db");
const millionDollarIdea = require("./checkMillionDollarIdea");

const ideasRouter = express.Router();

ideasRouter
    .route("/")
    .get(function (req, res) {
        const ideas = db.getAllFromDatabase("ideas");
        res.send(ideas);
    })
    .post(millionDollarIdea, function (req, res) {
        const newIdea = req.body;
        var returnIdea = db.addToDatabase("ideas", newIdea);
        res.status(201).send(returnIdea);
    });

ideasRouter.param("ideaId", function (req, res, next, id) {
    if (Number(id)) {
        req.id = id;
        next();
    } else {
        res.status(404).send();
        return;
    }
});

ideasRouter
    .route("/:ideaId")
    .get(function (req, res) {
        const idea = db.getFromDatabaseById("ideas", req.id);
        if (idea == null) {
            res.status(404).end();
        } else {
            res.send(idea);
        }
    })
    .put(function (req, res) {
        const updatedIdea = req.body;
        updatedIdea.id = req.id;
        const idea = db.updateInstanceInDatabase("ideas", updatedIdea);

        if (idea == null) {
            console.log(idea);
            res.status(404).end();
        } else {
            res.send(idea);
        }
    })
    .delete(function (req, res) {
        var result = db.deleteFromDatabasebyId("ideas", req.id);
        if (result) {
            res.status(204).end();
        } else {
            res.status(404).end();
        }
    });

module.exports = ideasRouter;
