"use strict";
const express = require("express");
const fs = require("fs");
const Transform = require("stream").Transform;
const Writable = require("stream").Writable;
const zlib = require("zlib");

const app = express();

const PORT = process.env.PORT || 3000;

const loremRouter = express.Router();

app.use("/lorem", loremRouter);

loremRouter.use(function (req, res, next) {
    const inStream = fs.createReadStream("./lorem.txt");
    req.inStream = inStream;
    next();
});

loremRouter.get("/", function (req, res) {
    res.type("text");
    const inStream = req.inStream;
    inStream.pipe(res);
});

loremRouter.get("/upper", function (req, res) {
    res.type("text");
    let outStream;
    const inStream = req.inStream;
    const buffer = new Transform({
        transform(chunk, enc, callback) {
            chunk = chunk.toString().toUpperCase();
            this.push(chunk);
            callback();
        },
    });
    outStream = inStream;
    outStream = outStream.pipe(buffer);
    outStream.pipe(res);
    res.on("finish", function printDone() {
        console.log("Sent the file!");
    });
});

loremRouter.get("/gzip", function (req, res) {
    res.type("application/gzip");
    var inStream = req.inStream;
    inStream = inStream.pipe(zlib.createGzip());
    inStream.pipe(res);
    res.on("finish", function () {
        console.log("Sent the file.");
    });
});

app.get("/", function indexPage(req, res) {
    res.type("text");
    res.send("Ore wa Ichi ni naru!").status(200);
    res.end();
});

app.get("/gzip", function (req, res) {
    res.type("application/gzip");
    let outStream;
    var inStream = fs.createReadStream("./lorem.txt");
    outStream = inStream.pipe(zlib.createGzip());
    outStream.pipe(res);
    res.on("finish", function () {
        console.log("Sent the file.");
    });
});

app.listen(PORT, function () {
    console.log(`Server is listening on port ${PORT}. Press ctrl+c to stop the server.`);
});
