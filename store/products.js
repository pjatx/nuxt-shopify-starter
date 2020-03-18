export const state = () => ({
  products: []
})
export const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products
  }
}
export const actions = {
  async fetchAllProducts({ commit }) {
    const products = await this.$shopify.product.fetchAll()
    commit('SET_PRODUCTS', products)
  }
}
