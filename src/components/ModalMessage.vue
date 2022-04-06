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
        <div class="modal-header">
          <h5 class="modal-title bg-warning" id="exampleModalLabel">
            執行成功
          </h5>
          <button
            type="button"
            class="btn-close"
            @click="closeModal"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div v-if="login" class="modal-body">
          <div class="container">
            <h5>歡迎回來，我們尊貴的會員</h5>
            <p>
              貼心提醒，這個月因為作者的手頭有點緊，還請於明日就匯會員款項，用以籌備作者跑路時的盤纏基金
            </p>
          </div>
        </div>
        <div v-if="paid" class="modal-body">
          <div class="container">
            <h5>感謝施主您的善舉</h5>
            <p>
              有句話說台灣最美的風景就是人，但在作者眼中，最美的台灣風景就是你
            </p>
            <p>的錢</p>
          </div>
        </div>
        <div v-if="paid" class="modal-footer">
          <div class="container">
            <button
              type="button"
              class="btn btn-warning"
              @click="[paidSuccess(), closeModal()]"
            >
              我是盤子我驕傲
            </button>
          </div>
        </div>
        <div v-if="login" class="modal-footer">
          <div class="container">
            <button
              type="button"
              class="btn btn-warning"
              @click="[closeModal(), loginSuccess()]"
            >
              朕知道了
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="[closeModal(), loginSuccess()]"
            >
              我也沒錢
            </button>
          </div>
        </div>
      </div>
      <div v-else class="modal-content">
        <div class="modal-header bg-danger">
          <h5 class="modal-title" id="exampleModalLabel">執行結果失敗</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            @click="closeModal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div v-if="paid" class="container">
            <h5>很遺憾地通知您，付款失敗</h5>
            <p>貼心小提示:</p>
            <ul>
              <li>
                1. 或許您可以透過替親人保高額保險並技巧性的向保險公司申請理賠
              </li>
              <li>2. 或者與友人合作並通知您家人您在我們的手上</li>
            </ul>
            <p>請放心，我們致力於保護客戶的隱私，我們並不會追查款項來源</p>
          </div>
          <div v-if="login" class="container">
            <h5>很遺憾地通知您，登入失敗</h5>
            <p>
              這很明顯的，是您的誠意不夠，難道您不曉得斗內給作者越多的人，越有機會登入嗎?
            </p>
            <p>隨隨便便讓你登入，這讓很有誠意的會員情何以堪?</p>
          </div>
        </div>
        <div class="modal-footer">
          <div v-if="paid" class="container">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="closeModal()"
            >
              給我滾
            </button>
            <button type="button" class="btn btn-danger" @click="closeModal">
              我知道了
            </button>
          </div>
          <div v-if="login" class="container">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="[loginFail(), closeModal()]"
            >
              再試試看
            </button>
            <button
              type="button"
              class="btn btn-danger"
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
    };
  },

  methods: {
    openModal(isPaid, source) {
      this.success = isPaid;
      if (source === 'paid') {
        this.paid = true;
        this.login = false;
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
      console.log('登入成功');
      emitter.emit('loginSuccess', 'login');
    },
    loginFail() {
      emitter.emit('loginFail', 'loginFail');
    },
    donateNow() {
      emitter.emit('donateNow', 'donateNow');
    },
    paidSuccess() {
      emitter.emit('paidSuccess', 'paidSuccess');
    },
  },

  mounted() {
    this.modal = new Modal(document.querySelector('#modalMessage'));
  },
};
</script>
