<template>
  <div class="container">
    <div class="my-5">
      <p class="fs-2 fw-bold text-center">
        <i class="bi bi-check2-circle text-success fw-bolder"></i> 付款成功
      </p>
      <div class="mb-3 d-flex justify-content-center">
        <p class="mb-3 fw-bold">訂單編號: {{ orderID }}</p>
      </div>
      <p class="text-center mb-3">謝謝惠顧，願上帝與您同在!</p>
      <div class="d-flex justify-content-center">
        <button type="button" class="btn btn-danger my-5">
          <router-link
            to="/productsView"
            class="text-decoration-none link-light"
          >
            回到商城
          </router-link>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/libs/emitter';

export default {
  data() {
    return {
      orderID: '',
    };
  },
  created() {
    emitter.on('order-id', (data) => {
      this.orderID = data;
    });
  },
};
</script>
