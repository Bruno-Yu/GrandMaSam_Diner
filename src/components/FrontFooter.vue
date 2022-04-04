<template>
  <div class="container-fluid py-5 gx-lg-0" style="background-color: black">
    <div class="container">
      <router-link
        class="fs-3 d-block navbar-brand link-light my-2 lh-1 text-center"
        style="font-family: 'Bangers', serif"
        to="/"
      >
        GRANDMA SAM DINER
        <p
          class="text-light fw-lighter fs-6 lh-1 mb-0 text-center"
          style="font-family: 'Bangers', serif"
        >
          LET MAKE AMERICA GREAT AGAIN
        </p>
      </router-link>
      <div class="container mt-3">
        <div
          class="row row-cols-1 row-cols-lg-2 justify-content-lg-between mt-2"
        >
          <div class="col col-lg-6 text-light footer-content px-5">
            <div class="d-flex justify-content-center align-items-center">
              <div class="footer-content">
                <h4
                  class="my-3 fw-bold text-center text-lg-start"
                  style="font-family: 'Bangers', serif"
                >
                  關於作品
                </h4>
                <p class="mt-2 small fw-light">
                  此網頁並非商業使用，僅作為個人學習、娛樂
                  以及六角作業繳交使用，若需要引用或作為商業用途，請先諮詢六角學院
                </p>
                <p class="text-muted small">
                  (
                  但若同為繳交作業的同儕並非此限制所列，但若是其他補習班，則同為此限制範疇
                  )
                </p>
                <p class="small fw-light">
                  此作內容全是杜撰，也無任何隱射之意，若有雷同處純屬巧合，若有冒犯之處還請海函
                </p>
              </div>
            </div>
          </div>
          <div class="col col-lg-4 text-light">
            <div
              class="row d-flex justify-content-lg-start justify-content-center"
            >
              <h4
                class="my-3 fw-bold text-center pe-lg-5 me-lg-5"
                style="font-family: 'Bangers', serif"
              >
                聯絡我們
              </h4>
              <div class="col">
                <div class="row-cols-3 d-flex justify-content-center">
                  <a
                    class="col-1 text-decoration-none ms-3 ms-lg-4"
                    href="https://www.hexschool.com/?msclkid=8598b4ccaa4811ec81331512bb3bc247"
                    ><i class="bi bi-facebook link-light"></i
                  ></a>
                  <a
                    class="col-1 text-decoration-none mx-lg-1"
                    href="https://www.hexschool.com/?msclkid=8598b4ccaa4811ec81331512bb3bc247"
                    ><i class="bi bi-instagram link-light"></i>
                  </a>
                  <a
                    class="col-1 text-decoration-none me-lg-5"
                    href="https://www.hexschool.com/?msclkid=8598b4ccaa4811ec81331512bb3bc247"
                    ><i class="bi bi-twitter link-light"></i
                  ></a>
                </div>
              </div>
              <div class="row d-flex justify-content-center">
                <div class="col-8 col-md-6 col-lg-9 footer-content">
                  <ul class="list-unstyled text-light ms-sm-5 ms-lg-5">
                    <li class="small fw-light my-1 text-nowrap">
                      公司: 山姆大嬸餐飲投機無限公司
                    </li>
                    <li class="small fw-light my-1 text-nowrap">
                      訂位服務專線: ( 0204 ) 5487487
                    </li>
                    <li class="small fw-light my-1 text-nowrap">
                      電話: ( 02 ) 2311 3731
                    </li>
                    <li class="text-muted small text-nowrap">
                      ( 請謹慎播打，該電話直達高層 )
                    </li>
                    <li class="small fw-light my-1 text-nowrap">
                      地址: 100台北市中正區中山南路21號
                    </li>
                    <li class="small fw-light my-1 text-nowrap">
                      營業時間: 24 hrs
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p class="text-center text-light mt-2">
        Copyright © 2022 Grandma-Sam-Diner. All rights reserved.
      </p>
      <p class="text-muted text-center text-light small">
        版權所有，翻印舅舅 ( 一位很愛翻印的舅舅 )
      </p>
    </div>
  </div>
</template>

<style>
.footer-content {
  max-width: 20rem;
  margin-bottom: 2rem;
}
</style>
