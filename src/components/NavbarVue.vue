<template>
  <nav class="nav">
    <div class="logo">
    <RouterLink to="/">
  <img src="../assets/images/lp_logo.svg" alt="Логотип лидер поиска">
</RouterLink>
    </div>

    <div class="basket__group" tabindex="0" @click="goToBasket" @keydown="goToBasket">
      <img src="../assets/images/basket.svg" alt="Корзина">
      <span class="basket__text">Корзина</span><div class="basket__count">{{ count }}</div>
    </div>
  </nav>
</template>

<script>

export default {
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    goToBasket() {
      this.$router.push('/cart');
    },
  },
};
</script>

<style lang="scss">
.nav {
  display: flex;
  justify-content: space-between;
}

.basket {
  &__group {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    :not(:last-child) {
      margin-right: 10px;
    }
    & img {
      width: 28px;
      height: 28px;
    }
  }
  &__text {
    color: #35383A;
    font-weight: 600;
  }
  &__count {
    width: 21px;
    height: 21px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 50%;
    background-color: var(--color-secondary-greenish);
    color: #fff;
    font-weight: 600;
    font-size: 12px;
    text-align: center;
  }
}
</style>
