<template>
  <div class="pokemons">
    <h2>Liste Pokemons</h2>
    <div class="row">
      <select v-model="selected" class="col s2">
        <option value>Trier par type</option>
        <option v-for="(type) in listeTypes" :key="type.id">{{ type.name }}</option>
      </select>
      <select v-model="filtreRecherche" class="col s2 offset-s1">
        <option disabled value>Rechercher par:</option>
        <option v-for="(filtre) in listeFiltre" :key="filtre.value">{{ filtre.text }}</option>
      </select>
      <input
        v-model="inputPokemonSearch"
        :placeholder="rechercherPar"
        class="col s2"
        @input="rechercherPokemon"
      />
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
        <tr v-for="(pokemon, index) in listePokemons" :key="pokemon.id">
          <td>
            <input type="text" ref="nbrPokedex" :value="pokemon.pokedexNumber" />
          </td>
          <td>
            <input type="text" ref="namePokemon" :value="pokemon.name" />
          </td>
          <td>
            <select class="col s2" ref="type1Pokemon">
              <option>{{pokemon.type1}}</option>
              <option v-for="(type) in listeTypes" :key="type.id">{{ type.name }}</option>
            </select>
          </td>
          <td>
            <select class="col s2" ref="type2Pokemon">
              <option>{{pokemon.type2 == null ? 'N/A' : pokemon.type2}}</option>
              <option v-for="(type) in listeTypes" :key="type.id">{{ type.name }}</option>
            </select>
          </td>
          <td>
            <div class="row">
              <button
                class="btn green col s4 offset-s1"
                @click="updatePokemon(index, pokemon.id)"
              >Sauvegarder</button>
              <button class="btn red col s4 offset-s1" @click="deletePokemon(pokemon.id)">Supprimer</button>
            </div>
          </td>
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
        this.$store.commit("getPokemons", ["type", val.toLowerCase()]);
      } else {
        this.$store.commit("getPokemons", [null]);
      }
    }
  },
  methods: {
    rechercherPokemon: function() {
      if (this.filtreRecherche == "") {
        alert("Veuillez selectionner un filtre de recherche");
      } else if (this.inputPokemonSearch == "") {
        this.$store.commit("getPokemons", [null]);
      } else {
        this.selected = "";
        this.$store.commit("getPokemons", [
          this.filtreRecherche,
          this.inputPokemonSearch
        ]);
      }
    },
    updatePokemon: function(index, idPokemon) {
      const nbrPokedex = this.$refs.nbrPokedex[index].value;
      const namePokemon = this.$refs.namePokemon[index].value;
      const type1Pokemon = this.$refs.type1Pokemon[index].value;
      const type2Pokemon = this.$refs.type2Pokemon[index].value;

      console.log(nbrPokedex, namePokemon, type1Pokemon, type2Pokemon);

      this.$notify({
        group: "foo",
        text: "Le pokémon a bien été mis à jour."
      });

      this.$store.dispatch("updatePokemon", [
        nbrPokedex,
        namePokemon,
        type1Pokemon,
        type2Pokemon,
        idPokemon
      ]);
    },
    deletePokemon: function(idPokemon) {
      if (confirm("Voulez-vous vraiment supprimer ce pokémon ?")) {
        this.$notify({
          group: "foo",
          text: "Le pokémon a bien été supprimé."
        });
        this.$store.dispatch("deletePokemon", idPokemon);
      }
    }
  }
};
</script>
<style>
select {
  display: inline;
}
</style>