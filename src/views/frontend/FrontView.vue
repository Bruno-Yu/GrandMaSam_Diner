<template>
  <div class="container-fluid">
    <div class="row mb-5">
      <FrontNavbar />
    </div>
    <div class="row mt-5">
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
