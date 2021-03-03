"use strict";

const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/contacts", function getContacts(req, res) {
    var contactsJSON = fs.readFileSync("./contacts.json");
    var contacts = JSON.parse(contactsJSON);
    res.status(200);
    res.json(contacts);
    res.end();
});

app.get("/contacts/:id", function sendContact(req, res) {
    var contactsJSON = fs.readFileSync("./contacts.json");
    var contacts = JSON.parse(contactsJSON);
    var foundContact = contacts.find(function findContact(record) {
        return record.id == req.params.id;
    });
    if (foundContact) {
        res.status(200);
        res.json(foundContact);
    } else {
        res.status(404);
        res.end("Contact not found!");
    }
});

app.put("/contacts/:id", function updateContacts(req, res) {
    if (
        req.query.hasOwnProperty("id") &&
        req.query.hasOwnProperty("name") &&
        req.query.hasOwnProperty("phone")
    ) {
        var contactsJSON = fs.readFileSync("./contacts.json");
        var contacts = JSON.parse(contactsJSON);
        var contactIndex = contacts.findIndex(function contactIndexFinder(
            record
        ) {
            return Number(req.query.id) == record.id;
        });
        if (contactIndex == undefined) {
            res.status(404);
            res.end();
        }
        contacts[contactIndex] = req.query;
        res.status(201);
        fs.writeFileSync("contacts.json", JSON.stringify(contacts));
        res.send(JSON.stringify(req.query));
        res.end();
    } else {
        res.status(400);
        res.end("Incorrect details mentioned in the request");
        console.log(req.query);
    }
});

app.post("/contacts", function addContact(req, res) {
    if (req.query.hasOwnProperty("name") && req.query.hasOwnProperty("phone")) {
        var contactsJSON = fs.readFileSync("./contacts.json");
        var contacts = JSON.parse(contactsJSON);
        var id = contacts.length;
        req.query.id = id;
        contacts.push(req.query);
        res.status(200);
        fs.writeFileSync("contacts.json", JSON.stringify(contacts));
        res.send(JSON.stringify(req.query));
        res.end();
    } else {
        res.status(400);
        res.end("Incorrect details mentioned in the request");
        console.log(req.query);
    }
});

app.listen(PORT, function serverInitCb() {
    console.log(`The server is running on port ${PORT}`);
});
