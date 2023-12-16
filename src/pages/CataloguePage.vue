<template>
  <div class="content">
  <div class="catalogue" v-if="this.isPageLoaded">
    <h1 class="h1">Каталог товаров</h1>
    <div class="catalogue__content">

    <CatalogueItem v-for="(item, index) of productsData" :key="index" :product="item"
    :windowWidth="this.windowWidth" />
    </div>

  </div>
  <div class="loader" v-else>
    <h2 class="h2">Загрузка</h2>
  </div>

</div>
</template>

<script>
import CatalogueItem from '@/components/CatalogueItem.vue';

export default {
  components: { CatalogueItem },
  data() {
    return {

    };
  },
  computed: {
    productsData() {
      return this.$store.getters.getProducts;
    },
    windowWidth() {
      return this.$store.getters.getWindowWidth;
    },
    isPageLoaded() {
      return !this.$store.getters.getProductsLoading;
    },
  },
  methods: {

  },

};
</script>

<style lang="scss" scoped>

</style>
