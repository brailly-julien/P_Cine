<template>
  <div class="page-panier">
    <router-link to="/PageRestauration">
      <img src="../assets/back.png" alt="{{ $t('return') }}" class="back-button"/>
    </router-link>
    <h1>{{ $t('cart') }}</h1>
    <p v-if="isCartEmpty">{{ $t('cartempty') }}</p>

    <ul class="cart-list" v-else>
      <li v-for="(item, index) in cartItems" :key="index" class="cart-item">
        <div class="item-image">
          <img :src="item.image" :alt="item.type" />
        </div>
        <div class="item-info">
          <h3>{{ item.type }}</h3>
          <div class="quantity-controls">
            <button @click="decreaseQuantity(item)">-</button>
            <p> {{ item.quantity }} </p>
            <button @click="increaseQuantity(item)">+</button>
          </div>
          <p>Prix: {{ item.price * item.quantity}}</p>
        </div>
      </li>
    </ul>

    <button class="order-button" @click="order" v-if="!isCartEmpty">Commander pour {{ totalPrice }}€</button>
  </div>
</template>

<script>
export default {
  name: 'PagePanier',
  computed: {
    cartItems() {
      return this.$store.state.cart;
    },
    isCartEmpty() {
      return this.cartItems.length === 0;
    },
    totalPrice() {
      return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    },
  },
  methods: {
    decreaseQuantity(item) {
      if (item.quantity > 1) {
        this.$store.dispatch('updateQuantity', { item, quantity: item.quantity - 1 });
      } else {
        this.$store.dispatch('removeFromCart', item);
      }
    },
    increaseQuantity(item) {
      this.$store.dispatch('updateQuantity', { item, quantity: item.quantity + 1 });
    },
    order() {
      this.$store.commit('clearCart');
      alert("Votre commande est prise en charge");
    },
  },
}
</script>

<style src="../styles/PagePanier.css" lang="css"></style>
