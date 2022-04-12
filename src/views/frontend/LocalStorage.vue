<template>
  <PageLoading
    loader="bars"
    :active="isLoading"
    :can-cancel="true"
    :is-full-page="false"
  ></PageLoading>
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
              <th>刪<span class="d-none d-lg-inline">除鍵</span></th>
              <th class="d-none d-lg-table-cell">預覽圖</th>
              <th>品名</th>
              <th>單價</th>
              <th class="d-none d-lg-table-cell">產品細節</th>
              <th class="text-nowrap">
                加<span class="d-none d-lg-inline">入</span>購<span
                  class="d-none d-lg-inline"
                  >物車</span
                >
              </th>
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
                  >{{ item.price }} <span class="d-none d-lg-inline">元</span>
                  <span class="d-none d-lg-inline"> / {{ item.unit }}</span>
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
                  class="btn btn-lg-danger btn-sm"
                  @click="[addToCart(item.id), removeFromFavorites(item.id)]"
                  :disabled="isLoadingItem === item.id"
                >
                  <span
                    class="spinner-grow spinner-grow-sm"
                    v-show="isLoadingItem === item.id"
                  ></span>
                  <i class="d-lg-none bi bi-cart2 text-danger fs-3"></i
                  ><span class="d-none d-lg-inline"> 加到購物車</span>
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
  <div v-else class="container-fluid fav-banner vh-90 my-1">
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
              class="btn btn-outline-dark fs-3 shadow p-2 mb-1 border border-dark border-2 w-30"
              style="font-family: 'Noto Sans JP', sans-serif; font-weight: 600"
              @click="goToAIDS()"
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
      isLoading: false,
      isLoadingItem: '',
    };
  },
  methods: {
    backToStore() {
      this.$router.push('/productsView');
    },
    goToAIDS() {
      this.$router.push('/aidsIntro');
    },
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
    this.isLoading = true;
    this.getProducts();
    this.isLoading = false;
  },
};
</script>

<style>
.fav-banner {
  background-image: url(@/assets/images/localStorage_banner.jpg);
  height: 600px;
  background-position: center center;
  background-size: cover;
  /* background-blend-mode: multiply;
  background-color: #eff2f6; */
}
</style>
