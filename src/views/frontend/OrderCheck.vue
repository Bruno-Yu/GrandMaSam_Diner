<template>
  <ModalMessage ref="modalMessage"></ModalMessage>
  <div class="container mt-4" style="max-width: 1000px">
    <div class="row my-5 justify-content-center">
      <div class="col-md-6">
        <h3 class="fw-bold">用戶資料</h3>
        <table class="table">
          <tbody v-if="orderShow.user">
            <tr>
              <th style="width: 100px">姓名</th>
              <td>{{ orderShow.user.name }}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{{ orderShow.user.email }}</td>
            </tr>
            <tr>
              <th>電話</th>
              <td>{{ orderShow.user.tel }}</td>
            </tr>
            <tr>
              <th>地址</th>
              <td>{{ orderShow.user.address }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-md-6">
        <h3 class="fw-bold">訂單細節</h3>
        <table class="table">
          <tbody>
            <tr>
              <th style="width: 100px">訂單編號</th>
              <td>{{ orderShow.id }}</td>
            </tr>
            <tr>
              <th>下單時間</th>
              <td>{{ orderShow.create_at }}</td>
            </tr>
            <tr>
              <th>付款時間</th>
              <td>
                {{ PaidDate }}
              </td>
            </tr>
            <tr>
              <th>付款狀態</th>
              <td>
                <strong v-if="orderShow.is_paid" class="text-success"
                  >已付款</strong
                >
                <span v-else class="text-muted">尚未付款</span>
              </td>
            </tr>
            <tr>
              <th>總金額</th>
              <td>
                {{ orderShow.total }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <hr />
      <div class="row my-2 justify-content-center">
        <h3 class="fw-bold">選購商品</h3>
        <table class="table col-6">
          <thead>
            <tr></tr>
          </thead>
          <tbody>
            <tr v-for="item in orderShow.products" :key="item.id">
              <th>
                {{ item.product.title }}
              </th>
              <td>{{ item.qty }} / {{ item.product.unit }}</td>
              <td class="text-end">
                {{ item.final_total }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div class="my-3 d-flex justify-content-center">
    <button type="button" class="btn btn-danger fw-bolder" @click="updatePaid">
      確認付款
    </button>
  </div>
</template>
<script>
import emitter from '@/libs/emitter';
// import ModalMessage from '@/components/ModalMessage.vue';

export default {
  data() {
    return {
      status: {},
      orders: {},
      orderShow: {},
      isPaid: false,
      PaidDate: '尚未付款',
    };
  },
  components: {
    // ModalMessage,
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
          emitter.emit('order-id', this.orderShow.id);
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    updatePaid() {
      const { id } = this.orderShow;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/pay/${id}`;
      this.$http
        .post(api)
        .then(() => {
          this.PaidDate = this.PaidDateRenewed();
          this.$refs.modalMessage.openModal(true, 'paid');
        })
        .catch(() => {
          this.$refs.modalMessage.openModal(false, 'paid');
        });
    },
  },
  created() {
    this.getOrder();
    emitter.on('paidSuccess', (data) => {
      if (data === 'paidSuccess') {
        this.$router.push('/paidSuccess');
      }
    });
  },
};
</script>
