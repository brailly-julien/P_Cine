<template>
  <div class="page-accueil">
    <h1>Bienvenue dans le cinéma !</h1>
      <router-link to="/signup">
          <button class="button">Se connecter</button>
      </router-link>
    <SignUp v-if="showSignUp" />
  </div>
</template>

<script>
import SignUp from './SignUp.vue'

export default {
  name: 'PageAccueil',
  components: {
    SignUp
  },
  data() {
    return {
      showSignUp: false,
    }
  },
  methods: {
    seConnecter() {
      console.log("Tentative de connexion");
      this.showSignUp = true;
    }
  }
}
</script>

<style src="../styles/PageAccueil.css" lang="css"></style>