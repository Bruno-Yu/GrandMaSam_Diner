<template>
  <PageLoading
    loader="bars"
    :active="isLoading"
    :can-cancel="true"
    :is-full-page="false"
  ></PageLoading>
  <h2 class="my-5 ms-2 fw-bold text-center">訂單管理頁面</h2>
  <table class="table mt-4">
    <thead>
      <tr>
        <th scope="col">訂單號</th>
        <th scope="col">下訂時間</th>
        <th scope="col">Email</th>
        <th scope="col">購買品項</th>
        <th scope="col">應付金額</th>
        <th scope="col">是否付款</th>
        <th scope="col">編輯</th>
      </tr>
    </thead>
    <tbody v-if="orders.length">
      <tr
        v-for="(item, key) in orders"
        :key="key"
        :class="{ 'text-secondary': !item.is_paid }"
      >
        <td>{{ item.id }}</td>
        <td>{{ item.create_at }}</td>
        <td v-if="item.user">{{ item.user.email }}</td>
        <td>
          <ul class="list-group-numbered">
            <li
              class="list-group-item"
              v-for="(product, index) in item.products"
              :key="index"
            >
              {{ product.product.title }} 數量：{{ product.qty }}
              {{ product.product.unit }}
            </li>
          </ul>
        </td>
        <td class="text-right">{{ item.total }} 元</td>
        <td>
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              :id="`switch${item.id}`"
              v-model="item.is_paid"
              @change="updatePaid(item)"
            />
            <label class="form-check-label" :for="`switch${item.id}`">
              <span v-if="item.is_paid">已付款</span>
              <span v-else>未付款</span>
            </label>
          </div>
        </td>
        <td>
          <div class="btn-group">
            <button
              class="btn btn-outline-primary btn-sm"
              type="button"
              @click="openModal(item)"
              :disabled="isLoadingItem === item.id"
            >
              <span
                class="spinner-grow spinner-grow-sm"
                v-show="isLoadingItem === item.id"
              ></span>
              檢視
            </button>
            <button
              class="btn btn-outline-danger btn-sm"
              type="button"
              @click="openDelModal(item)"
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
  <OrderDetail
    :order="orderShow"
    ref="orderDetail"
    @update-paid="updatePaid"
  ></OrderDetail>
  <OrderDelete
    :order="orderShow"
    ref="delModal"
    @del-item="delOrder"
  ></OrderDelete>
  <PaginationFooter
    :current-page="current_page"
    :has-pre="has_pre"
    :has-next="has_next"
    :total-pages="total_pages"
    @click-page="getOrders"
  ></PaginationFooter>
</template>

<script>
import OrderDetail from '@/components/OrderDetail.vue';
import OrderDelete from '@/components/OrderDelete.vue';
import PaginationFooter from '@/components/PaginationFooter.vue';

export default {
  data() {
    return {
      orders: {},
      isNew: false,
      current_page: 1,
      has_next: false,
      has_pre: false,
      isLoading: false,
      isLoadingItem: '',
      total_pages: 1,
      orderShow: {},
      currentPage: 1,
    };
  },
  components: {
    PaginationFooter,
    OrderDelete,
    OrderDetail,
  },
  methods: {
    dateTimeFormat(item) {
      const date = new Date(item * 1000);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const dateFull = `${year}/${month}/${day}`;
      return dateFull;
    },
    getOrders(Page = 1) {
      this.isLoading = true;
      this.currentPage = Page;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders?page=${Page}`;
      this.$http
        .get(url, Page)
        .then((res) => {
          this.orders = res.data.orders.map((item) => ({
            ...item,
            create_at: this.dateTimeFormat(item.create_at),
          }));
          this.current_page = res.data.pagination.current_page;
          this.has_next = res.data.pagination.has_next;
          this.has_pre = res.data.pagination.has_pre;
          this.total_pages = res.data.pagination.total_pages;
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;
          this.$httpMessageState(error.response, '錯誤訊息');
        });
    },

    openModal(item) {
      this.isLoadingItem = item.id;
      this.orderShow = { ...item };
      this.isNew = false;
      this.$refs.orderDetail.openModal();
      this.isLoadingItem = '';
      this.isLoading = false;
    },
    openDelModal(item) {
      this.isLoadingItem = item.id;
      this.orderShow = { ...item };
      this.$refs.delModal.openModal();
      this.isLoadingItem = '';
      this.isLoading = false;
    },
    updatePaid(item) {
      this.isLoadingItem = item.id;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`;
      const paid = {
        is_paid: item.is_paid,
      };
      this.$http
        .put(api, { data: paid })
        .then((response) => {
          this.$refs.orderDetail.closeModal();
          this.getOrders(this.currentPage);
          this.$httpMessageState(response, '更新付款狀態');
          this.isLoadingItem = '';
          this.isLoading = false;
        })
        .catch((error) => {
          this.$httpMessageState(error.response, '錯誤訊息');
          this.isLoadingItem = '';
          this.isLoading = false;
        });
    },
    delOrder() {
      this.isLoadingItem = this.orderShow.id;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${this.orderShow.id}`;
      this.$http
        .delete(url)
        .then(() => {
          this.$refs.delModal.closeModal();
          this.isLoadingItem = '';
          this.getOrders(this.currentPage);
        })
        .catch((error) => {
          this.$httpMessageState(error.response, '錯誤訊息');
          this.isLoadingItem = '';
        });
      this.isLoadingItem = '';
      this.isLoading = false;
    },
  },
  created() {
    this.isLoading = true;
    this.getOrders();
    this.isLoading = false;
  },
  // updated() {
  //   this.getOrders();
  // },
};
</script>
