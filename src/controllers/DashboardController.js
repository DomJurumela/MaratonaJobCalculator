const Job = require('../model/Job');
const JobUtils = require('../utils/JobUtils');
const Profile = require('../model/Profile');

module.exports = {
    index(req, res) {
        const jobs = Job.get();
        const profile = Profile.get();

        let statusCount = {
            progress: 0,
            done: 0,
            total: jobs.length
        }

        // total de horas por dia de todos os jobs em progresso
        let jobTotalHours = 0;

        const updatedJobs = jobs.map((job) => {
            //ajustes no job
            const remaining = JobUtils.remainingDays(job);
            const status = remaining <= 0 ? "done" : "progress"; //checa se o prazo acabou

            //status = done
            //statusCount[done] += 1

            //status = progress
            //statusCount[progress] += 1

            //Somando a quantidade de status
            statusCount[status] += 1;

            jobTotalHours = (status == 'progress' ? jobTotalHours + Number(job['daily-hours']) : jobTotalHours );

            //if(status == 'progress'){
            //    jobTotalHours += Number(job['daily-hours']);
            //}

            return {
                ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile["value-hour"]),
            };
        });

        //qtd de horas que quero trabalhar (Profile) - qtd de horas/dia de cada job em progresso:
        const freeHours = profile["hours-per-day"] - jobTotalHours;
        return res.render("index", { jobs: updatedJobs, profile: profile, statusCount: statusCount, freeHours: freeHours});
    }
}