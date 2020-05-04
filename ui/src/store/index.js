import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist';

Vue.use(Vuex)

const axios = require('axios');

const vuexLocalStorage = new VuexPersist({
    key: 'vuex', // The key to store the state on in the storage provider.
    storage: window.localStorage,
    reducer: state => ({
        listePokemons: state.listePokemons,
        listeTypes: state.listeTypes,
        listeEquipes: state.listeEquipes,
        token: state.token
    })
})

export default new Vuex.Store({
    state: {
        listePokemons: null,
        listeTypes: null,
        listeEquipes: [],
        token: null,
    },
    mutations: {
        async getPokemons(state, val) {
            if (val[0] === null) {
                let dataPokemon = await axios.get(`http://localhost:3000/api/pokemons`);
                state.listePokemons = dataPokemon.data;
            } else if (val[0] === "type") {
                let dataPokemon = await axios.get(`http://localhost:3000/api/pokemons/types/${val[1]}`);
                state.listePokemons = dataPokemon.data;
            } else if (val[0] === "Numéro Pokédex") {
                let dataPokemon = await axios.get(`http://localhost:3000/api/pokemon/num/${val[1]}`);
                state.listePokemons = dataPokemon.data;
            } else {
                let dataPokemon = await axios.get(`http://localhost:3000/api/pokemon/name/${val[1]}`);
                state.listePokemons = dataPokemon.data;
            }
        },

        async getTypes(state) {
            let dataTypes = await axios.get(`http://localhost:3000/api/types`);
            state.listeTypes = dataTypes.data;
        },

        addEquipe(state, val) {
            let idMin = 0;
            state.listeEquipes.forEach(equipe => {
                if (idMin > equipe.id) {
                    idMin = equipe.id;
                }
            });
            const idTemporaire = idMin - 1

            const equipe = {
                id: idTemporaire,
                Pokemon1: {
                    id: null,
                    pokedexNumber: null,
                    name: "Choix pokemon",
                    type1: null,
                    type2: null
                },
                Pokemon2: {
                    id: null,
                    pokedexNumber: null,
                    name: "Choix pokemon",
                    type1: null,
                    type2: null
                },
                Pokemon3: {
                    id: null,
                    pokedexNumber: null,
                    name: "Choix pokemon",
                    type1: null,
                    type2: null
                },
                Pokemon4: {
                    id: null,
                    pokedexNumber: null,
                    name: "Choix pokemon",
                    type1: null,
                    type2: null
                },
                Pokemon5: {
                    id: null,
                    pokedexNumber: null,
                    name: "Choix pokemon",
                    type1: null,
                    type2: null
                },
                Pokemon6: {
                    id: null,
                    pokedexNumber: null,
                    name: "Choix pokemon",
                    type1: null,
                    type2: null
                },
                nomTeam: "Choix nom",
                token: val
            };
            state.listeEquipes.push(equipe);
        },
        async saveEquipe(state, val) {
            const Pokemon1 = val[1]
            const Pokemon2 = val[2]
            const Pokemon3 = val[3]
            const Pokemon4 = val[4]
            const Pokemon5 = val[5]
            const Pokemon6 = val[6]
            const nomTeam = val[7];

            if (val[0].id < 0) {
                axios
                    .post("http://localhost:3000/add/equipe", {
                        teamName: nomTeam,
                        idPokemon1: Pokemon1,
                        idPokemon2: Pokemon2,
                        idPokemon3: Pokemon3,
                        idPokemon4: Pokemon4,
                        idPokemon5: Pokemon5,
                        idPokemon6: Pokemon6,
                        token: state.token,
                    })
            } else {
                console.log(val[0].id, Pokemon1, Pokemon2, Pokemon3, Pokemon4, Pokemon5, Pokemon6);
                await axios.put("http://localhost:3000/edit/team", {
                    id: val[0].id,
                    teamName: nomTeam,
                    idPokemon1: Pokemon1,
                    idPokemon2: Pokemon2,
                    idPokemon3: Pokemon3,
                    idPokemon4: Pokemon4,
                    idPokemon5: Pokemon5,
                    idPokemon6: Pokemon6,
                });
            }
            this.commit("getEquipesBdd")

        },
        async deleteEquipe(state, val) {
            let index = state.listeEquipes.indexOf(val);
            await axios.delete(`http://localhost:3000/delete/team/${state.listeEquipes[index].id}`);
            state.listeEquipes.splice(index, 1);

        },
        async getEquipesBdd(state) {
            state.listeEquipes = [];
            axios
                .get("http://localhost:3000/teams", {
                    params: {
                        token: state.token,
                    }
                }).then(reponse => {
                    reponse.data.forEach(async equipe => {
                        const Pokemon1 = equipe.idPokemon1 === null ? {
                            data: {
                                id: null,
                                pokedexNumber: null,
                                name: "Choix pokemon",
                                type1: null,
                                type2: null
                            }
                        } : await axios.get(`http://localhost:3000/api/pokemon/id/${equipe.idPokemon1}`);
                        const Pokemon2 = equipe.idPokemon2 === null ? {
                            data: {
                                id: null,
                                pokedexNumber: null,
                                name: "Choix pokemon",
                                type1: null,
                                type2: null
                            }
                        } : await axios.get(`http://localhost:3000/api/pokemon/id/${equipe.idPokemon2}`);
                        const Pokemon3 = equipe.idPokemon3 === null ? {
                            data: {
                                id: null,
                                pokedexNumber: null,
                                name: "Choix pokemon",
                                type1: null,
                                type2: null
                            }
                        } : await axios.get(`http://localhost:3000/api/pokemon/id/${equipe.idPokemon3}`);
                        const Pokemon4 = equipe.idPokemon4 === null ? {
                            data: {
                                id: null,
                                pokedexNumber: null,
                                name: "Choix pokemon",
                                type1: null,
                                type2: null
                            }
                        } : await axios.get(`http://localhost:3000/api/pokemon/id/${equipe.idPokemon4}`);
                        const Pokemon5 = equipe.idPokemon5 === null ? {
                            data: {
                                id: null,
                                pokedexNumber: null,
                                name: "Choix pokemon",
                                type1: null,
                                type2: null
                            }
                        } : await axios.get(`http://localhost:3000/api/pokemon/id/${equipe.idPokemon5}`);
                        const Pokemon6 = equipe.idPokemon6 === null ? {
                            data: {
                                id: null,
                                pokedexNumber: null,
                                name: "Choix pokemon",
                                type1: null,
                                type2: null
                            }
                        } : await axios.get(`http://localhost:3000/api/pokemon/id/${equipe.idPokemon6}`);

                        const equipeReforme = {
                            id: equipe.id,
                            Pokemon1: Pokemon1.data,
                            Pokemon2: Pokemon2.data,
                            Pokemon3: Pokemon3.data,
                            Pokemon4: Pokemon4.data,
                            Pokemon5: Pokemon5.data,
                            Pokemon6: Pokemon6.data,
                            nomTeam: equipe.teamName,
                            token: equipe.token,
                            conseil: "Excellent équipe !",
                        };

                        const listeTypeEquipe = [equipeReforme.Pokemon1.type1, equipeReforme.Pokemon1.type2, equipeReforme.Pokemon2.type1, equipeReforme.Pokemon2.type2, equipeReforme.Pokemon3.type1, equipeReforme.Pokemon3.type2, equipeReforme.Pokemon4.type1, equipeReforme.Pokemon4.type2, equipeReforme.Pokemon5.type1, equipeReforme.Pokemon5.type2, equipeReforme.Pokemon6.type1, equipeReforme.Pokemon6.type2,]

                        const checkTypes = ['ACIER', 'COMBAT', 'DRAGON', 'EAU', 'ELECTRIK', 'FEE', 'FEU', 'GLACE', 'INSECTE', 'NORMAL', 'PLANTE', 'POISON', 'PSY',
                            'ROCHE', 'SOL', 'SPECTRE', 'TENEBRES', 'VOL'];
                        let typesRestant = ['ACIER', 'COMBAT', 'DRAGON', 'EAU', 'ELECTRIK', 'FEE', 'FEU', 'GLACE', 'INSECTE', 'NORMAL', 'PLANTE', 'POISON', 'PSY',
                            'ROCHE', 'SOL', 'SPECTRE', 'TENEBRES', 'VOL'];
                        const checkTypesFaibles = [['FEE', 'GLACE', 'ROCHE'], ['ACIER', 'GLACE', 'NORMAL', 'ROCHE', 'TENEBRES'], ['DRAGON'], ['FEU', 'ROCHE', 'SOL'], ['EAU', 'VOL'],
                        ['COMBAT', 'DRAGON', 'TENEBRES'], ['ACIER', 'GLACE', 'INSECTE', 'PLANTE'], ['DRAGON', 'PLANTE', 'SOL', 'VOL'], ['PLANTE', 'PSY', 'TENEBRES'],
                        [''], ['EAU', 'ROCHE', 'SOL'], ['FEE', 'PLANTE'], ['COMBAT', 'POISON'], ['FEU', 'GLACE', 'INSECTE', 'VOL'],
                        ['ACIER', 'ELECTRIK', 'FEU', 'POISON', 'ROCHE'], ['SPECTRE', 'PSY'], ['PSY', 'SPECTRE'], ['COMBAT', 'PLANTE', 'INSECTE']];


                        listeTypeEquipe.forEach(type => {
                            if (type) {
                                const indexType = checkTypes.indexOf(type);
                                checkTypesFaibles[indexType].forEach(typeFaible => {
                                    const indexTypeFaible = typesRestant.indexOf(typeFaible)
                                    if (indexTypeFaible != -1) {
                                        typesRestant.splice(indexTypeFaible, 1);
                                    }
                                });
                            }
                        });

                        if (typesRestant.length != 0) {
                            let conseilType = "Vous n'avez pas de type super efficace contre : ";
                            typesRestant.forEach(type => {
                                conseilType += `${type}, `;
                            });
                            conseilType = conseilType.slice(0, -2);
                            conseilType += '.';
                            equipeReforme.conseil = conseilType;
                        }

                        state.listeEquipes.push(equipeReforme);
                    });
                })
        },
        setToken(state, val) {
            state.token = val;
        },

    },
    actions: {
        async deletePokemon({ commit }, val) {
            await axios.delete(`http://localhost:3000/delete/pokemon/${val}`);
            commit("getPokemons", [null]);
        },
        async updatePokemon({ commit }, val) {
            await axios.put("http://localhost:3000/edit/pokemon", {
                pokedexNumber: val[0],
                name: val[1],
                type1: val[2],
                type2: val[3],
                id: val[4]
            });
            commit("getPokemons", [null]);
        },
    },
    modules: {
    },
    plugins: [vuexLocalStorage.plugin]
})
