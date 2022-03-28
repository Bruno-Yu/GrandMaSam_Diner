<template>
  <div class="container">
    {{ product }}
    <!-- <div
      class="ratio-16x9"
      style="
        background-size: cover;
        background-position: center center;
        background-blend-mode: multiply;
        background-color: #9cb2c7;
        height: 300px;
      "
      :style="{ backgroundImage: `url(${product.imageUrl})` }"
    ></div> -->
    <div class="col-md-7">
      <div
        id="carouselExampleIndicators"
        ref="carouselIndicators"
        class="carousel slide vh-100"
        data-bs-ride="carousel"
      >
        <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div class="carousel-inner vh-100">
          <div class="carousel-item" active>
            <img
              class="d-block w-100 ratio ratio-16x9"
              :src="product.imageUrl"
              key="0"
              alt=""
            />
          </div>
          <!-- <div
            class="carousel-item d-block ratio ratio-4x3"
            style="
              background-size: cover;
              background-position: center center;
              background-blend-mode: multiply;
              background-color: #9cb2c7;
            "
            :style="{ backgroundImage: `url(${product.imageUrl})` }"
            active
          ></div> -->
          <div
            class="carousel-item"
            v-for="(image, key) in product.imagesUrl"
            :key="key"
          >
            <img class="d-block" :src="image" :alt="key" />
          </div>

          <!-- <div
            class="carousel-item d-block ratio ratio-4x3"
            v-for="(image, key) in product.imagesUrl"
            :key="key"
            style="
              background-size: cover;
              background-position: center center;
              background-blend-mode: multiply;
              background-color: #9cb2c7;
            "
            :style="{ backgroundImage: `url(${image})` }"
          ></div> -->
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">上一頁</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">下一頁</span>
        </button>
      </div>
    </div>
    <div class="col-md-5"></div>
  </div>
</template>

<script>
import carousel from 'bootstrap/js/dist/carousel';

export default {
  data() {
    return {
      isLoading: false,
      product: {},
      id: '',
      carousel: {},
    };
  },
  methods: {
    getProduct() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${this.id}`;
      this.isLoading = true;
      this.$http.get(api).then((response) => {
        if (response.data.success) {
          this.product = response.data.product;
        }
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
          this.$router.push('/user/cart');
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
    // eslint-disable-next-line new-cap
    this.carousel = new carousel(this.$refs.carouselIndicators);
  },
};
</script>
