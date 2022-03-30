<template>
  <div class="container-fluid gx-0.5 w-100">
    <FrontNavbar></FrontNavbar>
    <router-view />
    <FrontFooter></FrontFooter>
  </div>
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
