<template>
  <div class="home">
    <AddPokemon />
    <ListePokemons />
  </div>
</template>

<script>
// @ is an alias to /src
import ListePokemons from "@/components/ListePokemons.vue";
import AddPokemon from "@/components/AddPokemon.vue";

export default {
  name: "Home",
  components: {
    AddPokemon,
    ListePokemons
  }
};
</script>
