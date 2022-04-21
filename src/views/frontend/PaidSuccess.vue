<template>
  <PageLoading
    loader="bars"
    :active="isLoading"
    :can-cancel="true"
    :is-full-page="false"
  ></PageLoading>
  <div class="container paid-success shadow mb-2 p-1">
    <div class="my-5 row d-flex justify-content-center">
      <div
        class="col-5 col-lg-2 bg-body rounded"
        style="--bs-bg-opacity: 0.7; height: 200px"
      >
        <p class="fs-2 font-Noto fw-bold text-dark text-center">
          <i class="bi bi-check2-circle text-success fw-bolder"></i>
          付款成功
        </p>
        <div class="d-flex justify-content-center mt-5">
          <button
            type="button"
            class="btn btn-warning shadow border-3 border fw-bold border-dark border-lg- my-2"
          >
            <RouterLink
              to="/productsView"
              class="text-decoration-none fs-3 font-Noto link-dark"
            >
              回到商城
            </RouterLink>
          </button>
        </div>
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
