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
            <div class="product-qty">
              <input
                type="number"
                min="1"
                class="product-qty__input"
                name="quantity"
                v-model="productQty"
              />
              <div class="product-qty__adjust">
                <div class="product-qty__adjust-btn"></div>
                <div class="product-qty__adjust-btn"></div>
              </div>
            </div>
            <b-button class="product__add-to-cart" type="is-dark">
              {{ product.variants[0].price | currency }} |
              <strong>Add to Cart</strong>
            </b-button>
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
export default {
  data: function() {
    return {
      productQty: 1
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

    &__add-to-cart {
      margin-top: 1.5rem;
      padding-left: 2rem;
      padding-right: 2rem;
      padding-top: calc(1em - 1px);
      padding-bottom: calc(1em - 1px);
      font-size: 1rem;
      height: auto;
    }
  }
}

.product-qty {
  display: flex;
  width: 72px;
  max-width: 72px;
  flex-basis: 72px;
  border-radius: 6px;
  border: 1px solid #d2d4d6;
  box-shadow: inset 0 3px 0 0 rgba(0, 0, 0, 0.04), 0 2px 0 0 rgba(0, 0, 0, 0.02);

  &__input {
    dflex: 1;
    font-size: 24px;
    text-align: center;
    min-width: 1px;
    padding: 10px 0 10px 12px;
    border: 0;
    box-shadow: none;
    background-color: transparent;
  }

  &__adjust {
    display: flex;
    flex-flow: column nowrap;
    padding: 3px 0;
  }

  &__adjust-btn {
    flex: 1;
    width: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.carousel__container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>