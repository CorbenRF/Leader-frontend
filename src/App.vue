<template>
  <div class="content">
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
