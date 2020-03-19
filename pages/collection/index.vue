<template>
  <div class="container">
    <div>
      <h1 class="title">tester</h1>
      <h2 class="subtitle">My amazing Nuxt.js project</h2>
      <div class="products">
        <CollectionCard
          v-for="(collection, index) in collections"
          :key="index"
          :collection="collection"
          :data-index="index"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CollectionCard from '~/components/CollectionCard.vue'
import { mapState } from 'vuex'

export default {
  components: {
    CollectionCard
  },
  async fetch({ store, error }) {
    try {
      await store.dispatch('products/fetchAllCollections')
    } catch (e) {
      error({
        statusCode: 503,
        message:
          'Unable to fetch products at this time. Please try again later.'
      })
    }
  },
  computed: mapState({
    collections: state => state.products.collections
  })
}
</script>

<style lang="scss" scoped>
body {
  background-color: #fff;
}

.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.products {
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  text-align: center;
  justify-content: center;
}
</style>
