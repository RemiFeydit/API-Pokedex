<template>
  <div id="authentification" class="row">
    <div id="Se connecter" class="col s12 m6 l4 offset-l1">
      <form @submit.prevent id="form-login">
        <h1>Se connecter</h1>

        <label for="email-login">Email</label>
        <input v-model.trim="email_login" type="text" placeholder="Votre email" id="email-login" />

        <label for="password-login">Mot de passe</label>
        <input
          v-model.trim="password_login"
          type="password"
          placeholder="Mot de passe"
          id="password-login"
        />

        <button @click="login" class="waves-effect waves-light btn green">Connexion</button>
        <span
          v-if="incorrectLogin"
          id="incorrect"
          style="color: red"
        >Email ou Mot de passe incorrect.</span>
      </form>
    </div>
    <div id="register" class="col s12 m6 l4 offset-l1">
      <form @submit.prevent id="form-register">
        <h1>S'inscrire</h1>

        <label for="email-register">Email</label>
        <input
          v-model.trim="email_register"
          type="text"
          placeholder="Votre email"
          id="email-register"
        />

        <label for="password-register">Password</label>
        <input
          v-model.trim="password_register"
          type="password"
          placeholder="Mot de passe"
          id="password-register"
        />

        <button @click="register" class="waves-effect waves-light btn green">Inscription</button>
        <span
          v-if="incorrectRegister"
          id="incorrect"
          style="color: red"
        >Email ou Mot de passe incorrect.</span>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      incorrectRegister: false,
      incorrectLogin: false
    };
  },
  methods: {
    login() {
      console.log(this.email, this.password);
      this.$store.commit("setToken", 666);
      this.$router.push("/equipes");
    },
    register() {
      console.log(this.email, this.password);
      this.$store.commit("setToken", 666);
      this.$router.push("/equipes");
    }
  }
};
</script>

