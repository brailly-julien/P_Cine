<template>
  <div class="page-panier">
    <router-link to="/PageRestauration">
      <img src="../assets/back.png" alt="{{ $t('return') }}" class="back-button"/>
    </router-link>
<<<<<<< Updated upstream
    <h1>Panier</h1>
    <p v-if="isCartEmpty">Vous n'avez rien dans votre panier.</p>

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

    <button class="order-button" @click="order" v-if="!isCartEmpty">Commander</button>
  </div>
=======
    <h1>{{ $t('cart') }}</h1>
  </div>

  <ul class="cart-list">
  <li v-for="(item, index) in cartItems" :key="index" class="cart-item">
    <div class="item-image">
      <img :src="item.image" :alt="item.type" />
    </div>
    <div class="item-info">
      <h3>{{ item.type }}</h3>
      <p>{{ $t('quantity') }}: {{ item.quantity }}</p>
      <p>{{ $t('price') }}: {{ item.price * item.quantity}}</p>
    </div>
    <div class="item-actions">
      <button @click="removeFromCart(item)">{{ $t('remove') }}</button>
    </div>
  </li>
</ul>
<button class="order-button" @click="order" :disabled="isCartEmpty">{{ $t('order') }}</button>

>>>>>>> Stashed changes
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
