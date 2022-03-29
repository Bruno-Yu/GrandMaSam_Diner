<template>
  <div class="bg-dark py-5 gx-0">
    <div class="container-fluid">
      <router-link
        class="fs-3 d-block navbar-brand link-light my-2 lh-1 text-center"
        style="font-family: 'Bangers', serif"
        to="/"
      >
        Grandma Sam Diner
        <p
          class="text-light fw-lighter fs-6 lh-1 mb-0 text-center"
          style="font-family: 'Bangers', serif"
        >
          let make US great again
        </p>
      </router-link>
      <div class="container d-lg-flex justify-content-lg-around mt-2">
        <div class="footer-content text-light">
          <div class="container-fluid">
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
              此作內容全是杜撰，皆是二次創作皆非事實，也無任何隱射之意，若有雷同處純屬巧合，若有冒犯處還請海函
            </p>
          </div>
        </div>
        <div class="footer-contact text-light">
          <div class="container-fluid">
            <h4
              class="my-3 fw-bold text-center text-lg-start"
              style="font-family: 'Bangers', serif"
            >
              聯絡我們
            </h4>
            <div class="footer-socialMedia ps-2 text-center text-lg-start">
              <a
                class="text-decoration-none me-4"
                href="https://www.hexschool.com/?msclkid=8598b4ccaa4811ec81331512bb3bc247"
                ><i class="bi bi-facebook link-light"></i
              ></a>
              <a
                class="text-decoration-none me-4"
                href="https://www.hexschool.com/?msclkid=8598b4ccaa4811ec81331512bb3bc247"
                ><i class="bi bi-instagram link-light"></i>
              </a>
              <a
                class="text-decoration-none me-4"
                href="https://www.hexschool.com/?msclkid=8598b4ccaa4811ec81331512bb3bc247"
                ><i class="bi bi-twitter link-light"></i
              ></a>
            </div>
            <div class="d-flex justify-content-center justify-content-lg-start">
              <div>
                <ul style="list-style: none" class="ps-0 text-light mt-2">
                  <li class="small fw-light my-1">
                    公司: 山姆大嬸餐飲投機無限公司
                  </li>
                  <li class="small fw-light my-1">
                    訂位服務專線: ( 0204 ) 5487487
                  </li>
                  <li class="small fw-light my-1">
                    電話: ( 02 ) 2311 3731
                    <span class="text-muted small">
                      ( 請謹慎播打，該電話直達高層 )
                    </span>
                  </li>
                  <li class="small fw-light my-1">
                    地址: 100台北市中正區中山南路21號
                  </li>
                  <li class="small fw-light my-1">營業時間: 24 hrs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p class="text-center text-light mt-5">
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
  max-width: 30rem;
  margin-right: 2rem;
  margin-bottom: 2rem;
}
.footer-contact {
  max-width: 30rem;
}
</style>

<script>
export default {};
</script>
