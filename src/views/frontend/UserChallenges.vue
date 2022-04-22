<template>
  <div class="container gx-0 bg-warning">
    <div class="row row-cols-1 row-cols-lg-3">
      <div class="col d-none d-lg-grid">
        <div class="row shadow mb-1 p-2 bg-body">
          <div class="container-fluid Coupons-header-left ratio ratio-1x1" />
        </div>
      </div>
      <div class="col">
        <div class="row shadow mb-1 p-2 bg-body">
          <div class="container-fluid Coupons-header-md ratio ratio-1x1" />
        </div>
      </div>
      <div class="col d-none d-lg-grid">
        <div class="row shadow mb-1 p-2 bg-body">
          <div class="container-fluid Coupons-header-right ratio ratio-1x1" />
        </div>
      </div>
    </div>
  </div>
  <div class="container gx-0 mb-2 quote bg-black">
    <div class="row d-flex justify-content-center mb-2">
      <div class="col text-center text-light my-3">
        <h2 class="fs-2 text-warning fw-bold font-Noto">感悟</h2>
        <figure class="text-center">
          <blockquote class="blockquote">
            <p class="fs-3 font-Noto fw-bold">
              <i>
                成功其實是1分的實力<span class="d-inline-block d-sm-inline"
                  >加上99分的心意</span
                ></i
              >
            </p>
          </blockquote>
          <figcaption class="blockquote-footer mt-2">
            出自- 1995 <cite title="Source Title">五歲就會抬頭的創辦人</cite>
          </figcaption>
        </figure>
      </div>
    </div>
  </div>
  <div class="container gx-0 Coupons-money mb-2 rounded">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col h-100">
        <figure class="text-light text-start text-sm-center mt-5 p-4">
          <blockquote class="blockquote">
            <p class="fs-3 font-Noto fw-bold">
              <i
                >錢包的厚度
                <span class="d-inline-block d-sm-inline"
                  >決定了您人生的高度!</span
                >
              </i>
            </p>
            <p class="fs-3 font-Noto fw-bold">
              <i>不要讓吝嗇限制了您的視野!</i>
            </p>
          </blockquote>
          <blockquote class="blockquote text-end text-sm-center">
            <RouterLink
              class="btn link-light text-decoration-underline fs-5 font-Noto fw-500"
              to="userArticles"
              ><i>閱讀更多...</i></RouterLink
            >
          </blockquote>
        </figure>
      </div>
    </div>
  </div>
  <div
    class="container gx-0 bg-body border border-body border-2 shadow text-center p-2 mb-2 Coupons-title"
  >
    <h2 class="fs-2 font-Noto fw-600 mt-2 mb-3">挑戰試煉</h2>
    <p class="fs-5 lg-sm font-Noto fw-500 text-warning">
      <i> 人生就是不停地挑戰自己的極限! 我們能提供的不只有5倍! </i>
    </p>
    <p class="fs-6 lh-sm text-muted">
      ( 註: 此券能對於您的結帳金額有所加成，是被視為成功人士的象徵，但請量力而為
      )
    </p>
  </div>
  <div class="container gx-0 shadow bg-body border border-body mb-1 rounded">
    <div id="coupon-section">
      <div class="container-fluid">
        <div class="row row-cols-1 row-cols-lg-4 justify-content-start">
          <div class="col">
            <div class="card m-4 shadow border border-1 border-body">
              <div class="card-body">
                <h4
                  class="card-title text-center text-warning font-Noto fw-bold"
                >
                  5倍券
                </h4>
                <hr />
                <p class="card-text font-Noto fw-500">適用場景：斗內作者</p>
                <p class="card-text font-Noto fw-500">適用商品：架上商品</p>
                <h5 class="coupon-num-open text-center p-2">#55555555</h5>
                <p class="card-text text-muted">
                  活動日期：2022/04/20 - 2022/5/28
                </p>
                <div class="d-flex justify-content-center">
                  <button
                    type="button"
                    class="btn btn-coupon btn-warning w-80 fw-bold"
                    data-clipboard-text="#55555555"
                    @click.prevent="copyCode"
                  >
                    複製5倍券序號
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card m-4 border-1 border-body shadow">
              <div class="card-body">
                <h4
                  class="card-title text-center text-warning font-Noto fw-bold"
                >
                  4倍券
                </h4>
                <hr />
                <p class="card-text font-Noto fw-500">適用場景：斗內作者</p>
                <p class="card-text font-Noto fw-500">適用商品：架上商品</p>
                <h5 class="coupon-num-open text-center p-2">#44444444</h5>
                <p class="card-text text-muted">
                  活動日期：2022/04/20 - 2022/5/28
                </p>
                <div class="d-flex justify-content-center">
                  <button
                    type="button"
                    class="btn btn-coupon btn-warning w-80 fw-bold"
                    data-clipboard-text="#44444444"
                    @click.prevent="copyCode"
                  >
                    複製4倍券序號
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card m-4 border-1 border-body shadow">
              <div class="card-body">
                <h4
                  class="card-title text-center text-warning font-Noto fw-bold"
                >
                  8倍券
                </h4>
                <hr />
                <p class="card-text font-Noto fw-500">適用場景：斗內作者</p>
                <p class="card-text font-Noto fw-500">適用商品：架上商品</p>
                <h5 class="coupon-num-open text-center p-2">#88888888</h5>
                <p class="card-text text-muted">
                  活動日期：2022/04/20 - 2022/5/28
                </p>
                <div class="d-flex justify-content-center">
                  <button
                    type="button"
                    class="btn btn-coupon btn-warning w-80 fw-bold"
                    data-clipboard-text="#88888888"
                    @click.prevent="copyCode"
                  >
                    複製8倍券序號
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card m-4 border-1 border-body shadow">
              <div class="card-body">
                <h4 class="card-title text-center text-warning fw-bold">
                  7倍券
                </h4>
                <hr />
                <p class="card-text font-Noto fw-500">適用場景：斗內作者</p>
                <p class="card-text font-Noto fw-500">適用商品：架上商品</p>
                <h5 class="coupon-num-open text-center p-2">#77777777</h5>
                <p class="card-text text-muted">
                  活動日期：2022/04/20 - 2022/5/28
                </p>
                <div class="d-flex justify-content-center">
                  <button
                    type="button"
                    class="btn btn-coupon btn-warning w-80 fw-bold"
                    data-clipboard-text="#77777777"
                    @click.prevent="copyCode"
                  >
                    複製7倍券序號
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container gx-0 Thanks-boss">
    <div
      class="row d-flex text-center align-items-center w-100 h-100 position-relative"
    >
      <div class="col-12 my-lg-3">
        <h2 class="fs-1 font-Noto fw-600 text-warning">謝謝老闆</h2>
        <h5 class="font-Noto fw-600 text-warning">好人一生平安</h5>
        <div
          class="w-100 mt-lg-5 mt-3 pt-5 position-absolute"
          style="z-index: 99"
        >
          <div
            class="container w-100 p-2 rounded-2 Coupons-title bg-black Thanks-boss-height"
          >
            <h2 class="fs-2 mt-1 font-Noto fw-bold text-light text-center">
              訂閱我們最新的要款通知
            </h2>
            <div class="container">
              <div class="row mt-5 d-flex justify-content-center">
                <div class="col-12 col-lg-8">
                  <VForm ref="form" v-slot="{ errors }" @submit="subscribe">
                    <div class="input-group mb-auto">
                      <VField
                        id="email"
                        name="email"
                        type="email"
                        :class="{ 'is-invalid': errors['email'] }"
                        class="form-control"
                        placeholder="馬上輸入信箱取得通知"
                        style="max-width: 50rem"
                        v-model="form.email"
                        rules="email|required"
                      ></VField>
                      <button
                        class="btn btn-primary font-Noto fw-600"
                        type="submit"
                        :disabled="isLoading"
                      >
                        訂閱
                        <div
                          v-if="isLoading"
                          class="spinner-border spinner-border-sm text-light"
                        ></div>
                      </button>

                      <ErrorMessage
                        name="email"
                        class="invalid-feedback fs-5"
                      ></ErrorMessage>
                    </div>
                  </VForm>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClipboardJS from 'vue-clipboard2';

export default {
  data() {
    return {
      message: '',
      form: {
        email: '',
      },
      isLoading: false,
    };
  },
  methods: {
    copyCode() {
      const vm = this;
      const clipboard = new ClipboardJS('.btn-coupon');
      clipboard.on('success', () => {
        clipboard.destroy(); // 釋放内存記憶體
        vm.$bus.$emit('message:push', '已複製到剪貼簿', 'success');
      });
      clipboard.on('error', () => {
        clipboard.destroy();
        vm.$bus.$emit('message:push', '複製失敗', 'warning');
      });
    },
    subscribe() {
      this.isLoading = true;
      setTimeout(this.subscribeCallback, 1000);
    },
  },
};
</script>
