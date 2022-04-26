<template>
  <PageLoading
    loader="bars"
    :active="isLoading"
    :can-cancel="true"
    :is-full-page="false"
  ></PageLoading>
  <div v-if="cartData.carts.length" class="container mt-3">
    <div class="row bg-warning">
      <div class="user-orders-banner" />
    </div>
    <div class="row">
      <h1 class="text-center mt-5 font-Noto fs-1 mb-3 fw-bold">訂單</h1>
      <RouterView @get-cart="getCart" />
    </div>
  </div>
  <div v-else class="container gx-0 cart-banner my-1">
    <div class="row d-flex align-items-center justify-content-center vh-100">
      <div class="col col-lg-7">
        <div class="container bg-dark font-Noto cart-box py-3">
          <p class="text-light fs-2 text-center font-Noto fw-500">
            其實你知道嗎?
            <span class="d-inline-block d-sm-inline">和平是需要付出代價的</span>
          </p>
          <p class="text-light fs-4 text-center font-Noto fw-400">
            若你不願意付出，那你跟騙人家感情的渣男有甚麼兩樣呢?
          </p>
          <p class="text-light fs-4 text-center font-Noto fw-400">
            小心你的青春跟背景這可愛的和平鴿一樣，一但逝去就回不來了 (哼
          </p>
          <div class="container d-flex justify-content-center mt-4">
            <button
              type="button"
              class="btn btn-outline-light fs-3 shadow p-2 mb-1 border border-dark border-1 w-30 font-Noto fw-600"
              @click="goToResult"
            >
              誰管你
            </button>
            <button
              type="button"
              class="btn btn-danger fs-3 link-light mx-2 shadow p-2 mb-1 border border-dark border-1 w-30 font-Noto fw-600"
              @click="backToStore"
            >
              我錯了
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartData: {
        carts: [],
      },
      isLoading: false,
    };
  },
  methods: {
    backToStore() {
      this.$router.push('/productsView');
    },
    goToResult() {
      this.$router.push('/theEnd');
    },
    getCart() {
      this.isLoading = true;
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          this.cartData = res.data.data;
          this.isLoading = false;
        })

        .catch((error) => {
          this.isLoading = false;
          this.$frontHttpMessageState(error.response, '購物車截取失敗');
        });
    },
  },
  mounted() {
    this.getCart();
  },
};
</script>
