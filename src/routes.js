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

const jobs = [];//array armazenará todos os jobs

 
// require, response
routes.get('/', (req, res) => res.render(views + 'index'));
routes.get('/job', (req, res) => res.render(views + 'job'));
routes.post('/job', (req, res) => {    //POST será para receber dados do formulário em EJS
    //req.body={ name: 'sdasdadasd', 'daily-hours': '0.6', 'total-hours': '6' }
    //req.body contém os arquivos contidos no formulário
    
    const lastId = jobs[jobs.length - 1]?.id || 0; //vai criar um novo valor de id
    //Pegará o valor do índice do último id no vetor ou 0, se o vetor estiver vazio

    jobs.push({
        id: lastId + 1, //pegará o valor posterior ao id do último elemento do array
        name: req.body.name,
        "daily-hours": req.body["daily-hours"],
        "total-hours": req.body["total-hours"],
        created_at: Date.now() //data atual
    }); 
    return res.redirect('/') //voltando à página inicial
})
routes.get('/job/edit', (req, res) => res.render(views + 'job-edit'));
routes.get('/profile', (req, res) => res.render(views + 'profile', {profile: profile}));



module.exports = routes;