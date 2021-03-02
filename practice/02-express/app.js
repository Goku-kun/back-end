const express = require("express");
const app = express();
const fs = require("fs");

const PORT = process.env.PORT || 5000;

app.get("/index", function indexCallback(req, res) {
    var readStream = fs.readFileSync("./index.html");
    res.type("html");
    res.status(200);
    res.send(readStream);
    res.end();
});
app.listen(PORT, function status() {
    console.log(`The server is active on port: ${PORT}.`);
});

//const express = require("express");

//const app = express();

//app.get("/ab?", (req, res, next) => {
//res.type("html");
//res.end(`<h1>Hello ${req.query.name}!</h1>
//<h2>Your age is ${Number(
//req.query.age
//)} and are you cool? ${Boolean(req.query.cool)}</h2>`);
//});

//app.listen(3000, () => {
//console.log(
//`Server is listening on port 3000. Press ctrl+c to stop the server.`
//);
//});

// while true; do node app.js; done
//
