<template>
  <div
    class="modal fade"
    id="productModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>{{ product.title }}</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-6">
              <img class="img-fluid" :src="product.imageUrl" alt="" />
            </div>
            <div class="col-sm-6">
              <span class="badge bg-primary rounded-pill"> </span>
              <p>商品描述：{{ product.description }}</p>
              <p>商品內容：{{ product.content }}</p>
              <div class="h5">{{ product.unit }}</div>
              <del class="h6 text-secondary small">原價 {{ product.origin_price }} 元</del>
              <div class="h5">現在只要 {{ product.price }} 元</div>
              <div>
                <div class="input-group">
                  <!-- 數量用v-modal綁定 product-modal元件資料屬性 -->
                  <!-- 注意: 有設定最小值屬性 min -->
                  <!-- 但是是input標籤，所以會有bug如可以輸入負數、寫e -->
                  <!-- 建議用select -->
                  <input type="number" class="form-control" min="1" v-model="qty" />
                  <!-- 加入購物車功能按鈕 -->
                  <button type="button" class="btn btn-dark" @click="addToCart">加入購物車</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modal from 'bootstrap/js/dist/modal';

export default {
  props: ['id'],
  data() {
    return {
      bsModal: {},
      product: {},
      isLoadingItem: '',
      // 購物車的項目至少要有1個，所以需要填1作為預設值
      qty: 1,
    };
  },
  watch: {
    // 當id有變動時，就觸發在元件內的getProdct()
    // 因為id是根元件openProductModal方法傳入的，有變動代表使用者點擊的對象不同
    id() {
      this.getProduct();
    },
  },
  methods: {
    // 先將modal相關方法放在這邊，之後可以使用this.$refs在其他元件使用
    // 開啟modal方法
    openModal() {
      this.bsModal.show();
    },
    // 關閉modal方法
    closeModal() {
      this.bsModal.hide();
    },
    // 元件內利用props進來的id(openProductModal方法賦值的id)來取得遠端對應資料
    getProduct() {
      this.$http(
        `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${this.id}`,
      ).then((res) => {
        // 取得對應的單一產品並賦值元件內資料
        this.product = res.data.product;
      });
    },
    // 觸發元件內的addToCart()方法
    // 使用$emit 連結根元件的addToCart方法，注意要帶入兩個參數 1.產品id 2.數量
    addToCart() {
      this.$emit('add-cart', this.product.id, this.qty);
    },
  },
  mounted() {
    // 將BS的Modal方法實體化加入
    // 在js使用this.$refs抓樣板內的dorm元素
    // eslint-disable-next-line
    this.bsModal = new modal(this.$refs.modal);
    // 若是在外部設let modal=null直到在元件內賦值的話，由於作用域不同，ESLint會顯示紅線，若要在相同作用域使用，則要使用元件內資料變數賦值的方法
  },
};
</script>
