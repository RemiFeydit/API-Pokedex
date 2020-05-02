<template>
  <div id="app">
    <div id="nav">
      <nav>
        <div class="nav-wrapper">
          <router-link class="brand-logo" to="/">Projet Api Pokedex</router-link>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li>
              <router-link to="/">Home</router-link>
            </li>
            <li>
              <router-link to="/equipes">Equipes</router-link>
            </li>
            <li v-if="tokenUtilisateur == null">
              <router-link to="/login">Connexion</router-link>
            </li>
            <li v-else>
              <button @click="logout" class="waves-effect waves-light btn green">Deconnexion</button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  computed: {
    tokenUtilisateur: function() {
      return this.$store.state.token;
    }
  },
  methods: {
    logout() {
      this.$store.commit("setToken", null);
    }
  }
};
</script>