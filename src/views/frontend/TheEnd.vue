<template>
  <div class="container-fluid the-end vh-90 my-1">
    <div
      class="row d-flex row-cols-1 row-cols-lg-2 align-items-center justify-content-center g-1"
      style="height: 100%"
    >
      <div
        class="col col-lg-5 me-lg-5 bg-dark border border-light border-1 rounded-3"
        style="--bs-bg-opacity: 0.4"
      >
        <div class="container p-3">
          <h3
            class="my-3 fw-bolder text-light"
            style="font-family: 'Noto Sans JP', sans-serif; font-weight: 600"
          >
            台灣毀滅RIP
          </h3>
          <p class="text-light fw-bold">我們最不想發生的事情終究還還是發生了</p>
          <p class="text-light fw-bold">而原因則是大家的冷漠</p>
          <p class="text-light fw-bold d-none d-lg-inline-block">
            但還好本集團創辦人早已提前洞悉這可能性，體恤在地民眾沒有精神寄託，特別開設了拜燈神教的東亞分部，讓在地民眾在這末日有個精神寄託，其總部分部就在台北
          </p>
          <p class="text-light fw-bold">
            立即加入 拜登神教 就能得到每份餐點皆為五折的優惠
          </p>
          <p class="text-light fw-bold">讓您不論在身體上、心理上皆能獲得滿足</p>
          <p
            class="text-light fs-5"
            style="font-family: 'Noto Sans JP', sans-serif; font-weight: 600"
          >
            女士們先生們 今晚你們想信教嗎?
          </p>
          <p class="text-light fw-light">
            特此聲明:
            我們是拜燈神教，並不拜月，有請各位為拯救趙靈兒的少俠們多保養眼睛，避免誤闖，造成本餐飲正在用餐的貴賓困擾，感謝!
          </p>
        </div>
      </div>
      <div
        class="col col-lg-3 bg-dark border border-light border-1 rounded-3 h-auto"
        style="--bs-bg-opacity: 0.4"
      >
        <div class="container text-center mt-lg-1 p-3">
          <h2
            class="my-lg-3 text-light"
            style="font-family: 'Noto Sans JP', sans-serif; font-weight: 600"
          >
            立即斗內作者
          </h2>
          <h3
            class="text-light"
            style="font-family: 'Noto Sans JP', sans-serif; font-weight: 600"
          >
            就有機會能加入本神教
          </h3>
          <button
            type="button"
            class="btn btn-danger border border-2 w-100 fs-5 my-1"
            @click="donateNow()"
            style="font-family: 'Noto Sans JP', sans-serif; font-weight: 700"
          >
            立即斗內
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    donateNow() {
      this.$router.push('/about');
    },
  },
};
</script>

<style>
.the-end {
  background-image: url(@/assets/images/theEnd.jpg);
  height: 600px;
  background-position: center center;
  background-size: cover;
  /* background-blend-mode: multiply;
  background-color: #eff2f6; */
}
</style>
