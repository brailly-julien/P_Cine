<template>
  <div class="page-restauration">
    <router-link to="/CinemaMenu">
      <img src="../assets/back.png" alt="{{ $t('return') }}" class="back-button"/>
    </router-link>
    <router-link to="/pagepanier">
      <img src="../assets/cart.png" alt="Panier" class="panier-button"/>
      <div class="panier-quantity" v-if="totalQuantity > 0">{{ totalQuantity }}</div>
    </router-link>

    <h1>{{ $t('restauration') }}</h1>
    <div class="user-credit">
      Crédit : {{ userCredit }} €
    </div>

    <div class="menu-container">
      <div class="item-container" v-bind:class="{ 'clicked': clickedItem === 'pizza' }">
        <img src="../assets/pizza.png" alt="Pizza" class="menu-img" @click="commander('pizza')"/>
        <button @click="commander('pizza')">{{ $t('orderPizza') }}</button>
        <p>Prix: {{ prices.pizza }}</p>
      </div>

      <div class="item-container" v-bind:class="{ 'clicked': clickedItem === 'boisson' }">
        <img src="../assets/boisson.png" alt="Boisson" class="menu-img" @click="commander('boisson')"/>
        <button @click="commander('boisson')">{{ $t('orderDrink') }}</button>
        <p>Prix: {{ prices.boisson }}</p>
      </div>

      <div class="item-container" v-bind:class="{ 'clicked': clickedItem === 'popcorn' }">
        <img src="../assets/popcorn.png" alt="Popcorn" class="menu-img" @click="commander('popcorn')"/>
        <button @click="commander('popcorn')">{{ $t('orderPopcorn') }}</button>
        <p v-if="prices.popcorn">Prix: {{ prices.popcorn }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PageRestauration',
  data() {
    return {
      items: [],
      clickedItem: null,
      user: null,
      quantities: {
        pizza: 0,
        boisson: 0,
        popcorn: 0
      },
      userCredit: 0
    }
  },
  async created() {
  try {
    const responseItems = await axios.get('http://localhost:3000/items');
    this.items = responseItems.data;
    
    const chair = localStorage.getItem('chosenSeat');
    const responseSeat = await axios.get(`http://localhost:3000/seat/${chair}`);
    this.userId = responseSeat.data.id;

    if (!this.userId) {
      alert("Veuillez vous identifier avant de passer une commande.");
      return;
    }
    const responseUser = await axios.get(`http://localhost:3000/users/${this.userId}`);
    this.userCredit = responseUser.data.credit;

  } catch (err) {
    console.error(err);
  }
},


  computed: {
    totalQuantity() {
      return this.$store.state.cart.reduce((total, item) => total + item.quantity, 0);
    },
    prices() {
      const prices = {};
      this.items.forEach(item => {
        prices[item.type] = item.tarif;
      });
      return prices;
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
      console.log(`Vous avez commandé ${type}, au tarif de ${this.prices[type]}`);
      setTimeout(() => { // Réinitialise clickedItem à null après 1 seconde
        this.clickedItem = null;
      }, 250);
    }
  }
};
</script>



<style src="../styles/PageRestauration.css" lang="css"></style>
