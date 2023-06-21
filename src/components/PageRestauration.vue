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
      <div class="item-container" v-bind:class="{ 'clicked': clickedItem === 'pizza' }">
        <img src="../assets/pizza.png" alt="Pizza" class="menu-img" @click="commander('pizza')"/>
        <button @click="commander('pizza')">Commander une pizza</button>
      </div>

      <div class="item-container" v-bind:class="{ 'clicked': clickedItem === 'boisson' }">
        <img src="../assets/boisson.png" alt="Boisson" class="menu-img" @click="commander('boisson')"/>
        <button @click="commander('boisson')">Commander une boisson</button>
      </div>


      <div class="item-container" v-bind:class="{ 'clicked': clickedItem === 'popcorn' }">
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
      },
      clickedItem: null
    }
  },
  methods: {
  commander(type) {
    this.clickedItem = type;
    const item = {
      type: type,
      image: require(`../assets/${type}.png`),
      price: this.prices[type],
      quantity: 1
    };
    this.$store.commit('addToCart', item);
    console.log(`Vous avez commandé ${type}, at ${this.prices[type]}`);
    setTimeout(() => { // Réinitialise clickedItem à null après 1 seconde
      this.clickedItem = null;
    }, 250);
  }
},
};
</script>

<style src="../styles/PageRestauration.css" lang="css"></style>
