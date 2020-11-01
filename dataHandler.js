const fs = require('fs');

function save(data) {
    return new Promise( ( resolve, reject ) => {
        fs.
            writeFileSync('data.json', JSON.stringify(data, null, 2),
            err => {
                if(err) {
                    reject(err);
                } else {
                    resolve();
                }
            })
    })
}

function getSchedule() {
    return new Promise( ( resolve, reject ) => {
        fs.
            readFile('data.json', 'utf8', 
            ( err, data ) => {
                if(err) {
                    reject(err);
                } else {
                    const json = JSON.parse(data);
                    resolve(json);
                }
            })
    })
}

async function updateSchedule(data) {
    const schedule = await getSchedule();
    schedule.lunch.first = data.lunchFirst
    schedule.lunch.second = data.lunchSecond
    schedule.dinner.first = data.dinnerFirst
    schedule.dinner.second = data.dinnerSecond
    schedule.dinner.third = data.dinnerThird
    schedule.dinner.fourth = data.dinnerFourth

    console.log(schedule)
    await save(schedule)
}


module.exports = {
    getSchedule,
    updateSchedule
}