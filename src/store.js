import { createStore } from 'vuex'

export const store = createStore({
  state: {
    cart: [],
  },
  mutations: {
    addToCart(state, item) {
      const found = state.cart.find(product => product.title === item.title)
      if (found) {
        found.quantity++
        return
      }
      state.cart.push(item)
    },
    removeFromCart(state, item) {
      const index = state.cart.indexOf(item);
      if (index > -1) {
        state.cart.splice(index, 1);
      }
    },
    updateItemQuantity(state, {item, quantity}) {
      const found = state.cart.find(product => product.title === item.title)
      if (found) {
        found.quantity = quantity
      }
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
