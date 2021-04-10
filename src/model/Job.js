
const Database = require('../db/config');

module.exports = {
  async get(){
    const db = await Database() //inicia conexao com banco de dados
    
    const jobs = await db.all(`SELECT * FROM jobs`); // traz todos os dados do job para BD
    
    await db.close()

    return jobs.map(job => ({
        id: job.id,
        name: job.name, 
        "daily-hours": job.daily_hours,
        "total-hours": job.total_hours,
        created_at: job.created_at
    }))
   },

  update(newJob){
    data = newJob
   },

  async delete(id){
    const db = Database()

    await db.run(`DELETE FROM jobs WHERE id = ${id}`)

    await db.close()
  }, 

  async create(newJob){
    const db = await Database()

    await db.run(`INSERT INTO jobs (
      name,
      daily_hours,
      total_hours,
      created_at
     ) VALUES (
      "${newJob.name}",
      ${newJob["daily-hours"]},
      ${newJob["total-hours"]},
      ${newJob.created_at} 
    )`)

    await db.close()
  }
};