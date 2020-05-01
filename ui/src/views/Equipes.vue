<template>
  <div class="equipes">
    <h1>Liste de tes équipes</h1>
    <ListeEquipes />
  </div>
</template>


<script>
// @ is an alias to /src
import ListeEquipes from "@/components/ListeEquipes.vue";

export default {
  name: "Equipes",
  components: {
    ListeEquipes
  }
};
</script>
