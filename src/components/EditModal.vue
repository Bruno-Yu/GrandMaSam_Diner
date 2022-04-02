<template>
  <!-- 刪除產品視窗 -->
  <div
    v-show="delteOn"
    id="delProductModal"
    ref="delProductModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="delProductModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <!-- 刪除產品視窗標題 -->
          <h5 id="delProductModalLabel" class="modal-title">
            <span>刪除產品</span>
          </h5>
          <!-- 刪除產品視窗關閉 -->
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          是否刪除
          <strong class="text-danger"></strong> 商品(刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <!-- 取消刪除按鈕 -->
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <!-- 確認刪除按鈕 -->
          <button type="button" class="btn btn-danger" @click="updateData">
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>

  <div
    v-show="!deletOn"
    id="productModal"
    ref="productModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="productModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="productModalLabel" class="modal-title">
            <!-- 新增或編輯產品標題，共用視窗 -->
            <span v-if="newOn">{{ newTitle }}</span>
            <span v-else>{{ editTitle }}</span>
            <!-- <span>新增產品</span> -->
          </h5>
          <!-- 新增或編輯產品標題，共用視窗關閉 -->
          <!-- 叉叉如何變成白色呢? -->
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body container">
          <div class="row">
            <!-- 視窗左邊 -->
            <div class="col-sm-12 col-md-6">
              <div class="mb-2">
                <!-- 輸入圖片網址 input  -->
                <div class="mb-3">
                  <label for="imageUrl" class="form-label">輸入圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="請輸入圖片連結"
                    v-model="productDisplay.imageUrl"
                  />
                </div>
                <!-- 輸入圖片預覽 -->
                <img class="img-fluid" :src="productDisplay.imageUrl" alt="" />

                <!-- 新增圖片按鈕 -->
                <!-- v-if v-else -->
                <!-- 圖片檔案上傳寫法 -->
                <!-- <div v-if="productDisplay.imagesUrl.length!==0"> -->
                <!-- 使用v-for帶出陣列內容 記得加:key -->
                <div
                  class="mb-1"
                  v-for="(image, key) in productDisplay.imagesUrl"
                  :key="key"
                >
                  <div class="form-group">
                    <label for="imagesUrl" class="form-label">圖片網址</label>
                    <!-- 將陣列網址逐一帶入 -->
                    <input
                      v-model="productDisplay.imagesUrl[key]"
                      type="text"
                      class="form-control"
                      placeholder="請輸入圖片連結"
                    />
                  </div>
                  <!-- 將陣列中圖片展示 -->
                  <img class="img-fluid" :src="image" alt="" />
                </div>
                <!-- v-if -->
                <!-- 多圖新增 -->
                <!-- 如果陣列長度是0是true(沒有圖)，或陣列中只有1張圖片 -->
                <div
                  v-if="
                    !productDisplay.imagesUrl.length ||
                    productDisplay.imagesUrl[
                      productDisplay.imagesUrl.length - 1
                    ]
                  "
                >
                  <button
                    type="button"
                    class="btn btn-outline-primary btn-sm d-block w-100"
                    @click="productDisplay.imagesUrl.push('')"
                  >
                    新增圖片
                  </button>
                </div>
                <div v-else>
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm d-block w-100"
                    @click="productDisplay.imagesUrl.pop()"
                  >
                    刪除圖片
                  </button>
                </div>
              </div>
            </div>

            <!-- 視窗右邊 -->
            <div class="col-sm-12 col-md-6">
              <div class="mb-3">
                <!-- 產品標題 input -->
                <label for="title" class="form-label">標題</label>
                <input
                  id="title"
                  type="text"
                  class="form-control"
                  placeholder="請輸入標題"
                  v-model="productDisplay.title"
                />
              </div>

              <div class="row">
                <!-- 產品分類 input -->
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input
                    id="category"
                    type="text"
                    class="form-control"
                    placeholder="請輸入分類"
                    v-model="productDisplay.category"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <!-- 產品單位 input-->
                  <label for="price" class="form-label">單位</label>
                  <input
                    id="unit"
                    type="text"
                    class="form-control"
                    placeholder="請輸入單位"
                    v-model="productDisplay.unit"
                  />
                </div>
              </div>

              <div class="row">
                <!-- 產品原價 input -->
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input
                    id="origin_price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入原價"
                    v-model="productDisplay.origin_price"
                  />
                </div>
                <!-- 產品售價 input -->
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input
                    id="price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入售價"
                    v-model="productDisplay.price"
                  />
                </div>
              </div>
              <hr />

              <!-- 產品描述 textarea -->
              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea
                  id="description"
                  type="text"
                  class="form-control"
                  placeholder="請輸入產品描述"
                  v-model="productDisplay.description"
                >
                </textarea>
              </div>
              <div class="mb-3">
                <!-- 產品說明內容textarea -->
                <label for="content" class="form-label">說明內容</label>
                <textarea
                  id="description"
                  type="text"
                  class="form-control"
                  placeholder="請輸入說明內容"
                  v-model="productDisplay.content"
                >
                </textarea>
              </div>
              <div class="mb-3">
                <!-- 產品是否啟用 -->
                <div class="form-check">
                  <input
                    id="is_enabled"
                    class="form-check-input"
                    type="checkbox"
                    :true-value="1"
                    :false-value="0"
                    v-model="productDisplay.is_enabled"
                  />
                  <label class="form-check-label" for="is_enabled"
                    >是否啟用</label
                  >
                </div>
              </div>
            </div>
          </div>

          <!-- 視窗footer -->
          <div class="modal-footer bg-dark text-white">
            <!-- 取消新增&編輯按鈕 -->
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-bs-dismiss="modal"
            >
              取消
            </button>
            <!-- 確認新增&編輯按鈕  -->
            <button
              type="button"
              class="btn btn-primary"
              v-on:click="updateData"
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';
// import emitter from '@/libs/emitter';

export default {
  inject: ['emitData'],
  data() {
    return {
      // 新增與編輯的 MODAL title
      newTitle: '新增產品',
      editTitle: '編輯產品',
      bsNewproduct: null,
      bsDeleteproduct: null,
      productDisplay: this.emitData.productDisplay,
      newOn: this.emitData.newOn,
      detailDisplay: this.emitData.detailDisplay,
      deleteOn: this.emitData.deleteOn,
    };
  },
  watch: {
    emitData: {
      handler() {
        this.productDisplay = this.emitData.productDisplay;
        this.newOn = this.emitData.newOn;
        this.detailDisplay = this.emitData.detailDisplay;
        this.deleteOn = this.emitData.deleteOn;
      },
      deep: true,
    },
  },
  methods: {
    // 由於Modal的BS方法對應的id是在 product-modal裡
    // 若要在外層使用，要將DOM元素傳出
    // 因此使用BS實體化方法也使用在元件中
    // 外層CLICK按鈕後，要改變跟元件的data資料狀態，再使用PROPS傳遞狀態到內層，內層再根據狀態打開MODAL至外層
    // BS MODAL開啟方式=> bs.display，透過放在子元件賦值外部js達到bs方法公用
    // props 要傳兩個的資料進來，對應的產品按鍵狀態& productDisplay
    // 清空在確認裡，然侯再將空的productDisplay傳出=>不行，若沒有修改就沒清空了

    // newproduct=true, productDisplay

    //  新增與編輯功能 確認按鈕建立
    // 清空展示產品已做在 開啟視窗方法中
    updateData() {
      // 新增資料
      if (this.newOn) {
        // 取modal上使用者輸入的資料 v-modal串聯
        this.$http
          .post(
            `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product`,
            {
              data: this.productDisplay,
            },
          )
          .then((response) => {
            alert(response.data.message);
            this.bsNewproduct.hide();
            // 需要重新觸發外層的getData()方法，再次渲染新資料
            this.$emit('get-data');
          })
          .catch((err) => {
            alert(err.data.message);
            this.bsNewproduct.hide();
          });

        // 刪除的設定方法
      } else if (this.deleteOn) {
        this.$http
          .delete(
            `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.productDisplay.id}`,
          )
          .then((response) => {
            alert(response.data.message);

            // 需要帶入外層getData方法
            this.$emit('get-data');
            this.bsDeleteproduct.hide();
          })
          .catch((err) => {
            alert(err.data.message);
            this.bsDeleteproduct.hide();
          });
        // 編輯方法
      } else {
        this.$http
          .put(
            `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.productDisplay.id}`,
            { data: this.productDisplay },
          )
          .then((response) => {
            alert(response.data.message);
            this.bsNewproduct.hide();
            // 需要帶入外層getData方法
            this.$emit('get-data');
          })
          .catch((err) => {
            alert(err.data.message);
            this.bsNewproduct.hide();
          });
      }
    },
  },

  mounted() {
    // BS MODAL功能實體化
    // 針對不同目標DOM實體化
    // 新增或編輯DOM
    this.bsNewproduct = new Modal(document.querySelector('#productModal'));
    //   針對刪除DOM
    this.bsDeleteproduct = new Modal(
      document.querySelector('#delProductModal'),
    );
  },
};
</script>
