<template>
  <div>
    <h2>Ajouter un pokémon</h2>
    <div class="row">
      <input v-model="addNumber" placeholder="Numero pokedex" class="col s2" name="pokedexNumber" />
      <input v-model="addName" placeholder="Nom Pokemon" class="col s2" name="name" />
      <input v-model="addType1" placeholder="Type 1" class="col s2" name="type1" />
      <input v-model="addType2" placeholder="Type 2" class="col s2" name="type2" />
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
  methods: {
    addPokemon: function() {
      const axios = require("axios");

      axios
        .post("http://localhost:3000/add/pokemon", {
          body: {
            pokedexNumber: this.addNumber,
            name: this.addName,
            type1: this.addType1,
            type2: this.addType2
          }
        })
        .then(res => {
          console.log(`statusCode: ${res.statusCode}`);
          console.log(res);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>