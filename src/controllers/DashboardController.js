const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
    index(req, res) {
        const jobs = Job.get();
        const profile = Profile.get();
        let statusCount = {
            progress: 0,
            done: 0,
            total: jobs.length //isso dá o total pq jobs é um array
        }
        // total de hs por dia de cada job progress
        let jobTotalHours = 0

           // map olha cada item do job
        const updatedJobs = jobs.map((job) => {
              // ajuste de job
            const remaining = JobUtils.remainingDays(job)
            const status = remaining <= 0 ? 'done' : 'progress'  
            
            // somando quantidade de status
            statusCount[status] += 1;

            // total de hs por dia de cada job progress
            jobTotalHours = status == 'progress' ? jobTotalHours + Number(job['daily-hours']) : jobTotalHours           
            
            return {
                ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile["value-hour"])
              } 
            })    
             // qtd de hs que quero trabalhar por dia menos qdt de hs de cada job em progress
            const freeHours = profile["hours-per-day"] - jobTotalHours;

             return res.render("index", { jobs: updatedJobs, profile: profile, statusCount: statusCount, freeHours: freeHours }) 
             //(estes jobs não trocar) linha acima 1 é objeto e o 2 é a var criada
         }
}