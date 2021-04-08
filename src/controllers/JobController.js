const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

  module.exports = {
    index(req, res) {
    const jobs = Job.get();
    const profile = Profile.get();
        const updatedJobs = jobs.map((job) => {
          // ajuste de job
          const remaining = JobUtils.remainingDays(job)
          const status = remaining <= 0 ? 'done' : 'progress'
          
          return {
            ...job,
            remaining,
            status,
            budget: JobUtils.calculateBudget(job, profile["value-hour"])
          } 
        })    
         return res.render("index", { jobs: updatedJobs }) //estes jobs não trocar
     },
     create(req, res) {
      return res.render("job")
     },
     save(req, res) {
      const jobs = Job.get();
      // req.body { name: 'imobiliaria', 'daily-hours': '6', 'total-hours': '40' }
      const lastId = jobs[jobs.length - 1]?.id || 0;
  
     jobs.push({
      id: lastId + 1,
      name: req.body.name,
      "daily-hours": req.body["daily-hours"],
      "total-hours": req.body["total-hours"],
      created_at: Date.now() // atribuindo data de hoje
     })
     return res.redirect('/')
     },
     show(req, res) {
      const jobId = req.params.id
      const jobs = Job.get();

      const job = jobs.find(job => Number(job.id) === Number(jobId))
      if (!job) {
        return res.send('Job não encontrado!')
      }
      const profile = Profile.get();

      job.budget = JobUtils.calculateBudget(job, profile["value-hour"])
      return res.render("job-edit", { job })
     },
     update(req, res) {
      const jobId = req.params.id
      const jobs = Job.get();

      const job = jobs.find(job => Number(job.id) === Number(jobId))
      if (!job) {
        return res.send('Job não encontrado!')
      }
      // para sobrescrever cada novo dado inserido
      const updatedJob = {
        ...job,
        name: req.body.name,
        "total-hours": req.body["total-hours"],
        "daily-hours": req.body["daily-hours"],
      }
      //atualizar seu update no array de jobs
       const newJobs = jobs.map(job => {
        if(Number(job.id) === Number(jobId)) {
          job = updatedJob
        }
        return job
      })
      Job.update(newJobs)

       return res.redirect('/')
     },

     delete(req, res) {
      const jobId = req.params.id

      Job.delete(jobId)

      return res.redirect('/')
    }
  }