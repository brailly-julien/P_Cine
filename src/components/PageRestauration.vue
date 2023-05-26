<template>
  <div class="page-restauration">
    <router-link to="/CinemaMenu">
      <img src="../assets/back.png" alt="Retour" class="back-button"/>
    </router-link>
    <router-link to="/pagepanier">
      <img src="../assets/cart.png" alt="Panier" class="panier-button"/>
    </router-link>

    <h1>Restauration</h1>

    <h2>Pizzas</h2>
    <button @click="commander('pizza')">Commander une pizza</button>

    <img src="../assets/drink.png" alt="Drink" class="menu-img"/>
    <button @click="commander('boisson')">Commander une boisson</button>

    <h2>Popcorn</h2>
    <button @click="commander('popcorn')">Commander du popcorn</button>

  </div>
</template>

<script>

export default {
  name: 'PageRestauration',
  methods: {
    commander(type) {
      // Ici vous pouvez ajouter le code pour enregistrer la commande
      this.$store.dispatch('addToCart', type);
      console.log(`Vous avez commandé ${type}`);
    },
  },
};
</script>

<style src="../styles/PageRestauration.css" lang="css"></style>
