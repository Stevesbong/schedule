const Sequelize = require('sequelize');

module.exports = sequelize => {
    class Schedule extends Sequelize.Model {}
    Schedule.init({
        name: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.INTEGER,
            defaultValue: 4321
        }
    }, { sequelize });
    
    return Schedule;
}

