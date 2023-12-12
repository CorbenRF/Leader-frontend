<template>
  <div class="item" @mouseover="this.isHovering = true"
  @focusin="this.isHovering = true"
  @mouseleave="this.isHovering = false"
  @focusout="this.isHovering = false">
    <div class="item__pic">
      <img :src="picUrl" alt="Фото товара">
    </div>
    <p class="item__name text">{{ product.name }}</p>
    <p class="item__price">{{ this.formatPriceRu(product.price) }}</p>
    <button type="button" class="btn" :class="{ 'btn-success': this.isInCart }"
    v-if="this.isHovering || windowWidth < 751" @click="addToCart" >
      {{ this.isInCart ? 'В КОРЗИНЕ' : 'ДОБАВИТЬ В КОРЗИНУ' }}
    </button>
  </div>
</template>

<script>
import ImagePath from '@/mixins/ImagePath.vue';
import formatMixin from '@/mixins/formatMixin.vue';

export default {
  data() {
    return {
      // isInCart: false,
      isHovering: false,
    };
  },
  props: ['product', 'windowWidth'],
  mixins: [formatMixin, ImagePath],
  computed: {
    isInCart() {
      let flag = false;
      this.$store.getters.getCartData.forEach((a) => {
        if (a.id === this.product.id) {
          flag = true;
          return flag;
        }
        return false;
      });
      return flag;
    },
  },
  methods: {
    addToCart() {
      if (!this.isInCart) {
        this.$store.dispatch('addToCart', this.product);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .item {
    box-sizing: border-box;
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #DEDEDE;
    &__pic {
      width: 200px;
      height: 200px;
      & img {
        width: inherit;
        height: inherit;
        object-fit: contain;
        text-align: center;
      }
    }
    &__name {
      margin-top: auto;
      text-align: center;
    }
    &__price {
      padding: 15px 0;
      color: #000;
      text-align: center;
      font-size: 18px;
      font-style: normal;
      font-weight: 700;
      line-height: 130%;
    }
    &__btn {
      padding: 13px 12px 11px 12px;
    }
  }
</style>
