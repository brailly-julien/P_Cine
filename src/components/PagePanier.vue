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
import axios from 'axios';


export default {
  name: 'PagePanier',
  data() {
    return {
      userCredit: 0,
    }
  },
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

    order: async function() {
      const chair = localStorage.getItem('chosenSeat');
      let response = null;
      try {
        response = await axios.get(`http://localhost:3000/seat/${chair}`);
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur:', error);
        return;
      }
      this.user = response.data;
      this.userId = this.user.id;
      if (!this.userId) {
        alert("Veuillez vous identifier avant de passer une commande.");
        return;
      }
      const responseUser = await axios.get(`http://localhost:3000/users/${this.userId}`);
      this.userCredit = responseUser.data.credit;
      // Vérifier si le crédit de l'utilisateur est suffisant
      if (this.userCredit < this.totalPrice) {
        alert('Votre crédit est insuffisant pour cette commande.');
        return;
      }
  // Soustraire le total de la commande du crédit de l'utilisateur
  this.userCredit -= this.totalPrice;

  axios.post('http://localhost:3000/carts', { id_user: this.userId, prixttc: this.totalPrice })
    .then(response => {
      this.$store.commit('clearCart');
      
      // Mettre à jour le crédit de l'utilisateur dans la base de données
      // Mettre à jour le crédit de l'utilisateur dans la base de données
      axios.put(`http://localhost:3000/user/${this.userId}`, { credit: this.userCredit })
        .then(response => {
          console.log('Crédit utilisateur mis à jour:', response.data);
        })
        .catch(error => {
          console.error('Erreur lors de la mise à jour du crédit de l\'utilisateur:', error);
        });
      alert(`Votre commande est prise en charge. L'identifiant de votre facture est ${response.data.invoiceId}`);
    })
    .catch(error => {
      console.error('Erreur lors de la passation de la commande:', error);
      alert('Une erreur s\'est produite lors de la passation de votre commande. Veuillez réessayer plus tard.');
    });
}

  },
}
</script>

<style src="../styles/PagePanier.css" lang="css"></style>
