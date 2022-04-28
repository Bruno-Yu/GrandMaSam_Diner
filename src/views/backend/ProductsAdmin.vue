<template>
  <PageLoading
    loader="bars"
    :active="isLoading"
    :can-cancel="true"
    :is-full-page="false"
  ></PageLoading>
  <div class="container p-5">
    <h2 class="my-5 ms-2 fw-bold text-center">產品管理列表</h2>
    <div class="text-end mt-4">
      <button
        type="button"
        class="btn btn-primary font-Noto fw-400"
        @click="modalOn('new')"
        :disabled="isLoadingItem === 'New'"
      >
        <span
          class="spinner-grow spinner-grow-sm "
          v-show="isLoadingItem === 'New'"
        ></span>
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
              <td>{{ item.category }}</td>
              <td class="fw-bold text-decoration-underline">
                {{ item.title }}
              </td>
              <td class="text-secondary fw-light">{{ item.origin_price }}</td>
              <td class="fw-bold">{{ item.price }}</td>
              <td>
                <span v-if="item.is_enabled" class="text-success">啟用</span>
                <span v-else class="text-danger">未啟用</span>
              </td>
              <td>
                <div class="btn-group" :data-id="key">
                  <button
                    type="button"
                    class="btn btn-outline-success btn-sm"
                    :data-detail-id="key"
                    v-on:click="productDetail(item)"
                    :disabled="isLoadingItem === item.id"
                  >
                    <span
                      class="spinner-grow spinner-grow-sm"
                      v-show="isLoadingItem === item.id"
                    ></span>
                    細節
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-primary btn-sm"
                    :data-edit-id="key"
                    @click="modalOn('edit', item)"
                    :disabled="isLoadingItem === item.id"
                  >
                    <span
                      class="spinner-grow spinner-grow-sm"
                      v-show="isLoadingItem === item.id"
                    ></span>
                    編輯
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    :data-delete-id="key"
                    @click="modalOn('delete', item)"
                    :disabled="isLoadingItem === item.id"
                  >
                    <span
                      class="spinner-grow spinner-grow-sm"
                      v-show="isLoadingItem === item.id"
                    ></span>
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-xl-6">
        <ProductDetail
          :product-display="emitData.productDisplay"
          :detail-display="emitData.detailDisplay"
        ></ProductDetail>
      </div>
    </div>
  </div>
  <EditModal ref="editModal" @get-data="getData"></EditModal>
  <PaginationFooter
    :current-page="current_page"
    :has-pre="has_pre"
    :has-next="has_next"
    :total-pages="total_pages"
    @click-page="getData"
  ></PaginationFooter>
</template>

<script type="module">
import EditModal from '@/components/EditModal.vue';
import PaginationFooter from '@/components/PaginationFooter.vue';
import ProductDetail from '@/components/ProductDetail.vue';

export default {
  data() {
    return {
      productsList: null,
      current_page: 1,
      has_next: true,
      has_pre: false,
      total_pages: 1,
      isLoadingItem: '',
      isLoading: false,
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
    getData(page = 1) {
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`,
        )
        .then((res) => {
          this.productsList = res.data.products;
          this.current_page = res.data.pagination.current_page;
          this.has_next = res.data.pagination.has_next;
          this.has_pre = res.data.pagination.has_pre;
          this.total_pages = res.data.pagination.total_pages;
        })
        .catch((error) => {
          this.isLoading = false;
          this.$httpMessageState(error.response, '錯誤訊息');
        });
    },

    modalOn(status, item) {
      this.isLoading = true;
      if (status === 'edit') {
        this.isLoadingItem = item.id;
        this.emitData.productDisplay = {
          imagesUrl: [],
        };
        // 預設就是編輯，所以不改變js變數狀態
        this.emitData.detailDisplay = false;
        this.emitData.productDisplay = item;
        this.$refs.editModal.bsNewproduct.show();
      } else if (status === 'new') {
        this.isLoadingItem = 'New';
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
        this.isLoadingItem = item.id;
        this.emitData.productDisplay = {
          imagesUrl: [],
        };
        this.emitData.productDisplay = item;
        this.emitData.newOn = false;
        this.emitData.detailDisplay = false;
        this.emitData.deleteOn = true;
        this.$refs.editModal.bsDeleteproduct.show();
      }
      this.isLoadingItem = '';
      this.isLoading = false;
    },

    productDetail(item) {
      this.isLoadingItem = item.id;
      this.emitData.productDisplay = item;
      this.emitData.detailDisplay = true;
      this.isLoadingItem = '';
    },
  },
  mounted() {
    this.isLoading = true;
    this.getData();
    this.isLoading = false;
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
</style>
