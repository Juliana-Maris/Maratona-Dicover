
const express = require("express"); //cria biblioteca do servidor
const routes = express.Router() //cria rotas

const views = __dirname + "/views/"

const Profile = {
 data: {
  name: "Juliana",
  avatar: "https://avatars.githubusercontent.com/u/80263434?v=4",
  "monthly-budget": 4000,
  "days-per-week": 5,
  "hours-per-day": 7,
  "vacation-per-year": 4,
  "value-hour": 75
 },
 controllers: {
   index(req, res) {
    return res.render(views + "profile", { profile: Profile.data })
   },
   update(req, res) {
     // req. body para pegar os dados
     const data = req.body
     // definir quantas semanas tem num ano
     const weeksPerYear = 52
     // remover as semanas de ferias do ano para pegar quantas semanas tem em 1 mês
     const weeksPerMonth =  (weeksPerYear - data["vacation-per-year"]) / 12
      // total de horas trabalhado na semana
     const weekTotalHours = data["hours-per-day"] * data["days-per-week"]
     // horas trabalhadas no mes
     const monthlyTotalHours = weekTotalHours * weeksPerMonth
     // qual valor da hora?
     const valueHour = data["monthly-budget"] / monthlyTotalHours

     Profile.data = {
       ...Profile.data,
       ...req.body, 
       "value-hour": valueHour
     }
     return res.redirect('/profile')
   }
 }
}
//const basePath = __dirname + "/views" //caminho , foi retirado pq o ejs ja faz isso

const Job = {
  data: [
    { 
        id: 1,
        name: "Pizzaria Guloso",
      "dayly-hours": 2,
      "total-hours": 10,
      created_at: Date.now()
    },
    {
        id: 2,
        name: "OneTwo Project",
      "dayly-hours": 3,
      "total-hours": 47,
      created_at: Date.now() 
    }
],
  controllers: {
    index(req, res) {
        const updatedJobs = Job.data.map((job) => {
          const remaining = Job.services.remainingDays(job)
          const status = remaining <= 0 ? 'done' : 'progress'
          
          return {
            ...job,
            remaining,
            status,
            budget: Job.services.calculateBudget(job, Profile.data["value-hour"])
          } 
        })    
         return res.render(views + "index", { jobs: updatedJobs }) //estes jobs não trocar
    },

    create(req, res) {
      return res.render(views + "job")
    },

    save(req, res) {
      // req.body { name: 'imobiliaria', 'daily-hours': '6', 'total-hours': '40' }
  const lastId = Job.data[Job.data.length - 1]?.id || 0;
  Job.data.push({
      id: lastId + 1,
      name: req.body.name,
      "dayly-hours": req.body["daily-hours"],
      "total-hours": req.body["total-hours"],
      created_at: Date.now() // atribuindo data de hoje
  })
  return res.redirect('/')
    },

    show(req, res) {
      const jobId = req.params.id
      const job = Job.data.find(job => Number(job.id) === Number(jobId))
      if (!job) {
        return res.send('Job não encontrado!')
      }
      job.budget = Job.services.calculateBudget(job, Profile.data["value-hour"])

      return res.render(views + "job-edit", { job })
    },

    update(req, res) {
      const jobId = req.params.id
      const job = Job.data.find(job => Number(job.id) === Number(jobId))
      if (!job) {
        return res.send('Job não encontrado!')
      }
      // para sobrescrever cada novo dado inserido
      const updatedJob = {
        ...job,
        name: req.body.name,
        "total-hours": req.body["total-hours"],
        "dayly-hours": req.body["daily-hours"],
      }
      //atualizar seu update no array de jobs
      Job.data = Job.data.map(job => {
        if(Number(job.id) === Number(job.id)) {
          job = updatedJob
        }
        return job
      })
      res.redirect('/job/' + jobId)
    },
    delete(req, res) {
      const jobId = req.params.id
      Job.data = Job.data.filter(job => Number(job.id) !== Number(job.id))
      // segunda parte apos o = acima vai ser um novo array
      return res.redirect('/')
    }
  },
  services: {
    remainingDays(job) {
      // calculo tempo restante
      const remainingDays = (job["total-hours"] / job["dayly-hours"]).toFixed()
    
      const createdDate = new Date(job.created_at)
      const dueDay = createdDate.getDate() + Number(remainingDays)
      const dueDateInMS = createdDate.setDate(dueDay)
    
      const timeDiffInMs = dueDateInMS - Date.now()
      // transformar milisegundos em dias
      const dayInMs = 1000 * 60 * 60 * 24 
      const dayDiff = Math.floor(timeDiffInMs / dayInMs)  
      // restam x dias  
      return dayDiff
    },
    calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
  }
}
          
routes.get('/', Job.controllers.index)
routes.get('/job', Job.controllers.create)
routes.post('/job', Job.controllers.save)  
routes.get('/job/:id', Job.controllers.show)
routes.post('/job/:id', Job.controllers.update)
routes.post('/job/delete/:id', Job.controllers.delete)
routes.get('/profile', Profile.controllers.index)
routes.post('/profile', Profile.controllers.update)

module.exports = routes;