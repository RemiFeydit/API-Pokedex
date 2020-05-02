const sequelize = require('../database/sequelize')
const Sequelize = require("sequelize")

const Pokemons = sequelize.define('pokemon',
    {
        id: {
            field: 'id',
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        pokedexNumber: {
            field: 'pokedexNumber',
            type: Sequelize.STRING,
        },
        name: {
            field: 'name',
            type: Sequelize.STRING,
        },
        type1: {
            field: 'type1',
            type: Sequelize.STRING,
        },
        type2: {
            field: 'type2',
            type: Sequelize.STRING,
        },
    }, {
    timestamps: false
});


module.exports = Pokemons