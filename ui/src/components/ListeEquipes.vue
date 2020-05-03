<template>
  <div class="equipes">
    <div v-for="(equipe, index) in listeEquipes" :key="index" class="center z-depth-5 equipe">
      <input :value="equipe.nomTeam" class="center" ref="nomEquipe" />
      <div class="row">
        <div class="col s6">
          <div class="card white darken-1 center">
            <select ref="pokemon1">
              <option :value="equipe.Pokemon1.id">{{equipe.Pokemon1.name}}</option>
              <option
                v-for="(pokemon) in listePokemons"
                :key="pokemon.id"
                :value="pokemon.id"
              >{{ pokemon.name }}</option>
            </select>
          </div>
        </div>
        <div class="col s6">
          <div class="card white darken-1 center">
            <select ref="pokemon2">
              <option :value="equipe.pokedexNumber">{{equipe.Pokemon2.name}}</option>
              <option
                v-for="(pokemon) in listePokemons"
                :key="pokemon.id"
                :value="pokemon.id"
              >{{ pokemon.name }}</option>
            </select>
          </div>
        </div>

        <div class="col s6">
          <div class="card white darken-1 center">
            <select ref="pokemon3">
              <option :value="equipe.pokedexNumber">{{equipe.Pokemon3.name}}</option>
              <option
                v-for="(pokemon) in listePokemons"
                :key="pokemon.id"
                :value="pokemon.id"
              >{{ pokemon.name }}</option>
            </select>
          </div>
        </div>
        <div class="col s6">
          <div class="card white darken-1 center">
            <select ref="pokemon4">
              <option :value="equipe.pokedexNumber">{{equipe.Pokemon4.name}}</option>
              <option
                v-for="(pokemon) in listePokemons"
                :key="pokemon.id"
                :value="pokemon.id"
              >{{ pokemon.name }}</option>
            </select>
          </div>
        </div>

        <div class="col s6">
          <div class="card white darken-1 center">
            <select ref="pokemon5">
              <option :value="equipe.pokedexNumber">{{equipe.Pokemon5.name}}</option>
              <option
                v-for="(pokemon) in listePokemons"
                :key="pokemon.id"
                :value="pokemon.id"
              >{{ pokemon.name }}</option>
            </select>
          </div>
        </div>
        <div class="col s6">
          <div class="card white darken-1 center">
            <select ref="pokemon6">
              <option :value="equipe.pokedexNumber">{{equipe.Pokemon6.name}}</option>
              <option
                v-for="(pokemon) in listePokemons"
                :key="pokemon.id"
                :value="pokemon.id"
              >{{ pokemon.name }}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="center">
        <button class="btn" @click="saveEquipe(index, equipe)">Sauvegarder</button>
        <button class="btn red" @click="deleteEquipe(equipe)">Supprimer</button>
      </div>
    </div>

    <div class="center">
      <button class="btn" @click="ajoutEquipe">Créer une nouvelle equipe</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListePokemons",
  created() {
    this.$store.commit("getTypes", null);
    this.$store.commit("getEquipesBdd");
  },
  computed: {
    listeEquipes: function() {
      return this.$store.state.listeEquipes;
    },
    listePokemons: function() {
      return this.$store.state.listePokemons;
    },
    tokenUtilisateur: function() {
      return this.$store.state.token;
    }
  },
  methods: {
    ajoutEquipe: function() {
      this.$store.commit("addEquipe", this.tokenUtilisateur);
    },
    saveEquipe: function(index, equipe) {
      const pokemon1 = this.$refs.pokemon1[index].value;
      const pokemon2 = this.$refs.pokemon2[index].value;
      const pokemon3 = this.$refs.pokemon3[index].value;
      const pokemon4 = this.$refs.pokemon4[index].value;
      const pokemon5 = this.$refs.pokemon5[index].value;
      const pokemon6 = this.$refs.pokemon6[index].value;
      const nomTeam = this.$refs.nomEquipe[index].value;

      const listePokemonUpdate = [
        equipe,
        pokemon1,
        pokemon2,
        pokemon3,
        pokemon4,
        pokemon5,
        pokemon6,
        nomTeam
      ];

      this.$notify({
        group: "foo",
        text: "Équipe sauvegardée ! "
      });

      this.$store.commit("saveEquipe", listePokemonUpdate);
    },
    deleteEquipe: function(equipe) {
      this.$store.commit("deleteEquipe", equipe);
    }
  }
};
</script>
<style>
.equipe {
  max-width: 40%;
  margin-left: 30%;
  margin-bottom: 2em;
}
</style>