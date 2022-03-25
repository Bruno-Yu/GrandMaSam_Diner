<template>
  <div class="container mt-3">
    <h1 class="text-center mt-5 fs-1 mb-3 fw-bolder">訂單</h1>
    <nav class="d-flex justify-content-center">
      <router-link
        class="link-dark fw-bold text-decoration-none me-2 active"
        to="/cartView"
      >
        步驟1. 購物車內容
      </router-link>
      <span class="text-secondary fw-bolder"> >> </span>

      <router-link
        class="link-dark text-decoration-none fw-bold mx-2"
        to="/userContact"
      >
        步驟2. 聯絡資訊填寫
      </router-link>
      <span class="text-secondary fw-bolder"> >> </span>
      <router-link
        class="link-dark text-decoration-none fw-bold ms-2"
        to="/orderCheck"
      >
        步驟3. 訂單明細確認
      </router-link>
    </nav>
    <router-view />
  </div>
</template>
