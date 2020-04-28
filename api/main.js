const express = require('express')
const Sequelize = require('sequelize');


const app = express();

const sequelize = new Sequelize('sqlite:pokedex.db')

const Pokemons = sequelize.define('pokemon',
{
    id: {
        field: 'id',
        type: Sequelize.INTEGER,
        primaryKey: true
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


app.get('/api/pokemons', function(request, response) {
    Pokemons.findAll().then((pokemons) =>{
        response.json(pokemons)
    })
})

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
}

app.listen(3000)