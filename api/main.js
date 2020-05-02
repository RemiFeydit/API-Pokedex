const express = require('express');
const cors = require('cors');
const { Op, Sequelize } = require('sequelize');
const Pokemons = require("./models/pokemon")
const app = express();
const Types = require("./models/type")
const Team = require('./models/equipe')

const bodyParser = require('body-parser')

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.get('/api/pokemons', function (req, res) {
    Pokemons.findAll({
        order: ["pokedexNumber"]
    }).then((pokemons) => {
        res.json(pokemons)
    })
})

app.get('/api/pokemon/num/:pkmnNum', function (req, res) {
    Pokemons.findAll({
        where: {
            pokedexNumber: {
                [Op.like]: req.params.pkmnNum + '%'
            }
        },
        order: ["pokedexNumber"],
    }).then((pokemons) => {
        res.json(pokemons)
    })
})

app.get('/api/pokemon/name/:pkmnName', function (req, res) {
    Pokemons.findAll({
        where: {
            name: {
                [Op.like]: req.params.pkmnName + '%'
            }
        },
        order: ["pokedexNumber"],
    }).then((pokemons) => {
        res.json(pokemons)
    })
})

app.get('/api/pokemons/types/:type', function (req, res) {
    Pokemons.findAll({
        where: {
            [Op.or]: [
                Sequelize.where(Sequelize.fn('lower', Sequelize.col('type1')), req.params.type),
                Sequelize.where(Sequelize.fn('lower', Sequelize.col('type2')), req.params.type),
            ]
        }
    }).then((pokemons) => {
        if (pokemons.length === 0) {
            res.json({ error: "Le type entré n'est pas reconnu" })
        } else
            res.json(pokemons)
    })
}),

    app.get('/api/types', function (req, res) {
        Types.findAll().then((types) => {
            res.json(types)
        })
    })

app.post('/add/pokemon', (req, res) => {
    if (req.body.type2 == "") {
        req.body.type2 = null
    }
    Pokemons.create({
        pokedexNumber: req.body.pokedexNumber,
        name: req.body.name,
        type1: req.body.type1,
        type2: req.body.type2
    }).then(submittedPokemon => res.send(submittedPokemon));
});

app.post('/add/equipe', (req, res) => {
    Team.create({
        teamName: req.body.teamName,
        idPokemon1: req.body.idPokemon1,
        idPokemon2: req.body.idPokemon2,
        idPokemon3: req.body.idPokemon3,
        idPokemon4: req.body.idPokemon4,
        idPokemon5: req.body.idPokemon5,
        idPokemon6: req.body.idPokemon6,
        token: req.body.token
    }).then(submittedTeam => res.send(submittedTeam));
});

app.get('*', function (req, res) {
    res.status(404).send("Page introuvable??")
});

app.listen(3000)