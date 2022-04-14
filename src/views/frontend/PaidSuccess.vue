<template>
  <PageLoading
    loader="bars"
    :active="isLoading"
    :can-cancel="true"
    :is-full-page="false"
  ></PageLoading>
  <div class="container paid-success shadow mb-2 p-1">
    <div class="my-5 row">
      <p class="fs-2 fw-bold text-dark text-center">
        <i class="bi bi-check2-circle text-success fw-bolder"></i>
        付款成功
      </p>
      <div class="d-flex justify-content-center">
        <button
          type="button"
          class="btn btn-warning border-1 border fw-bold border-light my-2"
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
export default {
  data() {
    return {
      isLoading: false,
    };
  },
};
</script>
