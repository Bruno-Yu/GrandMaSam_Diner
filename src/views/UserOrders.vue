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
    <router-view />
  </div>
  <div v-else class="container-fluid cart-banner my-1">
    <div
      class="row d-flex align-items-center justify-content-center"
      style="height: 100%"
    >
      <div class="col vh-30">
        <p class="fs-1 text-light text-center">
          <i class="bi bi-emoji-frown"></i>
        </p>
        <h2 class="text-light fw-bold text-center">
          怎麼購物車都沒有東西呢? 難道是沒錢購物嗎?
        </h2>
        <h2 class="text-light fw-bold text-center">
          錢跟時間一樣擠一擠就會有的!
        </h2>
        <div class="d-flex justify-content-center mt-4">
          <router-link
            to="/productsView"
            type="button"
            class="btn btn-warning link-dark fw-bolder fs-4 border border-dark border-3"
            style="width: 20%"
            >馬上消費</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.cart-banner {
  background-image: url(https://cdn.pixabay.com/photo/2016/08/06/07/54/trump-1573999_960_720.jpg);
  height: 600px;
  background-position: center center;
  background-size: cover;
  background-blend-mode: multiply;
  background-color: #5e6063;
}
</style>

<script>
export default {
  data() {
    return {
      // 購物車列表
      cartData: {
        carts: [],
      },
    };
  },
  methods: {
    getCart() {
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          this.cartData = res.data.data;
        });
    },
  },
  mounted() {
    // 取得購物車的資料
    this.getCart();
  },
};
</script>
