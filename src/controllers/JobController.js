const Job = require('../model/Job')

  module.exports = {
    index(req, res) {
        const updatedJobs = Job.data.map((job) => {
          // ajuste de job
          const remaining = Job.services.remainingDays(job)
          const status = remaining <= 0 ? 'done' : 'progress'
          
          return {
            ...job,
            remaining,
            status,
            budget: Job.services.calculateBudget(job, Profile.data["value-hour"])
          } 
        })    
         return res.render("index", { jobs: updatedJobs }) //estes jobs não trocar
    },
    create(req, res) {
      return res.render("job")
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
      return res.render("job-edit", { job })
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
  }