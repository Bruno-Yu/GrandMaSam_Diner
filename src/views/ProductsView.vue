<template>
  <div class="mt-4">
    <ProductModal
      :id="productId"
      ref="productModal"
      @add-cart="addToCart"
    ></ProductModal>
  </div>
  <h2 class="my-5 ms-2 fw-bold text-center">產品/服務列表</h2>
  <div class="card-group">
    <div class="row row-cols-1 row-cols-lg-4 g-2 g-lg-3">
      <div class="col" v-for="product in products" :key="product.id">
        <div class="card h-100 mb-3" style="max-width: 540px">
          <div class="row g-0">
            <div class="col-4">
              <img
                :src="product.imageUrl"
                class="img-fluid card-img rounded-start"
                alt="..."
              />
            </div>
            <div class="col-8">
              <div class="card-body">
                <h5 class="card-title fw-bolder">{{ product.title }}</h5>
                <p class="card-text text-secondary">
                  {{ product.description }}
                </p>
              </div>

              <div class="card-footer bg-light d-flex justify-content-end">
                <button
                  type="button"
                  class="btn btn-outline-dark btn-sm me-2"
                  @click="openProductModal(product.id)"
                >
                  查看細節
                </button>
                <button
                  type="button"
                  class="btn btn-dark btn-sm"
                  @click="addToCart(product.id)"
                >
                  加入購物車
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductModal from '../components/ProductModal.vue';

export default {
  data() {
    return {
      products: [],
      productId: '',
      addNum: 0,
      // 局部讀取效果對應變數
      isLoadingItem: '',
    };
  },
  components: {
    ProductModal,
  },
  methods: {
    getProducts() {
      this.$http
        .get(
          `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`,
        )
        .then((res) => {
          this.products = res.data.products;
        });
    },
    openProductModal(id) {
      this.productId = id;
      // 使用$refs調用productModal元件的 openModal()方法
      this.$refs.productModal.openModal();
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
        .then((res) => {
          console.log(res);
          // 清空局部讀取效果
          this.isLoadingItem = '';
        });
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>
