<template>
  <div class="container-fluid fav-banner vh-90 my-1">
    <div
      class="row d-flex align-items-center justify-content-center"
      style="height: 100%"
    >
      <div class="col vh-30 my-3">
        <div class="container bg-light" style="--bs-bg-opacity: 0.2">
          <p
            class="text-dark fs-2 fw-bold text-center mt-4 mt-sm-2"
            style="font-family: 'Noto Sans JP', sans-serif; font-weight: 500"
          >
            怎麼? 你以為這是一般的購物網站嗎?
          </p>
          <p
            class="text-dark fs-4 fw-bold text-center pt-2"
            style="font-family: 'Noto Sans JP', sans-serif; font-weight: 400"
          >
            你有想過
            <span class="d-inline-block d-sm-inline">非洲的小孩</span
            >每過60秒就<span class="text-danger d-inline-block d-sm-inline"
              >少了1分鐘的壽命</span
            >嗎?
          </p>
          <p
            class="text-dark fs-4 fw-bold text-center"
            style="font-family: 'Noto Sans JP', sans-serif; font-weight: 400"
          >
            而這
          </p>
          <p
            class="text-dark fs-4 fw-bold text-center"
            style="font-family: 'Noto Sans JP', sans-serif; font-weight: 400"
          >
            並不是收不收藏商品的問題，而是愛不愛國的問題!!!
          </p>
          <div class="d-flex justify-content-center mt-2 mb-2 mt-lg-4">
            <button
              type="button"
              class="btn btn-outline-dark fs-3 shadow p-2 mb-1 border border-dark border-1 w-30"
              style="font-family: 'Noto Sans JP', sans-serif; font-weight: 600"
            >
              我愛滋
            </button>
            <button
              type="button"
              class="btn btn-danger fs-3 link-light mx-2 shadow p-2 mb-1 border border-dark border-1 w-30"
              style="font-family: 'Noto Sans JP', sans-serif; font-weight: 600"
              @click="backToStore()"
            >
              我愛國
            </button>
            <!-- style="width: 50%" -->
          </div>
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
.fav-banner {
  background-image: url(@/assets/images/theEnd.jpg);
  height: 600px;
  background-position: center center;
  background-size: cover;
  /* background-blend-mode: multiply;
  background-color: #eff2f6; */
}
</style>
