export const state = () => ({
  items: [],
  checkoutStatus: null,
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
  }
}
export const mutations = {
  pushProductToCart(state, product) {
    state.items.push({
      ...product,
      quantity: 1
    })
  },

  incrementItemQuantity(state, { id }) {
    const cartItem = state.items.find(item => item.id === id)
    cartItem.quantity++
  },

  decrementItemQuantity(state, { id }) {
    const cartItem = state.items.find(item => item.id === id)
    cartItem.quantity--
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

  setCheckoutStatus(state, status) {
    state.checkoutStatus = status
  },

  closeCartDrawer(state) {
    state.cartDrawerActive = false
  },

  openCartDrawer(state) {
    state.cartDrawerActive = true
  }
}
export const actions = {
  checkout({ commit, state }, products) {
    const savedCartItems = [...state.items]
    commit('setCheckoutStatus', null)
    // empty cart
    commit('setCartItems', { items: [] })
    shop.buyProducts(
      products,
      () => commit('setCheckoutStatus', 'successful'),
      () => {
        commit('setCheckoutStatus', 'failed')
        // rollback to the cart saved before sending the request
        commit('setCartItems', { items: savedCartItems })
      }
    )
  },

  addProductToCart({ state, commit }, product) {
    commit('setCheckoutStatus', null)
    if (product.variants[0].available) {
      const cartItem = state.items.find(item => item.id === product.id)
      if (!cartItem) {
        commit('pushProductToCart', product)
      } else {
        commit('incrementItemQuantity', cartItem)
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
    console.log(product)
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
