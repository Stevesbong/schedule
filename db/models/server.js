const Sequelize = require('sequelize');
const { sequelize } = require('..');

module.exports = sequelize => {
    class Schedule extends Sequelize.Model {}
    Schedule.init({
        name: {
            type: Sequelize.STRING
        },
        authentication: {
            type: Sequelize.BOOLEAN
        }
    }, { sequelize });
    
    return Schedule;
}

