<template>
  <div id="header" class="container bg-body p-2 mb-2 fixed-top shadow rounded">
    <nav class="navbar navbar-expand-lg navbar-light">
      <div class="container d-flex">
        <RouterLink
          class="fs-3 d-block navbar-brand my-0 lh-1 font-Bangers"
          to="/"
          @click="closeNavHam"
        >
          GRANDMA SAM DINER
          <p
            class="text-dark fw-lighter text-center fs-6 lh-1 mb-0 font-Bangers"
          >
            LET MAKE AMERICA GREAT AGAIN
          </p>
        </RouterLink>

        <!-- data-bs-target="#navbarSupportedContent" -->
        <!-- data-bs-toggle="collapse" -->
        <button
          class="navbar-toggler"
          type="button"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
          @click="toggleNavHam"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <ul class="navbar-nav align-items-center mb-2 ms-auto mb-lg-0">
            <!-- aria-current="page" -->
            <li class="nav-item">
              <RouterLink
                class="nav-link active fw-bold"
                to="/about"
                @click="closeNavHam"
                ><i class="bi bi-journals"></i> 故事</RouterLink
              >
            </li>

            <li class="nav-item">
              <!-- aria-current="page" -->
              <RouterLink
                class="nav-link active fw-bold"
                to="/productsView"
                @click="closeNavHam"
              >
                <i class="bi bi-shop"></i>
                商店</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink
                class="nav-link active fw-bold"
                to="/userChallenges"
                @click="closeNavHam"
                ><i class="bi bi-flag"></i>

                挑戰</RouterLink
              >
            </li>

            <!-- aria-current="page" -->
            <li class="nav-item">
              <RouterLink
                class="nav-link active fw-bold"
                to="/localStorage"
                @click="closeNavHam"
                ><i class="bi bi-suit-heart"></i>

                收藏</RouterLink
              >
            </li>

            <!-- aria-current="page" -->
            <li class="nav-item">
              <RouterLink
                class="nav-link active fw-bold"
                to="/cartView"
                @click="closeNavHam"
                ><i class="bi bi-bag"></i> 訂單</RouterLink
              >
            </li>
            <!-- aria-current="page" -->
            <li class="nav-item">
              <RouterLink
                class="nav-link active fw-bold"
                to="/userArticles"
                @click="closeNavHam"
                ><i class="bi bi-megaphone"></i>

                公告</RouterLink
              >
            </li>

            <li class="nav-item">
              <RouterLink
                class="nav-link active fw-bold"
                to="/trueusLogin"
                @click="closeNavHam"
              >
                <i class="bi bi-person"></i> 登入</RouterLink
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
  },
  mounted() {
    const menu = document.querySelector('#navbarSupportedContent');
    this.bsCollapse = new Collapse(menu, {
      toggle: false,
    });
  },
};
</script>
