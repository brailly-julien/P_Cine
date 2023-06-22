<template>
    <div class="page-son">
        <router-link to="/PageSetup">
            <img src="../assets/back.png" alt="{{ $t('return') }}" class="back-button"/>
        </router-link> 
        <h1>{{ $t('soundModifier') }}</h1>
  
        <div class="control">
            <label for="slider">{{ $t('bass') }} :</label>
            <input id="slider" type="range" v-model="sliderValue1" min="0" max="100"/>
            <span>{{ sliderValue1 }}</span>
        </div>
        <div class="control">
            <label for="slider">{{ $t('low') }} :</label>
            <input id="slider" type="range" v-model="sliderValue2" min="0" max="100"/>
            <span>{{ sliderValue2 }}</span>
        </div>
        <div class="control">
            <label for="slider">{{ $t('high') }} :</label>
            <input id="slider" type="range" v-model="sliderValue3" min="0" max="100"/>
            <span>{{ sliderValue3 }}</span>
        </div>
    </div>
</template>
  
  <script>

   import axios from 'axios';
  export default {
    name: 'PageSon',
    data() {
      return {
        sliderValue1: 0,
        sliderValue2: 0,
        sliderValue3: 0,
      }
    },

    async created() {
    try {
        const chair = localStorage.getItem('chosenSeat');
        const response = await axios.get(`http://localhost:3000/seat/${chair}`);
        this.user = response.data;
        this.userid = this.user.id;
        this.sliderValue1 = this.user.basse;  
        this.sliderValue2 = this.user.grave;  
        this.sliderValue3 = this.user.aigu;  
    } catch (error) {
        console.error(error);
        }
    },
    beforeUnmount() {
      this.updateSliders();
    },

    methods: {
        async updateSliders() {
            try {

                await axios.put(`http://localhost:3000/user/${this.user.id}`, {
                    basse: this.sliderValue1,
                    grave: this.sliderValue2,
                    aigu: this.sliderValue3
                });
                console.log(`Paramètre son mis à jour avec succès pour l'utilisateur ${this.user.id}`);
            } catch (error) {
                console.error(error);
            }
        },
    },
    
  }
  </script>
  
  <style src="../styles/PageSon.css" lang="css"></style>
  