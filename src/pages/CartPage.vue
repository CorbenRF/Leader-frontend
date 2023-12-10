<template>
  <div class="cart">
  <div class="cart__wrapper" v-if="!this.$store.getProductsLoading">
    <h1 class="h1">Корзина</h1>
    <div class="cart__content">
      <CartItem v-for="(item, index) of CartData" :key="index" :product="item"
      @deleteItem="backOutFromCart" />
      <div class="cart__total h1">
        Сумма {{ this.totalPrice }}
      </div>
    </div>
    <div class="cart__form">

    </div>
  </div>

    <h2 class="h2 loading" v-else>Загрузка</h2>
  </div>

</template>

<script>
import CartItem from '@/components/CartItem.vue';
import FormatMixin from '@/mixins/formatMixin.vue';

export default {
  components: { CartItem },
  mixins: [FormatMixin],
  computed: {
    CartData() {
      return this.$store.getters.getCartData;
    },
    isCartEmpty() {
      return this.$store.getters.getCartData.length <= 0;
    },
    totalPrice() {
      return this.formatPriceRu(this.$store.getters.getCartTotal);
    },
  },
  methods: {
    backOutFromCart() {
      if (this.isCartEmpty) {
        this.$router.push('/');
      }
    },
  },
};
</script>

<style lang="scss">
  .cart {
    &__total {
      margin-left: auto;
      width: max-content;
      padding: 30px 47px 60px 0;
    }
  }
</style>
