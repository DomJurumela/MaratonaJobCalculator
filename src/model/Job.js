let data = [
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
];

module.exports = {
    get(){
        return data;
    },
    update(newJob){
        data = newJob;
        console.log(data);
    },
    delete(id){
        data = data.filter((job) => Number(job.id) !== Number(id)); //vai tirar do filtro todos os valores iguais ao jobId
    }
}