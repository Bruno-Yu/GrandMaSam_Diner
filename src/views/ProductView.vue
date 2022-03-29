<template>
  <div class="container">
    <div class="row align-items-center">
      <div class="col-md-7">
        <Swiper
          :modules="modules"
          :slides-per-view="1"
          :space-between="50"
          navigation
          :pagination="{ clickable: true }"
        >
          <SwiperSlide>
            <div
              class="carousel-item d-block ratio ratio-4x3"
              style="
                background-size: cover;
                background-position: center center;
                background-blend-mode: multiply;
                background-color: #9cb2c7;
              "
              :style="{ backgroundImage: `url(${product.imageUrl})` }"
            ></div>
          </SwiperSlide>
          <SwiperSlide v-for="(image, key) in product.imagesUrl" :key="key"
            ><div
              class="carousel-item d-block ratio ratio-4x3"
              style="
                background-position: center center;
                background-size: cover;
                background-blend-mode: multiply;
                background-color: #9cb2c7;
              "
              :style="{ backgroundImage: `url(${image})` }"
            ></div
          ></SwiperSlide>
        </Swiper>
      </div>
      <div class="col-md-5">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb bg-white px-0 mb-0 py-3">
            <li class="breadcrumb-item">
              <router-link class="text-muted" to="">首頁</router-link>
            </li>
            <li class="breadcrumb-item">
              <router-link class="text-muted" to="./productsView"
                >商店</router-link
              >
            </li>
            <li class="breadcrumb-item active" aria-current="page">產品細節</li>
          </ol>
        </nav>
        <h2 class="fw-bold h1 mb-1">{{ product.title }}</h2>
        <p class="mb-0 text-muted text-end">
          <del>{{ product.origin_price }}</del>
        </p>
        <p class="h4 fw-bold text-end">NT${{ product.price }}</p>
        <div class="row align-items-center">
          <div class="col-6">
            <div class="input-group my-3 bg-light rounded">
              <div class="input-group-prepend">
                <button
                  class="btn btn-outline-dark border-0 py-2"
                  type="button"
                  id="button-addon1"
                >
                  <i class="fas fa-minus"></i>
                </button>
              </div>
              <input
                type="text"
                class="form-control border-0 text-center my-auto shadow-none bg-light"
                placeholder=""
                aria-label="Example text with button addon"
                aria-describedby="button-addon1"
                value="1"
              />
              <div class="input-group-append">
                <button
                  class="btn btn-outline-dark border-0 py-2"
                  type="button"
                  id="button-addon2"
                >
                  <i class="fas fa-plus"></i>
                </button>
                <span class="text fw-dark lh-lg">{{ product.unit }}</span>
              </div>
            </div>
          </div>
          <div class="col-6">
            <button
              type="button"
              to="/userOrders"
              class="text-nowrap btn btn-danger w-100 fw-bold py-2"
              @click="addToCart(product.id)"
            >
              加入購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row my-5">
      <div class="col-md-4">
        <p>
          {{ product.content }}
        </p>
      </div>
      <div class="col-md-3">
        <p class="text-muted">
          {{ product.description }}
        </p>
      </div>
      <hr />
      <h3 class="fw-bold mb-4">購買須知</h3>
      <p class="text-muted">
        寄送時間： 預計訂單成立後 7
        個工作天內送達不含週六日及國定假日。如廠商有約定日將於約定日期內送達，約定日期需於訂單成立後
        14天內。
      </p>

      <p class="text-muted">送貨方式： 透過宅配或是郵局送達。</p>
      <p class="text-muted">
        消費者訂購之商品若經配送兩次無法送達，再經本公司以電話與 E-mail
        均無法聯繫逾三天者，本公司將取消該筆訂單，並且全額退款。
      </p>
      <p class="text-muted">
        送貨範圍：
        限台灣本島地區。注意！收件地址請勿為郵政信箱。若有台灣本島以外地區送貨需求，收貨人地址請填台灣本島親友的地址
      </p>
      <p class="text-muted">
        關於退貨:
        由於本公司所販售的商品皆屬易於腐敗且保存期限較短之商品，依據消費者保護法之規定，將無法享有七天猶豫期之權益且不得辦理退貨。
      </p>
      <hr />
      <h3 class="fw-bold">您可能還會喜歡</h3>
      <div class="swiper-container mt-4 mb-5">
        <div class="swiper-wrapper">
          <div v-for="(item, key) in products" :key="key" class="swiper-slide">
            <div class="card border-0 mb-4 position-relative">
              <div
                class="card-img-top rounded-0 ratio ratio-4x3"
                style="
                  background-size: cover;
                  background-position: center center;
                  background-blend-mode: multiply;
                  background-color: #9cb2c7;
                  max-height: 300px;
                "
                :style="{ backgroundImage: `url(${item.imageUrl})` }"
              >
                <a href="#" class="text-dark"> </a>
              </div>
              <div class="card-body p-0">
                <h4 class="mb-0 mt-3"><a href="#">item.title</a></h4>
                <p class="card-text mb-0">
                  NT$ {{ item.price }}
                  <span class="text-muted"
                    ><del>NT${{ item.origin_price }}</del></span
                  >
                </p>
                <p class="text-muted mt-3"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '../../node_modules/swiper/swiper.scss';
@import '../../node_modules/swiper/modules/navigation/navigation.scss';
@import '../../node_modules/swiper/modules/pagination/pagination.scss';
</style>

<script>
// eslint-disable-next-line object-curly-newline
import { Navigation, Pagination } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/vue';

// import 'swiper/swiper.scss';
// import 'swiper/modules/navigation/navigation.min.css';
// import 'swiper/modules/pagination/pagination.min.css';

// import 'swiper/swiper-bundle.css';
// import 'swiper/modules/navigation/navigation.min.css';
// import 'swiper/modules/pagination/pagination.min.css';
// import 'swiper/modules/scrollbar/scrollbar.min.css';

export default {
  data() {
    return {
      isLoading: false,
      product: {},
      products: [],
      id: '',
      modules: [Navigation, Pagination],
      mySwiper: {},
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  methods: {
    getProduct() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${this.id}`;
      this.isLoading = true;
      this.$http.get(api).then((response) => {
        if (response.data.success) {
          this.product = response.data.product;
          this.getProducts(this.product.category);
        }
        this.isLoading = false;
      });
    },
    getProducts(query) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products?category=${query}`;
      this.isLoading = true;
      this.$http.get(url).then((res) => {
        this.products = res.data.products;
        this.isLoading = false;
      });
    },
    addToCart(id, qty = 1) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      const cart = {
        product_id: id,
        qty,
      };
      this.isLoading = true;
      this.$http
        .post(url, { data: cart })
        .then((response) => {
          this.isLoading = false;
          this.$httpMessageState(response, '加入購物車');
          this.$router.push('/userOrders');
        })
        .catch((error) => {
          this.isLoading = false;
          this.$httpMessageState(error.response, '加入購物車');
        });
    },
  },
  created() {
    this.id = this.$route.params.id;
  },
  mounted() {
    this.getProduct();
  },
};
</script>
