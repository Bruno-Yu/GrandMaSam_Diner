<template>
  <div class="container-fluid">
    <div class="row mb-5">
      <FrontNavbar />
    </div>
    <StateInformModal />
    <div class="row mt-5">
      <RouterView />
    </div>
    <div class="row">
      <FrontFooter />
    </div>
    <div class="row">
      <CellPhoneFooter />
    </div>
  </div>
</template>

<script>
import emitter from '@/libs/emitter';
import FrontNavbar from '@/components/FrontNavbar.vue';
import FrontFooter from '@/components/FrontFooter.vue';
import CellPhoneFooter from '@/components/CellPhoneFooter.vue';
import StateInformModal from '@/components/StateInformModal.vue';

export default {
  components: {
    FrontNavbar,
    FrontFooter,
    CellPhoneFooter,
    StateInformModal,
  },
  data() {
    return {
      status: false,
    };
  },
  provide() {
    return {
      emitter,
    };
  },
};
</script>
