<template>
  <div class="cinema-menu">
    <h1>Menu</h1>
    <div class="CinemaMenu-options">
      <router-link to="/pagerestauration">
        <button class="CinemaMenu-option">Commander</button>
      </router-link>
      <router-link to="/pagesetup">
        <button class="CinemaMenu-option">Réglage</button>
      </router-link>
      
    </div>
  </div>
</template>

<script>
export default {
  name: 'CinemaMenu'
}
</script>

<style src="../styles/CinemaMenu.css" lang="css"></style>
