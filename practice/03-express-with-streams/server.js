const express = require('express');
const fs = require('fs');
const Transform = require('stream').Transform;
const Writable = require('stream').Writable;

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', function indexPage(req, res) {
    res.type('text');
    res.send('Ore wa Ichi ni naru!').status(200);
    res.end();
})
app.get('/lorem', function(req, res) {
    res.type('text');
    let outStream;
    const inStream = fs.createReadStream('./lorem.txt');
    const buffer = new Transform({
        transform(chunk, enc, callback) {
            this.push(chunk);
            setTimeout(callback, 1000);
        }
    });
    // console.log(buffer.writableHighWaterMark);
    outStream = inStream;
    outStream = outStream.pipe(buffer);
    outStream.pipe(res);
    res.on('finish', function printDone() {
        console.log("Sent the file!");
    });
})

app.listen(PORT, function() {
    console.log(`Server is listening on port ${PORT}. Press ctrl+c to stop the server.`)
})