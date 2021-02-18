const http = require('http');
const port = process.env.PORT || 3000;

function listenerCallback(request, response) {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    // response.send('Hello, World!');
    response.end('<h1>Hello, World!</h1>');
}
const server = http.createServer(listenerCallback)
server.listen(port, () => {
    console.log(`Server is running on ${port}.\n 
    Press ctrl+c to terminate.`);
})