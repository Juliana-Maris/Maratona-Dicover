
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

const jobs = [
    { 
        id: 1,
        name: "Pizzaria Guloso",
      "dayly-hours": 2,
      "total-hours": 40,
      created_at: Date.now()

    },
    {
        id: 2,
        name: "OneTwo Project",
      "dayly-hours": 3,
      "total-hours": 67,
      created_at: Date.now()

    }
]
routes.get('/', (req, res) => res.render(views + "index", { jobs }))
routes.get('/job', (req, res) => res.render(views + "job"))
routes.post('/job', (req, res) => {
    // req.body { name: 'imobiliaria', 'daily-hours': '6', 'total-hours': '40' }
    const lastId = jobs[jobs.length - 1]?.id || 1;
  
  jobs.push({
      id: lastId + 1,
      name: req.body.name,
      "dayly-hours": req.body["daily-hours"],
      "total-hours": req.body["total-hours"],
      created_at: Date.now() // atribuindo data de hoje
  })
  return res.redirect('/')
})
routes.get('/job/edit', (req, res) => res.render(views + "job-edit"))
routes.get('/profile', (req, res) => res.render(views + "profile", {profile: profile}))

module.exports = routes;