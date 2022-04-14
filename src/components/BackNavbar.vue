<template>
  <div id="header" class="container-fluid shadow p-3 mb-2 bg-body rounded">
    <div class="container gx-0">
      <nav class="navbar navbar-expand-lg navbar-light bg-light fix-top">
        <div class="container d-flex">
          <router-link
            class="fs-3 d-block navbar-brand my-0 lh-1 font-Bangers"
            to="/"
          >
            GRANDMA SAM DINER
            <p
              class="text-dark fw-lighter text-center fs-6 lh-1 mb-0 font-Bangers"
            >
              LET MAKE AMERICA GREAT AGAIN
            </p>
          </router-link>

          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="collapse navbar-collapse justify-content-end"
            id="navbarSupportedContent"
          >
            <ul class="navbar-nav align-items-center mb-2 ms-auto mb-lg-0">
              <li class="nav-item">
                <router-link
                  class="nav-link active fw-bold"
                  aria-current="page"
                  to="/admin"
                  ><i class="bi bi-shop-window"></i> 產品管理</router-link
                >
              </li>

              <li class="nav-item">
                <router-link
                  class="nav-link active fw-bold"
                  aria-current="page"
                  to="/ordersAdmin"
                >
                  <i class="bi bi-clipboard-check"></i>
                  訂單管理</router-link
                >
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link active fw-bold"
                  aria-current="page"
                  to="/eventAdmin"
                  ><i class="bi bi-emoji-sunglasses"></i>

                  活動編輯</router-link
                >
              </li>

              <li class="nav-item">
                <router-link
                  class="nav-link active fw-bold"
                  aria-current="page"
                  to="/aboutAdmin"
                  ><i class="bi bi-journal-text"></i> 關於作品</router-link
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link active fw-bold text-decoration-none"
                  aria-current="page"
                  @click.prevent="logout"
                  href="#"
                >
                  <i class="bi bi-box-arrow-right"></i> 人生登出</a
                >
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
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
          if (response.data.success) {
            this.$httpMessageState(response, '登出');
            this.$router.push('/trueusLogin');
          }
        })
        .catch((error) => {
          this.$httpMessageState(error.response, '錯誤訊息');
        });
    },
  },
};
</script>

<style>
router-link .nav-item:hover {
  color: #ffc107;
}
.font-Bangers {
  font-family: 'Bangers', serif;
}
</style>
