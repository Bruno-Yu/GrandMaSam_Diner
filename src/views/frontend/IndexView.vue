<template>
  <PageLoading
    loader="bars"
    :active="isLoading"
    :can-cancel="true"
    :is-full-page="false"
  ></PageLoading>
  <div class="container-fluid gx-1 gx-lg-0 bg-warning vh-50">
    <header class="header-banner shadow p-3 mb-2 mt-4 bg-body rounded">
      <div class="container">
        <div
          class="row d-flex justify-content-center align-items-center flex-direction-vertical vh-100"
        >
          <div
            class="row justify-content-center justify-content-lg-end slogan-style"
          >
            <div class="col-10 col-md-6 col-lg-4 me-lg-5">
              <div class="d-flex justify-content-start">
                <div>
                  <h2 class="fs-1 text-light mt-4 text-nowrap font-Noto fw-700">
                    <i> 獻出你的錢包 !!!</i>
                  </h2>
                  <h2 class="text-light fw-bold text-nowrap">
                    <i>
                      讓台灣再次偉大
                      <span class="font-Noto"> !!!!!!</span></i
                    >
                  </h2>
                </div>
              </div>
              <div class="d-flex justify-content-center mt-4">
                <button
                  type="button"
                  class="btn btn-warning link-dark fw-bold fs-4 border border-light border-1 shadow font-Noto w-100 fw-700"
                  @click="backToStore()"
                >
                  <i>馬上行動</i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div
      class="mt-2 shadow p-3 mb-5 bg-body rounded border-dark border-1 about-us"
    >
      <div class="container-fluid">
        <div class="row align-items-center gx-0">
          <div class="col px-3">
            <div class="container">
              <h2 class="fs-2 text-center my-4 text-warning font-Noto fw-700">
                關於我們
              </h2>
              <p class="fs-4 text-center mb-0 font-Noto fw-500">
                本餐廳的核心精神是:
              </p>
              <p class="fs-4 text-center text-lg-nowrap font-Noto fw-700">
                <i> 自己的國家自己救!自己的碗盤自己洗! </i>
              </p>
              <div class="container text-lg-center about-us-width">
                <p class="fs-6 text-muted font-Noto fw-500">
                  餐點部分:
                  除了各系列防腐劑漢堡外，並與各大連鎖超商合作，推出義大利麵，燉飯，炸雞及各式炸物小點系列，絕對難以滿足味蕾挑剔的您
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row row-cols-1 row-cols-lg-2 g-1">
      <div class="col col-md-6 mt-2">
        <div class="product-intro"></div>
      </div>
      <div class="col col-lg-5 m-auto text-auto">
        <div class="container-fluid shadow p-5 mb-1 bg-warning rounded">
          <h4
            class="mt-4 text-center text-light text-lg-start font-Noto fw-500"
          >
            味道獨特
          </h4>
          <p class="text-dark font-Noto fw-500">
            本集團訴求的是夢想，並不只是單純的餐飲品牌，所以我們販售給我們貴賓的餐點都有一份夢想的味道
            ( ? )
          </p>
          <p class="text-dark font-Noto fw-500">
            <i class="bi bi-check2-square"></i>
            生菜沙拉可選擇胡錦醬、維尼醬、蜜汁和風醬
          </p>
          <p class="text-dark font-Noto fw-500">
            <i class="bi bi-check2-square"></i>
            還有獨特的川辣醬、穿普醬、穿幫這樣！
          </p>
          <p class="text-dark font-Noto fw-500">
            每種醬料都有不同的政治風味呈現~任您隨意挑選與搭配！
          </p>
        </div>
      </div>
    </div>

    <div
      class="row flex-row-reverse g-1 shadow p-1 p-lg-5 mb-1 bg-body rounded"
    >
      <div class="col-md-6 my-1">
        <div class="product-intro-2"></div>
      </div>
      <div class="col-md-5 m-auto text-auto">
        <div class="container-fluid shadow p-5 mb-1 bg-body rounded">
          <h4 class="text-center text-lg-start font-Noto fw-700">別樹一格</h4>
          <p class="font-Noto fw-500">
            <i class="bi bi-check2-square"></i>
            有別於其他同類型的餐飲地點 ( 林森北 ) ;
            本餐廳坐立在繁華的中山南路上，更凸顯了本集團財務上的非凡與尊榮
          </p>
          <p class="font-Noto fw-500">
            <i class="bi bi-check2-square"></i>
            本台北旗艦店內部也是濃濃的美式風格，加上以名亮對比使用美金百元鈔堆疊而成的用餐隔板和相關牆飾，皆能帶給您不同的視覺體驗與震撼
          </p>
          <p class="font-Noto fw-500">
            <i class="bi bi-check2-square"></i> 大型廣場:
            附近有全台最大型的免費抗議廣場，方便帶有政見訴求而來的朋友
          </p>
          <p class="font-Noto fw-500">
            <i class="bi bi-check2-square"></i> 地點便利:
            近總統府以及本島各政府機關地點，關說及處理事情都方便
          </p>
        </div>
      </div>
    </div>
    <div class="row row-cols-1 row-cols-lg-3 mt-2 gx-1">
      <div
        class="col col-lg-3 d-none d-lg-block product-intro-3 product-intro-height"
      ></div>
      <div class="col col-lg-6 product-intro-md product-intro-height">
        <div class="container text-auto text-center text-light">
          <div class="row align-items-center mt-5">
            <div class="col">
              <br />
              <br />
              <h3 class="my-5 font-Noto fw-600">
                獻出你的錢包，讓台灣再次偉大
              </h3>
              <p class="fs-1 text-warning">
                <i class="bi bi-award"></i>
              </p>
              <p class="text-light fw-bold fs-2">嗝來黴 與 米其林輪胎</p>
              <p class="text-light fw-bold fs-5">全台唯一認證餐廳</p>
            </div>
          </div>
        </div>
      </div>
      <div
        class="col col-lg-3 d-none d-lg-block product-intro-4 product-intro-height"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    backToStore() {
      this.isLoading = true;
      this.$router.push('/productsView');
      this.isLoading = false;
    },
  },
};
</script>
