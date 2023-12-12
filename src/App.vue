<template>
  <div class="main">
    <navbar-vue />
  <router-view/>
  <footer-vue />
  </div>

</template>

<script>
import NavbarVue from './components/NavbarVue.vue';
import FooterVue from './components/FooterVue.vue';

export default {
  components: { NavbarVue, FooterVue },
  mounted() {
    this.$store.dispatch('loadProductsCatalogue');
    this.$store.dispatch('changeWindowWidth', window.innerWidth);
    window.addEventListener('resize', this.myEventHandler);
  },
  unmounted() {
    window.removeEventListener('resize', this.myEventHandler);
  },
  methods: {
    myEventHandler() {
      // your code for handling resize...
      this.$store.dispatch('changeWindowWidth', window.innerWidth);
    },
  },
};
</script>

<style lang="scss" scoper>
#app {
  box-sizing: border-box;
  font-family: 'Montserrat', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>
