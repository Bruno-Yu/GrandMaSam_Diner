<template>
  <!-- Modal -->
  <div
    class="modal fade"
    ref="modalMessage"
    id="modalMessage"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div v-if="success" class="modal-content">
        <div class="modal-header bg-warning">
          <h3
            class="modal-title text-light font-Noto fw-700"
            id="exampleModalLabel "
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
        <div v-if="login" class="modal-body">
          <div class="container pt-2 gx-2">
            <h5 class="font-Noto fw-500">歡迎回來，我們尊貴的會員</h5>
            <p class="font-Noto fw-400">
              貼心提醒，這個月因為作者的手頭有點緊，還請於明日就匯會員款項，用以作為作者的跑路資金
            </p>
          </div>
        </div>
        <div v-if="paid" class="modal-body">
          <div class="container gx-2 pt-2">
            <h5 class="font-Noto fw-600">感謝施主您的善舉</h5>
            <p class="font-Noto fw-400">
              有句話說台灣最美的風景就是人，但在作者眼中，最美的台灣風景就是你
            </p>
            <p class="font-Noto fw-400">的錢</p>
            <p class="font-Noto fw-400">處理訂單編號: {{ id }}</p>
          </div>
        </div>
        <div v-if="paid" class="modal-footer">
          <div class="container gx-2">
            <button
              type="button"
              class="btn btn-warning shadow mx-auto shadow p-2 mb-1 border border-dark border-1 font-Noto fw-400"
              @click="[paidSuccess(), closeModal()]"
            >
              我是盤子我驕傲
            </button>
          </div>
        </div>
        <div v-if="login" class="modal-footer">
          <div class="container d-flex justify-content-end gx-2">
            <button
              type="button"
              class="btn btn-outline-dark shadow p-2 mb-1 font-Noto fw-400"
              data-bs-dismiss="modal"
              @click="[closeModal(), loginSuccess()]"
            >
              我也沒錢
            </button>
            <button
              type="button"
              class="btn btn-warning ms-2 shadow p-2 mb-1 border border-dark border-1 font-Noto fw-400"
              @click="[closeModal(), loginSuccess()]"
            >
              朕知道了
            </button>
          </div>
        </div>
      </div>
      <div v-else class="modal-content">
        <div class="modal-header bg-danger">
          <h3
            class="modal-title text-light font-Noto fw-700"
            id="exampleModalLabel"
          >
            執行結果失敗
          </h3>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            @click="closeModal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body" v-if="paid">
          <div class="container pt-2 gx-2">
            <h5 class="font-Noto fw-550">很遺憾地通知您，付款失敗</h5>
            <p class="font-Noto fw-400">貼心小提示:</p>
            <ul class="list-unstyled">
              <li class="font-Noto fw-400">
                1. 或許您可以透過替親人保高額保險並技巧性的向保險公司申請理賠
              </li>
              <li class="font-Noto fw-400">
                2. 或者與友人合作並通知您家人您在我們的手上
              </li>
            </ul>
            <p class="font-Noto fw-400">
              請放心，我們致力於保護客戶的隱私，我們並不會追查款項來源
            </p>
          </div>
        </div>
        <div class="modal-body" v-if="login">
          <div class="container pt-2 gx-2">
            <h5
              style="font-family: 'Noto Sans JP', sans-serif; font-weight: 550"
            >
              很遺憾地通知您，登入失敗
            </h5>
            <p class="font-Noto fw-400">
              這很明顯的，是您的誠意不夠，難道您不曉得斗內給作者越多的人，越有機會登入嗎?
            </p>
            <p class="font-Noto fw-400">
              隨隨便便讓你登入，這讓很有誠意的會員情何以堪?
            </p>
          </div>
        </div>
        <div v-if="paid" class="modal-footer">
          <div class="container d-flex justify-content-end gx-2">
            <button
              type="button"
              class="btn btn-outline-dark shadow p-2 mb-1 font-Noto fw-400"
              data-bs-dismiss="modal"
              @click="closeModal()"
            >
              給我滾
            </button>
            <button
              type="button"
              class="btn btn-danger ms-2 shadow p-2 mb-1 border border-dark border-1 font-Noto fw-400"
              @click="closeModal()"
            >
              我知道了
            </button>
          </div>
        </div>
        <div v-if="login" class="modal-footer">
          <div class="container d-flex justify-content-end gx-2">
            <button
              type="button"
              class="btn btn-outline-dark shadow p-2 mb-1 font-Noto fw-400"
              data-bs-dismiss="modal"
              @click="[loginFail(), closeModal()]"
            >
              再試試看
            </button>
            <button
              type="button"
              class="btn btn-danger ms-2 shadow p-2 mb-1 border border-dark border-1 font-Noto fw-400"
              @click="[donateNow(), closeModal()]"
            >
              馬上斗內
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';
import emitter from '@/libs/emitter';

export default {
  data() {
    return {
      login: false,
      paid: false,
      modal: null,
      success: false,
      id: '',
    };
  },

  methods: {
    openModal(isPaid, source, id) {
      this.success = isPaid;
      if (source === 'paid') {
        this.paid = true;
        this.login = false;
        this.id = id;
        emitter.emit('order-id', id);
      } else if (source === 'login') {
        this.login = true;
        this.paid = false;
      }
      this.modal.show();
    },
    closeModal() {
      this.login = false;
      this.paid = false;
      this.success = false;
      this.modal.hide();
    },
    loginSuccess() {
      this.$router.push('/admin');
    },
    loginFail() {
      this.$router.push('/trueusLogin');
    },
    donateNow() {
      this.$router.push('/about');
    },
    paidSuccess() {
      this.$router.push('/paidSuccess');
    },
  },

  mounted() {
    this.modal = new Modal(document.querySelector('#modalMessage'));
  },
};
</script>
