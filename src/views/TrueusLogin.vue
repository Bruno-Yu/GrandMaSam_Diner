<template>
  <div class="container">
    <div class="row justify-content-center">
      <h1 class="h3 my-5 font-weight-normal text-center fw-bolder">
        管理員請先登入
      </h1>
      <div class="col-8 col-lg-5">
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
            class="btn btn-lg btn-dark w-100 mt-3"
            data-name="loginBtn"
            type="button"
            v-on:click="login"
          >
            登入
          </button>
        </form>
      </div>
    </div>
    <p class="mt-5 mb-3 text-muted text-center">
      &copy; 2022~∞ - 六角學院關心您的肝與助教們的肝
    </p>
    <p class="fw-light mb-3 text-muted text-center">改編自辛苦的助教Ray</p>
  </div>
</template>

<script>
export default {
  methods: {
    // 登入鈕
    login() {
      // 抓取使用者輸入資訊
      // EMAIL 輸入欄DOM元素
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
          console.log('登入成功');
          const { token, expired } = res.data;
          document.cookie = `hexToken=${token};expires=${new Date(expired)};`;
          this.$router.push('/admin');
          alert('登入成功，按確定後進行跳轉');
        })
        .catch((error) => {
          alert(
            `警告: ${error.data.message} \n提醒: ${error.data.error.message}`,
          );
        });
    },
  },
};
</script>
