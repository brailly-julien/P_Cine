<template>
  <div class="page-accueil">
    <h1>Bienvenue sur le siege {{ chair }} !</h1> 
    <h2>Veuillez scanner votre QR code, à l'aide <br>du boitier situé devant vous.</h2> 
  </div>
</template>

<script>
import axios from 'axios';
import { io } from "socket.io-client";

export default {
  name: 'PageAccueil',

  data() {
    return {
      message: '',
      users: [],
      seats: [],
      socket: null,
      token: null,
      chair:'',
    };
  },

  watch: {
    seats: {
      handler(newSeats) {
        for (let seat of newSeats) {
          if (seat.id_user && seat.id_movie && seat.id == this.chair) {
            this.$router.push('/CinemaMenu'); // Remplacez '/newPage' par l'URL de la page vers laquelle vous voulez naviguer.
            break;
          }
        }
      },
      deep: true,
    },
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
    
    this.socket.on("usersChanged", (newUsers) => {
      console.log(newUsers);
      this.users = newUsers;
    });
    this.socket.on("seatsChanged", (newSeats) => {
      console.log(newSeats);
      this.seats = newSeats;
    });

    this.socket.on('tokenGenerated', (token) => {
      this.token = token;
      localStorage.setItem('jwtToken', token);
      console.log(this.token);
    });

  },

  mounted() {
    this.chair = localStorage.getItem('chosenSeat');
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
