<template>
  <ul class="nav justify-content-end">
    <li class="nav-item">
      <a
        class="nav-link text-decoration-none text-secondary"
        @click.prevent="logout"
        href="#"
        ><i class="bi bi-door-closed"></i>管理員登出</a
      >
    </li>
  </ul>
  <div class="container mt-3">
    <h1 class="text-center mt-5 fs-1 mb-3 fw-bolder">管理員頁面</h1>
    <p class="text-center fs-3 lh-sm text-secondary fw-bolder text-nowrap">
      身為真美國餐廳授權階級，您擁有操縱與編輯產品的權力:)
    </p>
    <nav class="d-flex justify-content-center">
      <router-link
        class="link-dark fw-bold text-decoration-none me-2 active"
        to="/admin"
      >
        產品管理列表
      </router-link>
      |
      <router-link
        class="link-dark text-decoration-none fw-bold mx-2"
        to="/orderAmin"
      >
        訂單管理列表
      </router-link>
      |
      <router-link
        class="link-dark text-decoration-none fw-bold ms-2"
        to="/couponsAdmin"
      >
        優惠券管理列表
      </router-link>
      |
      <router-link
        class="link-dark text-decoration-none fw-bold ms-2"
        to="/aboutAdmin"
      >
        關於我們編輯
      </router-link>
      |
      <router-link
        class="link-dark text-decoration-none fw-bold ms-2"
        to="/eventAdmin"
      >
        活動頁面編輯
      </router-link>
    </nav>
    <hr class="text-secondary" />
    <RouterView />
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      const api = `${process.env.VUE_APP_API}/logout`;
      this.$http
        .post(api)
        .then((response) => {
          alert(response, '登出');
          if (response.data.success) {
            this.$router.push('/trueusLogin');
          }
        })
        .catch((error) => {
          alert(error.response, '錯誤訊息');
        });
    },
  },
  created() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1',
    );
    this.$http.defaults.headers.common.Authorization = `${token}`;
    this.$http
      .post(`${process.env.VUE_APP_API}/api/user/check`)
      .then((res) => {
        console.log(res);
        alert('成功登入', `${res.data.sucess}`);
      })
      .catch((error) => {
        alert(error);
        this.$router.push('/trueusLogin');
      });
  },
};
</script>
