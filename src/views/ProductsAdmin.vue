<template>
  <div class="container">
    <h2 class="my-5 ms-2 fw-bold text-center">產品管理列表</h2>
    <div class="text-end mt-4">
      <!-- 建立新產品按鈕 -->
      <button type="button" class="btn btn-primary" @click="modalOn('new')">
        建立新的產品
      </button>
    </div>
    <div class="row py-3">
      <div class="col-xl-6">
        <table class="table mt-4">
          <thead>
            <tr>
              <th width="100">分類</th>
              <th>產品名稱</th>
              <th width="100">原價</th>
              <th width="100">售價</th>
              <th width="100">是否啟用</th>
              <th width="100">功能按鈕</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, key) in productsList" :key="key">
              <!-- 分類 -->
              <td>{{ item.category }}</td>
              <!-- 產品名稱 -->
              <td class="fw-bold text-decoration-underline">
                {{ item.title }}
              </td>
              <!-- 原價 -->
              <td class="text-secondary fw-light">{{ item.origin_price }}</td>
              <!-- 售價 -->
              <td class="fw-bold">{{ item.price }}</td>
              <td>
                <!-- 是否啟用 v-if 或是 三元函式 -->
                <span v-if="item.is_enabled" class="text-success">啟用</span>
                <span v-else class="text-danger">未啟用</span>
              </td>
              <td>
                <div class="btn-group" :data-id="key">
                  <!-- 修改3: 嘗試直接傳入item到內層進行修改 -->
                  <!-- 產品細節按鈕 -->
                  <button
                    type="button"
                    class="btn btn-outline-success btn-sm"
                    :data-detail-id="key"
                    v-on:click="productDetail(item)"
                  >
                    細節
                  </button>
                  <!-- 編輯按鈕 -->
                  <button
                    type="button"
                    class="btn btn-outline-primary btn-sm"
                    :data-edit-id="key"
                    @click="modalOn('edit', item)"
                  >
                    編輯
                  </button>
                  <!-- 刪除按鈕 -->
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    :data-delete-id="key"
                    @click="modalOn('delete', item)"
                  >
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-xl-6">
        <!-- 產品細節 -->
        <ProductDetail
          :product-display="emitData.productDisplay"
          :detail-display="emitData.detailDisplay"
        ></ProductDetail>
      </div>
    </div>
  </div>
  <!-- BS Modal 產品跳出視窗-->
  <!-- id="productModal" -->
  <EditModal ref="editModal" @get-data="getData"></EditModal>>
  <!-- 分頁元件 -->
  <PaginationFooter
    :current-page="current_page"
    :has-pre="has_pre"
    :has-next="has_next"
    :total-pages="total_pages"
    @click-page="getData"
  ></PaginationFooter>
</template>

<script type="module">
// import emitter from '@/libs/emitter';
import EditModal from '../components/EditModal.vue';
import PaginationFooter from '../components/PaginationFooter.vue';
import ProductDetail from '../components/ProductDetail.vue';

export default {
  data() {
    return {
      // 呈現的產品資料
      productsList: null,
      // 建立接收get資料庫陣列的各屬性狀態
      current_page: 1,
      has_next: true,
      has_pre: false,
      total_pages: 1,
      emitData: {
        productDisplay: {
          imagesUrl: [],
        },
        newOn: false,
        detailDisplay: false,
        deleteOn: false,
      },
    };
  },
  components: {
    EditModal,
    PaginationFooter,
    ProductDetail,
  },
  provide() {
    return {
      emitData: this.emitData,
    };
  },
  methods: {
    // 渲染資料到畫面上
    getData(page = 1) {
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`,
        )
        // 成功結果接收
        .then((res) => {
          // 取得的結果為雙層物件，key是id value是內容
          // console.log("成功取得資料");
          console.log(res.data.products);
          // 將productlist 渲染出來，陣列型式
          this.productsList = res.data.products;
          // 將pagination各屬性帶入data屬性中
          this.current_page = res.data.pagination.current_page;
          this.has_next = res.data.pagination.has_next;
          this.has_pre = res.data.pagination.has_pre;
          this.total_pages = res.data.pagination.total_pages;
          // console.log (this.has_next);
        })
        //   若data取得失敗
        .catch((error) => {
          alert(error.message);
        });
    },

    // modalOn("狀態", 物件)
    // 打開視窗=>先放在根元件試試(因為是根元件的html按鈕互動)
    // 在根元件中放入 第一參數(狀態)辨別開編輯還是新增 以及刪除 按鈕=> 改變外部js屬性狀態(編輯新增合併、刪除獨立)
    // 清空productlist，帶入對應的物件 (第二參數)
    // 利用物件方法打開子元件互動視窗

    // 新增與編輯功能，開啟modal視窗
    modalOn(status, item) {
      // 判斷點按鈕狀態放在根元件
      // 編輯做法
      if (status === 'edit') {
        // 帶入編輯目標的內容
        // 清空上次留下的內容
        this.emitData.productDisplay = {
          imagesUrl: [],
        };
        // 預設就是編輯，所以不改變js變數狀態
        // newOn=false;
        this.emitData.detailDisplay = false;
        this.emitData.productDisplay = item;
        this.$refs.editModal.bsNewproduct.show();
      } else if (status === 'new') {
        // 清空
        this.emitData.productDisplay = {
          imagesUrl: [],
        };
        // 新增方法狀態，改變對應的js變數
        this.emitData.newOn = true;
        this.emitData.detailDisplay = false;
        this.emitData.deleteOn = false;
        this.$refs.editModal.bsNewproduct.show();
      } else if (status === 'delete') {
        // 清空
        this.emitData.productDisplay = {
          imagesUrl: [],
        };
        // 刪除方法狀態，改變對應的js變數
        this.emitData.productDisplay = item;
        this.emitData.newOn = false;
        this.emitData.detailDisplay = false;
        this.emitData.deleteOn = true;
        this.$refs.editModal.bsDeleteproduct.show();
      }
    },

    // 呈現細節視窗按鈕
    productDetail(item) {
      this.emitData.productDisplay = item;
      this.emitData.detailDisplay = true;
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style>
img {
  object-fit: contain;
  max-width: 100%;
}

.primary-image {
  height: 300px;
}

.images {
  height: 150px;
}
.displayNone {
  display: none;
}
.displayBlock {
  display: block;
}
</style>
