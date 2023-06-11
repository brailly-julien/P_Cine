<template>
  <div class="page-panier">
    <router-link to="/PageRestauration">
      <img src="../assets/back.png" alt="Retour" class="back-button"/>
    </router-link>
    <h1>Panier</h1>
  </div>

  <ul class="cart-list">
  <li v-for="(item, index) in cartItems" :key="index" class="cart-item">
    <div class="item-image">
      <img :src="item.image" :alt="item.type" />
    </div>
    <div class="item-info">
      <h3>{{ item.type }}</h3> <!-- Change title to type -->
      <p>Quantity: {{ item.quantity }}</p>
      <p>Price: {{ item.price * item.quantity}}</p>
    </div>
    <div class="item-actions">
      <button @click="removeFromCart(item)">Remove</button>
    </div>
  </li>
</ul>

</template>

<script>
export default {
  name: 'PagePanier',
  computed: {
    cartItems() {
      return this.$store.state.cart;
    },
  },
  methods: {
    removeFromCart(item) {
      this.$store.dispatch('removeFromCart', item);
    },
  },
}
</script>

<style src="../styles/PagePanier.css" lang="css"></style>
