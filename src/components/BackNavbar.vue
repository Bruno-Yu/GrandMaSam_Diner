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
          <span class="navbar-toggler-icon" />
        </button>
        <div
          class="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <ul class="navbar-nav align-items-center mb-2 ms-auto mb-lg-0">
            <li class="nav-item">
              <RouterLink class="nav-link fw-bold" to="/admin" @click="closeNavHam"

                ><i class="bi bi-shop-window" /> 產品管理</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link  fw-bold" to="/couponsAdmin" @click="closeNavHam"
>
                <i class="bi bi-flag" />
                挑戰管理</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link  fw-bold" to="/ordersAdmin" @click="closeNavHam"
>
                <i class="bi bi-clipboard-check" />
                訂單管理</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link  fw-bold" to="/eventAdmin" @click="closeNavHam"
                ><i class="bi bi-emoji-sunglasses" /> 公告編輯</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link  fw-bold" to="/aboutAdmin" @click="closeNavHam"
                ><i class="bi bi-journal-text" /> 關於作品</RouterLink
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link  fw-bold text-decoration-none"
                @click.prevent="logout"
                href="#"
              >
                <i class="bi bi-box-arrow-right" /> 人生登出</a
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
          this.$httpMessageState(response, '登出');
          this.$router.push('/trueusLogin');
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
