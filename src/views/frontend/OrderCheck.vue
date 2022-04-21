<template>
  <PageLoading
    loader="bars"
    :active="isLoading"
    :can-cancel="true"
    :is-full-page="false"
  ></PageLoading>
  <ModalMessage ref="modalMessage"></ModalMessage>
  <div class="container mt-4">
    <div class="container my-3 d-none d-md-grid">
      <div class="row row-cols-3">
        <div class="col">
          <button
            class="btn w-100 btn-warning rounded-2 shadow border border-dark border-3"
            type="button"
            disabled
          >
            <p class="fs-4 font-Noto fw-600 text-dark my-2">購物車</p>
          </button>
        </div>
        <div class="col">
          <button
            class="btn w-100 btn-warning rounded-2 shadow border border-dark border-3"
            type="button"
            disabled
          >
            <p class="fs-4 font-Noto fw-600 my-2">填寫資訊</p>
          </button>
        </div>
        <div class="col">
          <button
            class="btn w-100 btn-warning rounded-2 shadow border border-dark border-3"
            type="button"
          >
            <p class="fs-4 font-Noto fw-600 my-2">訂單內容</p>
          </button>
        </div>
      </div>
    </div>
    <h2
      class="font-Noto mt-2 mt-lg-5 fw-700 text-center text-md-start ps-md-5 text-warning"
    >
      步驟 3. 訂單內容
    </h2>
    <div
      class="container shadow my-5 bg-body border border-1 border-body align-middle rounded-3 px-lg-5"
    >
      <div
        class="row row-cols-1 row-cols-lg-2 mt-5 mb-3 justify-content-center"
      >
        <div class="col-lg-6 p-4 bg-body border border-1 border-body">
          <h3 class="fw-bold font-Noto mb-3">施主資訊</h3>
          <table class="table">
            <tbody v-if="orderShow.user">
              <tr>
                <th class="font-Noto fw-400">姓名</th>
                <td class="font-Noto fw-400">{{ orderShow.user.name }}</td>
              </tr>
              <tr>
                <th class="font-Noto fw-400">Email</th>
                <td>{{ orderShow.user.email }}</td>
              </tr>
              <tr>
                <th class="font-Noto fw-400">電話</th>
                <td>{{ orderShow.user.tel }}</td>
              </tr>
              <tr>
                <th class="font-Noto fw-400">地址</th>
                <td class="font-Noto fw-400">{{ orderShow.user.address }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="col-lg-6 p-4 bg-body border border-1 border-body">
          <h3 class="fw-bold font-Noto mb-3">訂單細節</h3>
          <table class="table">
            <tbody>
              <tr>
                <th class="font-Noto fw-400">訂單編號</th>
                <td>{{ orderShow.id }}</td>
              </tr>
              <tr>
                <th class="font-Noto fw-400">下單時間</th>
                <td>{{ orderShow.create_at }}</td>
              </tr>
              <tr>
                <th class="font-Noto fw-400">付款時間</th>
                <td>
                  {{ PaidDate }}
                </td>
              </tr>
              <tr>
                <th class="font-Noto fw-400">付款狀態</th>
                <td>
                  <strong
                    v-if="orderShow.is_paid"
                    class="text-success font-Noto fw-600"
                    >已付款</strong
                  >
                  <span v-else class="text-muted font-Noto fw-600"
                    >尚未付款</span
                  >
                </td>
              </tr>
              <tr>
                <th class="font-Noto fw-400">總金額</th>
                <td class="fs-4 font-Noto fw-bold text-warning">
                  {{ orderShow.total }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <hr />
      <div
        class="row my-2 justify-content-center p-4 bg-body border border-1 border-body"
      >
        <h3 class="fw-bold font-Noto">選購商品</h3>
        <table class="table col-6 mt-3 fw-bold font-Noto">
          <thead>
            <tr></tr>
          </thead>
          <tbody>
            <tr v-for="item in orderShow.products" :key="item.id">
              <th>
                {{ item.product.title }}
              </th>
              <td>
                {{ item.qty }}
                <span class="d-none d-lg-inline"
                  >/ {{ item.product.unit }}</span
                >
              </td>
              <td class="text-end">
                {{ item.final_total }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="my-3 d-flex justify-content-center">
        <button
          type="button"
          class="btn btn-danger fw-bold font-Noto fs-4 w-auto"
          @click="updatePaid"
        >
          確認並付款
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      status: {},
      orders: {},
      orderShow: {},
      isPaid: false,
      isLoading: false,
      PaidDate: '尚未付款',
    };
  },
  methods: {
    PaidDateRenewed() {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const dateFull = `${year}/${month}/${day}`;
      return dateFull;
    },
    dateTimeFormat(item) {
      const date = new Date(item * 1000);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const dateFull = `${year}/${month}/${day}`;
      return dateFull;
    },
    getOrder() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/orders`;
      this.$http
        .get(url)
        .then((res) => {
          this.orders = res.data.orders.map((item) => ({
            ...item,
            create_at: this.dateTimeFormat(item.create_at),
          }));
          this.orderShow = this.orders.pop();
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    updatePaid() {
      this.isLoading = true;
      const { id } = this.orderShow;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/pay/${id}`;
      this.$http
        .post(api)
        .then(() => {
          this.PaidDate = this.PaidDateRenewed();
          this.$refs.modalMessage.openModal(true, 'paid', id);
          this.isLoading = false;
        })
        .catch(() => {
          this.$refs.modalMessage.openModal(false, 'paid');
          this.isLoading = false;
        });
    },
  },
  created() {
    this.isLoading = true;
    this.getOrder();
    this.isLoading = false;
  },
};
</script>
