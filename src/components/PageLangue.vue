<template>
  <div class="page-langue">
        <router-link to="/PageSetup">
          <img src="../assets/back.png" alt="Retour" class="back-button"/>
        </router-link>
        <h1>Choisissez votre langue</h1>
  
      <div class="button-container">
        <!-- Ici sont les boutons de langue -->
        <button
          class="language-button"
          :class="{ 'selected-language': selectedLanguage === 'Français' }"
          @click="setLanguage('Français')">
          Français
        </button>
        <button
          class="language-button"
          :class="{ 'selected-language': selectedLanguage === 'Anglais' }"
          @click="setLanguage('Anglais')">
          Anglais
        </button>
        <button
          class="language-button"
          :class="{ 'selected-language': selectedLanguage === 'Espagnol' }"
          @click="setLanguage('Espagnol')">
          Espagnol
        </button>
        <button
          class="language-button"
          :class="{ 'selected-language': selectedLanguage === 'Italien' }"
          @click="setLanguage('Italien')">
          Italien
        </button>
        <button
          class="language-button"
          :class="{ 'selected-language': selectedLanguage === 'Allemand' }"
          @click="setLanguage('Allemand')">
          Allemand
        </button>
        <button
          class="language-button"
          :class="{ 'selected-language': selectedLanguage === 'Portugais' }"
          @click="setLanguage('Portugais')">
          Portugais
        </button>
        <!-- Mettez tous vos autres boutons de langue ici -->
      </div>
  </div>
</template>
  
  <script>
  import axios from 'axios';


  export default {
    name: 'LanguageSelection',
    data() {
      return {
      selectedLanguage: '',
      user: null
      }
    },
    async created() {
    try {
      const response = await axios.get('http://localhost:3000/seat/13B');
      this.user = response.data;
      this.selectedLanguage = this.user.language;
    } catch (error) {
      console.error(error);
    }
  },
    methods: {
      setLanguage(language) {
        this.selectedLanguage = language;
        console.log(`La langue du film a été modifiée en ${language}`);
      },
    },
  };
  </script>
  
  <style src="../styles/PageLangue.css" lang="css"></style>
  