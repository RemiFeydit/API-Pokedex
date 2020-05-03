<template>
  <div id="authentification" class="row">
    <div id="Se connecter" class="col s12 m6 l4 offset-l1">
      <form @submit.prevent id="form-login">
        <h1>Se connecter</h1>

        <label for="email-login">Email</label>
        <input v-model.trim="email_login" type="email" placeholder="Votre email" id="email-login" />

        <label for="password-login">Mot de passe</label>
        <input
          v-model.trim="password_login"
          type="password"
          placeholder="Mot de passe"
          id="password-login"
          class="validate"
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
          type="email"
          placeholder="Votre email"
          id="email-register"
          class="validate"
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
          v-if="inscriptionReussie"
          id="incorrect"
          style="color: green"
        >Vous êtes inscrit ! Vous pouvez vous connecter.</span>
        <span v-if="incorrectRegister" id="incorrect" style="color: red">Cet email est déja utilisé.</span>
      </form>
    </div>
  </div>
</template>

<script>
const axios = require("axios");

export default {
  data() {
    return {
      email_login: "",
      password_login: "",
      email_register: "",
      password_register: "",
      incorrectRegister: false,
      incorrectLogin: false,
      inscriptionReussie: false
    };
  },
  methods: {
    login() {
      if (this.email_login && this.password_login) {
        axios
          .get("http://localhost:3000/login", {
            params: {
              username: this.email_login,
              password: this.password_login
            }
          })
          .then(reponse => {
            console.log(reponse.data.login);

            if (reponse.data.login) {
              console.log("yolo");
              this.$store.commit("setToken", reponse.data.id);
              this.$router.push("/equipes");
            } else {
              this.incorrectLogin = true;
              console.log("nop");
            }
          });
      }
    },
    register() {
      if (this.email_register && this.password_register) {
        axios
          .get("http://localhost:3000/login", {
            params: {
              username: this.email_register,
              password: this.password_register
            }
          })
          .then(reponse => {
            if (reponse.data.login) {
              this.incorrectRegister = true;
            } else {
              axios.post("http://localhost:3000/add/user", {
                username: this.email_register,
                password: this.password_register
              });
              this.inscriptionReussie = true;
            }
          });
      }
    }
  }
};
</script>

