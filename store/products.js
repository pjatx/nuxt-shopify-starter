export const state = () => ({
  products: [],
  collections: []
})
export const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products
  },
  SET_COLLECTIONS(state, collections) {
    state.collections = collections
  }
}
export const actions = {
  async fetchAllProducts({ commit }) {
    const products = await this.$shopify.product.fetchAll()
    commit('SET_PRODUCTS', products)
  },

  async fetchAllCollections({ commit }) {
    const collections = await this.$shopify.collection.fetchAll()
    commit('SET_COLLECTIONS', collections)
  }
}
