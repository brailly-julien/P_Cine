<template>
    <div class="page-son">
        <router-link to="/PageSetup">
            <img src="../assets/back.png" alt="Retour" class="back-button"/>
        </router-link> 
        <h1>Modificateur son</h1>
  
        <div class="control">
            <label for="slider">Basse :</label>
            <input id="slider" type="range" v-model="sliderValue1" min="0" max="100"/>
            <span>{{ sliderValue1 }}</span>
        </div>
        <div class="control">
            <label for="slider">Grave :</label>
            <input id="slider" type="range" v-model="sliderValue2" min="0" max="100"/>
            <span>{{ sliderValue2 }}</span>
        </div>
        <div class="control">
            <label for="slider">Aigu :</label>
            <input id="slider" type="range" v-model="sliderValue3" min="0" max="100"/>
            <span>{{ sliderValue3 }}</span>
        </div>

    </div>
</template>
  
  <script>
  export default {
    name: 'PageSon',
    data() {
      return {
        sliderValue1: 50,
        sliderValue2: 75,
        sliderValue3: 25,
      }
    }
  }
  </script>
  
  <style src="../styles/PageSon.css" lang="css"></style>
  