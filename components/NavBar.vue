
<template>
  <b-navbar :fixed-top="true" wrapper-class="container">
    <template slot="brand">
      <b-navbar-item tag="nuxt-link" to="/">
        <img
          src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
          alt="Lightweight UI components for Vue.js based on Bulma"
        />
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ path: '/' }"></b-navbar-item>
    </template>
    <template slot="start"></template>

    <template slot="end">
      <b-navbar-item tag="span" class="cart" @click="toggleDrawer()">
        <div class="badge">
          <b-icon icon="cart-outline"></b-icon>
          <span class="badge__wrapper">
            <span v-text="cartCount" class="badge__badge" v-show="cartCount > 0"></span>
          </span>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  methods: {
    toggleDrawer() {
      this.$store.dispatch('cart/toggleCartDrawer')
    }
  },
  computed: mapGetters('cart', ['cartCount'])
}
</script>

<style lang="scss" scoped>
.cart {
  cursor: pointer;

  i {
    color: #000;
  }

  &__count {
    padding: 0.25rem 0.5rem;
    line-height: 0;
    background-color: $primary;
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.badge {
  display: inline-block;
  line-height: 1;
  position: relative;

  &__wrapper {
    flex: 0 1;
    height: 100%;
    left: 0;
    pointer-events: none;
    position: absolute;
    top: 0;
    width: 100%;
  }

  &__badge {
    border-radius: 10px;
    background-color: $primary;
    color: #ffffff;
    display: inline-block;
    font-size: 12px;
    height: 20px;
    letter-spacing: 0;
    line-height: 1;
    min-width: 20px;
    padding: 4px 6px;
    pointer-events: auto;
    position: absolute;
    text-align: center;
    text-indent: 0;
    top: auto;
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    white-space: nowrap;
    bottom: calc(0% - 4px);
    left: calc(100% - 4px);
    right: auto;
    top: auto;

    &::after {
      border-color: $white;
      border-radius: inherit;
      border-width: 2px;
      border-style: solid;
      bottom: 0;
      content: '';
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
      transform: scale(1.15);
    }
  }
}
</style>