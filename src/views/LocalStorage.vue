<template>
  <div v-if="favorites.length" class="container-fluid gx-0 gy-1 mt-3">
    <h1 class="text-center mt-5 fs-1 mb-3 fw-bolder">收藏</h1>
    <div class="container">
      <div class="mt-4">
        <!-- 購物車列表 -->
        <!-- 做購物車的技巧: 由於是先 加入購物車 購物車內才有會有內容 ，可用{{cartData}}來作為反饋確認 -->
        <!-- 清空購物車按鈕 -->
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
        <!-- 以上是清空購物車按鈕 -->
        <!-- 下方為驗證程式碼資料，方便使用，用後須刪除 -->
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
            <!-- 使用v-for將購物車中的產品列表列出 -->
            <!-- 注意:產品資訊是包在carts陣列內部物件的product屬性中 -->
            <tr v-for="item in favProducts" :key="item.id" class="text-start">
              <td>
                <!-- 刪除品項 -->
                <!-- 注意: 刪除要刪除到資料庫 -->
                <!-- 對應remobdeCartItem方法 -->
                <!-- 加入loading效果 -->
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
                <!-- 使用BS的input-group 將其群組化 -->
                <!-- 查看更多按鈕，對應api為 客戶購物-產品(products)中 GET product/{id}的api -->
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
                  @click="addToCart(item.id)"
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
      // 產品列表 (客戶購物免登入的API)
      products: [],
      favProducts: [],
      productId: '',
      // 局部讀取效果對應變數
      isLoadingItem: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
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
      console.log('正確觸發');
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products`,
        )
        .then((res) => {
          console.log(res);
          this.products = res.data.products;
          console.log(this.products);
          this.getFavor(this.products);
          this.isLoading = false;
        });
    },

    getCart() {
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          console.log(res);
          // 將購物車資料賦值至根元件資料中
          // 購物車api回傳的response物件中有兩層data，2層data後的carts陣列，是為已加入購物車的品項內容(array)
          // carts內品項的 價格有分 total:加入優惠券前 final_total:優惠券打折後最終結帳的價格
          // 所以存取的時候是res.data.data
          this.cartData = res.data.data;
        });
    },
    // 加入購物車按鈕對應方法
    // 對應api 客戶購物-購物車(Cart) POST
    // 注意: 加入購物車需帶入兩個參數 1.id 2.數量
    // 由於購物車頁面上沒有調整數量的欄位，所以第二參數可使用參數預設值帶入
    saveToFavorites(id) {
      this.favorites.push(id);
    },
    removeFromFavorites(id) {
      this.isLoadingItem = 'id';
      const target = this.favorites.indexOf(id);
      if (target !== -1) {
        this.favorites.splice(target, 1);
        this.getFavor();
        this.isLoadingItem = '';
      }
    },
    addToCart(id, qty = 1) {
      // post cart的api資料格式
      const data = {
        product_id: id,
        qty,
      };
      // 局部讀取效果賦值對應id
      this.isLoadingItem = id;
      // axios.post 加入購物車列表
      this.$http
        .post(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`,
          { data },
        )
        .then(() => {
          // 重新取得購物車內容
          this.getCart();
          // 清空局部讀取效果
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

    // 對應購物車產品列表的 刪除品項 按鈕
    removeCartItem(id) {
      // 記得要帶入對應的item.id
      this.isLoadingItem = id;
      // 注意: 對應的api是購物車的api
      this.$http
        .delete(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`,
        )
        .then(() => {
          // 取得購物車的資料
          this.getCart();
          this.isLoadingItem = '';
        });
    },
    removeFavAll() {
      this.isLoadingItem = 'deleteAll';
      this.favorites = [];
      this.favProducts = [];
      this.isLoadingItem = '';
    },
    // 更新數量，使用put cart api
    // 記得直接帶入對應品項
    updateCartItem(item) {
      const data = {
        product_id: item.product.id,
        qty: item.qty,
      };
      this.isLoadingItem = item.id;
      this.$http
        .put(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`,
          { data },
        )
        .then(() => {
          // 取得購物車的資料
          this.getCart();
          this.isLoadingItem = '';
        });
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
  mounted() {
    // 取得購物車的資料
    this.getProducts();
  },
};
</script>

<style>
.fav-banner {
  background-image: url(https://cdn.pixabay.com/photo/2016/10/18/18/35/dementia-1750965_960_720.jpg);
  height: 600px;
  background-position: center center;
  background-size: cover;
  background-blend-mode: multiply;
  background-color: #5e6063;
}
</style>
