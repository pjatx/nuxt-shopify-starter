<template>
  <div class="product__variants">
    <b-field :addons="false" expanded>
      <b-radio
        v-for="(variant, index) in variants"
        class="variant"
        :class="{ isSelected: variant.id == selectedVariant}"
        name="name"
        :key="index"
        :data-index="index"
        v-model="selectedVariant"
        :native-value="variant.id"
        @input="updateVariant"
      >
        <div class="variant__description">
          <div>{{ variant.title | titlecase }} {{ value }}</div>
          <div class="price">{{ variant.price | currency }}</div>
        </div>
      </b-radio>
    </b-field>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      selectedVariant: null
    }
  },
  methods: {
    updateVariant(newVariant) {
      this.$emit('variantChange', newVariant)
    },
    isSelectedVariant(variant) {
      return true
    }
  },
  mounted() {
    this.selectedVariant = this.variants[0].id
    this.updateVariant(this.variants[0].id)
  },
  props: {
    variants: Array
  },
  filters: {
    titlecase(value) {
      return value.replace(/(?:^|\s|-)\S/g, x => x.toUpperCase())
    }
  }
}
</script>

<style lang="scss" scoped>
.variant {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid #d2d4d6;
  border-radius: 6px;
  padding: 1rem;
  margin: 0.5rem 0 !important;
  font-size: 1rem;
  box-shadow: inset 0 3px 0 0 rgba(0, 0, 0, 0.04), 0 2px 0 0 rgba(0, 0, 0, 0.02);
  transition: 0.3s cubic-bezier(0.32, 0.36, 0.4, 1);

  &.isSelected {
    border-color: $primary;
    box-shadow: inset 0 3px 0 0 rgba(0, 0, 0, 0.02),
      0 2px 0 0 rgba(0, 0, 0, 0.04);
    transition: 0.3s cubic-bezier(0.32, 0.36, 0.4, 1);
  }

  &__description {
    display: flex;
    justify-content: space-between;
    width: 100%;

    .price {
      color: $primary;
      font-weight: 600;
      white-space: nowrap;
    }
  }
}
</style>