<template>
  <div
    id="back_header"
    class="container shadow p-2 mb-2 fixed-top bg-body rounded"
  >
    <nav class="navbar navbar-expand-lg navbar-light fix-top">
      <div class="container d-flex">
        <RouterLink
          class="fs-3 d-block navbar-brand my-0 lh-1 font-Bangers"
          to="/"
          @click="closeNavHam()"
        >
          GRANDMA SAM DINER
          <p
            class="text-dark fw-lighter text-center fs-6 lh-1 mb-0 font-Bangers"
          >
            LET MAKE AMERICA GREAT AGAIN
          </p>
        </RouterLink>
        <button
          class="navbar-toggler"
          type="button"
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
              <RouterLink class="nav-link active fw-bold" to="/admin"
                ><i class="bi bi-shop-window"></i> 產品管理</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link active fw-bold" to="/couponsAdmin">
                <i class="bi bi-flag"></i>
                挑戰管理</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link active fw-bold" to="/ordersAdmin">
                <i class="bi bi-clipboard-check"></i>
                訂單管理</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link active fw-bold" to="/eventAdmin"
                ><i class="bi bi-emoji-sunglasses"></i> 公告編輯</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link active fw-bold" to="/aboutAdmin"
                ><i class="bi bi-journal-text"></i> 關於作品</RouterLink
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link active fw-bold text-decoration-none"
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
</template>

<script>
import Collapse from 'bootstrap/js/dist/collapse';

export default {
  data() {
    return {
      bsCollapse: null,
    };
  },
  methods: {
    closeNavHam() {
      this.bsCollapse.hide();
    },
    toggleNavHam() {
      this.bsCollapse.toggle();
    },
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
  mounted() {
    const menu = document.querySelector('#navbarSupportedContent');
    this.bsCollapse = new Collapse(menu, {
      toggle: false,
    });
  },
};
</script>
