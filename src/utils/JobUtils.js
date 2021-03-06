  
  module.exports = {
    remainingDays(job) {
      // calculo tempo restante
      const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()
    
      const createdDate = new Date(job.created_at)
      const dueDay = createdDate.getDate() + Number(remainingDays)
      const dueDateInMS = createdDate.setDate(dueDay)
    
      const timeDiffInMs = dueDateInMS - Date.now()
      // transformar milisegundos em dias
      const dayInMs = 1000 * 60 * 60 * 24 
      const dayDiff = Math.ceil(timeDiffInMs / dayInMs)  
      // restam x dias  
      return dayDiff
    },
    calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
  }