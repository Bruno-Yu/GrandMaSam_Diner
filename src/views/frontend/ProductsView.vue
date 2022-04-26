<template>
  <PageLoading
    loader="bars"
    :active="isLoading"
    :can-cancel="true"
    :is-full-page="false"
  ></PageLoading>
  <CartModal ref="CartModal" />
  <CartMessage ref="cartMessage" />
  <div class="container-fluid bg-warning">
    <div class="row row-cols-1 row-cols-lg-2 g-1 my-1">
      <div class="col col-lg-6">
        <div class="container  px-2 py-4 p-sm-5 bg-warning rounded">
          <div class="row ps-2 row-cols-1">
            <div class="col m-auto">
              <h2
                class="mt-5 mb-4 ms-2 fs-1 text-nowrap text-dark text-center text-sm-start font-Noto fw-800"
              >
                產品/服務列表
              </h2>
              <p class="fs-3 text-dark text-sm-nowrap font-Noto fw-600">
                廚師介紹
              </p>
              <p class="fs-5 text-light text-sm-nowrap font-Noto fw-400">
                <span class="d-none d-md-inline">五腥出品，</span
                >來自嘉義明雄的米其林廚師帶來的味道
              </p>
              <p class="fs-5 text-light text-sm-nowrap font-Noto fw-400">
                而每份<span class="d-none d-md-inline">他所帶來的</span
                >食物，都有屬於食材自己的故事
              </p>
              <p class="fs-5 text-light text-sm-nowrap font-Noto fw-400">
                只要您用心品嘗，一定能嚐出嘉明<span
                  class="text-light fw-light d-none d-md-inline"
                  >( 嘉義民雄 )</span
                >的味道
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="d-none d-sm-grid col col-lg-6 productsView-banner mt-1" />
    </div>
  </div>
  <div class="container-fluid mb-5 mt-md-5 mt-3 mb-7">
    <div class="row">
      <div class="col-md-2">
        <div
          class="border border-bottom border-top-0 border-start-0 border-end-0 mb-3 mx-1"
        >
          <div class="card border-0">
            <div
              class="card-header px-0 py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0 rounded-0"
            >
              <div
                class="d-flex justify-content-between align-items-center pe-1 my-2"
              >
                <h4 class="fw-bold">
                  類別 <span class="text-secondary small"> ▽ </span>
                </h4>
              </div>
              <div class="card-body p-0">
                <ul class="list-group">
                  <li v-show="num === false" class="list-group-item p-0">
                    <button
                      type="button"
                      class="fw-bold btn btn-light h-100 w-100 p-2"
                      @click="arrestHim()"
                    >
                      未亡人系列
                    </button>
                  </li>
                  <li
                    class="list-group-item p-0"
                    v-for="(cat, key) in categories"
                    :key="key"
                  >
                    <button
                      type="button"
                      class="fw-bold btn btn-light h-100 w-100 p-2"
                      @click="(num = !num) ? getCategory(cat) : catButton()"
                    >
                      {{ cat }}
                    </button>
                  </li>
                </ul>
                <p v-show="num" class="text-secondary small mt-2">
                  說明: 再點一下 <span class="fw-bold"> 類別鈕 </span>>回到
                  <span class="fw-bold"> 全類別 </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-10">
        <div class="row row-cols-1 row-cols-lg-3">
          <div class="col p-2" v-for="product in products" :key="product.id">
            <div
              class="card border-0 mb-2 p-2 g-1 shadow overall position-relative"
            >
              <div class="cart-img-top">
                <RouterLink
                  :to="{ path: `/productView/${product.id}` }"
                  class="text-decoration-none"
                >
                  <div
                    class="cart-image rounded-0 ratio ratio-16x9"
                    :style="{ backgroundImage: `url(${product.imageUrl})` }"
                  ></div>
                </RouterLink>
              </div>
              <div class="card-body p-1">
                <h5 class="mb-0 mt-1 fw-bold">
                  {{ product.title }}
                </h5>
                <div class="d-flex justify-content-between">
                  <div>
                    <p class="card-text my-1 fw-bold">
                      TWD {{ product.price }}
                    </p>
                    <p class="text-muted fw-light small my-auto">
                      <del> 原價TWD{{ product.origin_price }}</del>
                    </p>
                  </div>
                  <button
                    type="button"
                    class="btn btn-warning shadow fw-bolder border border-1 btn-sm p-2 my-auto "
                    @click="addToCart(product.id), getCart()"
                    :disabled="isLoadingItem === product.id"
                  >
                    <span
                      class="spinner-grow spinner-grow-sm"
                      v-show="isLoadingItem === product.id"
                    ></span>
                    加入購物車
                  </button>
                </div>
              </div>
              <a
                href="#"
                class="position-absolute text-light"
                style="right: 16px; top: 16px"
                @click.prevent="
                  favorites.includes(product.id)
                    ? removeFromFavorites(product.id)
                    : saveToFavorites(product.id)
                "
                @keyup.i="
                  favorites.includes(product.id)
                    ? removeFromFavorites(product.id)
                    : saveToFavorites(product.id)
                "
                ><i
                  v-if="favorites.includes(product.id)"
                  class="bi bi-heart-fill"
                ></i>
                <i v-else class="bi bi-heart" />
              </a>
            </div>
          </div>
          <!-- 固定按鈕 -->
          <button
            type="button"
            class="btn"
            @click.prevent="openCartModal(cartData)"
          >
            <CartIcon :cartNum="cartNum" />
          </button>
        </div>
      </div>
      <div class="d-flex justify-content-center mt-5">
        <PaginationFooter
          v-show="num === false"
          :current-page="current_page"
          :has-pre="has_pre"
          :has-next="has_next"
          :total-pages="total_pages"
          @click-page="getProducts"
        ></PaginationFooter>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/libs/emitter';
import PaginationFooter from '@/components/PaginationFooter.vue';
import cartMessage from '@/components/cartMessage.vue';
import CartIcon from '@/components/CartIcon.vue';
import CartModal from '@/components/CartModal.vue';

export default {
  data() {
    return {
      products: [],
      allProducts: [],
      showProducts: this.products,
      productId: '',
      addNum: 0,
      num: false,
      isLoading: false,
      isLoadingItem: '',
      categories: [],
      current_page: 1,
      has_next: true,
      has_pre: false,
      total_pages: 1,
      cartNum: 0,
      cartData: {
        carts: [],
      },
      favorites: JSON.parse(window.localStorage.getItem('favorites')) || [],
    };
  },
  components: {
    PaginationFooter,
    cartMessage,
    CartIcon,
    CartModal,
  },

  methods: {
    arrestHim() {
      this.$router.push('/arrestUser');
    },
    openCartModal(cartData) {
      this.$refs.CartModal.openModal(cartData);
    },
    getCategory(query) {
      const originCategories = [];
      this.isLoading = true;
      let url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;

      if (query) {
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products?category=${query}`;
      }
      this.$http
        .get(url)
        .then((res) => {
          this.allProducts = JSON.parse(JSON.stringify(res.data.products));
          if (query) {
            this.products = this.allProducts;
          }
          this.allProducts.forEach((item) => {
            originCategories.push(item.category);
          });
          this.categories = originCategories.filter(
            (cat, index) => originCategories.indexOf(cat) === index,
          );
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;
          this.$frontHttpMessageState(error.response, '類別截取失敗');
        });
    },
    getProducts(page = 1) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products?page=${page}`;
      this.isLoading = true;
      this.$http
        .get(url)
        .then((res) => {
          this.products = res.data.products;
          this.current_page = res.data.pagination.current_page;
          this.has_next = res.data.pagination.has_next;
          this.has_pre = res.data.pagination.has_pre;
          this.total_pages = res.data.pagination.total_pages;
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;
          this.$frontHttpMessageState(error.response, '產品截取失敗');
        });
    },
    getProduct(id) {
      this.isLoading = true;
      this.$router.push(`/user/product/${id}`);
      this.isLoading = false;
    },
    getCart() {
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          this.cartData = res.data.data;
          this.cartNum = res.data.data.carts.length || 0;
        })
        .catch((error) => {
          this.$frontHttpMessageState(error.response, '購物車截取失敗');
        });
    },
    saveToFavorites(id) {
      this.favorites.push(id);
    },
    removeFromFavorites(id) {
      const target = this.favorites.indexOf(id);
      if (target !== -1) {
        this.favorites.splice(target, 1);
      }
    },
    catButton() {
      this.getCategory();
      this.getProducts();
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
          this.isLoadingItem = '';
          this.$refs.cartMessage.openModal(true);
        })
        .catch((error) => {
          this.isLoadingItem = '';
          this.$frontHttpMessageState(error.response, '購物車增加失敗');
        });
    },
  },
  watch: {
    favorites: {
      handler() {
        window.localStorage.setItem(
          'favorites',
          JSON.stringify(this.favorites),
        );
      },
      deep: true,
    },
  },
  created() {
    emitter.on('get-cart', () => {
      this.getCart();
      this.openCartModal(this.cartData);
    });
  },
  mounted() {
    this.isLoading = true;
    this.getCart();
    this.getProducts();
    this.getCategory();

    this.isLoading = false;
  },
};
</script>
