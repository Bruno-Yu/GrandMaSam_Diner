<template>
  <div v-if="cartData.carts.length" class="container-fluid mt-3">
    <h1 class="text-center mt-5 fs-1 mb-3 fw-bolder">訂單</h1>
    <nav class="d-flex justify-content-center">
      <router-link
        class="link-dark fw-bold text-decoration-none me-2 active"
        to="/cartView"
      >
        步驟1. 購物車內容
      </router-link>
      <span class="text-secondary fw-bolder"> >> </span>

      <router-link
        class="link-dark text-decoration-none fw-bold mx-2"
        to="/userContact"
      >
        步驟2. 聯絡資訊填寫
      </router-link>
      <span class="text-secondary fw-bolder"> >> </span>
      <router-link
        class="link-dark text-decoration-none fw-bold ms-2"
        to="/orderCheck"
      >
        步驟3. 訂單明細確認
      </router-link>
    </nav>
    <RouterView />
  </div>
  <div v-else class="container-fluid cart-banner my-1">
    <div
      class="row d-flex align-items-center justify-content-center"
      style="height: 100%"
    >
      <div class="col col-lg-7 vh-30">
        <div class="container bg-dark" style="--bs-bg-opacity: 0.1">
          <p
            class="text-light fs-2 text-center"
            style="font-family: 'Noto Sans JP', sans-serif; font-weight: 500"
          >
            其實你知道嗎?
            <span class="d-inline-block d-sm-inline">和平是需要付出代價的</span>
          </p>
          <p
            class="text-light fs-4 text-center"
            style="font-family: 'Noto Sans JP', sans-serif; font-weight: 400"
          >
            若你不願意付出，那你跟騙人家感情的渣男有甚麼兩樣呢?
          </p>
          <p
            class="text-light fs-4 text-center"
            style="font-family: 'Noto Sans JP', sans-serif; font-weight: 400"
          >
            小心你的青春跟背景這可愛的和平鴿一樣，一但逝去就回不來了 (哼
          </p>
          <div class="container d-flex justify-content-center mt-4">
            <button
              type="button"
              class="btn btn-outline-dark fs-3 shadow p-2 mb-1 border border-dark border-1 w-30"
              style="font-family: 'Noto Sans JP', sans-serif; font-weight: 600"
              @click="goToResult()"
            >
              誰管你
            </button>
            <button
              type="button"
              class="btn btn-danger fs-3 link-light mx-2 shadow p-2 mb-1 border border-dark border-1 w-30"
              style="font-family: 'Noto Sans JP', sans-serif; font-weight: 600"
              @click="backToStore()"
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
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          this.cartData = res.data.data;
        });
    },
  },
  mounted() {
    this.getCart();
  },
};
</script>

<style>
.cart-banner {
  background-image: url(@/assets/images/cartView.jpg);
  height: 600px;
  background-position: center center;
  background-size: cover;
}
</style>
