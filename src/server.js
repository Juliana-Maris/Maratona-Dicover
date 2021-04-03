
const express = require("express")
const server = express()

server.get('/', (request, response) => {
    console.log('entrei no index')
    return response.send('oi')
})

server.listen(3000, () => console.log('servidor rodando'))