<template>
  <div class="container mt-3">
    <ul class="nav justify-content-end">
      <li class="nav-item">
        <router-link
          class="nav-link text-decoration-none text-secondary position-relative"
          to="/cartView"
        >
          <i class="bi bi-cart3"></i> 購物車<span
            v-if="cartData?.carts?.length != 0"
            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
          >
            {{ cartData?.carts?.length }}
            <span class="visually-hidden">商品數量</span>
          </span></router-link
        >
      </li>
      <li class="nav-item">
        <router-link class="nav-link text-decoration-none text-secondary" to="/trueusLogin"
          ><i class="bi bi-person-badge"></i>管理員登入</router-link
        >
      </li>
    </ul>
    <h1 class="text-center mt-5 fs-1 mb-3 fw-bolder">富蘭克林餐酒館</h1>
    <p class="text-center fs-3 lh-sm text-secondary fw-bolder text-nowrap">
      讓您不用出國，就能享受到美國本土的民族風情
    </p>
    <p class="text-center lh-sm text-nowrap fw-light">
      本餐廳致力於宣導大美國主義，旨在於宣揚大美利堅合眾國理念，讓這座島受難的台胞早日回歸美國的懷抱
    </p>
    <p class="text-center fs-4 lh-sm fw-bold">
      America forever! Let make the United State great again!
    </p>
    <nav class="d-flex justify-content-center">
      <router-link class="link-dark fw-bold text-decoration-none me-2 active" to="/">
        首頁介紹
      </router-link>
      |
      <router-link class="link-dark text-decoration-none fw-bold mx-2" to="/productsView">
        產品列表
      </router-link>
      |
      <router-link class="link-dark text-decoration-none fw-bold ms-2" to="/about">
        關於我們
      </router-link>
    </nav>
    <hr class="text-secondary" />
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartData: {},
    };
  },
  methods: {
    getCart() {
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          console.log(res);
          this.cartData = res.data.data;
        });
    },
  },
  watch: {
    cartData() {
      this.getCart();
    },
  },
  mounted() {
    this.getCart();
  },
};
</script>
