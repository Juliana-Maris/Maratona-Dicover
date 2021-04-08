const express = require("express"); //cria biblioteca do servidor
const routes = express.Router() //cria rotas
const ProfileController = require('./controllers/ProfileController')
const JobController = require('./controllers/JobController')

//const basePath = __dirname + "/views" //caminho , foi retirado pq o ejs ja faz isso         

routes.get('/', JobController.index)
routes.get('/job', JobController.create)
routes.post('/job', JobController.save)  
routes.get('/job/:id', JobController.show)
routes.post('/job/:id', JobController.update)
routes.post('/job/delete/:id', JobController.delete)
routes.get('/profile', ProfileController.index)
routes.post('/profile', ProfileController.update)

module.exports = routes;