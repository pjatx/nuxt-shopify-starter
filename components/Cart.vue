<template>
  <div class="cart">
    <h2>Your Cart</h2>
    <span @click="toggleCartDrawer">X</span>
    <p v-show="!cart.length">
      <i>Please add some products to cart.</i>
    </p>
    <ul>
      <li
        v-for="item in cart"
        :key="item.id"
      >{{ item.title }} - {{ item.variants[0].price | currency }} x {{ item.quantity }}</li>
    </ul>
    <p>Total: {{ cartTotal | currency }}</p>
    <p>
      <button :disabled="!cart.length" @click="checkout(cart)">Checkout</button>
    </p>
    <p v-show="checkoutStatus">Checkout {{ checkoutStatus }}.</p>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      checkoutStatus: state => state.cart.checkoutStatus
    }),
    ...mapGetters('cart', {
      cart: 'cartProducts'
    }),
    cartTotal() {
      let total = this.cart.reduce(
        (acc, item) => acc + parseFloat(item.variants[0].price * item.quantity),
        0
      )
      return total
    }
  },
  methods: {
    checkout(products) {
      this.$store.dispatch('cart/checkout', cart)
    },
    toggleDrawer() {
      this.$store.dispatch('cart/toggleCartDrawer')
    }
  }
}
</script>