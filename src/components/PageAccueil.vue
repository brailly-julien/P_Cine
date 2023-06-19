<template>
  <div class="page-accueil">
    <h1>Bienvenue dans le cinéma !</h1>
      <router-link to="/signup">
          <button class="button">Se connecter</button>
      </router-link>
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Firstname</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.id }}</td>
              <td>{{ user.firstname }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    <SignUp v-if="showSignUp" />
  </div>
</template>

<script>
import SignUp from './SignUp.vue'
import axios from 'axios';

export default {
  name: 'PageAccueil',
  components: {
    SignUp
  },

  data() {
    return {
      showSignUp: false,
      message: '',
      users: [],
    }
  },

  async created() {
    try {
        const response = await axios.get('http://localhost:3000/users');
        this.users = response.data;
    } catch (err) {
        console.error(err);
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