const express = require('express')

const app = express()

app.get('/', (req, res, next) => {
    res.type('html')
    res.end(`<h1>Hello ${req.query.name}!</h1>
            <h2>Your age is ${typeof Number(req.query.age)} and are you cool? ${typeof Boolean(req.query.cool) }</h2>`)
    console.log(req)
    console.log('break break break')
    console.log(res)
})

app.listen(3000, () => {
    console.log(`Server is listening on port 3000. Press ctrl+c to stop the server.`)
})