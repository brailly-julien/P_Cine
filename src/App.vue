<template>
  <div id="app">
    <div class="container">
      <router-link to="/">
        <img alt="Vue logo" src="./assets/logo2.png" class="logo">
      </router-link>
      <div class="lang-switch">
        <button @click="switchLocale('fr')">FR</button> |
        <button @click="switchLocale('en')">EN</button>
      </div>
      <router-view></router-view>
      <div v-if="tokenExpiresIn">
        Le token expire dans : {{ tokenExpiresIn }} secondes
      </div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';

export default {
  name: 'App',
  data() {
    return {
      tokenExpiresIn: null,
      intervalId: null
    }
  },
  methods: {
    switchLocale(locale) {
      this.$i18n.locale = locale;
    },
    logoutUser() {
      // Log the user out and reset tokenExpiresIn
      // Depending on your app's authentication, you may need to do more here
      this.tokenExpiresIn = null;
      this.$router.push('/pageaccueil');  // navigate to the home page
    },
    startCountdown() {
      // If an interval already exists, clear it
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
      // Start a new interval
      this.intervalId = setInterval(() => {
        if (this.tokenExpiresIn > 0) {
          this.tokenExpiresIn -= 1;
        } else {
          this.logoutUser();
          clearInterval(this.intervalId);
        }
      }, 1000);
    }
  },
  created() {
    const socket = io('http://localhost:3000'); // URL of your server

    socket.on('tokenGenerated', data => {
      // Store the token's valid duration in the component instance
      this.tokenExpiresIn = data.expiresIn;
      // Start the countdown
      this.startCountdown();
    })
  },
  beforeUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
</script>

<style>

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: auto; /* Assurez-vous que le contenu débordant peut toujours être accessible */
}

/* Ensuite, assurez-vous que votre conteneur d'application prend toute la hauteur disponible */
#app {
  min-height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  background-image: url('./assets/bg.jpg');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 100% 100%;
}

.container {
  padding: 25px;
  background-color: #becfdd;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  min-width: 500px;
}

.logo {
  max-width: 100px;
  margin-bottom: 10px;
}
</style>
