<template>
  <div>
    <h2 class="my-5 ms-2 fw-bold text-center">優惠券管理頁面</h2>
    <div class="text-end mt-4">
      <button class="btn btn-dark" type="button" @click="openCouponModal(true)">
        建立新的優惠券
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>名稱</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in coupons" :key="key">
          <td>{{ item.title }}</td>
          <td>{{ item.percent }}%</td>
          <td>{{ item.due_date }}</td>
          <td>
            <span v-if="item.is_enabled === 1" class="text-success">啟用</span>
            <span v-else class="text-muted">未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                @click="openCouponModal(false, item)"
              >
                編輯
              </button>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="openDelCouponModal(item)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <CouponDetail
      :coupon="couponShow"
      :isNew="isNew"
      ref="couponDetail"
      @update-coupon="updateCoupon"
    ></CouponDetail>
    <OrderDelete
      :item="couponShow"
      ref="delModal"
      @del-item="delCoupon"
    ></OrderDelete>
  </div>
</template>

<script>
import OrderDelete from '@/components/OrderDelete.vue';
import CouponDetail from '@/components/CouponDetail.vue';

export default {
  components: { CouponDetail, OrderDelete },
  data() {
    return {
      coupons: {},
      couponShow: {
        title: '',
        is_enabled: 0,
        percent: 100,
        code: '',
      },
      isLoading: false,
      isNew: false,
    };
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
    openCouponModal(isNew, item) {
      this.isNew = isNew;
      if (this.isNew) {
        this.couponShow = {
          due_date: new Date().getTime() / 1000,
        };
      } else {
        this.couponShow = { ...item };
      }
      this.$refs.couponDetail.openModal();
    },
    openDelCouponModal(item) {
      this.couponShow = { ...item };
      this.$refs.delModal.openModal();
    },
    getCoupons() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupons`;
      this.$http
        .get(url, this.tempProduct)
        .then((res) => {
          this.coupons = res.data.coupons.map((item) => ({
            ...item,
            due_date: this.dateTimeFormat(item.due_date),
          }));
        })
        .catch((error) => {
          alert(error.response, '錯誤訊息');
        });
    },
    updateCoupon(couponShow) {
      let url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon`;
      let httpMeth = 'post';
      let data = couponShow;

      if (!this.isNew) {
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${this.couponShow.id}`;
        httpMeth = 'put';
        data = this.couponShow;
      }

      this.$http[httpMeth](url, { data })
        .then((response) => {
          alert(response, '新增優惠券');
          this.getCoupons();
          this.$refs.couponDetail.closeModal();
        })
        .catch((error) => {
          alert(error.response, '錯誤訊息');
        });
    },
    delCoupon() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${this.couponShow.id}`;
      this.$http
        .delete(url)
        .then((response) => {
          alert(response, '刪除優惠券');
          this.$refs.delModal.cloaseModal();
          this.getCoupons();
        })
        .catch((error) => {
          this.alert(error.response, '刪除優惠券');
        });
    },
  },
  created() {
    this.getCoupons();
  },
};
</script>
