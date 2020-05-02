<template>
  <div>
    <h2>Ajouter un pokémon</h2>
    <div class="row">
      <input v-model="addNumber" placeholder="Numero pokedex" class="col s2" name="pokedexNumber" />
      <input v-model="addName" placeholder="Nom Pokemon" class="col s2" name="name" />
      <select v-model="addType1" class="col s2">
        <option disabled value>Type 1</option>
        <option v-for="(type) in listeTypes" :key="type.id">{{ type.name }}</option>
      </select>
      <select v-model="addType2" class="col s2">
        <option disabled value>Type 2</option>
        <option v-for="(type) in listeTypes" :key="type.id">{{ type.name }}</option>
      </select>
      <button @click="addPokemon" class="btn">Ajouter</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "addPokemon",
  data() {
    return {
      addNumber: "",
      addName: "",
      addType1: "",
      addType2: ""
    };
  },
  created() {
    this.$store.commit("getTypes", null);
  },
  computed: {
    listeTypes: function() {
      return this.$store.state.listeTypes;
    }
  },
  methods: {
    addPokemon: function() {
      const axios = require("axios");

      axios
        .post("http://localhost:3000/add/pokemon", {
          pokedexNumber: this.addNumber,
          name: this.addName,
          type1: this.addType1,
          type2: this.addType2
        })
        .then(() => {
          this.addNumbern = "";
          this.addName = "";
          this.addType1 = "";
          this.addType2 = "";
          this.$store.commit("getPokemons", [null]);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>