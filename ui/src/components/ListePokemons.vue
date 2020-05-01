<template>
  <div class="pokemons">
    <button @click="debug">debug</button>
    <div class="row">
      <select v-model="selected" class="col s2">
        <option disabled value>Please select one</option>
        <option v-for="(type) in listeTypes" :key="type.id">{{ type.name }}</option>
      </select>
      <select v-model="filtreRecherche" class="col s2 offset-s1">
        <option disabled value>Rechercher par:</option>
        <option v-for="(filtre) in listeFiltre" :key="filtre.value">{{ filtre.text }}</option>
      </select>
      <input v-model="inputPokemonSearch" :placeholder="rechercherPar" class="col s2" />
      <button class="btn" @click="rechercherPokemon">Rechercher</button>
    </div>
    <br />
    <table>
      <thead>
        <tr>
          <th>Numéro Pokédex</th>
          <th>Nom</th>
          <th>Type 1</th>
          <th>Type 2</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(pokemon) in listePokemons" :key="pokemon.id">
          <td>{{ pokemon.pokedexNumber }}</td>
          <td>{{ pokemon.name }}</td>
          <td>{{ pokemon.type1 }}</td>
          <td>{{ pokemon.type2 == null ? 'N/A' : pokemon.type2 }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "ListePokemons",
  data() {
    return {
      selected: "",
      filtreRecherche: "",
      listeFiltre: [
        { text: "Numéro Pokédex", value: "pokedexNumber" },
        { text: "Nom", value: "name" }
      ],
      inputPokemonSearch: ""
    };
  },
  created() {
    this.$store.commit("getTypes", null);
    this.$store.commit("getPokemons", [null]);
  },
  computed: {
    listePokemons: function() {
      return this.$store.state.listePokemons;
    },
    listeTypes: function() {
      return this.$store.state.listeTypes;
    },
    rechercherPar: function() {
      return "Entrez le " + this.filtreRecherche + " souhaité";
    }
  },
  watch: {
    selected: function(val) {
      if (val != "") {
        this.filtreRecherche = "";
        this.inputPokemonSearch = "";
      }
      this.$store.commit("getPokemons", ["type", val.toLowerCase()]);
    }
  },
  methods: {
    rechercherPokemon: function() {
      if (this.filtreRecherche == "") {
        alert("Veuillez selectionner un filtre de recherche");
      } else {
        this.selected = "";
        this.$store.commit("getPokemons", [
          this.filtreRecherche,
          this.inputPokemonSearch
        ]);
      }
    },
    debug: function() {
      console.log(this.listePokemons);
    }
  }
};
</script>
<style>
select {
  display: inline;
}
</style>