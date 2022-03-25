<template>
  <FrontNavbar></FrontNavbar>
  <router-view />
  <FrontFooter></FrontFooter>
</template>

<style lang="scss">
@import 'bootstrap/scss/bootstrap';
</style>
<script>
import FrontNavbar from './components/FrontNavbar.vue';
import FrontFooter from './components/FrontFooter.vue';

export default {
  components: {
    FrontNavbar,
    FrontFooter,
  },
};
</script>
