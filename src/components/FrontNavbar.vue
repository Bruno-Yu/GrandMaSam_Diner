<template>
  <div
    id="header"
    class="container-fluid shadow p-1 mb-1 bg-body rounded fixed-top"
  >
    <div class="container gx-0">
      <nav class="navbar navbar-expand-lg navbar-light bg-light fix-top">
        <div class="container d-flex">
          <router-link
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
          </router-link>

          <!-- data-bs-target="#navbarSupportedContent" -->
          <!-- data-bs-toggle="collapse" -->
          <button
            class="navbar-toggler"
            type="button"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
            @click="toggleNavHam()"
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
                <router-link
                  class="nav-link active fw-bold"
                  to="/about"
                  @click="closeNavHam()"
                  ><i class="bi bi-journals"></i> 故事</router-link
                >
              </li>

              <li class="nav-item">
                <!-- aria-current="page" -->
                <router-link
                  class="nav-link active fw-bold"
                  to="/productsView"
                  @click="closeNavHam()"
                >
                  <i class="bi bi-shop"></i>
                  商店</router-link
                >
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link active fw-bold"
                  to="/userChallenges"
                  @click="closeNavHam()"
                  ><i class="bi bi-flag"></i>

                  挑戰</router-link
                >
              </li>

              <!-- aria-current="page" -->
              <li class="nav-item">
                <router-link
                  class="nav-link active fw-bold"
                  to="/localStorage"
                  @click="closeNavHam()"
                  ><i class="bi bi-suit-heart"></i>

                  收藏</router-link
                >
              </li>

              <!-- aria-current="page" -->
              <li class="nav-item">
                <router-link
                  class="nav-link active fw-bold"
                  to="/cartView"
                  @click="closeNavHam()"
                  ><i class="bi bi-bag"></i> 訂單</router-link
                >
              </li>
              <!-- aria-current="page" -->
              <li class="nav-item">
                <router-link
                  class="nav-link active fw-bold"
                  to="/userArticles"
                  @click="closeNavHam()"
                  ><i class="bi bi-megaphone"></i>

                  公告</router-link
                >
              </li>

              <li class="nav-item">
                <router-link
                  class="nav-link active fw-bold"
                  to="/trueusLogin"
                  @click="closeNavHam()"
                >
                  <i class="bi bi-person"></i> 登入</router-link
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
