const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const fs = require("fs");

app.use(express.json()); // for populating body of POST request
app.use(express.urlencoded({ extended: true }));

app.get("/heroes", function indexHandler(req, res) {
    let heroes = fs.readFileSync("./heroes.json");
    res.set("Content-type", "text/json");
    res.end(heroes);
});

app.get("/heroes/:name", function heroNameHandler(req, res) {
    let heroes = fs.readFileSync("./heroes.json");
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

app.put("/heroes/:name", function putHero(req, res) {
    let heroes = fs.readFileSync("./heroes.json");
    heroes = JSON.parse(heroes);
    if (Object.keys(heroes).includes(req.params.name)) {
        heroes[req.params.name] = req.query;
        fs.writeFileSync("./heroes.json", JSON.stringify(heroes));
        res.status(204).send(req.query);
        res.end();
    } else {
        res.status(404).end(`${req.params.name} not found.`);
    }
});

app.delete("/heroes/:name", function removeHero(req, res) {
    let heroes = fs.readFileSync("./heroes.json");
    heroes = JSON.parse(heroes);
    if (Object.keys(heroes).includes(req.params.name)) {
        delete heroes[req.params.name];
        fs.writeFileSync("./heroes.json", JSON.stringify(heroes));
        res.status(204).end();
    } else {
        res.status(404).end(`${req.params.name} not found.`);
    }
    console.log(heroes);
});

app.post("/heroes", function createHero(req, res) {
    let heroes = fs.readFileSync("./heroes.json");
    heroes = JSON.stringify(heroes);
    let propertyName = req.body.name.trim().split(" ").join("").toLowerCase();
    console.log(propertyName);
    console.log(req.body);
    res.end();
    // TODO
});

app.listen(PORT, function serverOnlineCallback() {
    console.log(
        `The server is online at ${PORT}. Press ctrl+c to stop the server.`
    );
});
