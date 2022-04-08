<template>
  <div class="container-fluid arrestUser vh-90 my-1">
    <div
      class="row d-flex align-items-center justify-content-center justify-content-lg-start"
      style="height: 100%"
    >
      <div class="col col-10 col-lg-6 vh-30 my-3">
        <div class="container">
          <p
            class="text-dark fs-1 ps-lg-3 d-none d-lg-inline-block text-nowrap"
            style="font-family: 'Noto Sans JP', sans-serif; font-weight: 800"
          >
            <i>警告! 你已被匿名舉發!!!</i>
          </p>
          <div
            class="bg-dark border border-light border-1 rounded-3"
            style="--bs-bg-opacity: 0.4"
          >
            <p
              class="text-light fs-2 fw-bold text-center mt-4 mt-sm-2"
              style="font-family: 'Noto Sans JP', sans-serif; font-weight: 500"
            >
              內~ 警察叔叔
            </p>
            <p
              class="text-light fs-2 fw-bold text-center pt-2"
              style="font-family: 'Noto Sans JP', sans-serif; font-weight: 400"
            >
              就是這個人!!!
            </p>

            <div class="d-flex justify-content-center mt-2 mb-2 mt-lg-4">
              <button
                type="button"
                class="btn btn-danger fs-3 link-light mx-2 shadow p-2 mb-1 border border-light border-1 w-30"
                style="
                  font-family: 'Noto Sans JP', sans-serif;
                  font-weight: 600;
                "
                @click="backToStore()"
              >
                逃回商店
              </button>
              <!-- style="width: 50%" -->
            </div>
          </div>
          <p
            class="text-dark fs-1 ps-lg-3 mt-3 d-none d-lg-inline-block text-nowrap"
            style="font-family: 'Noto Sans JP', sans-serif; font-weight: 800"
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
  methods: {
    backToStore() {
      this.$router.push('/productsView');
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
  /* background-blend-mode: multiply;
  background-color: #eff2f6; */
}
</style>
