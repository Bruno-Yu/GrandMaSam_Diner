<template>
  <div class="Not-found-bg vh-100">
    <div
      class="Not-found-banner my-3 border border-dark border-3 border-start-0 border-end-0"
    >
      <div
        class="container d-flex justify-content-center align-items-center flex-direction-vertical g-2"
        style="height: 100%"
      >
        <div
          class="row justify-content-center"
          style="width: 100%; height: 50%"
        >
          <div class="col-8" style="border: 1px solid #b8babdd5">
            <div class="d-flex justify-content-center">
              <div class="text-center">
                <h3 class="text-light mt-4 fw-bold text-dark">
                  這裡不是487 而是404
                </h3>
                <h2 class="text-light fw-bolder fs-1 text-dark">404</h2>
                <h3 class="text-light fw-bold fs-1 no-wrap text-dark">
                  迷途的羔羊們，請回到您的歸屬吧!
                </h3>
                <h3 class="text-light fw-bold fs-1">
                  為了更偉大的未來，或許您也想到商城以貢獻自己一份心力
                </h3>
              </div>
            </div>
            <div class="d-flex justify-content-center mt-4">
              <router-link
                to="/productsView"
                type="button"
                class="btn btn-warning link-dark fw-bolder fs-4 border border-dark border-3"
                style="width: 100%"
                >馬上前往</router-link
              >
            </div>
            <p class="fw-bold my-2 text-light">
              當然若選擇要贊助窮得很有骨氣的作者，還請您在<router-link
                to="/about"
                class="link-warning fw-bold"
                >這邊</router-link
              >
              填入相關資訊，後續作者沒錢吃飯時會再聯繫您
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.Not-found-banner {
  background-image: url(https://cdn.pixabay.com/photo/2016/01/20/09/01/america-1151134_960_720.jpg);
  height: 800px;
  background-position: center center;
  background-size: cover;
  background-blend-mode: multiply;
  background-color: #abafb3;
}
.Not-found-bg {
  background-color: rgba(14, 14, 15, 0.952);
}
</style>
