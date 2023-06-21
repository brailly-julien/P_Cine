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
      async setLanguage(language) {
        try {
          console.log(`Mise à jour de la langue pour l'utilisateur ${this.user.id} à ${language}`); 
          await axios.put(`http://localhost:3000/user/${this.user.id}`, {
            language: language
          });
          console.log(`La langue a été mise à jour avec succès pour l'utilisateur ${this.user.id}`);
          this.selectedLanguage = language; // Met à jour la valeur de la langue sélectionnée dans le composant Vue.js
        } catch (error) {
          console.error(error);
      }
    },
  },
};
  </script>
  
  <style src="../styles/PageLangue.css" lang="css"></style>
