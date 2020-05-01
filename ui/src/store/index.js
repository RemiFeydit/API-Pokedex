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
  })
})

export default new Vuex.Store({
  state: {
    listePokemons: null,
    listeTypes: null,
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
        let dataPokemon = await axios.get(`http://localhost:3000/api/pokemon/num/${parseInt(val[1])}`);
        state.listePokemons = [dataPokemon.data];
      } else {
        let dataPokemon = await axios.get(`http://localhost:3000/api/pokemon/name/${val[1]}`);
        state.listePokemons = [dataPokemon.data];
      }
    },

    async getTypes(state) {
      const axios = require('axios');
      let dataTypes = await axios.get(`http://localhost:3000/api/types`);
      state.listeTypes = dataTypes.data;
    },

  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocalStorage.plugin]
})
