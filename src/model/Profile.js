
let data = {
    name: "João Jurema",
    avatar: "https://avatars.githubusercontent.com/u/11191464?v=4",
    "monthly-budget": 3000, //variáveis com traço requerem aspas
    "hours-per-day": 8,
    "days-per-week": 5,
    "vacation-per-year": 8,
    "value-hour": 75
};

module.exports = {
    get(){
        return data;
    },
    update(newData){
        data = newData;
    }
}
