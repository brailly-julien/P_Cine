<template>
  <div class="cinema-menu">
    <div v-if="user" class="user-info">
      <h1>{{ $t('welcome') }} {{ user.firstname }} !</h1>
    </div>
    <p>{{ $t('whattodo') }}</p>
    <div class="CinemaMenu-options">
      <router-link to="/pagerestauration">
        <button class="CinemaMenu-option">{{ $t('order') }}</button>
      </router-link>
      <router-link to="/pagesetup">
        <button class="CinemaMenu-option">{{ $t('setup') }}</button>
      </router-link>
      
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CinemaMenu',
  data() {
    return {
      user: null
    };
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:3000/seat/13B');
      this.user = response.data;
    } catch (error) {
      console.error(error);
    }
  }
}
</script>


<style src="../styles/CinemaMenu.css" lang="css"></style>
