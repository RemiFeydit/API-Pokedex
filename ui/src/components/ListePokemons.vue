<template>
  <div class="pokemons">
    <select v-model="selected">
      <option disabled value>Please select one</option>
      <option v-for="(type) in listeTypes" :key="type.id">{{ type.name }}</option>
    </select>
    <br />
    <table>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Type 1</th>
          <th>Type 2</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(pokemon) in listePokemons" :key="pokemon.id">
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
      selected: ""
    };
  },
  created() {
    this.$store.commit("getTypes", null);
    this.$store.commit("getPokemons", null);
  },
  computed: {
    listePokemons: function() {
      return this.$store.state.listePokemons;
    },
    listeTypes: function() {
      return this.$store.state.listeTypes;
    }
  },
  watch: {
    selected: function(val) {
      this.$store.commit("getPokemons", val.toLowerCase());
    }
  }
};
</script>
<style>
select {
  display: inline;
}
</style>