const express = require('express'); // biblioteca para comandos do servidor
const routes = express.Router(); //vai criar as rotas

const views = __dirname + "/views/";//__dirname - diretorio principal = /src/

// require, response
routes.get('/', (req, res) => res.render(views + 'index.ejs'));
routes.get('/job', (req, res) => res.render(views + 'job.ejs'));
routes.get('/job/edit', (req, res) => res.render(views + 'job-edit.ejs'));
routes.get('/profile', (req, res) => res.render(views + 'profile.ejs'));



module.exports = routes;