<template>
  <div v-if="detailDisplay">
    <div class="card mb-3">
      <!-- 產品封面圖片 imageUrl-->
      <img
        :src="productDisplay.imageUrl"
        class="card-img-top primary-image"
        alt="主圖"
      />
      <!--  產品內文 -->
      <div class="card-body">
        <h5 class="card-title">
          {{ productDisplay.title }}
          <!--title -->
          <span class="badge bg-primary ms-2">{{
            productDisplay.category
          }}</span>
        </h5>
        <!--description-->
        <p class="card-text">商品描述：{{ productDisplay.description }}</p>
        <!-- content   -->
        <p class="card-text">商品內容：{{ productDisplay.content }}</p>
        <div class="d-flex">
          <!-- price -->
          <p class="card-text me-2">{{ productDisplay.price }}</p>
          <!--  origin_price, unit    -->
          <p class="card-text text-secondary">
            <del>{{ productDisplay.origin_price }}</del>
          </p>
          {{ productDisplay.unit }} / 元
        </div>
      </div>
    </div>
    <div v-if="productDisplay.id">
      <!-- 修正item當key 的問題 -->
      <img
        v-for="(item, key) in productDisplay.imagesUrl"
        :src="item"
        :key="key"
        alt=""
        class="images m-2"
      />
    </div>
  </div>
  <p v-else class="text-secondary">
    請點擊<span class="text-danger">呈現細節</span>按鈕，查看商品細節
  </p>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ['productDisplay', 'detailDisplay'],
};
</script>
