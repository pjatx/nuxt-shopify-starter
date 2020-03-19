<template>
  <div class="product-qty">
    <input
      type="number"
      :min="1"
      class="product-qty__input"
      name="quantity"
      v-model.number="productQty"
    />
    <div class="product-qty__adjust">
      <div class="product-qty__adjust-btn" @click="incrementQTY">
        <b-icon icon="plus" size="is-small"></b-icon>
      </div>
      <div class="product-qty__adjust-btn" @click="decrementQTY">
        <b-icon icon="minus" size="is-small"></b-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      productQty: 1
    }
  },
  methods: {
    incrementQTY() {
      this.productQty++
    },
    decrementQTY() {
      if (this.productQty > 1) {
        this.productQty--
      }
    },
    updateQty(newQty) {
      this.$emit('qtyChange', newQty)
    }
  },
  watch: {
    productQty: function(newQty, oldQty) {
      this.updateQty(newQty)
    }
  }
}
</script>

<style lang="scss" scoped>
.product-qty {
  display: flex;
  width: 72px;
  max-width: 72px;
  flex-basis: 72px;
  border-radius: 6px;
  border: 1px solid #d2d4d6;
  box-shadow: inset 0 3px 0 0 rgba(0, 0, 0, 0.04), 0 2px 0 0 rgba(0, 0, 0, 0.02);
  height: 100%;
  margin-right: 0.5rem;
  &__input {
    flex: 1;
    font-size: 24px;
    text-align: center;
    min-width: 1px;
    padding: 10px 0 10px 12px;
    border: 0;
    box-shadow: none;
    background-color: transparent;

    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
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
</style>
