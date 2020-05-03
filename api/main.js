const express = require('express');
const cors = require('cors');
const { Op, Sequelize } = require('sequelize');
const Pokemons = require("./models/pokemon")
const app = express();
const Types = require("./models/type")
const Team = require('./models/equipe')
const User = require('./models/user')

const bodyParser = require('body-parser')

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())



/// POKEMONS

// GET
app.get('/api/pokemons', function (req, res) {
    Pokemons.findAll({
        order: ["pokedexNumber"]
    }).then((pokemons) => {
        res.json(pokemons)
    })
})

// GET by numPokedex

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

// GET by name

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

//GET by type

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
})

// DELETE pokemon

app.delete('/delete/pokemon/:id', (req, res) => {
    Pokemons.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.send("success")
    })
});

// ADD pokemon

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

// UPDATE pokemon

app.put('/edit/pokemon', (req, res) => {
    Pokemons.update(
        {
            pokedexNumber: req.body.pokedexNumber,
            name: req.body.name,
            type1: req.body.type1,
            type2: req.body.type2
        },
        {
            where: { id:req.body.id }
        }
    ).then(()=>{
        res.send("sucess")
    })
})

/// TYPE
app.get('/api/types', function (req, res) {
    Types.findAll().then((types) => {
        res.json(types)
    })
})

/// TEAM

// POST ADD Equipe

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

// DELETE delete Team
app.delete('/delete/team/:id', (req, res) => {
    Team.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.send("success")
    })
});

// PUT UPDATE Team

app.put('/edit/team', (req, res) => {
    Team.update(
        {
            teamName: req.body.teamName,
            idPokemon1: req.body.idPokemon1,
            idPokemon2: req.body.idPokemon2,
            idPokemon3: req.body.idPokemon3,
            idPokemon4: req.body.idPokemon4,
            idPokemon5: req.body.idPokemon5,
            idPokemon6: req.body.idPokemon6
        },
        {
            where: { id:req.body.id }
        }
    ).then(()=>{
        res.send("sucess")
    })
})

/// USER

// ADD

app.post('/add/user', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    }).then(submittedUser => res.send(submittedUser));
});

// LOGIN

app.get('/login', function (req, res) {
    User.findOne({
        where: {
            [Op.and]: [
                { username: req.body.username},
                { password: req.body.password}
            ]
        }
    }).then((user) => {
        if (user == null) {
            res.json({login : false})
        } else
            res.json({login : true, id: user.id })
    })
})

/// ERROR PATH

app.get('*', function (req, res) {
    res.status(404).send("Page introuvable??")
});

app.listen(3000)