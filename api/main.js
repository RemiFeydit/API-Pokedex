const express = require('express')
const {Op, Sequelize} = require('sequelize');


const app = express();

const sequelize = new Sequelize('sqlite:pokedex.db', {
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci', 
        timestamps: true
      },
})

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


app.get('/api/pokemons/type/:type', function(req, response) {
    Pokemons.findAll({
        where: {
          [Op.or]: [
            Sequelize.where(Sequelize.fn('lower', sequelize.col('type1')), req.params.type),
            Sequelize.where(Sequelize.fn('lower', sequelize.col('type2')), req.params.type),
          ]
        }
      }).then((pokemons) =>{
            console.log(req.params.type)
            response.json(pokemons)
      });
      
})


try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
}

app.listen(3000)