
const express = require("express"); //cria biblioteca do servidor
const routes = express.Router() //cria rotas

const views = __dirname + "/views/"

const profile = {
name: "Juliana",
avatar: "https://avatars.githubusercontent.com/u/80263434?v=4",
"monthly-budget": 2500,
"days-per-week": 5,
"hours-per-day": 7,
"vacation-per-year": 4
}

//const basePath = __dirname + "/views" //caminho , foi retirado pq o ejs ja faz isso

routes.get('/', (req, res) => res.render(views + "index"))
routes.get('/job', (req, res) => res.render(views + "job"))
routes.get('/job/edit', (req, res) => res.render(views + "job-edit"))
routes.get('/profile', (req, res) => res.render(views + "profile", {profile: profile}))

module.exports = routes;