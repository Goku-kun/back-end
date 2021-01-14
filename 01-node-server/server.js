const http = require('http');
const fs = require('fs');

function requestListener(req, res) {
    fs.readFile('./index.html', 'utf-8', (err, data) => {
        if (err) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write('<h1>There was some error getting the data!<h1>');
            res.end();
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        }
    });

}

const server = http.createServer(requestListener);
server.listen(3000);