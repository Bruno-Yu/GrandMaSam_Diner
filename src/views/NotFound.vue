<template>
  <div class="Not-found-banner vh-100">
    <div class="container">
      <div class="row d-flex justify-content-center justify-content-lg-end">
        <div class="col-8 mt-5">
          <h2 class="text-center text-light fs-1 my-5 font-Noto fw-900">404</h2>
        </div>
      </div>
      <div
        class="row d-flex justify-content-center justify-content-lg-end align-items-center"
      >
        <div class="col-8 bg-dark dialog-bg">
          <div class="d-flex justify-content-center my-2">
            <div class="text-center">
              <h3 class="text-light fw-bold text-light my-3 p-2 font-Noto">
                喔喔~ 你找的這些頁面是不存在的
                就像謠傳那些被撕碎丟到馬桶的機密一樣 是不存在的!
              </h3>
              <h4 class="text-dark fw-bolder font-Noto">
                或許您也是想到商城?而不是白宮?
              </h4>
            </div>
          </div>
          <div class="d-flex justify-content-center mt-1">
            <RouterLink
              to="/productsView"
              type="button"
              class="btn btn-danger btn-w-50 link-light fw-bolder fs-4 border border-light border-2 font-Noto"
              >馬上前往</RouterLink
            >
          </div>
          <p class="fw-bold my-2 text-light">
            當然若選擇要贊助窮得很有骨氣的作者，還請您在<router-link
              to="/about"
              class="link-danger fw-bold"
              >這邊</router-link
            >
            填入相關資訊，後續作者沒錢吃飯時會再聯繫您
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
