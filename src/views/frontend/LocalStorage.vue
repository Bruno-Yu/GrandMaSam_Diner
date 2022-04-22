<template>
  <PageLoading
    loader="bars"
    :active="isLoading"
    :can-cancel="true"
    :is-full-page="false"
  ></PageLoading>
  <div v-if="favorites.length" class="container mt-3">
    <div class="row bg-warning border-bottom border-3 border-dark">
      <div class="local-baby" />
    </div>
    <div class="row mt-5 mb-3">
      <h1 class="text-center font-Noto fs-1 fw-bold">收藏</h1>
    </div>
    <div class="row d-flex justify-content-end">
      <div class="col-auto me-md-5">
        <button
          class="btn btn-outline-danger fw-bold font-Noto mb-1"
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
    </div>
    <div
      class="container shadow my-4 bg-body border border-1 border-body p-5 rounded"
    >
      <div class="row">
        <table class="table">
          <thead>
            <tr
              class="text-start text-start font-Noto fw-bold fs-5 text-primary"
            >
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
                  class="localStorage-product"
                  :style="{ backgroundImage: `url(${item.imageUrl})` }"
                ></div>
              </td>
              <td class="font-Noto fs-5 fw-400">
                {{ item.title }}
              </td>
              <td>
                <span
                  class="spinner-grow spinner-grow-sm"
                  v-show="isLoadingItem === item.id"
                ></span>
                <span class="text-secondary fz-sm"
                  >{{ item.price }}
                  <span class="d-none d-lg-inline font-Noto fs-5 fw-400"
                    >元</span
                  >
                  <span class="d-none d-lg-inline font-Noto fs-5 fw-400">
                    / {{ item.unit }}</span
                  >
                </span>
              </td>
              <td class="d-none d-lg-table-cell">
                <button
                  type="button"
                  class="btn btn-outline-secondary btn-sm shadow-sm mt-2 font-Noto fw-400"
                  :disabled="isLoadingItem === item.id"
                  @click="goToProductView(item.id)"
                >
                  <span
                    class="spinner-grow spinner-grow-sm font-Noto fs-5 fw-400"
                    v-show="isLoadingItem === item.id"
                  ></span>
                  查看更多
                </button>
              </td>
              <td>
                <button
                  type="button"
                  class="btn"
                  @click="[addToCart(item.id), removeFromFavorites(item.id)]"
                  :disabled="isLoadingItem === item.id"
                >
                  <span
                    class="spinner-grow spinner-grow-sm"
                    v-show="isLoadingItem === item.id"
                  ></span>
                  <i class="d-lg-none bi bi-cart2 text-danger"></i
                  ><span
                    class="d-none d-lg-inline-block btn btn-danger font-Noto fs-6 fw-400 btn-sm shadow"
                  >
                    加到購物車</span
                  >
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="text-end my-3">
          <button
            class="btn btn-danger font-Noto fw-bold border border-1 border-body shadow"
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
  <div v-else class="container gx-0 fav-banner vh-100 my-1">
    <div class="row d-flex align-items-center justify-content-center vh-100">
      <div class="col vh-30 my-3">
        <div class="container bg-light font-Noto dialog-local-bg">
          <p
            class="text-dark fs-2 fw-bold text-center mt-4 mt-sm-2 font-Noto fw-500"
          >
            怎麼? 你以為這是一般的購物網站嗎?
          </p>
          <p class="text-dark fs-4 fw-bold text-center pt-2 font-Noto fw-400">
            你有想過
            <span class="d-inline-block d-sm-inline">非洲的小孩</span
            >每過60秒就<span class="text-danger d-inline-block d-sm-inline"
              >少了1分鐘的壽命</span
            >嗎?
          </p>
          <p class="text-dark fs-4 fw-bold text-center font-Noto fw-400">
            而這
          </p>
          <p class="text-dark fs-4 fw-bold text-center font-Noto fw-400">
            並不是收不收藏商品的問題，而是愛不愛國的問題!!!
          </p>
          <div class="d-flex justify-content-center mt-2 mb-2 mt-lg-4">
            <button
              type="button"
              class="btn btn-outline-dark fs-3 shadow p-2 mb-1 border border-dark border-2 w-30 font-Noto fw-600"
              @click="goToAIDS()"
            >
              我愛滋
            </button>
            <button
              type="button"
              class="btn btn-danger fs-3 link-light mx-2 shadow p-2 mb-1 border border-dark border-1 w-30 font-Noto fw-600"
              @click="backToStore()"
            >
              我愛國
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
        })
        .catch((error) => {
          this.$frontHttpMessageState(error.response, '產品截取失敗');
        });
    },

    getCart() {
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          this.cartData = res.data.data;
        })
        .catch((error) => {
          this.$frontHttpMessageState(error.response, '購物車截取失敗');
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
        })
        .catch((error) => {
          this.$frontHttpMessageState(error.response, '購物車增加失敗');
        });
    },
    addAllToCart() {
      this.isLoadingItem = 'addAll';
      this.favorites.forEach((id) => {
        this.addToCart(id);
      });
      this.removeFavAll();
      this.isLoadingItem = '';
    },
    removeFavAll() {
      this.isLoadingItem = 'deleteAll';
      this.favorites = [];
      this.favProducts = [];
      this.isLoadingItem = '';
    },
    goToProductView(id) {
      this.isLoading = true;
      this.$router.push(`/productView/${id}`);
      this.isLoading = false;
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
