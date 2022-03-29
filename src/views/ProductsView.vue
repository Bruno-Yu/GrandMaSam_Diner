<template>
  <div class="mt-4"></div>
  <h2 class="my-5 ms-2 fw-bold text-center">產品/服務列表</h2>
  <div class="container mb-5 mt-md-5 mt-3mb-7">
    <div class="row g-2">
      <div class="col-md-2">
        <div
          class="border border-bottom border-top-0 border-start-0 border-end-0 mb-3 mx-3"
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
              <div class="card-body py-0">
                <ul class="list-group">
                  <li
                    class="list-group-item"
                    v-for="(cat, key) in categories"
                    :key="key"
                  >
                    <button
                      type="button"
                      class="fw-bold btn btn-outline-light link-dark"
                      @click="
                        (num = !num) ? getProducts(page, cat) : getProducts()
                      "
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
        <div class="row row-cols-1 row-cols-lg-3 g-2 g-lg-3">
          <div class="col" v-for="product in products" :key="product.id">
            <div class="card border-0 mb-2 position-relative">
              <div
                class="card-img-top rounded-0 ratio ratio-16x9"
                style="
                  background-size: cover;
                  background-position: center center;
                  background-blend-mode: multiply;
                  background-color: #9cb2c7;
                "
                :style="{ backgroundImage: `url(${product.imageUrl})` }"
              ></div>

              <router-link
                to=""
                class="position-absolute text-light"
                style="right: 16px; top: 16px"
                @click="
                  favorites.includes(product.id)
                    ? removeFromFavorites(product.id)
                    : saveToFavorites(product.id)
                "
                ><i
                  v-if="favorites.includes(product.id)"
                  class="bi bi-heart-fill"
                ></i>
                <i v-else class="bi bi-heart"></i>
              </router-link>
              <router-link
                :to="{ name: 'Product', params: { id: `${product.id}` } }"
                class="position-absolute link-light small text-decoration-none"
                style="right: 16px; bottom: 10px"
              >
                看更多
              </router-link>
            </div>
            <div class="card-body p-0">
              <h5 class="mb-0 mt-1 fw-bold">{{ product.title }}</h5>
              <p class="card-text mt-1 mb-0 fw-bold">TWD {{ product.price }}</p>
              <div class="d-flex justify-content-between">
                <p class="text-muted fw-light small">
                  <del> 原價TWD{{ product.origin_price }}</del>
                </p>
                <button
                  type="button"
                  class="btn btn-danger btn-sm me-1"
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

<style>
.cart {
  width: 10px;
  height: 10px;
  right: 10px;
  bottom: 10px;
  border-radius: 50% 50%;
  border: 1px black solid;
}
</style>

<script>
import PaginationFooter from '../components/PaginationFooter.vue';

export default {
  data() {
    return {
      products: [],
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
  },

  methods: {
    getCategory(products) {
      const originCategories = [];
      products.forEach((item) => {
        originCategories.push(item.category);
      });
      this.categories = originCategories.filter(
        (cat, index) => originCategories.indexOf(cat) === index,
      );
    },
    // eslint-disable-next-line default-param-last
    getProducts(page = 1, query) {
      let url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products?page=${page}`;
      if (query) {
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products?category=${query}`;
      }
      this.isLoading = true;
      this.$http.get(url).then((res) => {
        this.products = res.data.products;
        this.current_page = res.data.pagination.current_page;
        this.has_next = res.data.pagination.has_next;
        this.has_pre = res.data.pagination.has_pre;
        this.total_pages = res.data.pagination.total_pages;
        this.getCategory(this.products);
        this.isLoading = false;
      });
    },
    getProduct(id) {
      this.$router.push(`/user/product/${id}`);
    },
    saveToFavorites(id) {
      this.favorites.push(id);
      window.localStorage.setItem('favorites', JSON.stringify(this.favorites));
    },
    removeFromFavorites(id) {
      const target = this.favorites.indexOf(id);
      if (target !== -1) {
        this.favorites.splice(target, 1);
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
          this.isLoadingItem = '';
        });
    },
  },
  // watch: {
  //   favorites: {
  //     handler() {
  //       window.localStorage.setItem(
  //         'favorites',
  //         JSON.stringify(this.favorites),
  //       );
  //     },
  //     deep: true,
  //   },
  // },
  mounted() {
    this.getProducts();
  },
};
</script>
