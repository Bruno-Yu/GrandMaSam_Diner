<template>
  <div class="container-fluid w-100 gx-0">
    <FrontNavbar class="row"></FrontNavbar>
    <router-view class="row" />
    <FrontFooter class="row"></FrontFooter>
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
