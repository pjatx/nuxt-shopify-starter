<template>
  <div class="product">
    <section class="product__hero">
      <div class="container">
        <div class="columns">
          <div class="column product__images">
            <nav class="breadcrumb" aria-label="breadcrumbs">
              <ul>
                <li>
                  <nuxt-link to="/">All Products</nuxt-link>
                </li>
                <li class="is-active">
                  <nuxt-link to="#" aria-current="page">{{ product.title }}</nuxt-link>
                </li>
              </ul>
            </nav>
            <b-carousel :autoplay="false">
              <b-carousel-item v-for="(carousel, i) in carousels" :key="i">
                <div class="carousel__container">
                  <img :src="carousel" alt />
                </div>
              </b-carousel-item>
            </b-carousel>
          </div>
          <div class="column product__detail">
            <h1 class="title">{{ product.title }}</h1>
            <div v-html="product.descriptionHtml" class="product__description"></div>
            <div class="product__add-to-cart-container">
              <product-qty-input v-on:qtyChange="updateQty"></product-qty-input>
              <b-button class="product__add-to-cart" type="is-dark">
                <span v-if="product">{{ price | currency }} |</span>
                <strong>Add to Cart</strong>
              </b-button>
            </div>

            <div
              class="product__reassurance"
            >Skip or cancel anytime. Money-Back Guarantee. Free Shipping.</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ProductQtyInput from '~/components/ProductQtyInput'

export default {
  components: {
    ProductQtyInput
  },
  data: function() {
    return {
      productQty: 1
    }
  },
  methods: {
    updateQty(value) {
      this.productQty = value
    }
  },
  async asyncData({ $shopify, error, params }) {
    try {
      const product = await $shopify.product.fetch(params.id)
      return { product }
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Unable to fetch event #' + params.id
      })
    }
  },
  computed: {
    price() {
      return this.product.variants[0].price * this.productQty
    },
    carousels() {
      return this.product.images.map(a => a.src)

      // objArray.map(a => a.foo);
    }
  }
}
</script>

<style lang="scss" scoped>
.product {
  @include from($desktop) {
    margin-top: 2rem;
    margin-bottom: 2rem;

    &__hero {
      .container {
        // background-color: #f5f5f5;
        padding: 4rem;
        border-radius: 2px;
      }
    }

    &__detail {
      display: flex;
      justify-content: center;
      flex-direction: column;
      padding: 0 8rem;
    }

    &__add-to-cart-container {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      margin-top: 1.5rem;
    }

    &__add-to-cart {
      padding-left: 2rem;
      padding-right: 2rem;
      padding-top: calc(1em - 1px);
      padding-bottom: calc(1em - 1px);
      font-size: 1rem;
      height: auto;
    }
  }
}

.carousel__container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>