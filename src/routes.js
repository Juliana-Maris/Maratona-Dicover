
const express = require("express"); //cria biblioteca do servidor
const routes = express.Router() //cria rotas

const views = __dirname + "/views/"

const profile = {
name: "Juliana",
avatar: "https://avatars.githubusercontent.com/u/80263434?v=4",
"monthly-budget": 2500,
"days-per-week": 5,
"hours-per-day": 7,
"vacation-per-year": 4,
"value-hour": 75
}
//const basePath = __dirname + "/views" //caminho , foi retirado pq o ejs ja faz isso

const jobs = [
    { 
        id: 1,
        name: "Pizzaria Guloso",
      "dayly-hours": 2,
      "total-hours": 40,
      created_at: Date.now(),
    },
    {
        id: 2,
        name: "OneTwo Project",
      "dayly-hours": 3,
      "total-hours": 67,
      created_at: Date.now(),
    }
]

function remainingDays(job) {
  // calculo tempo restante
  const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()

  const createdDate = new Date(job.created_at)
  const dueDay = createdDate.getDate() + Number(remainingDays)
  const dueDateInMS = createdDate.setDate(dueDay)

  const timeDiffInMs = dueDateInMS - Date.now()
  // transformar milisegundos em dias
  const dayInMs = 1000 * 60 * 60 * 24 
  const dayDiff = (timeDiffInMs / dayInMs).toFixed()  
  // restam x dias  
  return dayDiff
}

routes.get('/', (req, res) => {

  const updatedJobs = jobs.map((job) => {
    // ajustes no jobs
    const remaining = remainingDays(job)
    const status = remaining <= 0 ? 'done' : 'progress'
    
    return {
      ...job,
      remaining,
      status,
      budget: profile["value-hour"] * job["total-hours"]
    } 
  })
   return res.render(views + "index", { jobs: updatedJobs }) 
  })
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