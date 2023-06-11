import { createStore } from 'vuex'

export const store = createStore({
  state: {
    cart: [],
  },
  mutations: {
    addToCart(state, item) {
      // Recherche d'un élément existant avec le même type
      const existingItem = state.cart.find(cartItem => cartItem.type === item.type);
  
      if (existingItem) {
        // Si un élément existant est trouvé, augmentez sa quantité
        existingItem.quantity += item.quantity;
      } else {
        // Sinon, ajoutez le nouvel élément au panier
        state.cart = [...state.cart, item];
      }
    },
    removeFromCart(state, item) {
      // Recherche d'un élément existant avec le même type
      const existingItem = state.cart.find(cartItem => cartItem.type === item.type);
  
      if (existingItem) {
        // Si la quantité de l'élément est supérieure à 1, décrémentez-la
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          // Sinon, supprimez l'élément du panier
          const index = state.cart.indexOf(existingItem);
          if (index > -1) {
            state.cart.splice(index, 1);
          }
        }
      }
    },
    updateItemQuantity(state, {item, quantity}) {
      const found = state.cart.find(product => product.title === item.title)
      if (found) {
        found.quantity = quantity
      }
    },

    clearCart(state) {
      state.cart = [];
    }
  },
  actions: {
    addToCart(context, item) {
      context.commit('addToCart', item)
    },
    removeFromCart(context, item) {
      context.commit('removeFromCart', item)
    },
    updateItemQuantity(context, {item, quantity}) {
      context.commit('updateItemQuantity', {item, quantity})
    }
  },
})
