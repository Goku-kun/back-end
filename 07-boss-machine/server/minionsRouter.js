const express = require("express");
const db = require("./db");
const workRouter = require("./workRouter");

const minionsRouter = express.Router();

minionsRouter
    .route("/")
    .get(function (req, res) {
        const minions = db.getAllFromDatabase("minions");
        if (minions === null) {
            res.status(404).send();
        } else {
            res.send(minions);
        }
    })
    .post(function (req, res) {
        const newMinion = req.body;
        console.log(newMinion);
        const returnedMinion = db.addToDatabase("minions", newMinion);
        if (returnedMinion === null) {
            res.status(400).send();
        } else {
            res.status(201).send(returnedMinion);
        }
    });

minionsRouter.param("minionId", function paramHandler(req, res, next, minionId) {
    if (Number(minionId) && typeof minionId == "string") {
        req.minionId = minionId;
        next();
    } else {
        res.status(404).send();
    }
});

minionsRouter
    .route("/:minionId")
    .get(function (req, res) {
        var id = req.minionId;
        if (Number(id) == NaN) {
            res.status(404).send("Not Found");
            return;
        }
        var minion = db.getFromDatabaseById("minions", id);
        if (minion === undefined) {
            res.status(404).send();
        } else {
            res.send(minion);
        }
    })
    .put(function (req, res) {
        var updateMinion = req.body;
        updateMinion.id = req.minionId;
        if (updateMinion.id && updateMinion.name && updateMinion.title && updateMinion.salary) {
            var updatedMinion = db.updateInstanceInDatabase("minions", updateMinion);
            if (updatedMinion == undefined) {
                res.status(404).send();
            } else {
                res.status(202).send(updatedMinion);
            }
        } else {
            res.status(404).send();
        }
    })
    .delete(function (req, res) {
        var id = req.minionId;
        var result = db.deleteFromDatabasebyId("minions", id);
        if (result) {
            res.status(204).send();
        } else {
            res.status(404).send();
        }
    });

minionsRouter.use("/:minionId/work/", workRouter);

module.exports = minionsRouter;
