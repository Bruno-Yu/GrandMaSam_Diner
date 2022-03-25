<template>
  <header class="header-banner">
    <div
      class="container d-flex justify-content-center align-items-center flex-direction-vertical g-2"
      style="height: 100%"
    >
      <div class="row justify-content-end" style="width: 100%; height: 40%">
        <div class="col-6 col-lg-4" style="border: 1px solid #b8babdd5">
          <div class="d-flex justify-content-center justify-content-lg-start">
            <div>
              <h2 class="text-light mt-4 fw-bold">獻出你的錢包</h2>
              <h2 class="text-light fw-bold">讓台灣再次偉大</h2>
            </div>
          </div>
          <div class="d-flex justify-content-center mt-4">
            <router-link
              to="/productsView"
              type="button"
              class="btn btn-warning link-dark fw-bolder fs-4 border border-dark border-3"
              style="width: 100%"
              >馬上行動</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </header>
  <div class="container-fluid px-1">
    <div class="story-section row align-items-center">
      <div class="col text-center text-light px-3">
        <h2>關於我們</h2>
        <p class="my-3 fs-5">
          主打各系列量產漢堡外，還有搭配各大連鎖超商的義大利麵，燉飯，炸雞及各式炸物小點，絕對滿足不了味蕾挑剔的您
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 mt-2">
        <div class="product-intro"></div>
      </div>
      <div class="col-md-4 m-auto text-auto">
        <div class="container">
          <h4 class="mt-4 text-center text-lg-start">味道獨特</h4>
          <p class="text-muted">
            本集團訴求的是夢想，並不只是單純的餐飲品牌，所以我們販售給我們貴賓的餐點都有一份夢想的味道
            ( ? )
          </p>
          <p class="text-muted">> 生菜沙拉可選擇胡錦醬／維尼醬／蜜汁和風醬</p>
          <p class="text-muted">> 還有獨特的川辣醬／穿普醬／穿幫醬！</p>
          <p class="text-muted">每個都有不同風味呈現~任您挑選搭配！</p>
        </div>
      </div>
    </div>
    <div class="row flex-row-reverse">
      <div class="col-md-6 my-1">
        <div class="product-intro-2"></div>
      </div>
      <div class="col-md-4 m-auto text-auto">
        <div class="container">
          <h4 class="mt-4 text-center text-lg-start">別樹一格</h4>
          <p class="text-muted">
            > 有別於其他同類型的餐飲地點 ( 林森北 ) ;
            本餐廳坐立在繁華的中山南路上，也區別了本集團雄厚的經濟基礎
          </p>
          <p class="text-muted">
            >
            本台北旗艦店內部也是濃濃的美式風格，加上名亮對比的美金百元鈔票堆疊的用餐隔板以及壁飾，帶給您不同的視覺震撼與體驗
          </p>
          <p class="text-muted">
            > 大型廣場:
            附近有全台最大型的免費抗議廣場，若有政見訴求而來的朋友都方便
          </p>
          <p class="text-muted">
            > 地點方便: 近總統府以及本島各政府機關地點，關說以及處理事情便利
          </p>
        </div>
      </div>
    </div>
    <div class="row row-cols-1 row-cols-lg-3 mt-2">
      <div
        class="col d-none d-lg-block product-intro-3"
        style="height: 450px"
      ></div>
      <div class="col product-intro-md" style="height: 450px">
        <div class="container m-auto text-auto text-center text-light">
          <div class="row align-items-center mt-5">
            <div class="col">
              <br />
              <br />
              <h3 class="my-5">獻出你的錢包，讓台灣再次偉大</h3>
              <p class="text-muted">
                本餐廳也是寵物友善餐廳，歡迎各位貴賓攜帶您圈養的畜牲前來
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="col product-intro-4" style="height: 450px"></div>
    </div>
  </div>
</template>

<style>
.header-banner {
  background-image: url(https://cdn.pixabay.com/photo/2017/10/04/09/10/trump-2815558_960_720.jpg);
  height: 600px;
  background-position: right center;
  background-size: cover;
  background-blend-mode: multiply;
  background-color: #abafb3;
}
.story-section {
  height: 200px;
  background-image: url(https://cdn.pixabay.com/photo/2016/04/06/17/49/noodles-1312384_960_720.jpg);
  background-position: center center;
  background-size: cover;
  background-blend-mode: multiply;
  background-color: #2f3030;
}
.product-intro {
  background-image: url(https://cdn.pixabay.com/photo/2016/06/10/14/33/aioli-1448217_960_720.jpg);
  height: 400px;
  background-position: center center;
  background-size: cover;
  background-blend-mode: multiply;
  background-color: #b1c3d3;
}
.product-intro-2 {
  background-image: url(https://cdn.pixabay.com/photo/2015/07/25/15/24/money-860128_960_720.jpg);
  height: 400px;
  background-position: center center;
  background-size: cover;
  background-blend-mode: multiply;
  background-color: #bbbfc2;
}
.product-intro-3 {
  background-image: url(https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260);
  height: 450px;
  background-position: center center;
  background-size: cover;
  background-blend-mode: multiply;
  background-color: #aaabac;
}
.product-intro-md {
  height: 450px;
  background-color: #1b1c1d;
}
.product-intro-4 {
  background-image: url(https://cdn.pixabay.com/photo/2016/11/13/21/40/trump-1822121_960_720.jpg);
  height: 450px;
  background-position: center center;
  background-size: cover;
  background-blend-mode: multiply;
  background-color: #b6c0c9;
}
</style>
