const sequelize = require('../database/sequelize')
const Sequelize = require("sequelize")

const Types = sequelize.define('type',
    {
        id: {
            field: 'id',
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        teamName: {
            field: 'teamName',
            type: Sequelize.STRING,
        },
        idPokemon1: {
            field: 'idPokemon1',
            type: Sequelize.STRING,
        },
        idPokemon2: {
            field: 'idPokemon2',
            type: Sequelize.STRING,
        },
        idPokemon3: {
            field: 'idPokemon3',
            type: Sequelize.STRING,
        },
        idPokemon4: {
            field: 'idPokemon4',
            type: Sequelize.STRING,
        },
        idPokemon5: {
            field: 'idPokemon5',
            type: Sequelize.STRING,
        },
        idPokemon6: {
            field: 'idPokemon6',
            type: Sequelize.STRING,
        },
        token: {
            field: 'token',
            type: Sequelize.STRING,
        },
    }, {
    timestamps: false
});