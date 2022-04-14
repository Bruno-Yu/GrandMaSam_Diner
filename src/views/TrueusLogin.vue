<template>
  <PageLoading
    loader="bars"
    :active="isLoading"
    :can-cancel="true"
    :is-full-page="false"
  ></PageLoading>
  <ModalMessage ref="modalMessage"></ModalMessage>
  <!-- :succeeded="success" -->
  <div class="container-fluid">
    <div class="row justify-content-center gx-0">
      <h1 class="h3 my-5 font-weight-normal text-center fw-bolder">
        榮譽會員登入處
      </h1>
      <div class="col-8 col-lg-5 mb-5">
        <form id="form" class="form-signin">
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              id="username"
              placeholder="name@example.com"
              required
            />
            <label for="username">Email address</label>
          </div>
          <div class="form-floating">
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
              required
            />
            <label for="password">Password</label>
          </div>
          <button
            class="btn btn-lg btn-warning fw-bold shadow w-100 mt-3"
            data-name="loginBtn"
            type="button"
            v-on:click="login"
          >
            登入
          </button>
        </form>
        <div class="container text-center mt-3">
          <p class="text-muted fw-bold">只有會員才能登入呦! 如果您也想登入</p>
          <p class="text-muted fw-bold">
            請立即點<router-link to="/about" class="link-danger fw-bold"
              >這邊</router-link
            >並斗內作者
          </p>
        </div>
      </div>
    </div>
    <p class="mt-5 mb-1 text-center font-Noto fw-500">
      &copy; 2022~∞ - 八角學堂向以下人員致敬
    </p>
    <p class="mb-3 text-muted text-center font-Noto fw-500">
      辛苦的卡老師、Ray與其他同期的駁二裝置藝術們
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      success: false,
      isLoading: false,
    };
  },
  components: {
    // ModalMessage,
  },
  methods: {
    login() {
      // EMAIL 輸入欄DOM元素
      this.isLoading = true;
      const InputEmail = document.querySelector('#username');
      // PASSWORD輸入欄DOM元素
      const InputPassword = document.querySelector('#password');
      const username = InputEmail.value;
      const password = InputPassword.value;
      const user = { username, password };
      console.log(user);
      // 使用axios與傳送api確認授權
      this.$http
        .post(`${process.env.VUE_APP_API}/admin/signin`, user)
        .then((res) => {
          const { token, expired } = res.data;
          document.cookie = `hexToken=${token};expires=${new Date(expired)};`;
          this.isLoading = false;
          this.$refs.modalMessage.openModal(true, 'login');
        })
        .catch(() => {
          this.isLoading = false;
          this.$refs.modalMessage.openModal(false, 'login');
        });
    },
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  },
};
</script>
