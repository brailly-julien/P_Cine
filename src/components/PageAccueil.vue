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
              <th>Nom</th>
              <th>pseudo</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.id }}</td>
              <td>{{ user.firstname }}</td>
              <td>{{ user.lastname }}</td>
              <td>{{ user.pseudo }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Id user</th>
              <th>Id movie</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="seat in seats" :key="seat.id">
              <td>{{ seat.id }}</td>
              <td>{{ seat.id_user }}</td>
              <td>{{ seat.id_movie }}</td>
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
import { io } from "socket.io-client";

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
      seats: [],
      socket: null
    };
  },

  async created() {
    try {
        const response = await axios.get('http://localhost:3000/users');
        const response2 = await axios.get('http://localhost:3000/seats');
        this.users = response.data;
        this.seats = response2.data;
    } catch (err) {
        console.error(err);
    }
    console.log("before socket");
    this.socket = io("http://localhost:3000");
    
    this.socket.on("users", (users) => {
      this.users = users;
    });
    this.socket.on("seatsChanged", (newSeats) => {
      console.log(newSeats);
      this.seats = newSeats;
    });

  },

  beforeUnmount() {
    if (this.socket) {
      this.socket.disconnect();
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
