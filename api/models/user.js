const sequelize = require('../database/sequelize')
const Sequelize = require("sequelize")

const User = sequelize.define('users',
    {
        id: {
            field: 'id',
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            field: 'username',
            type: Sequelize.STRING,
        },
        password:{
            field: 'password',
            type: Sequelize.STRING
        }
    }, {
    timestamps: false
});

module.exports = User