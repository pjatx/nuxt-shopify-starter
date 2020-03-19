<template>
  <nuxt-link :to="'/collection/' + collection.id">
    <div class="product-card">
      <picture v-if="collection.image" v-lazy-container="{ selector: 'img' }">
        <source :srcset="collection.image.src +'?webp'" type="image/webp" />
        <source :srcset="collection.image.src" type="image/jpeg" />
        <img :data-src="collection.image.src" data-loading="~/assets/images/placeholder.gif" />
      </picture>
      <div class="product-card__footer">
        <h3 class="title is-5">{{ collection.title }}</h3>
        <div class="product-card__footer--bottom">
          <button class="button add-to-cart is-primary">View Collection</button>
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'CollectionCard',
  props: {
    collection: Object
  }
}
</script>

<style scoped lang="scss">
.product-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: rgba(213, 213, 213, 0.4) 0px 5px 14px 0px;
  max-width: 385px;
  width: 345px;
  position: relative;
  text-align: center;
  border-radius: 6px;
  margin: 15px;
  padding: 30px 15px 25px;
  background: white;
  transition: all 0.3s ease 0s;
  flex: 1 0 auto;

  .title {
    text-transform: capitalize;
    font-weight: 300;
  }

  img {
    width: 60%;
    height: auto;
    object-fit: contain;
    margin: auto;
  }

  &__price {
    font-size: 1.25rem;
    font-weight: 600;
  }

  &__footer {
    display: flex;
    flex-direction: column;

    &--bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 1rem;
    }
  }
}
</style>