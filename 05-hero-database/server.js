const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const { readFile, writeFile } = require("./readWriteJSON");
const morgan = require("morgan");
const mongoose = require("mongoose");
var { HeroModel } = require("./connection");

app.use(express.json()); // for populating body of POST request
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/heroes", function getHeroes(req, res) {
    let heroes = readFile("./heroes.json");
    res.set("Content-type", "text/json");
    res.end(heroes);
});

app.get("/heroes/:name", function getHero(req, res) {
    let heroes = readFile("./heroes.json");
    heroes = JSON.parse(heroes);
    const heroDetails = heroes[req.params.name];
    if (heroDetails == undefined) {
        res.status(404);
        res.end("No hero found");
        return;
    }
    res.set({
        "Content-type": "text/json",
    });
    res.json(heroDetails);
});

app.put("/heroes/:name", function updateHero(req, res) {
    let heroes = readFile("./heroes.json");
    heroes = JSON.parse(heroes);
    if (Object.keys(heroes).includes(req.params.name)) {
        heroes[req.params.name] = req.body;
        writeFile("./heroes.json", JSON.stringify(heroes));
        res.status(204).end(JSON.stringify(heroes[req.params.name]));
    } else {
        res.status(404).end(`${req.params.name} not found.`);
    }
});

app.delete("/heroes/:name", function removeHero(req, res) {
    let heroes = readFile("./heroes.json");
    heroes = JSON.parse(heroes);
    if (Object.keys(heroes).includes(req.params.name)) {
        delete heroes[req.params.name];
        writeFile("./heroes.json", JSON.stringify(heroes));
        res.status(204).end();
    } else {
        res.status(404).end(`${req.params.name} not found.`);
    }
});

app.post("/heroes", function createHero(req, res) {
    let heroes = readFile("./heroes.json");
    heroes = JSON.parse(heroes);
    let propertyName = req.body.heroName
        .trim()
        .split(" ")
        .join("")
        .toLowerCase();
    if (Object.keys(heroes).includes(propertyName) && false) {
        res.end("hero already exists. Use PUT to modify.");
        return;
    } else {
        var { name, heroName, quirk } = req.body;
        HeroModel.create({
            name: name,
            heroName: heroName,
            quirk: quirk,
        });
        //heroes[propertyName] = req.body;
        //writeFile("./heroes.json", JSON.stringify(heroes));
        res.json(`Hero created: ${JSON.stringify(heroes[propertyName])}`);
    }
    res.end();
});

app.listen(PORT, function serverOnlineCallback() {
    console.log(
        `The server is online at ${PORT}. Press ctrl+c to stop the server.`
    );
});
