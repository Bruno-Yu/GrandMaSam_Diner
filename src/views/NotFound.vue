<template>
  <div class="Not-found-banner vh-100">
    <div class="container" style="height: 100%">
      <div class="row d-flex justify-content-center justify-content-lg-end">
        <div class="col-8 mt-5">
          <h2
            class="text-center text-light fs-1 my-5"
            style="font-family: 'Noto Sans JP', sans-serif; font-weight: 900"
          >
            404
          </h2>
        </div>
      </div>
      <div
        class="row d-flex justify-content-center justify-content-lg-end align-items-center"
      >
        <div
          class="col-8 bg-dark"
          style="border: 1px solid #b8babdd5; --bs-bg-opacity: 0.3"
        >
          <div class="d-flex justify-content-center my-2">
            <div class="text-center">
              <h3 class="text-light fw-bold text-light my-3 p-2">
                喔喔~ 你找的這些頁面是不存在的
                就像謠傳那些被撕碎丟到馬桶的機密一樣 是不存在的!
              </h3>
              <h5 class="text-dark fw-bold">或許您也是想到商城?而不是白宮?</h5>
            </div>
          </div>
          <div class="d-flex justify-content-center mt-1">
            <router-link
              to="/productsView"
              type="button"
              class="btn btn-danger link-light fw-bolder fs-4 border border-light border-2"
              style="width: 50%"
              >馬上前往</router-link
            >
          </div>
          <p class="fw-bold my-2 text-dark">
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

<style>
.Not-found-banner {
  background-image: url(@/assets/images/404_page.jpg);
  height: 750px;
  background-position: left center;
  background-size: cover;
  /* background-blend-mode: multiply;
  background-color: #abafb3; */
}
/* .Not-found-bg {
  background-color: rgba(14, 14, 15, 0.952);
} */
</style>
