<template>
  <div class="container-fluid gx-0.5 w-100" style="box-sizing: border-box">
    <FrontNavbar />
    <RouterView />
    <FrontFooter />
  </div>
</template>

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

<style lang="scss">
@import 'bootstrap/scss/bootstrap';
</style>
