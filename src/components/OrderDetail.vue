<template>
  <div
    class="modal fade"
    tabindex="-1"
    role="dialog"
    id="orderDetail"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>訂單細節</span>
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
            <div class="col-md-4">
              <h3>用戶資料</h3>
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
            <div class="col-md-8">
              <h3>訂單細節</h3>
              <table class="table">
                <tbody>
                  <tr>
                    <th style="width: 100px">訂單編號</th>
                    <td>{{ orderShow.id }}</td>
                  </tr>
                  <tr>
                    <th>下單時間</th>
                    <td>{{ CreateDate }}</td>
                  </tr>
                  <tr>
                    <th>付款時間</th>
                    <td>
                      <span v-if="orderShow.paid_date">
                        {{ PaidDate }}
                      </span>
                      <span v-else>時間不正確</span>
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
              <h3>選購商品</h3>
              <table class="table">
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
              <div class="d-flex justify-content-end">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    v-model="orderShow.is_paid"
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    <span v-if="orderShow.is_paid">已付款</span>
                    <span v-else>未付款</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button type="button" class="btn btn-primary" @click="updateOrder()">
            修改付款狀態
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Modal from 'bootstrap/js/dist/modal';

export default {
  props: ['order'],
  data() {
    return {
      status: {},
      modal: '',
      orderShow: {},
      isPaid: false,
    };
  },
  computed: {
    CreateDate() {
      const date = new Date(this.orderShow.create_at * 1000);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const dateFull = `${year}/${month}/${day}`;
      return dateFull;
    },
    PaidDate() {
      const date = new Date(this.orderShow.is_paid * 1000);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const dateFull = `${year}/${month}/${day}`;
      return dateFull;
    },
  },
  watch: {
    order() {
      this.orderShow = this.order;
    },
  },
  methods: {
    openModal() {
      this.modal.show();
    },
    closeModal() {
      this.modal.hide();
    },
    updateOrder() {
      this.$emit('update-paid', this.orderShow);
    },
  },
  mounted() {
    this.modal = new Modal(document.querySelector('#orderDetail'));
  },
};
</script>
