<template>
  <div id="header" class="container-fluid gx-0 gx-lg-1">
    <nav class="navbar navbar-expand-lg navbar-light bg-light fix-top">
      <div class="container d-flex">
        <router-link
          class="fs-3 d-block navbar-brand my-0 lh-1"
          style="font-family: 'Bangers', serif"
          to="/"
        >
          GRANDMA SAM DINER
          <p
            class="text-dark fw-lighter text-center fs-6 lh-1 mb-0"
            style="font-family: 'Bangers', serif"
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
                to="/about"
                ><i class="bi bi-journals"></i> 故事</router-link
              >
            </li>

            <li class="nav-item">
              <router-link
                class="nav-link active fw-bold"
                aria-current="page"
                to="/productsView"
              >
                <i class="bi bi-shop"></i>
                商店</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link active fw-bold"
                aria-current="page"
                to="/localStorage"
                ><i class="bi bi-suit-heart"></i>

                收藏</router-link
              >
            </li>

            <li class="nav-item">
              <router-link
                class="nav-link active fw-bold"
                aria-current="page"
                to="/cartView"
                ><i class="bi bi-bag"></i> 訂單</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link active fw-bold"
                aria-current="page"
                to="/trueusLogin"
              >
                <i class="bi bi-person"></i> 登入</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<style>
.logo-style {
  background-image: url(https://drive.google.com/file/d/1oJb0ADhPNzxlPbtCYg3Dwe_5zbPXDPUf/view?usp=sharing);
  height: 30px;
  width: 100px;
  background-position: center center;
  background-size: cover;
}
</style>
