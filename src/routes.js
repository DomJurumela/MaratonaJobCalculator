const express = require('express'); // biblioteca para comandos do servidor
const routes = express.Router(); //vai criar as rotas

const views = __dirname + "/views/";//__dirname - diretorio atual = /src/

const profile = {
    name: "João Jurema",
    avatar: "https://avatars.githubusercontent.com/u/11191464?v=4",
    "monthly-budget": 3000, //variáveis com traço requerem aspas
    "hours-per-day": 8,
    "days-per-week": 5,
    "vacation-per-year": 8

}

// require, response
routes.get('/', (req, res) => res.render(views + 'index'));
routes.get('/job', (req, res) => res.render(views + 'job'));
routes.get('/job/edit', (req, res) => res.render(views + 'job-edit'));
routes.get('/profile', (req, res) => res.render(views + 'profile', {profile: profile}));



module.exports = routes;