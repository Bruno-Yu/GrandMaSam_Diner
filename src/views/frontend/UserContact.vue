<template>
  <div class="container">
    <div class="my-5 row justify-content-center">
      <VForm ref="form" class="col-md-6" v-slot="{ errors }" @submit="onSubmit">
        <div class="mb-3">
          <label for="email" class="form-label fw-bold">
            Email <span class="text-danger fw-bolder">*</span></label
          >
          <VField
            id="email"
            name="email"
            type="email"
            class="form-control"
            :class="{ 'is-invalid': errors['email'] }"
            placeholder="請輸入 Email"
            rules="email|required"
            v-model="form.user.email"
          ></VField>
          <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="mb-3">
          <label for="name" class="form-label fw-bold"
            >收件人姓名 <span class="text-danger fw-bolder">*</span></label
          >
          <VField
            id="name"
            name="姓名"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['姓名'] }"
            placeholder="請輸入姓名"
            :rules="noEmpty"
            v-model="form.user.name"
          ></VField>
          <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="mb-3">
          <label for="tel" class="form-label fw-bold"
            >收件人電話 <span class="text-danger fw-bolder">*</span></label
          >
          <VField
            id="tel"
            name="電話"
            type="tel"
            class="form-control"
            :class="{ 'is-invalid': errors['電話'] }"
            placeholder="請輸入電話"
            :rules="isPhone"
            v-model="form.user.tel"
          ></VField>
          <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="mb-3">
          <label for="address" class="form-label fw-bold"
            >收件人地址 <span class="text-danger fw-bolder">*</span></label
          >
          <VField
            id="address"
            name="地址"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['地址'] }"
            placeholder="請輸入地址"
            :rules="noEmpty"
            v-model="form.user.address"
          ></VField>
          <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="mb-3">
          <label for="message" class="form-label fw-bold">留言</label>
          <textarea
            id="message"
            class="form-control"
            cols="30"
            rows="10"
            :rules="{ required: false }"
            v-model="form.message"
          ></textarea>
        </div>
        <p class="text-secondary fw-bolder small">
          說明: <span class="text-danger fw-bolder"> * </span>代表必填項目
        </p>
        <div class="d-flex justify-content-between">
          <button
            class="d-block btn btn-outline-danger fw-bolder"
            type="button"
            @click="prePage"
          >
            上一步
          </button>

          <button
            type="submit"
            class="d-block btn btn-danger"
            :disabled="
              Object.keys(errors).length > 0 || cartData.carts.length === 0
            "
          >
            送出訂單
          </button>
        </div>
      </VForm>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartData: {
        carts: [],
      },
      isLoadingItem: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    };
  },
  methods: {
    addToCart(id, qty = 1) {
      const data = {
        product_id: id,
        qty,
      };
      // 局部讀取效果賦值對應id
      this.isLoadingItem = id;
      this.$http
        .post(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`,
          { data },
        )
        .then(() => {
          this.getCart();
          this.isLoadingItem = '';
        });
    },
    getCart() {
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          this.cartData = res.data.data;
        });
    },
    // 驗證 表單觸發方法
    onSubmit() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`;
      const order = this.form;
      this.$http.post(url, { data: order }).then(() => {
        this.$refs.form.resetForm();
        this.$router.push('/orderCheck');
      });
    },
    noEmpty(value) {
      return value ? true : '此欄不得為空';
    },
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : '需要正確的電話號碼';
    },
    prePage() {
      this.$router.push('/cartView');
    },
  },
  mounted() {
    this.getCart();
  },
};
</script>
