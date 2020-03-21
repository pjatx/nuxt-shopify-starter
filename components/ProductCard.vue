<template>
  <div>
    <nuxt-link class="product-card__link" :to="'/product/' + product.id">
      <div class="product-card">
        <picture v-lazy-container="{ selector: 'img' }">
          <source :srcset="product.images[0].src +'?webp'" type="image/webp" />
          <source :srcset="product.images[0].src" type="image/jpeg" />
          <img :data-src="product.images[0].src" data-loading="~/assets/images/placeholder.gif" />
        </picture>
        <div class="product-card__footer">
          <h3 class="title is-6">{{ product.title }}</h3>
          <h4 class="subtitle has-text-grey">{{ product.productType }}</h4>
          <span class="product-card__price">{{ product.variants[0].price | currency }}</span>
          <div class="product-card__footer--bottom">
            <b-button
              class="button add-to-cart is-primary"
              expanded
              @click.stop="addToCart(primaryVariant)"
              v-on:click.prevent
            >ADD TO CART</b-button>
          </div>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ProductCard',
  props: {
    product: Object
  },
  computed: {
    primaryVariant() {
      const variant = this.product.variants[0]
      variant.productName = this.product.title
      return variant
    }
  },
  methods: {
    ...mapActions('cart', ['addProductToCart']),
    ...mapActions('cart', ['toggleCartDrawer']),
    async addToCart(variant) {
      const cart = await this.addProductToCart(variant)
      this.toggleCartDrawer()
    }
  }
}
</script>

<style scoped lang="scss">
.product-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: rgba(213, 213, 213, 0.4) 0px 5px 14px 0px;
  position: relative;
  text-align: center;
  border-radius: 6px;
  padding: 30px 15px 25px;
  background: white;
  transition: all 0.3s ease 0s;
  height: 100%;
  z-index: 1;

  &__link {
    z-index: 2;
  }

  .title {
    text-transform: capitalize;
    font-size: 1rem;
  }

  .subtitle {
    font-size: 0.75rem;
    margin-bottom: 0.75rem;
  }

  img {
    width: 60%;
    height: auto;
    object-fit: contain;
    margin: auto;
  }

  &__price {
    font-size: 1rem;
    font-weight: 500;
  }

  &__footer {
    display: flex;
    flex-direction: column;

    &--bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem 0;
    }
  }

  .add-to-cart {
    z-index: 10;
  }
}
</style>