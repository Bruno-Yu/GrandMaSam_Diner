<template>
  <PageLoading
    loader="bars"
    :active="isLoading"
    :can-cancel="true"
    :is-full-page="false"
  ></PageLoading>
  <cartMessage ref="cartMessage"></cartMessage>
  <div class="container-fluid">
    <div class="row mt-5 d-flex align-items-center justify-content-center">
      <div class="col-md-6 rounded">
        <Swiper
          :modules="modules"
          :slides-per-view="1"
          :space-between="50"
          navigation
          :pagination="{ clickable: true }"
          class="shadow mb-3 p-2 rounded"
        >
          <SwiperSlide>
            <div
              class="carousel-item d-block ratio ratio-4x3 product-display"
              :style="{ backgroundImage: `url(${product.imageUrl})` }"
            ></div>
          </SwiperSlide>
          <SwiperSlide
            v-for="(image, key) in product.imagesUrl"
            :key="key"
            class="shadow rounded"
            ><div
              class="carousel-item d-block ratio ratio-4x3 product-display"
              :style="{ backgroundImage: `url(${image})` }"
            ></div
          ></SwiperSlide>
        </Swiper>
      </div>
      <div class="col-md-5">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb bg-white px-0 mb-0 py-3">
            <li class="breadcrumb-item">
              <router-link class="text-muted" to="/">首頁</router-link>
            </li>
            <li class="breadcrumb-item">
              <router-link class="text-muted" to="/productsView"
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
        <div class="row mb-3 align-items-center">
          <div class="col-6">
            <div class="input-group my-3 bg-light rounded">
              <div class="input-group-prepend">
                <button
                  class="btn btn-outline-dark border-0 py-2"
                  type="button"
                  id="button-addon1"
                  @click="productQty = productQty - 1"
                  :disabled="productQty === 1"
                >
                  <i class="bi bi-dash"></i>
                </button>
              </div>
              <input
                type="number"
                :value="productQty"
                class="form-control border-0 text-center my-auto shadow-none bg-light"
                placeholder=""
                aria-label="Example text with button addon"
                aria-describedby="button-addon1"
                onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
                readonly="readonly"
              />
              <div class="input-group-append">
                <button
                  class="btn btn-outline-dark border-0 py-2"
                  type="button"
                  id="button-addon2"
                  @click="productQty = productQty + 1"
                >
                  <i class="bi bi-plus"></i>
                </button>
                <span class="text fw-dark lh-lg">{{ product.unit }}</span>
              </div>
            </div>
          </div>
          <div class="col-6">
            <button
              type="button"
              to="/userOrders"
              class="text-nowrap btn btn-warning shadow w-100 fw-bold py-2"
              @click="addToCart(product.id, productQty)"
            >
              加入購物車
            </button>
          </div>
        </div>
        <div
          class="row row-cols-1 row-cols-lg-2 my-5 justify-content-center shadow p-3 mb-1 rounded"
        >
          <div class="col col-lg-6">
            <h3 class="text-muted fw-bold">商品規格</h3>
            <p class="text-muted">
              {{ product.content }}
            </p>
          </div>
          <div class="col col-lg-6">
            <h3 class="fw-bold">商品介紹</h3>
            <p>
              {{ product.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid mt-5">
      <div class="container">
        <div class="row shadow p-3 my-5 rounded">
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
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <h3 class="fw-bold">您可能還會喜歡</h3>
        <Swiper
          :modules="modules"
          :slides-per-view="3"
          :space-between="50"
          autoplay
          :breakpoints="swiper.breakpoints"
        >
          <SwiperSlide
            class="card border-0 mb-4 position-relative position-relative"
            v-for="item in products"
            :key="item.id"
          >
            <div
              class="swiper-slide-inner product-recommend-display"
              :style="{ backgroundImage: `url(${item.imageUrl})` }"
            >
              <a href="#" class="text-dark"> </a>
            </div>
            <div class="card-body p-0">
              <h4 class="mb-0 mt-3">
                <router-link
                  :to="{ name: 'Product', params: { id: `${product.id}` } }"
                  class="link-dark fw-bold text-decoration-none"
                >
                  {{ item.title }}
                </router-link>
              </h4>
              <p class="card-text mb-0">
                NT$ {{ item.price }}
                <span class="text-muted"
                  ><del>NT${{ item.origin_price }}</del></span
                >
              </p>
              <p class="text-muted mt-3"></p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import cartMessage from '@/components/cartMessage.vue';
// eslint-disable-next-line object-curly-newline
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
  FreeMode,
} from 'swiper';

export default {
  data() {
    return {
      isLoading: false,

      product: {},
      products: [],
      productQty: 1,
      id: '',
      modules: [Navigation, Pagination, Autoplay, EffectCoverflow, FreeMode],
      swiper: {
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        breakpoints: {
          0: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        },
        pagination: {
          el: '.swiper-pagination',
        },

        // Navigation arrows
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
    };
  },
  components: {
    Swiper,
    SwiperSlide,
    cartMessage,
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
    addToCart(id, qty) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      const cart = {
        product_id: id,
        qty,
      };
      this.isLoading = true;
      this.$http
        .post(url, { data: cart })
        .then(() => {
          this.isLoading = false;
          this.$refs.cartMessage.openModal(true);
        })
        .catch(() => {
          this.isLoading = false;
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
