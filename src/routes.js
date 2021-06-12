const express = require('express'); // biblioteca para comandos do servidor
const routes = express.Router(); //vai criar as rotas
const ProfileController = require('./controllers/ProfileController');
const JobController = require('./controllers/JobController');
const DashboardController = require('./controllers/DashboardController');
//const views = __dirname + "/views/";//__dirname - diretorio atual = /src/

// require, response
routes.get('/', DashboardController.index);
routes.get('/job', JobController.create);
routes.post('/job', JobController.save);
routes.get('/job/:id', JobController.show);
routes.post('/job/:id', JobController.update);
routes.post('/job/delete/:id', JobController.delete);
routes.get('/profile', ProfileController.index);
routes.post('/profile', ProfileController.update);



module.exports = routes;