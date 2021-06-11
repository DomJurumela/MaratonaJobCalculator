const express = require('express'); // biblioteca para comandos do servidor
const routes = express.Router(); //vai criar as rotas

const views = __dirname + "/views/";//__dirname - diretorio atual = /src/

const Profile = {
    data: {
        name: "João Jurema",
        avatar: "https://avatars.githubusercontent.com/u/11191464?v=4",
        "monthly-budget": 3000, //variáveis com traço requerem aspas
        "hours-per-day": 8,
        "days-per-week": 5,
        "vacation-per-year": 8,
        "value-hour": 75
    },

    controllers: {
        index(req, res){
            return res.render(views + "profile",{profile: Profile.data})
        },

        update(req, res){
            //req.body para pegar os dados
            const data = req.body;
            
            //definir quantas semanas tem num ano: 52 
            const weeksPerYear = 52;
            
            //remover as semanas de férias do ano, para pegar quantas semanas em um mês
            const weeksPerMonth = (weeksPerYear - data["vacation-per-year"] ) / 12;
            
            //quantas horas por semana estou trabalhando
            const weekTotalHours = (data["hours-per-day"] * data["days-per-week"]);

            //total de horas trabalhadas no mês
            const monthlyTotalHours = weekTotalHours * weeksPerMonth;
        
            //qual será o valor da minha hora?
            
            const valueHour = data["monthly-budget"] / monthlyTotalHours;
        
            Profile.data = {
                ...Profile.data,
                ...req.body,
                "value-hour" : valueHour
            }
        }
    }
}


const Job = {
    data: [
        {
            name: "Pizzaria Guloso",
            id: 1,
            "daily-hours": 2,
            "total-hours": 20,
            created_at: Date.now(),
        },
        {
            name: "OneTwo Project",
            id: 2,
            "daily-hours": 3,
            "total-hours": 47,
            created_at: Date.now(),            
        }
    ],//array armazenará todos os jobs
    controllers: {
        index(req, res) {

            const updatedJobs = Job.data.map((job) => {
            //ajustes no job
            const remaining = Job.services.remainingDays(job);
            const status = remaining <= 0 ? 'done' : 'progress'; //checa se o prazo acabou

            return {
                ...job,
                remaining,
                status,
                budget: Job.services.calculateBudget(job, Profile.data["value-hour"])
            }
        })

        return res.render(views + 'index', { jobs: updatedJobs })
        },
        save(req, res) {    //create será para receber dados do formulário em EJS
            //req.body={ name: 'sdasdadasd', 'daily-hours': '0.6', 'total-hours': '6' }
            //req.body contém os arquivos contidos no formulário
        
            const lastId = Job.data[Job.data.length - 1]?.id || 0; //vai criar um novo valor de id
            //Pegará o valor do índice do último id no vetor ou 0, se o vetor estiver vazio
        
            Job.data.push({
                id: lastId + 1, //pegará o valor posterior ao id do último elemento do array
                name: req.body.name,
                "daily-hours": req.body["daily-hours"],
                "total-hours": req.body["total-hours"],
                created_at: Date.now() //data atual
            });
            return res.redirect('/') //voltando à página inicial
        },
        create (req, res) {
            return res.render(views + 'job');
        },
        show (req,res) {

            const jobId = req.params.id; //o nome do parâmetro tem que ser o mesmo que na função routes.get

            const job = Job.data.find(job => Number(job.id) === Number(jobId)); //essa função vai buscar um job com o mesmo id que jobId

            if (!job) { //id não encontrado
                return res.send('Job not found');
            }

            job.budget = Job.services.calculateBudget(job, Profile.data["value-hour"]);


            return res.render(views + 'job-edit', { job });
        
        
        },

        update(req, res) {
            const jobId = req.params.id; //o nome do parâmetro tem que ser o mesmo que na função routes.get

            const job = Job.data.find(job => Number(job.id) === Number(jobId)); //essa função vai buscar um job com o mesmo id que jobId

            if (!job) { //id não encontrado
                return res.send('Job not found');
            }

            const updatedJob = {
                ...job,
                name: req.body.name,
                "total-hours": req.body["total-hours"],
                "daily-hours": req.body["daily-hours"]
            }

            Job.data = Job.data.map(job => {
                if(Number(job.id) === Number(jobId)){
                    job = updatedJob;
                }

                return job;
            })

            res.redirect('/job/' + jobId);
        },

        delete(req, res){
            const jobId = req.params.id;

            Job.data = Job.data.filter(job => Number(job.id) !== Number(jobId)); //vai tirar do filtro todos os valores iguais ao jobId

            return res.redirect('/');
        }
    },
    services: {
        remainingDays(job) {
            //calculo de tempo restante
            const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed();
        
            const createdDate = new Date(job.created_at);
            const dueDay = createdDate.getDate() + Number(remainingDays); //dia da entrega
            const dueDate = createdDate.setDate(dueDay); //data de vencimento
        
            const timeDiffInMs = dueDate - Date.now();
            //transformar ms em dias
            const dayInMs = 1000 * 60 * 60 * 24;
            const dayDiff = Math.floor(timeDiffInMs / dayInMs); //arredondado para baixo
        
            //restam x dias
            return dayDiff;
        },
        calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
        
    }
}





// require, response
routes.get('/', Job.controllers.index);
routes.get('/job', Job.controllers.create);
routes.post('/job', Job.controllers.save);
routes.get('/job/:id', Job.controllers.show);
routes.post('/job/:id', Job.controllers.update);
routes.post('/job/delete/:id', Job.controllers.delete);
routes.get('/profile', Profile.controllers.index);
routes.post('/profile', Profile.controllers.update);



module.exports = routes;