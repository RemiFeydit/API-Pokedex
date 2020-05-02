import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist';

Vue.use(Vuex)

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
      const axios = require('axios');
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
      const axios = require('axios');
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
      const axios = require('axios');
      const Pokemon1 = val[1] === "" ? { data: val[0].Pokemon1 } : await axios.get(`http://localhost:3000/api/pokemon/num/${val[1]}`);
      const Pokemon2 = val[2] === "" ? { data: val[0].Pokemon2 } : await axios.get(`http://localhost:3000/api/pokemon/num/${val[2]}`);
      const Pokemon3 = val[3] === "" ? { data: val[0].Pokemon3 } : await axios.get(`http://localhost:3000/api/pokemon/num/${val[3]}`);
      const Pokemon4 = val[4] === "" ? { data: val[0].Pokemon4 } : await axios.get(`http://localhost:3000/api/pokemon/num/${val[4]}`);
      const Pokemon5 = val[5] === "" ? { data: val[0].Pokemon5 } : await axios.get(`http://localhost:3000/api/pokemon/num/${val[5]}`);
      const Pokemon6 = val[6] === "" ? { data: val[0].Pokemon6 } : await axios.get(`http://localhost:3000/api/pokemon/num/${val[6]}`);
      const nomTeam = val[7];

      let index = state.listeEquipes.indexOf(val[0]);

      console.log(state.listeEquipes[index].Pokemon1)

      state.listeEquipes[index].Pokemon1 = Pokemon1.data;
      console.log(state.listeEquipes[index].Pokemon1)
      state.listeEquipes[index].Pokemon2 = Pokemon2.data;
      state.listeEquipes[index].Pokemon3 = Pokemon3.data;
      state.listeEquipes[index].Pokemon4 = Pokemon4.data;
      state.listeEquipes[index].Pokemon5 = Pokemon5.data;
      state.listeEquipes[index].Pokemon6 = Pokemon6.data;
      state.listeEquipes[index].nomTeam = nomTeam;

      alert('Equipe sauvegardée !')
    },
    deleteEquipe(state, val) {
      let index = state.listeEquipes.indexOf(val);
      state.listeEquipes.splice(index, 1);
    },
    getEquipesBdd(state) {
      state.listeEquipes = [];
    },
    setToken(state, val) {
      state.token = val;
    }

  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocalStorage.plugin]
})
