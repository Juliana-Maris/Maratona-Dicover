
let data = { 
     name: "Juliana",
     avatar: "https://avatars.githubusercontent.com/u/80263434?v=4",
     "monthly-budget": 4000,
     "days-per-week": 5,
     "hours-per-day": 7,
     "vacation-per-year": 4,
     "value-hour": 75
};

module.exports = {
    get(){
        return data;
    },
    update(newData){
        data = newData;
    }
};
module.exports = {
    get(){
        return data
    }
}