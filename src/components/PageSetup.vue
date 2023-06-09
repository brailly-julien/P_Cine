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
            <button class="CinemaSetup-option">Langues</button>
        </router-link>
        <router-link to="/pagerestauration">
            <button class="CinemaSetup-option">Siège</button>
        </router-link>
        <router-link to="/pagerestauration">
            <button class="CinemaSetup-option">Son</button>
        </router-link>
        <router-link to="/pagerestauration">
            <button class="CinemaSetup-option">Autres</button>
        </router-link>
        </div>

    </div>
</template>
  
  <script>
  export default {
    name: 'PageSetup',
    data() {
      return {
        sliderValue: 50,
        switchValue: false,
        checkboxValue: false,
      }
    }
  }
  </script>
  
  <style src="../styles/PageSetup.css" lang="css"></style>
  