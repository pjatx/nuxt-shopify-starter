export const state = () => ({
  items: [],
  checkout: null,
  cartDrawerActive: false
})
export const getters = {
  cartProducts: (state, getters, rootState) => {
    return state.items.map(item => {
      return {
        ...item
      }
    })
  },
  cartDrawerStatus: (state, getters, rootState) => {
    return state.cartDrawerActive
  },
  cartCount: (state, getters, rootState) => {
    let total = state.items.reduce((acc, item) => acc + item.quantity, 0)
    return total
  },
  checkout: (state, getters, rootState) => {
    return state.checkout
  }
}
export const mutations = {
  pushProductToCart(state, variant) {
    state.items.push({
      ...variant,
      quantity: 1
    })
  },

  removeProductFromCart(state, { id }) {
    const cartItem = state.items.find(item => item.id === id)
    cartItem.quantity = 0
  },

  updateCartQty(state, data) {
    const cartItem = state.items.find(item => item.id === data.cartItem.id)
    cartItem.quantity = data.qty
  },

  setCartItems(state, { items }) {
    state.items = items
  },

  setCheckout(state, checkout) {
    state.checkout = checkout
  },

  closeCartDrawer(state) {
    state.cartDrawerActive = false
  },

  openCartDrawer(state) {
    state.cartDrawerActive = true
  }
}
export const actions = {
  setCheckout({ commit, state }, checkout) {
    commit('setCheckout', checkout)
  },

  addProductToCart({ state, commit }, variant) {
    if (variant.available) {
      const cartItem = state.items.find(item => item.id === variant.id)
      if (!cartItem) {
        commit('pushProductToCart', variant)
      } else {
        commit('incrementItemQuantity', variant)
      }
    }
  },

  decrementProductFromCart({ state, commit }, product) {
    const cartItem = state.items.find(item => item.id === product.id)

    if (cartItem.quantity > 0) {
      commit('decrementItemQuantity', cartItem)
    }
  },

  removeProductFromCart({ state, commit }, product) {
    const cartItem = state.items.find(item => item.id === product.id)
    commit('removeProductFromCart', cartItem)
  },

  updateCartQty({ state, commit }, data) {
    const cartItem = state.items.find(item => item.id === data.item.id)

    const payload = {
      cartItem: cartItem,
      qty: data.qty
    }
    commit('updateCartQty', payload)
  },

  toggleCartDrawer({ state, commit }) {
    const cartDrawerActive = state.cartDrawerActive

    if (cartDrawerActive) {
      commit('closeCartDrawer')
    } else {
      commit('openCartDrawer')
    }
  },

  closeCartDrawer({ state, commit }) {
    commit('closeCartDrawer')
  },

  openCartDrawer({ state, commit }) {
    commit('openCartDrawer')
  }
}
