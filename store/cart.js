export const state = () => ({
  items: [],

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
  checkoutId: (state, getters, rootState) => {
    return state.checkoutId
  }
}
export const mutations = {
  pushProductToCart(state, variant) {
    state.items.push({
      ...variant,
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

  setCheckoutId(state, checkoutId) {
    state.checkoutId = checkoutId
  },

  closeCartDrawer(state) {
    state.cartDrawerActive = false
  },

  openCartDrawer(state) {
    state.cartDrawerActive = true
  }
}
export const actions = {
  setCheckoutId({ commit, state }, checkoutId) {
    commit('setCheckoutId', checkoutId)
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
    // To Do: Create line items state and keep in sync with shopify

    // const lineItem = {}
    // const lineItems = []
    // lineItem.variantId = cartItem.id
    // lineItem.quantity = cartItem.quantity
    // lineItems.push(lineItems)
    // this.$shopify.checkout.updateLineItems(checkoutId, lineItemsToUpdate)

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
