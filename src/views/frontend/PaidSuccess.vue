<template>
  <PageLoading
    loader="bars"
    :active="isLoading"
    :can-cancel="true"
    :is-full-page="false"
  ></PageLoading>
  <div class="container paid-success shadow mb-2 p-1">
    <div class="my-5">
      <p class="fs-2 fw-bold text-dark text-lg-light text-center">
        <i class="bi bi-check2-circle text-success fw-bolder"></i>
        付款成功
      </p>
      <div class="d-flex justify-content-center">
        <p class="fw-bold text-light">訂單編號: {{ orderID }}</p>
      </div>
      <div class="d-flex justify-content-center">
        <button
          type="button"
          class="btn btn-warning border-1 border fw-bold border-light my-5"
        >
          <router-link
            to="/productsView"
            class="text-decoration-none fs-5 link-light"
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
      isLoading: false,
    };
  },
  created() {
    this.isLoading = true;
    emitter.on('order-id', (data) => {
      this.orderID = data;
    });
    this.isLoading = false;
  },
};
</script>

<style scoped>
.paid-success {
  background-image: url(@/assets/images/paid_success.jpg);
  background-position: center center;
  background-size: cover;
}
</style>
