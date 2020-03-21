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
            <h1 class="title is-2">{{ product.title }}</h1>
            <div v-html="product.descriptionHtml" class="product__description"></div>

            <product-variant-selector
              v-on:variantChange="updateVariant"
              :variants="product.variants"
            />

            <div class="product__add-to-cart-container">
              <product-qty-input v-on:qtyChange="updateQty" />
              <b-button
                class="product__add-to-cart"
                type="is-dark"
                @click="addToCart(selectedVariant)"
                expanded
              >
                <span v-if="product">{{ total | currency }} |</span>
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
import ProductQtyInput from '~/components/product/ProductQtyInput'
import ProductVariantSelector from '~/components/product/ProductVariantSelector'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    ProductVariantSelector,
    ProductQtyInput
  },
  data: function() {
    return {
      productQty: 1,
      selectedVariant: ''
    }
  },
  methods: {
    ...mapActions('cart', ['addProductToCart']),
    ...mapActions('cart', ['toggleCartDrawer']),

    addToCart(product) {
      this.addProductToCart(product)
      this.toggleCartDrawer()
    },

    updateQty(value) {
      this.productQty = value
    },
    updateVariant(value) {
      this.variant = value
      this.selectedVariant = this.product.variants.find(
        variant => variant.id === this.variant
      )
      this.selectedVariant.productName = this.product.title
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
    total() {
      return this.selectedVariant.price * this.productQty
    },
    carousels() {
      return this.product.images.map(a => a.src)
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

    &__variants {
      margin: 2rem 0;
    }

    &__add-to-cart-container {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
    }

    &__add-to-cart {
      padding-left: 2rem;
      padding-right: 2rem;
      padding-top: calc(1em - 1px);
      padding-bottom: calc(1em - 1px);
      font-size: 1rem;
      height: auto;
    }

    &__reassurance {
      margin: 1rem 0;
      font-size: 0.75rem;
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