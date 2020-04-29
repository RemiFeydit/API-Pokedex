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

const Types = sequelize.define('type',
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
}, {
    timestamps: false
});


app.get('/api/pokemons', function(req, res) {
    Pokemons.findAll().then((pokemons) =>{
        res.json(pokemons)
    })
})

app.get('/api/pokemons/types/:type', function(req, res) {
    Pokemons.findAll({
        where: {
          [Op.or]: [
            Sequelize.where(Sequelize.fn('lower', sequelize.col('type1')), req.params.type),
            Sequelize.where(Sequelize.fn('lower', sequelize.col('type2')), req.params.type),
          ]
        }
      }).then((pokemons) =>{
          if (pokemons.length === 0){
              console.log("error")
              res.send("Le type entré n'est pas reconnu")
          }else
            res.json(pokemons)
      })
}),

app.get('/api/types', function(req, res) {
    Types.findAll().then((types) =>{
        res.json(types)
    })
})

app.listen(3000)