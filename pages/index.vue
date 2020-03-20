<template>
  <div>
    <section class="hero is-medium">
      <div class="hero-body">
        <div class="container is-centered">
          <h1 class="title">Hero title</h1>
          <h2 class="subtitle">Hero subtitle</h2>
        </div>
      </div>
    </section>
    <div class="container products__grid">
      <div class="columns is-3 is-multiline">
        <ProductCard
          v-for="(product, index) in products"
          :key="index"
          :product="product"
          :data-index="index"
          class="column is-3"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from '~/components/ProductCard.vue'
import { mapState } from 'vuex'

export default {
  components: {
    ProductCard
  },
  async fetch({ store, error }) {
    try {
      await store.dispatch('products/fetchAllProducts')
    } catch (e) {
      error({
        statusCode: 503,
        message:
          'Unable to fetch products at this time. Please try again later.'
      })
    }
  },
  computed: mapState({
    products: state => state.products.products
  })
}
</script>

<style lang="scss" scoped>
body {
  background-color: #fff;
}

.products {
  &__grid {
  }
}
</style>
