<template>
  <div class="page-restauration">
    <router-link to="/CinemaMenu">
      <img src="../assets/back.png" alt="{{ $t('return') }}" class="back-button"/>
    </router-link>
    <router-link to="/pagepanier">
<<<<<<< Updated upstream
      <img src="../assets/cart.png" alt="Panier" class="panier-button"/>
      <div class="panier-quantity" v-if="totalQuantity > 0">{{ totalQuantity }}</div>
=======
      <img src="../assets/cart.png" alt="{{ $t('cart') }}" class="panier-button"/>
>>>>>>> Stashed changes
    </router-link>

    <h1>{{ $t('restauration') }}</h1>

    <div class="menu-container">
      <div class="item-container" v-bind:class="{ 'clicked': clickedItem === 'pizza' }">
        <img src="../assets/pizza.png" alt="Pizza" class="menu-img" @click="commander('pizza')"/>
        <button @click="commander('pizza')">{{ $t('orderPizza') }}</button>
      </div>

      <div class="item-container" v-bind:class="{ 'clicked': clickedItem === 'boisson' }">
        <img src="../assets/boisson.png" alt="Boisson" class="menu-img" @click="commander('boisson')"/>
        <button @click="commander('boisson')">{{ $t('orderDrink') }}</button>
      </div>

      <div class="item-container" v-bind:class="{ 'clicked': clickedItem === 'popcorn' }">
        <img src="../assets/popcorn.png" alt="Popcorn" class="menu-img" @click="commander('popcorn')"/>
        <button @click="commander('popcorn')">{{ $t('orderPopcorn') }}</button>
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
      clickedItem: null,
      quantities: {
        pizza: 0,
        boisson: 0,
        popcorn: 0
      }
    }
  },
  computed: {
    totalQuantity() {
      return this.$store.state.cart.reduce((total, item) => total + item.quantity, 0);
    }
  },
  methods: {
  commander(type) {
    this.clickedItem = type;
    this.quantities[type] += 1;
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
