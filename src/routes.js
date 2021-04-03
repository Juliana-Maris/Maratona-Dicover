
const express = require("express");
const routes = express.Router()

const basePath = __dirname + "/views"

routes.get('/', (req, response) => response.sendFile(basePath + "/index.html"))
routes.get('/job', (req, response) => response.sendFile(basePath + "/job.html"))
routes.get('/job/edit', (req, response) => response.sendFile(basePath + "/job-edit.html"))
routes.get('/profile', (req, response) => response.sendFile(basePath + "/profile.html"))

module.exports = routes;