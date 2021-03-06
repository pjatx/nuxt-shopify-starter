<template>
  <div class="cart-drawer" :class="{ active: cartDrawerActive }">
    <div class="cart-drawer__wrapper" @click="closeCartDrawer"></div>
    <div class="cart-drawer__main">
      <div>
        <div class="cart-drawer__header">
          <div class="close-cart" @click="closeCartDrawer">
            <b-icon icon="close" size="is-medium"></b-icon>
          </div>
          <h2 class="title">Your Bag</h2>
        </div>
        <div class="cart-drawer__body">
          <!-- <p v-show="!cart.length">
            <i>Please add some products to cart.</i>
          </p>-->
          <div v-for="item in cart" :key="item.id" class="item" v-if="item.quantity>0">
            <div class="item__wrapper">
              <picture class="item__image">
                <img :src="item.image.src" />
              </picture>
              <div class="item__body">
                <div class="item__body--top">
                  <div class="item__heading">
                    <div class="item__title">{{ item.productName }}</div>
                    <div class="item__subtitle">{{ item.title }}</div>
                  </div>
                  <div class="item__price">{{ item.price | currency }}</div>
                </div>
                <div class="item__body--bottom">
                  <b-field class="item__quantity">
                    <b-numberinput
                      controls-rounded
                      :data-item-id="item.id"
                      :editable="false"
                      v-model="item.quantity"
                      type="is-light"
                      size="is-small"
                      @input="changeQuantity(item, $event)"
                    ></b-numberinput>
                  </b-field>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="cart-drawer__footer">
        <div class="cart-drawer__subtotal">
          <h3>Subtotal</h3>
          <div class="cart-drawer__subtotal--amount">{{ cartTotal | currency }}</div>
        </div>
        <b-button
          type="is-primary"
          size="is-large"
          @click="doCheckout(lineItems)"
          :disabled="!cart"
          :loading="checkoutLoading"
          expanded
        >Checkout</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'

export default {
  data: function() {
    return {
      checkoutLoading: false
    }
  },
  computed: {
    ...mapGetters('cart', {
      cart: 'cartProducts'
    }),
    ...mapGetters('cart', {
      checkout: 'checkout'
    }),
    ...mapState({
      cartDrawerActive: state => state.cart.cartDrawerActive
    }),
    ...mapState({
      checkout: state => state.cart.checkout
    }),
    cartTotal() {
      var total

      if (this.cart) {
        var total = this.cart.reduce(
          (acc, item) => acc + parseFloat(item.price * item.quantity),
          0
        )
      } else {
        var total = 0
      }

      return total
    },
    lineItems() {
      let lineItems = this.cart.map(function(item) {
        return {
          variantId: item.id,
          quantity: item.quantity
        }
      })

      return lineItems
    }
  },
  methods: {
    async doCheckout(lineItems) {
      this.checkoutLoading = true

      // To Do: COnditionally create a new checkout if user doesn't have an existing one
      var checkoutObj
      if (!this.checkout) {
        checkoutObj = await this.$shopify.checkout.create()
      } else {
        checkoutObj = await this.$shopify.checkout.fetch(this.checkout.id)
      }

      const checkoutId = checkoutObj.id
      const checkoutItems = await this.$shopify.checkout.addLineItems(
        checkoutId,
        lineItems
      )

      this.setCheckout(checkoutObj)

      // window.location = checkoutObj.webUrl
    },
    ...mapActions('cart', ['setCheckout']),
    toggleDrawer() {
      this.$store.dispatch('cart/toggleCartDrawer')
    },
    closeCartDrawer() {
      this.$store.dispatch('cart/closeCartDrawer')
    },
    changeQuantity(item, qty) {
      this.$store.dispatch('cart/updateCartQty', { item, qty })
    }
  }
}
</script>

<style lang="scss">
.cart-drawer {
  &__wrapper {
    position: fixed;
    top: 0;
    left: 0;
    background: #fff;
    z-index: 900;
    width: 100%;
    height: 100%;
    cursor: pointer;
    transition: opacity 0.5s ease;
    opacity: 0;
    pointer-events: none;
    z-index: 40;
  }

  &__main {
    position: fixed;
    top: 1.5rem;
    top: 1.5rem;
    right: 0;
    height: calc(100% - 3rem);
    border-radius: 0.5rem;
    background: #fff;
    box-shadow: -4px 0 16px 0 rgba(0, 0, 0, 0.04);
    z-index: 0;
    transition: transform 0.8s cubic-bezier(0.32, 0.24, 0.15, 1);
    transform: translateX(100%);

    text-align: left;
    padding: 1.5rem 1.5rem 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 50;
    width: calc(100% - 3rem);
    max-width: calc(100% - 3rem);

    @include from($desktop) {
      width: 27rem;
      max-width: calc(100% - 3rem);
    }
  }

  &.active {
    .cart-drawer__wrapper {
      opacity: 1;
      pointer-events: auto;

      @include from($desktop) {
        background: #000;
        opacity: 0.5;
      }
    }

    .cart-drawer__main {
      z-index: 900;
      transition: transform 0.8s cubic-bezier(0.32, 0.24, 0.15, 1);
      transform: translateX(0);
      right: 1.5rem;
    }
  }

  &__header {
    text-align: center;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
  }

  &__body {
    margin-top: 4rem;
    max-height: calc(100vh - 24rem);
    overflow: scroll;
    display: block;
  }

  &__footer {
    padding: 1rem;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 0;
    width: calc(100% - 3rem);
    background: $white;
  }

  &__subtotal {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 2rem 0;

    h3 {
      font-size: 1.25rem;
      font-weight: 500;
      margin-right: 0.5rem;
    }

    &--amount {
      font-size: 1rem;
      font-weight: 500;
    }
  }
}

.close-cart {
  position: absolute;
  height: 24px;
  left: 0;
  color: #000;
  cursor: pointer;
}

.item {
  text-align: center;
  padding: 1rem 0;
  text-align: left;

  &__wrapper {
    display: flex;
    padding: 0 1rem;
  }

  &__price {
    font-weight: 600;
    white-space: nowrap;
  }

  &__body {
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: center;
    padding: 0 1rem;
    flex-grow: 1;

    &--top {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
    }

    &--bottom {
      display: flex;
      justify-content: space-between;
    }
  }

  &__title {
    font-weight: bold;
  }

  &__subtitle {
    font-size: 0.75rem;
  }

  &__image {
    display: flex;
    border-radius: 6px;
    overflow: hidden;
    width: 5rem;
    height: 5rem;

    img {
      object-fit: cover;
      object-position: center;
    }
  }

  &__remove {
    padding-right: 1rem;
    cursor: pointer;
  }

  .b-numberinput {
    width: 125px;

    button {
      background-color: transparent;
    }
  }
}
</style>