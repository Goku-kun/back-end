const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const fs = require("fs");

var heroes = {
    deku: {
        name: "Midoriya Izuku",
        heroName: "Deku",
        quirk: "One for All",
    },
    lemillion: {
        name: "Mirio Togata",
        heroName: "Lemillion",
        quirk: "Permeation",
    },
    allmight: {
        name: "Yagi Toshinori",
        heroName: "All Might",
        quirk: "One for All",
    },
    eraserhead: {
        name: "Aizawa Shota",
        heroName: "Eraser Head",
        quirk: "Erasure",
    },
    greatexplosionmurdergoddynamite: {
        name: "Bakugo Katsuki",
        heroName: "greatexplosionmurdergoddynamite",
        quirk: "Explosion",
    },
};

//fs.writeFileSync("./heroes.json", JSON.stringify(heroes));

app.get("/heroes", function indexHandler(req, res) {
    res.set("Content-type", "text/json");
    res.json(heroes);
});

app.get("/heroes/:name", function heroNameHandler(req, res) {
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
    // TODO
    console.log(req.headers);
    console.log(req.query);
    console.log(req.params);
    res.end(JSON.stringify(req.query));
});

app.listen(PORT, function serverOnlineCallback() {
    console.log(
        `The server is online at ${PORT}. Press ctrl+c to stop the server.`
    );
});
