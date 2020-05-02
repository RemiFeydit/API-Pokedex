const Sequelize = require("sequelize")

const sequelize = new Sequelize('sqlite:pokedex.db', {
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: false,
    },
})


module.exports = sequelize