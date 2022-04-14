<template>
  <!-- Modal -->
  <div
    class="modal fade"
    ref="modalMessage"
    id="cartMessage"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div v-if="add" class="modal-content">
        <div class="modal-header bg-warning">
          <h3
            class="modal-title text-light font-Noto fw-550"
            id="exampleModalLabel"
          >
            執行成功
          </h3>
          <button
            type="button"
            class="btn-close"
            @click="closeModal"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="container">
            <h5 class="fw-bold">
              <span class="text-success"
                ><i class="bi bi-check-circle"></i
              ></span>
              噗通! 商品如粑粑那樣成功落入購物車中
            </h5>
          </div>
        </div>
        <div class="modal-footer">
          <div class="container d-flex justify-content-center">
            <button
              type="button"
              class="btn btn-warning mx-2 shadow p-2 mb-1 border border-dark border-1 font-Noto fw-400"
              @click="closeModal()"
            >
              好優
            </button>
          </div>
        </div>
      </div>
      <div v-else class="modal-content">
        <div class="modal-header bg-danger">
          <h3
            class="modal-title text-light font-Noto fw-550"
            id="exampleModalLabel"
          >
            刪除警示
          </h3>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            @click="closeModal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="container">
            <h5 class="font-Noto fw-550">即將被您刪除的商品會感到難過</h5>
            <p>
              其實我們的商品也是有情緒的，您這麼做會讓商品感受到您的冷漠，而他們要的，其實不多，只是希望您能接受他們而已
            </p>
          </div>
        </div>
        <div class="modal-footer">
          <div class="container d-flex justify-content-end">
            <button
              type="button"
              class="btn btn-outline-dark shadow p-2 mb-1 font-Noto fw-400"
              data-bs-dismiss="modal"
              @click="closeModal()"
            >
              再想想
            </button>
            <button
              type="button"
              class="btn btn-danger mx-2 shadow p-2 mb-1 border border-dark border-1 font-Noto fw-400"
              @click="[removeCart(all, id), $emit('get-cart'), closeModal()]"
            >
              這與我無瓜
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';
// import emitter from '@/libs/emitter';

export default {
  data() {
    return {
      modal: null,
      add: true,
      id: '',
      all: false,
    };
  },
  emits: ['get-cart'],
  methods: {
    openModal(add, id, all) {
      if (add) {
        this.add = true;
      } else {
        this.add = false;
        this.id = id;
        if (all) {
          this.all = true;
        } else {
          this.all = false;
        }
      }
      this.modal.show();
    },
    closeModal() {
      this.modal.hide();
      this.id = '';
      this.all = false;
    },
    removeCart(all, id) {
      if (all) {
        this.$http
          .delete(
            `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`,
          )
          .then(() => {});
      } else {
        this.$http
          .delete(
            `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`,
          )
          .then(() => {
            // 取得購物車的資料
          });
      }
    },
  },

  mounted() {
    this.modal = new Modal(document.querySelector('#cartMessage'));
  },
};
</script>

<style>
.font-Noto {
  font-family: 'Noto Sans JP', sans-serif;
}
.fw-400 {
  font-weight: 400;
}

.fw-550 {
  font-weight: 550;
}
</style>
