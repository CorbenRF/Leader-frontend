<template>
  <div class="cart__item">
    <div class="cart__pic">
      <img :src="this.picUrl" alt="Фото товара">
    </div>
    <p class="cart__name text">{{ product.name }}</p>
    <div class="cart__counter">
      <div class="counter__minus" @click="decrementItemQty" @keydown.enter="decrementItemQty"
       tabindex="0">
        <svg width="19" height="1" viewBox="0 0 19 1" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="0.476562" y1="0.5" x2="18.5066" y2="0.5" stroke="black"/>
        </svg>
      </div>
      <div class="counter__num">{{ product.quantity }}</div>
      <div class="counter__plus" @click="incrementItemQty" @keydown.enter="incrementItemQty"
      tabindex="0">
        <svg enable-background="new 0 0 18 18" height="18px" id="Layer_1" version="1.1"
        viewBox="0 0 18 18" width="18px"
        xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <rect fill="none" height="18" width="18"/>
          <line fill="none" stroke="#000000" stroke-miterlimit="10"
          stroke-width="1" x1="9" x2="9" y1="18" y2="0"/>
          <line fill="none" stroke="#000000" stroke-miterlimit="10"
          stroke-width="1" x1="18" x2="0" y1="9" y2="9"/>
        </svg>
      </div>
    </div>
    <p class="cart__price">{{ subtotalPrice }}</p>
    <div class="cart__close" tabindex="0" @click="deleteItem" @keydown.enter="deleteItem">
    <button type="button" class="btn cart__close-btn">Удалить</button>
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 14 13" fill="none">
        <line y1="-0.5" x2="17.5227" y2="-0.5"
        transform="matrix(0.727587 0.686015 -0.727587 0.686015 0.250488 0.843262)" stroke="black"/>
        <line y1="-0.5" x2="17.5227" y2="-0.5"
        transform="matrix(-0.727587 0.686015 -0.727587 -0.686015 13 0.135986)" stroke="black"/>
      </svg>
    </div>
  </div>
</template>

<script>
import ImagePath from '@/mixins/ImagePath.vue';
import FormatMixin from '@/mixins/formatMixin.vue';

export default {
  props: ['product'],
  mixins: [ImagePath, FormatMixin],
  computed: {
    subtotalPrice() {
      return this.formatPriceRu(this.product.price * this.product.quantity);
    },
  },
  methods: {
    incrementItemQty() {
      this.$store.dispatch('changeCartItemQty', { id: this.product.id, qty: 1 });
    },
    decrementItemQty() {
      this.$store.dispatch('changeCartItemQty', { id: this.product.id, qty: -1 });
    },
    deleteItem() {
      this.$store.dispatch('deleteCartItem', this.product.id);
      this.$emit('deleteItem');
    },
  },
};
</script>

<style lang="scss">
.cart {
  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 42px 30px 38px 12px;
    border-bottom: 1px solid #A8AFBB;
  }
  &__name {
    max-width: 275px;
  }
  &__counter {
    display: flex;
    width: 160px;
    height: 40px;
    & > * {
      border: 1px solid #A8AFBB;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  &__pic {
    width: 125px;
    height: 150px;
    & img {
        width: inherit;
        height: inherit;
        object-fit: contain;
        text-align: center;
      }
  }
  &__close {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &-btn {
      display: none;
    }
  }
  &__price {
    color: #000;
    text-align: center;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 130%;
  }
}

.counter {
  &__minus, &__plus {
    flex-grow: 1;
    cursor: pointer;
    &:hover, :focus-visible {
      background-color: var(--color-primary-blue);
      & > svg > line {
        stroke: #fff;
      }
    }
  }
  &__num {
    flex-grow: 2;
  }
}
</style>
