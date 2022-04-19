<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="CartModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header bg-warning">
          <h5 class="modal-title fw-bold" id="exampleModalLabel">購物車</h5>
          <button
            type="button"
            class="btn-close"
            @click="closeModal"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <section class="px-2 pt-3" v-if="cart.carts.length > 0">
            <table class="table mb-0">
              <thead>
                <th>刪除</th>
                <th>品名</th>
                <th>數量</th>
                <th class="text-right">單價</th>
              </thead>
              <tbody>
                <tr v-for="(item, index) in cart.carts" :key="index">
                  <td>
                    <button
                      type="button"
                      class="btn btn-outline-danger btn-sm"
                      @click="[removeCart(item.id), this.modal.hide()]"
                      :disabled="isLoadingItem === item.id"
                    >
                      <span
                        class="spinner-grow spinner-grow-sm"
                        v-show="isLoadingItem === item.id"
                      ></span>
                      x
                    </button>
                  </td>
                  <td>
                    <RouterLink
                      :to="{ path: `/productView/${item.product.id}` }"
                      class="text-decoration-none link-dark fw-bold"
                    >
                      {{ item.product.title }}
                    </RouterLink>
                    <div class="text-dark" v-if="item.coupon">
                      <small>已套用優惠券</small>
                    </div>
                  </td>
                  <td>{{ item.qty }}{{ item.product.unit }}</td>
                  <td class="text-right">${{ item.total }}</td>
                </tr>
                <tr>
                  <td
                    colspan="4"
                    class="text-right fw-bold pt-3"
                    v-if="cart.total == cart.final_total"
                    :class="{
                      'text-dark': cart.total == cart.final_total,
                      h5: cart.total == cart.final_total,
                    }"
                  >
                    總計&nbsp;${{ cart.total }}
                  </td>
                  <td
                    colspan="4"
                    class="text-right fw-bold pt-3"
                    v-if="cart.total !== cart.final_total"
                  >
                    <del>總計&nbsp;${{ cart.total }}</del>
                  </td>
                </tr>
                <tr v-if="cart.total !== cart.final_total">
                  <td
                    colspan="4"
                    class="text-right text-dark h5 border-top-0 fw-bold"
                  >
                    折扣價&nbsp;&nbsp;&nbsp;${{ cart.final_total }}
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
          <section
            class="container my-3 text-center"
            v-if="cart.carts.length === 0"
          >
            <p class="h3 text-secondary">目前無選購商品，歡迎立即選購</p>
          </section>
        </div>
        <div class="modal-footer" v-if="cart.carts.length > 0">
          <button
            type="button"
            class="btn btn-warning btn-block btn-shadow fw-bold"
            @click="[closeModal(), goOrders()]"
          >
            結帳去
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';
import emitter from '@/libs/emitter';

export default {
  // props: ['cartData'],
  data() {
    return {
      modal: null,
      isLoadingItem: '',
      cart: {
        carts: [],
      },
    };
  },
  methods: {
    goOrders() {
      this.$router.push('/cartView');
    },
    openModal(cartData) {
      this.cart = cartData;
      this.modal.show();
    },
    closeModal() {
      this.isLoadingItem = '';
      this.modal.hide();
    },
    removeCart(id) {
      this.isLoadingItem = id;
      this.$http
        .delete(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`,
        )

        .then(() => {
          emitter.emit('get-cart');
          this.isLoadingItem = '';
        });
    },
  },

  mounted() {
    // this.cart = this.cartData;
    this.modal = new Modal(document.querySelector('#CartModal'));
  },
};
</script>
