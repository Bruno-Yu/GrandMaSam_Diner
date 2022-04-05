<template>
  <div v-if="favorites.length" class="container-fluid gx-0 gy-1 mt-3">
    <h1 class="text-center mt-5 fs-1 mb-3 fw-bolder">收藏</h1>
    <div class="container">
      <div class="mt-4">
        <div class="text-end">
          <button
            class="btn btn-outline-danger"
            type="button"
            @click="removeFavAll"
            :disabled="isLoadingItem === 'deleteAll' || favorites.length === 0"
          >
            <span
              class="spinner-grow spinner-grow-sm"
              v-show="isLoadingItem === 'deleteAll'"
            ></span
            >清空收藏
          </button>
        </div>
        <table class="table align-middle">
          <thead>
            <tr class="text-start">
              <th>刪除鍵</th>
              <th class="d-none d-lg-table-cell">預覽圖</th>
              <th>品名</th>
              <th>單價</th>
              <th class="d-none d-lg-table-cell">產品細節</th>
              <th>加入購物車</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in favProducts" :key="item.id" class="text-start">
              <td>
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="removeFromFavorites(item.id)"
                  :disabled="isLoadingItem === item.id"
                >
                  <span
                    class="spinner-grow spinner-grow-sm"
                    v-show="isLoadingItem === item.id"
                  ></span>
                  x
                </button>
              </td>
              <td class="d-none d-lg-table-cell">
                <div
                  style="
                    height: 100px;
                    width: 300px;
                    background-size: cover;
                    background-position: center;
                  "
                  :style="{ backgroundImage: `url(${item.imageUrl})` }"
                ></div>
              </td>
              <td class="fw-bolder text-decoration-underline">
                {{ item.title }}
                <!-- <div class="text-success">已套用優惠券</div> -->
              </td>
              <td>
                <span
                  class="spinner-grow spinner-grow-sm"
                  v-show="isLoadingItem === item.id"
                ></span>
                <span class="text-secondary fz-sm"
                  >{{ item.price }}元 / {{ item.unit }}
                </span>
              </td>
              <td class="d-none d-lg-table-cell">
                <button
                  type="button"
                  class="btn btn-outline-secondary btn-sm"
                  :disabled="isLoadingItem === item.id"
                  @click="goToProductView(item.id)"
                >
                  查看更多
                </button>
              </td>
              <td>
                <button
                  type="button"
                  class="btn btn-danger btn-sm"
                  @click="[addToCart(item.id), removeFromFavorites(item.id)]"
                  :disabled="isLoadingItem === item.id"
                >
                  <span
                    class="spinner-grow spinner-grow-sm"
                    v-show="isLoadingItem === item.id"
                  ></span>
                  加到購物車
                </button>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <!-- <tr>
              <td></td>
              <td colspan="3" class="text-end text-success">折扣價</td>
              <td class="text-end text-success">{{ }}</td>
            </tr> -->
          </tfoot>
        </table>
        <div class="text-end my-3">
          <button
            class="btn btn-danger fw-bolder"
            type="button"
            @click="addAllToCart"
            :disabled="isLoadingItem === 'addAll' || favorites.length === 0"
          >
            <span
              class="spinner-grow spinner-grow-sm"
              v-show="isLoadingItem === 'addAll'"
            ></span>
            全加到購物車
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="container-fluid fav-banner my-1">
    <div
      class="row d-flex align-items-center justify-content-center"
      style="height: 100%"
    >
      <div class="col vh-30">
        <p class="fs-1 text-light text-center">
          <i class="bi bi-emoji-frown"></i>
        </p>
        <h2 class="text-light fw-bold text-center">怎麼會連收藏都沒有呢?</h2>
        <h2 class="text-light fw-bold text-center">難到您不愛台灣嗎?</h2>
        <div class="d-flex justify-content-center mt-4">
          <router-link
            to="/productsView"
            type="button"
            class="btn btn-warning link-dark fw-bolder fs-4 border border-dark border-3"
            style="width: 20%"
            >馬上改正</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 購物車列表
      favorites: JSON.parse(window.localStorage.getItem('favorites')) || [],
      cartData: {
        carts: [],
      },
      products: [],
      favProducts: [],
      productId: '',
      isLoadingItem: '',
    };
  },
  methods: {
    getFavor(products) {
      this.favorites.forEach((id) => {
        this.favProducts.push(products.filter((item) => item.id === id));
      });
      this.favProducts = this.favProducts.flat(1);
    },
    getProducts() {
      this.isLoading = true;
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products`,
        )
        .then((res) => {
          this.products = res.data.products;
          this.getFavor(this.products);
          this.isLoading = false;
        });
    },

    getCart() {
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          this.cartData = res.data.data;
        });
    },
    // 注意: 加入購物車需帶入兩個參數 1.id 2.數量
    saveToFavorites(id) {
      this.favorites.push(id);
    },
    removeFromFavorites(id) {
      this.isLoadingItem = 'id';
      const target = this.favorites.indexOf(id);
      if (target !== -1) {
        this.favorites.splice(target, 1);
        this.isLoadingItem = '';
      }
    },
    addToCart(id, qty = 1) {
      const data = {
        product_id: id,
        qty,
      };
      this.isLoadingItem = id;
      this.$http
        .post(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`,
          { data },
        )
        .then(() => {
          this.getCart();
          this.isLoadingItem = '';
        });
    },
    addAllToCart() {
      this.isLoadingItem = 'addAll';
      this.favorites.forEach((id) => {
        this.addToCart(id);
      });
      this.removeFavAll();
    },
    removeFavAll() {
      this.isLoadingItem = 'deleteAll';
      this.favorites = [];
      this.favProducts = [];
      this.isLoadingItem = '';
    },
    goToProductView(id) {
      this.$router.push(`/productView/${id}`);
    },
  },
  watch: {
    favorites: {
      handler() {
        window.localStorage.setItem(
          'favorites',
          JSON.stringify(this.favorites),
        );
        this.getProducts();
      },
      deep: true,
    },
  },
  created() {
    this.getProducts();
  },
};
</script>

<style>
.fav-banner {
  background-image: url(@/assets/images/localStorage_banner.jpg);
  height: 600px;
  background-position: center center;
  background-size: cover;
  background-blend-mode: multiply;
  background-color: #5e6063;
}
</style>
