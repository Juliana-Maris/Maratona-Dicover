
const express = require("express")
const server = express()
const routes = require("./routes")


// configurar template engine
server.set('view engine', 'ejs')

//habiliatr arquivos statics
server.use(express.static("public"))
// usar o req.body - habilitar
server.use(express.urlencoded({ extended: true}))

//routes
server.use(routes)

server.listen(3000, () => console.log('servidor rodando'))