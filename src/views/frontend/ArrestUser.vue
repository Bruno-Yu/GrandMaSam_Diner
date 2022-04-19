<template>
  <PageLoading
    loader="bars"
    :active="isLoading"
    :can-cancel="true"
    :is-full-page="false"
  ></PageLoading>
  <div class="container-fluid arrestUser vh-100 my-1">
    <div
      class="row d-flex align-items-center justify-content-center justify-content-lg-start vh-100"
    >
      <div class="col col-10 col-lg-6 vh-30 my-3">
        <div class="container">
          <p
            class="text-dark fs-1 ps-lg-3 d-none d-lg-inline-block text-nowrap font-Noto fw-800"
          >
            <i>警告! 你已被匿名舉發!!!</i>
          </p>
          <div
            class="bg-dark border border-light border-1 rounded-3 dialog-arrest-bg"
          >
            <p
              class="text-light fs-2 fw-bold text-center mt-4 mt-sm-2 font-Noto fw-500"
            >
              內~ 警察叔叔
            </p>
            <p
              class="text-light fs-2 fw-bold text-center pt-2 font-Noto fw-400"
            >
              就是這個人!!!
            </p>

            <div class="d-flex justify-content-center mt-2 mb-2 mt-lg-4">
              <button
                type="button"
                class="btn btn-danger fs-3 link-light mx-2 shadow p-2 mb-1 border border-light border-1 w-30 font-Noto fw-600"
                @click="backToStore()"
              >
                逃回商店
              </button>
            </div>
          </div>
          <p
            class="text-dark fs-1 ps-lg-3 mt-3 d-none d-lg-inline-block text-nowrap font-Noto fw-800"
          >
            <i>快跑! 跑起來! 快回商店!!!</i>
          </p>
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
  methods: {
    backToStore() {
      this.isLoading = true;
      this.$router.push('/productsView');
      this.isLoading = false;
    },
  },
};
</script>

<style>
.arrestUser {
  background-image: url(@/assets/images/arrestUser.jpg);
  height: 600px;
  background-position: center right;
  background-size: cover;
}
.font-Noto {
  font-family: 'Noto Sans JP', sans-serif;
}
.fw-400 {
  font-weight: 400;
}
.fw-500 {
  font-weight: 500;
}
.fw-600 {
  font-weight: 600;
}
.fw-800 {
  font-weight: 800;
}
.dialog-arrest-bg {
  --bs-bg-opacity: 0.4;
}
</style>
