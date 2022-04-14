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
