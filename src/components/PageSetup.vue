<template>
    <div class="page-setup">
        <router-link to="/CinemaMenu">
            <img src="../assets/back.png" alt="Retour" class="back-button"/>
        </router-link> 
        <h1>Page de configuration</h1>
  
        <div class="control">
            <label for="slider">Volume :</label>
            <input id="slider" type="range" v-model="sliderValue" min="0" max="100"/>
            <span>{{ sliderValue }}</span>
        </div>
      
        <div class="CinemaSetup-options">
        <router-link to="/pagelangue">
            <button class="CinemaSetup-option">Langue du Film</button>
        </router-link>
        <router-link to="/pagesetup">
            <button class="CinemaSetup-option">Siège</button>
        </router-link>
        <router-link to="/pageson">
            <button class="CinemaSetup-option">Son</button>
        </router-link>
        <router-link to="/pagesetup">
            <button class="CinemaSetup-option">Autres</button>
        </router-link>
        </div>

    </div>
</template>
  
  <script>
  import axios from 'axios';

  export default {  
    name: 'PageSetup',
    data() {
      return {
        sliderValue: 0,
        switchValue: false,
        checkboxValue: false,
        user: null,
      }
    },
    
    async created() {
    try {
        const response = await axios.get('http://localhost:3000/seat/13B');
        this.user = response.data;
        this.userid = this.user.id;
        this.sliderValue = this.user.volume;  // initialiser le slider avec le volume de l'utilisateur
    } catch (error) {
        console.error(error);
        }
    },
    
    beforeUnmount() {
      this.updateVolume();
    },

    methods: {
        async updateVolume() {
            try {
                console.log(`Mise à jour du volume pour l'utilisateur ${this.userid} à ${this.sliderValue}`); 
                await axios.put(`http://localhost:3000/user/${this.user.id}`, {
                    volume: this.sliderValue.toString()
                });
                console.log(`Volume mis à jour avec succès pour l'utilisateur ${this.user.id}`);
            } catch (error) {
                console.error(error);
            }
        },
    },
}
  </script>
  
  <style src="../styles/PageSetup.css" lang="css"></style>
  