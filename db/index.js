const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'schedule.db',
    logging: false
});

const db = {
    sequelize,
    Sequelize,
    models: {}
}

db.models.Schedule = require('./models/server.js')(sequelize);

module.exports = db;