const sequelize = require('../database/sequelize')
const Sequelize = require("sequelize")

const Types = sequelize.define('type',
    {
        id: {
            field: 'id',
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            field: 'name',
            type: Sequelize.STRING,
        },
    }, {
    timestamps: false
});

module.exports = Types