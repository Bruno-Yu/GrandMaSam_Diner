<template>
  <cartMessage ref="cartMessage"></cartMessage>
  <div class="container-fluid bg-warning">
    <div class="row row-cols-1 row-cols-lg-2 g-1 my-1">
      <div class="col col-lg-6">
        <div class="container shadow px-2 py-4 p-sm-5 bg-warning rounded">
          <div class="row ps-2 row-cols-1">
            <div class="col m-auto">
              <h2
                class="mt-5 mb-4 ms-2 fs-1 text-nowrap text-dark text-center text-sm-start"
                style="
                  font-family: 'Noto Sans JP', sans-serif;
                  font-weight: 800;
                "
              >
                產品/服務列表
              </h2>
              <p
                class="fs-3 text-dark text-sm-nowrap"
                style="
                  font-family: 'Noto Sans JP', sans-serif;
                  font-weight: 600;
                "
              >
                廚師介紹
              </p>
              <p
                class="fs-5 text-light text-sm-nowrap"
                style="
                  font-family: 'Noto Sans JP', sans-serif;
                  font-weight: 400;
                "
              >
                <span class="d-none d-md-inline">五腥出品，</span
                >來自嘉義明雄的米其林廚師帶來的味道
              </p>
              <p
                class="fs-5 text-light text-sm-nowrap"
                style="
                  font-family: 'Noto Sans JP', sans-serif;
                  font-weight: 400;
                "
              >
                而每份<span class="d-none d-md-inline">他所帶來的</span
                >食物，都有屬於食材自己的故事
              </p>
              <p
                class="fs-5 text-light text-sm-nowrap"
                style="
                  font-family: 'Noto Sans JP', sans-serif;
                  font-weight: 400;
                "
              >
                只要您用心品嘗，一定能嚐出嘉明<span
                  class="text-light fw-light d-none d-md-inline"
                  >( 嘉義民雄 )</span
                >的味道
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="col col-lg-6 productsView-banner mt-1"></div>
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
          <div
            class="col shadow bg-body mb-2 p-2"
            style="border-size: border-box"
            v-for="product in products"
            :key="product.id"
          >
            <div class="card border-0 mb-2 position-relative">
              <div class="cart-img-top">
                <router-link
                  :to="{ path: `/productView/${product.id}` }"
                  class="text-decoration-none"
                >
                  <div
                    class="cart-image rounded-0 ratio ratio-16x9"
                    :style="{ backgroundImage: `url(${product.imageUrl})` }"
                  ></div>
                </router-link>
              </div>

              <!-- style="
                  background-size: cover;
                  background-position: center center;
                  background-blend-mode: multiply;
                  background-color: #ede6dcb;
                " -->
              <!-- background-color: #9cb2c7; -->
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
                <i v-else class="bi bi-heart"></i>
              </a>
              <!-- <router-link
                :to="{ name: 'Product', params: { id: `${product.id}` } }"
                class="position-absolute link-light small text-decoration-none"
                style="right: 16px; bottom: 10px"
              >
                看更多
              </router-link> -->
            </div>
            <div class="card-body p-0">
              <h5 class="mb-0 mt-1 fw-bold">
                {{ product.title }}
              </h5>
              <div class="d-flex justify-content-between">
                <div>
                  <p class="card-text mt-1 mb-0 fw-bold">
                    TWD {{ product.price }}
                  </p>
                  <p class="text-muted fw-light small my-auto">
                    <del> 原價TWD{{ product.origin_price }}</del>
                  </p>
                </div>
                <button
                  type="button"
                  class="btn btn-warning shadow fw-bolder border border-1 btn-sm p-2 my-auto me-1"
                  @click="addToCart(product.id)"
                >
                  加入購物車
                </button>
              </div>
              <p class="text-muted mt-3"></p>
            </div>
          </div>
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
import PaginationFooter from '@/components/PaginationFooter.vue';
import cartMessage from '@/components/cartMessage.vue';

export default {
  data() {
    return {
      products: [],
      allProducts: [],
      showProducts: this.products,
      productId: '',
      addNum: 0,
      num: false,
      isLoadingItem: '',
      categories: [],
      current_page: 1,
      has_next: true,
      has_pre: false,
      total_pages: 1,
      favorites: JSON.parse(window.localStorage.getItem('favorites')) || [],
    };
  },
  components: {
    PaginationFooter,
    cartMessage,
  },

  methods: {
    arrestHim() {
      this.$router.push('/arrestUser');
    },
    getCategory(query) {
      const originCategories = [];
      this.isLoading = true;
      let url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;

      if (query) {
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products?category=${query}`;
      }
      this.$http.get(url).then((res) => {
        this.allProducts = JSON.parse(JSON.stringify(res.data.products));
        // console.log(this.allProducts);
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
      });
    },
    // eslint-disable-next-line default-param-last
    getProducts(page = 1) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products?page=${page}`;
      this.isLoading = true;
      this.$http.get(url).then((res) => {
        this.products = res.data.products;
        this.current_page = res.data.pagination.current_page;
        this.has_next = res.data.pagination.has_next;
        this.has_pre = res.data.pagination.has_pre;
        this.total_pages = res.data.pagination.total_pages;
        // this.getCategory(this.products);
        this.isLoading = false;
      });
    },
    getProduct(id) {
      this.$router.push(`/user/product/${id}`);
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
  mounted() {
    this.getProducts();
    this.getCategory();
  },
};
</script>

<style>
.productsView-banner {
  background-image: url(@/assets/images/productsView_banner.jpg);
  height: 420px;
  background-position: center center;
  background-size: cover;
  background-blend-mode: multiply;
  background-color: #dcd8cfea;
}
/* background-size: cover; */
.cart-image {
  background-size: cover;
  background-position: center center;
  background-blend-mode: multiply;
  /* background-color: #f1efecea; */
  /* overflow: hidden;
  transform: scale(1, 1);
  transition: all 1s ease-out; */
}
/* .cart-image :hover {
  transform: scale(1.2, 1.2);
} */

.cart {
  width: 10px;
  height: 10px;
  right: 10px;
  bottom: 10px;
  border-radius: 50% 50%;
  border: 1px black solid;
}
.product-intro-3 {
  background-image: url(@/assets/images/left_footer.jpg);
  height: 450px;
  background-position: center center;
  background-size: cover;
  background-blend-mode: multiply;
  background-color: #ede6dcbf;
}
</style>
