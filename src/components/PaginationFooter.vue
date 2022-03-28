<template>
  <nav aria-label="Page navigation">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: !hasPre }">
        <a
          class="page-link link-dark fw-bold"
          href="#"
          tabindex="-1"
          :aria-disabled="!hasPre"
          @click.prevent="emitData(currentPage - 1)"
          >上一頁</a
        >
      </li>

      <li
        class="page-item"
        v-for="(num, index) in totalPages"
        :key="index"
        :class="{ active: num === currentPage }"
      >
        <span class="page-link link-dark fw-bold" v-if="num === currentPage">{{
          num
        }}</span>
        <a
          class="page-link link-dark fw-bold"
          href="#"
          v-else
          @click.prevent="emitData(num)"
          >{{ num }}</a
        >
      </li>

      <li class="page-item" :class="{ disabled: !hasNext }">
        <a
          class="page-link link-dark fw-bold"
          href="#"
          :aria-disabled="!hasNext"
          @click.prevent="emitData(currentPage + 1)"
          >下一頁</a
        >
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {};
  },
  // 設從axios response內的pagination，從其中拆出個屬性於根元件包含current_page

  // props 傳入外部的資料，可以當作內部data屬性使用
  // 為方便在TEMPLATE內表達式內加減，用小駝峰型式寫
  props: ['currentPage', 'hasPre', 'hasNext', 'totalPages'],
  methods: {
    // emitData，設參數，將使用者點擊的頁數帶進來，再傳遞出去
    emitData(page) {
      this.$emit('click-page', page);
    },
  },
};
</script>
