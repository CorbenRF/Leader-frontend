<template>
  <div class="catalogue" v-if="!this.$store.getProductsLoading">
    <h1 class="h1">Каталог товаров</h1>
    <div class="catalogue__content">

    <CatalogueItem v-for="(item, index) of productsData" :key="index" :product="item"/>
    </div>

  </div>
  <h2 class="h2" v-else>Загрузка</h2>
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
  },
  methods: {

  },
  mounted() {
    this.$store.dispatch('loadProductsCatalogue');
  },
};
</script>

<style lang="scss" scoped>

</style>
