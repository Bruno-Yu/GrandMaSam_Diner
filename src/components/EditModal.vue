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
          <h5 id="delProductModalLabel" class="modal-title">
            <span>刪除產品</span>
          </h5>
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
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button type="button" class="btn btn-danger" @click="updateData">
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>

  <div
    v-show="!deleteOn"
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
          </h5>
          <button
            type="button"
            class="btn-close btn-light"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body container">
          <div class="row">
            <!-- 視窗左邊 -->
            <div class="col-sm-12 col-md-6">
              <div class="mb-2">
                <div class="mb-3">
                  <label for="imageUrl" class="form-label">輸入圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="請輸入圖片連結"
                    v-model="productDisplay.imageUrl"
                    id="imageUrl"
                  />
                </div>
                <img
                  class="img-fluid"
                  :src="productDisplay.imageUrl"
                  :alt="productDisplay.title"
                />
                <div
                  class="mb-1"
                  v-for="(image, key) in productDisplay.imagesUrl"
                  :key="key"
                >
                  <div class="form-group">
                    <label for="imagesUrl" class="form-label">圖片網址</label>
                    <input
                      v-model="productDisplay.imagesUrl[key]"
                      type="text"
                      class="form-control"
                      placeholder="請輸入圖片連結"
                      id="imagesUrl"
                    />
                  </div>
                  <img class="img-fluid" :src="image" :alt="key" />
                </div>
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
                  <label for="unit" class="form-label">單位</label>
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
          <div class="modal-footer bg-dark text-white">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-bs-dismiss="modal"
            >
              取消
            </button>
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
    updateData() {
      if (this.newOn) {
        this.$http
          .post(
            `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product`,
            {
              data: this.productDisplay,
            },
          )
          .then((response) => {
            this.$httpMessageState(response, '更新資料成功');
            this.bsNewproduct.hide();
            this.$emit('get-data');
          })
          .catch((err) => {
            this.$httpMessageState(err.response, '錯誤訊息');
            this.bsNewproduct.hide();
          });
      } else if (this.deleteOn) {
        this.$http
          .delete(
            `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.productDisplay.id}`,
          )
          .then((response) => {
            this.$httpMessageState(response, '成功刪除');

            this.$emit('get-data');
            this.bsDeleteproduct.hide();
          })
          .catch((err) => {
            this.$httpMessageState(err.response, '錯誤訊息');
            this.bsDeleteproduct.hide();
          });
      } else {
        this.$http
          .put(
            `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.productDisplay.id}`,
            { data: this.productDisplay },
          )
          .then((response) => {
            this.$httpMessageState(response, '成功獲得資料');
            this.bsNewproduct.hide();
            this.$emit('get-data');
          })
          .catch((err) => {
            this.$httpMessageState(err.response, '錯誤訊息');
            this.bsNewproduct.hide();
          });
      }
    },
  },
  mounted() {
    this.bsNewproduct = new Modal(document.querySelector('#productModal'));
    this.bsDeleteproduct = new Modal(
      document.querySelector('#delProductModal'),
    );
  },
};
</script>
