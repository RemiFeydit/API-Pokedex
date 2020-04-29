<template>
  <div class="home">
    <h1>Liste Pokemons</h1>
    <ListePokemons />
  </div>
</template>

<script>
// @ is an alias to /src
import ListePokemons from "@/components/ListePokemons.vue";

export default {
  name: "Home",
  components: {
    ListePokemons
  }
};
</script>
