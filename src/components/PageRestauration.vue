<template>
  <div class="page-restauration">
    <router-link to="/CinemaMenu">
      <img src="../assets/back.png" alt="Retour" class="back-button"/>
    </router-link>
    <router-link to="/pagepanier">
      <img src="../assets/cart.png" alt="Panier" class="panier-button"/>
    </router-link>

    <h1>Restauration</h1>

    <div class="menu-container">
      <div class="item-container">
        <img src="../assets/pizza.png" alt="Pizza" class="menu-img" @click="commander('pizza')"/>
        <button @click="commander('pizza')">Commander une pizza</button>
      </div>

      <div class="item-container">
        <img src="../assets/boisson.png" alt="Boisson" class="menu-img" @click="commander('boisson')"/>
        <button @click="commander('boisson')">Commander une boisson</button>
      </div>

      <div class="item-container">
        <img src="../assets/popcorn.png" alt="Popcorn" class="menu-img" @click="commander('popcorn')"/>
        <button @click="commander('popcorn')">Commander du popcorn</button>
      </div>
    </div>

  </div>
</template>


<script>

export default {
  name: 'PageRestauration',
  data() {
    return {
      prices: {
        pizza: 10,
        boisson: 5,
        popcorn: 7
      }
    }
  },
  methods: {
    commander(type) {
      const item = {
        type: type,
        image: require(`../assets/${type}.png`),
        price: this.prices[type], // Use the price from the prices object
        quantity: 1
      };

      this.$store.commit('addToCart', item);
      console.log(`Vous avez commandé ${type}, at ${this.prices[type]}`);
    },
    
  },
};
</script>

<style src="../styles/PageRestauration.css" lang="css"></style>
