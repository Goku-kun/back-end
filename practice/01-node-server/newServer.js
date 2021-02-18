const http = require('http')

function listenerCallback(req, res) {
    res.end('Hello, World!')
}

const server = http.createServer(listenerCallback)
server.listen(3000, () => { console.log('Listening on port 3000. Press ctrl+c to stop server') })