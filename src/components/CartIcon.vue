<template>
  <div>
    <button
      type="button"
      class="cart-icon bg-warning shadow p-2 mb-1 fw-bold link-warning fs-4"
    >
      <i class="bi bi-cart2 position-relative">
        <span
          class="position-absolute top-10 start-100 translate-middle p-1 bg-danger border border-light border-1 rounded-circle text-light fw-bold shadow"
          style="font-size: 0.5rem"
        >
          {{ cartNum }}
          <span class="visually-hidden">購物車內品項</span>
        </span>
      </i>
    </button>
  </div>
</template>
<script>
export default {
  props: ['cartNum'],
};
</script>
<style lang="scss" scoped>
.cart-icon {
  outline: none;
  border: none;
  position: fixed;
  z-index: 90;
  width: 50px;
  height: 50px;
  font-weight: 800;
  color: rgb(29, 24, 3);
  line-height: 10px;
  border-radius: 50%;
  text-align: center;
  right: 4%;
  bottom: 15%;
  @media (max-width: 480px) {
    bottom: 18%;
    right: 5%;
  }
}
</style>
