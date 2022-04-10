<template>
  <div class="container-fluid" style="box-sizing: border-box">
    <div class="row mb-5">
      <FrontNavbar />
    </div>
    <div class="row">
      <RouterView />
    </div>
    <div class="row">
      <FrontFooter />
    </div>
  </div>
</template>

<script>
import FrontNavbar from '@/components/FrontNavbar.vue';
import FrontFooter from '@/components/FrontFooter.vue';

export default {
  components: {
    FrontNavbar,
    FrontFooter,
  },
};
</script>
