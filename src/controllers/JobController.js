const Job = require("../model/Job");
const JobUtils = require('../utils/JobUtils');
const Profile = require('../model/Profile');

module.exports = {
  async save(req, res) {
    await Job.create({
      name: req.body.name,
      "daily-hours": req.body["daily-hours"],
      "total-hours": req.body["total-hours"],
      created_at: Date.now(), //data atual
    });




    return res.redirect("/"); //voltando à página inicial
  },
  create(req, res) {
    return res.render("job");
  },
  async show(req, res) {
    const profile = await Profile.get();
    const jobId = req.params.id; //o nome do parâmetro tem que ser o mesmo que na função routes.get
    const jobs = await Job.get();

    console.log(jobs);

    const job = jobs.find((job) => Number(job.id) === Number(jobId)); //essa função vai buscar um job com o mesmo id que jobId

    if (!job) {
      //id não encontrado
      return res.send("Job not found");
    }

    job.budget = JobUtils.calculateBudget(job, profile["value-hour"]);

   

    return res.render("job-edit", { job });
  },

  async update(req, res) {
    const profile = await Profile.get();
    const jobId = req.params.id; //o nome do parâmetro tem que ser o mesmo que na função routes.get
    const jobs = await Job.get();
    const job = jobs.find((job) => Number(job.id) === Number(jobId)); //essa função vai buscar um job com o mesmo id que jobId

    if (!job) {
      //id não encontrado
      return res.send("Job not found");
    }

    const updatedJob = {
      ...job,
      name: req.body.name,
      "total-hours": req.body["total-hours"],
      "daily-hours": req.body["daily-hours"],
      budget : JobUtils.calculateBudget(job, profile["value-hour"])
    };

    const newJobs = jobs.map((job) => {
      if (Number(job.id) === Number(jobId)) {
        job = updatedJob;
      }

      return job;
    });

    Job.update(newJobs);

    res.redirect("/");
  },

  delete(req, res) {
    const jobId = req.params.id;
    Job.delete(jobId);
    return res.redirect("/");
  },
};
