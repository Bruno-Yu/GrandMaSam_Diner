<template>
  <div class="content content-cart">
    <h3>CHECK OUT</h3>
    <ul class="step">
      <li>
        <span>1</span>
        <p>購物車</p>
        <div class="bar bar-one" :class="{ focus: page === 1 }"></div>
      </li>
      <li>
        <span>2</span>
        <p>填寫資料</p>
        <div class="bar bar-two" :class="{ focus: page === 2 }"></div>
      </li>
      <li>
        <span>3</span>
        <p>訂單確認</p>
        <div class="bar bar-three" :class="{ focus: page === 3 }"></div>
      </li>
    </ul>
    <!-- <div class="step-one" :class="{ show: page === 1 }">
      <table class="checkout-table">
        <tr class="table-title">
          <th class="pic" width="13%"></th>
          <th width="21%">品名</th>
          <th class="unit" width="10%">單位</th>
          <th width="15%">售價</th>
          <th width="19%">數量</th>
          <th class="subtotal" width="15%">小計</th>
          <th width="7%"></th>
        </tr>
        <tr v-for="item in cart" :key="item.product.id + 'cart'">
          <td class="pic">
            <img :src="item.product.imageUrl[0]" alt />
          </td>
          <td>{{ item.product.title }}</td>
          <td class="unit">{{ item.product.unit }}</td>
          <td>NT${{ item.product.price | thousands }}</td>
          <td>
            <form class="select_qty">
              <div class="input-group">
                <button
                  type="button"
                  class="decrease-btn"
                  @click="qtyUpdate(item.product.id, item.quantity - 1)"
                  :disabled="item.quantity === 0"
                >
                  <i class="fa fa-minus"></i>
                </button>
                <input
                  type="number"
                  class="product-number"
                  :value="item.quantity"
                  @keyup.enter="qtyUpdate(item.product.id, $event.target.value)"
                  onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
                />
                <button
                  type="button"
                  class="add-btn"
                  @click="qtyUpdate(item.product.id, item.quantity + 1)"
                >
                  <i class="fa fa-plus"></i>
                </button>
              </div>
            </form>
          </td>
          <td class="subtotal">
            NT${{ (item.product.price * item.quantity) | thousands }}
          </td>
          <td class="delete" @click="deleteCartItem(item.product.id)">
            <i class="fas fa-times"></i>
          </td>
        </tr>
      </table>
      <div class="cart-select-wrap">
        <div class="cart-select">
          <h4>選擇送貨及付款方式</h4>
          <div class="input-wrap">
            <label for="delivery-place">送貨地點</label>
            <select id="delivery-place" ref="pay">
              <option value selected disabled>台灣</option>
            </select>
            <label for="delivery-method">送貨方式</label>
            <select id="delivery-method">
              <option value selected disabled>宅配到府</option>
            </select>
            <span>1. 預購商品會因不同品牌有不同的等待期，請您耐心等候。</span>
            <span
              >2. 提交訂單後，我們會寄送一封確認訂單的 E-mail
              到您指定的電子郵件信箱中，再次確認本次訂購內容、金額、付款方式等項目。</span
            >
          </div>
        </div>
        <div class="sum-check">
          <h4>訂單資訊</h4>
          <div class="sum-wrap">
            <div class="product-sum">
              <p>小計：</p>
              <p>NT$ {{ totalPrice | thousands }}</p>
            </div>
            <div class="deliver-sum">
              <p>運費：</p>
              <p>NT$ 350</p>
            </div>
            <div class="sale-price" :class="{ delete: totalPrice < 10000 }">
              <p>優惠促銷：滿一萬免運</p>
              <p v-if="totalPrice >= 10000">-NT$ 350</p>
            </div>
            <div class="coupon-price" v-if="coupon.enabled">
              <p>優惠券折扣：</p>
              <p>
                -NT$
                {{ (totalPrice * ((100 - coupon.percent) / 100)) | thousands }}
              </p>
            </div>
            <div class="coupon-input">
              <input
                type="text"
                v-model="coupon_code"
                placeholder="請輸入優惠碼"
              />
              <button type="button" @click="addCoupon">套用優惠碼</button>
              <span>{{ alert }}</span>
            </div>
            <div class="all-sum">
              <p>總金額</p>
              <p v-if="coupon.enabled">
                NT$
                {{
                  (totalPrice * (coupon.percent / 100) + deliveryFee)
                    | thousands
                }}
              </p>
              <p v-else>NT$ {{ (totalPrice + deliveryFee) | thousands }}</p>
            </div>
            <button type="button" class="checkout" @click="page = 2">
              前往結帳
            </button>
          </div>
        </div>
      </div>
    </div> -->
    <div class="step-two" :class="{ show: page === 2 }">
      <div class="form-wrap">
        <h4>顧客資料</h4>
        <validation-observer v-slot="{ invalid }">
          <form @submit.prevent="createOrder()">
            <div class="input-wrap">
              <div class="form-group">
                <validation-provider rules="required" v-slot="{ errors }">
                  <label for="reciever-name">
                    收件人姓名
                    <span>*</span>
                  </label>
                  <input
                    type="text"
                    id="reciever-name"
                    name="收件人姓名"
                    v-model="form.name"
                  />
                  <p>{{ errors[0] }}</p>
                </validation-provider>
              </div>
              <div class="form-group">
                <validation-provider rules="required|email" v-slot="{ errors }">
                  <label for="email">
                    電子信箱
                    <span>*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="電子信箱"
                    v-model="form.email"
                  />
                  <p>{{ errors[0] }}</p>
                </validation-provider>
              </div>
              <div class="form-group">
                <validation-provider rules="required|min:8" v-slot="{ errors }">
                  <label for="reciever-tel">
                    收件人電話
                    <span>*</span>
                  </label>
                  <input
                    type="tel"
                    id="reciever-tel"
                    name="收件人電話"
                    v-model="form.tel"
                  />
                  <p>{{ errors[0] }}</p>
                </validation-provider>
              </div>
              <div class="form-group">
                <validation-provider rules="required" v-slot="{ errors }">
                  <label for="address">
                    地址
                    <span>*</span>
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="地址"
                    v-model="form.address"
                  />
                  <p>{{ errors[0] }}</p>
                </validation-provider>
              </div>
            </div>
            <div class="input-wrap">
              <div class="form-group">
                <label for="payment">付款方式</label>
                <select id="payment" v-model="form.payment">
                  <option value selected disabled>請選擇</option>
                  <option value="WebATM">WebATM</option>
                  <option value="ATM">ATM</option>
                  <option value="Barcode">Barcode</option>
                  <option value="Credit">Credit</option>
                  <option value="ApplePay">ApplePay</option>
                  <option value="GooglePay">GooglePay</option>
                </select>
              </div>
              <div class="form-group">
                <label for="remark">訂單備註</label>
                <textarea
                  id="remark"
                  v-model="form.message"
                  placeholder="有什麼想告訴我們的嗎？"
                ></textarea>
              </div>
              <button
                type="submit"
                class="submit-btn"
                @click="page = 3"
                :disabled="invalid"
                :class="{ disabled: invalid }"
              >
                提交訂單
              </button>
            </div>
          </form>
        </validation-observer>
      </div>
      <div class="btns">
        <a href="cart.html" class="back-btn" @click.prevent="page = 1"
          >← 返回購物車</a
        >
      </div>
    </div>
    <div class="step-three" :class="{ show: page === 3 }">
      <div v-if="completed" class="pay-completed">
        <h4>付款完成，謝謝您的訂單</h4>
        <div class="btns">
          <a href="#">← 訂單查詢</a>
          <router-link to="/products/All-Products">繼續購物 →</router-link>
        </div>
      </div>
      <div v-else>
        <!-- <form @submit.prevent="payOrder()">
          <table class="checkorder-table">
            <tr class="table-title">
              <th width="25%"></th>
              <th width="25%">品名</th>
              <th width="25%">數量</th>
              <th width="25%">單價</th>
            </tr>
            <tr v-for="(product, key) in order.products" :key="key">
              <td>
                <img :src="product.product.imageUrl[0]" alt />
              </td>
              <td>{{ product.product.title }}</td>
              <td>{{ product.quantity }}</td>
              <td>NT${{ product.product.price | thousands }}</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>總價</td>
              <td class="total-price">
                NT${{ parseInt(order.amount) | thousands }}
              </td>
            </tr>
          </table>
          <table class="checkinfo-table">
            <tr>
              <th width="120px">收件人姓名</th>
              <td>{{ form.name }}</td>
            </tr>
            <tr>
              <th>電子信箱</th>
              <td>{{ form.email }}</td>
            </tr>
            <tr>
              <th>收件人電話</th>
              <td>{{ form.tel }}</td>
            </tr>
            <tr>
              <th>地址</th>
              <td>{{ form.address }}</td>
            </tr>
          </table>
          <button type="submit" class="pay-btn">確認付款</button>
        </form> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      cart: [],
      totalPrice: 0,
      deliveryFee: 350,
      email: '',
      page: 1,
      form: {
        name: '',
        email: '',
        tel: '',
        address: '',
        payment: '',
        message: '',
      },
      coupon_code: '',
      coupon: {},
      completed: false,
      orderId: '',
      order: {
        user: {},
      },
      alert: '',
      router: '',
    };
  },
  created() {
    this.getCart();
    this.router = this.$router.history.current.name;
  },
  methods: {
    getCart() {
      this.isLoading = true;
      const url = `{process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.get(url).then((response) => {
        this.cart = response.data.data;
        this.getTotalPrice();
        this.isLoading = false;
      });
    },
    deleteCartItem(id) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/shopping/${id}`;
      this.$http.delete(url).then(() => {
        this.getCart();
        this.isLoading = false;
      });
    },
    qtyUpdate(id, num) {
      this.isLoading = true;
      const data = {
        product: id,
        quantity: num,
      };
      if (num === 0) {
        const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/shopping/${id}`;
        this.$http.delete(url).then(() => {
          this.getCart();
          this.isLoading = false;
        });
      } else {
        const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/shopping`;
        this.$http.patch(url, data).then(() => {
          this.getCart();
          this.isLoading = false;
        });
      }
    },
    addCoupon() {
      this.isLoading = true;
      this.alert = '';
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/coupon/search`;
      this.$http
        .post(url, { code: this.coupon_code })
        .then((response) => {
          this.coupon = response.data.data;
          this.form.coupon = response.data.data.code;
          this.isLoading = false;
        })
        .catch((error) => {
          this.alert = error.response.data.message;
          this.coupon_code = '';
          this.isLoading = false;
        });
    },
    createOrder() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/orders`;
      const order = { ...this.form };
      if (this.coupon.enabled) {
        order.coupon = this.coupon.code;
      } else {
        order.coupon = '';
      }
      this.$http.post(url, order).then((response) => {
        if (response.data.data.id) {
          this.getCart();
          this.orderId = response.data.data.id;
          this.getSingleOrder();
          this.$bus.$emit('get-cart');
          this.isLoading = false;
        }
      });
    },
    getSingleOrder() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/orders/${this.orderId}`;
      this.$http.get(url).then((response) => {
        this.order = response.data.data;
        this.isLoading = false;
      });
    },
    payOrder() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/orders/${this.orderId}/paying`;
      this.$http.post(url).then(() => {
        this.getSingleOrder();
        this.completed = true;
      });
    },
  },
};
</script>

<style>
/* .content-cart
    background: rgba($gray, 0.1)
    border-top: 1px solid rgba($gray, 0.3)
    border-bottom: 1px solid rgba($gray, 0.3)
    padding: 60px 100px 70px
    @include media-w896
        padding: 60px 50px 70px
    @include media-w667
        padding: 60px 30px 70px
    @include media-w568
        padding: 110px 20px 70px
    h3
        position: relative
        text-align: center
        font-size: 35px
        padding-bottom: 70px
        &::before
            content: ""
            position: absolute
            height: 1px
            width: 40px
            background: black
            top: 50px
            left: 50%
            transform: translateX(-50%)
.step
    display: flex
    justify-content: center
    width: 100%
    margin-bottom: 50px
    li
        width: 33.3%
        display: flex
        flex-direction: column
        align-items: center
        text-align: center
        font-weight: 300
        span
            width: 20px
            height: 20px
            display: flex
            justify-content: center
            align-items: center
            background: $dark-beige
            color: $white
            border-radius: 50%
        p
            font-size: 15px
            color: $dark-beige
            padding: 10px 0 15px
        .bar
            width: 100%
            height: 5px
            background: rgba($beige,0.5)
            &.focus
                background: $dark-beige
.step-one
    display: none
    &.show
        display: block
.step-two
    display: none
    &.show
        display: block
.step-three
    display: none
    padding: 50px
    text-align: center
    @include media-w568
        padding: 50px 20px
    @include media-w375
        padding: 50px 0
    &.show
        display: block
    h4
        font-size: 27px
        font-weight: 300
        padding-bottom: 20px
        @include media-w375
            font-size: 25px
    .pay-completed
        width: 300px
        margin: 0 auto
        @include media-w375
            width: 275px
        a
            font-size: 15px
            color: $black
            &:hover
                color: $dark-beige
.checkout-table
    width: 100%
    background: $white
    border: 1px solid $beige
    margin-bottom: 30px
    tr
        margin: 0 20px
        th, td
            line-height: 1.2
            text-align: center
            vertical-align: middle
            margin: 10px
        th
            padding: 10px 5px
            font-size: 13px
            color: $dark-beige
        td
            padding: 15px 5px
            border-top: 1px solid $beige
            color: rgb(25,25,25)
            font-size: 13px
            img
                padding-left: 20px
                @include media-w568
                    padding-left: 10px
            &.delete
                cursor: pointer
                transition: 0.2s ease-in-out
                &:hover
                    color: $dark-beige
        .unit
            @include media-w896
                display: none
        .subtotal
            @include media-w568
                display: none
        .pic
            @include media-w414
                display: none
    .select_qty
        display: flex
        justify-content: center
        .input-group
            display: flex
            justify-content: center
            button
                border-radius: 0
                border: 1px solid $black
                background: $white
                font-size: 12px
                color: $black
                padding: 6px 10px
                @include media-w667
                    padding: 6px 8px
                @include media-w568
                    padding: 4px 6px
                &:focus
                    outline: none
            input
                -moz-appearance: textfield
                text-align: center
                width: 60px
                border-radius: 0
                border: none
                border-top: 1px solid $black
                border-bottom: 1px solid $black
                background: $white
                font-size: 12px
                color: $black
                padding: 6px
                @include media-w767
                    width: 50px
                @include media-w667
                    width: 40px
                @include media-w568
                    padding: 4px
                &:focus
                    outline: none
            input[type='number']
                -moz-appearance: textfield
            input[type='number']::-webkit-outer-spin-button,
            input[type='number']::-webkit-inner-spin-button
                -webkit-appearance: none
            .reset [type="number"]
                -moz-appearance: spinner-textfield
            .reset input[type='number']::-webkit-outer-spin-button,
            .reset input[type='number']::-webkit-inner-spin-button
                -webkit-appearance: spinner-textfield
.cart-select-wrap
    width: 100%
    display: flex
    justify-content: space-between
    @include media-w767
        flex-direction: column
    h4
        width: 100%
        align-self: flex-start
        font-size: 17px
        font-weight: 300
        padding: 10px 20px
        background: $dark-beige
        color: $white
    .cart-select
        width: 48%
        border: 1px solid $beige
        display: flex
        flex-direction: column
        align-items: center
        background: $white
        @include media-w767
            width: 100%
            margin-bottom: 30px
        .input-wrap
            width: 80%
            display: flex
            flex-direction: column
            align-items: center
            padding: 30px 0
            label
                align-self: flex-start
            select
                margin-top: 7px
                margin-bottom: 20px
            span
                font-size: 12px;
                padding-top: 7px
                padding-left: 13px
                text-indent: -13.5px
                line-height: 1.4
                text-align: justify
                align-self: flex-start
                color: $black
    .sum-check
        width: 47%
        border: 1px solid $beige
        display: flex
        flex-direction: column
        align-items: center
        background: $white
        @include media-w767
            width: 100%
        .sum-wrap
            width: 70%
            padding: 30px 0
            @include media-w414
                width: 80%
            div
                display: flex
                justify-content: space-between
                padding-bottom: 20px
                font-size: 14px
            .sale-price
                color: $dark-beige
                &.delete
                    text-decoration: line-through
            .coupon-input
                display: flex
                position: relative
                margin-bottom: 10px
                input
                    width: 60%
                    border-radius: 0
                    border: 1px solid $dark-beige
                    &:focus
                        box-shadow: none
                button
                    width: 40%
                    padding: 5px
                    border-radius: 0
                    @include media-w767
                        color: $white
                        background: $dark-beige
                    &:focus
                        outline: none
                span
                    font-size: 12px
                    color: $red
                    bottom: 0px
                    position: absolute
            .coupon-price
                color: $dark-beige
            .all-sum
                font-size: 16px
                font-weight: 500
                padding-top: 20px
                border-top: 1px solid $beige
        button
            width: 100%
            font-size: 14px
            background: $beige
            padding: 8px 12px
            border: none
            border-radius: 3px
            @include media-w767
                color: $white
                background: $dark-beige
            &:hover
                color: $white
                background: $dark-beige
.form-wrap
    width: 100%
    display: flex
    flex-direction: column
    padding-bottom: 10px
    border: 1px solid $beige
    background: $white
    h4
        width: 100%
        align-self: flex-start
        font-size: 17px
        font-weight: 300
        padding: 10px 20px
        background: $dark-beige
        color: $white
    form
        display: flex
        justify-content: space-between
        width: 80%
        margin: 0 auto
        @include media-w667
            flex-direction: column
    p
        width: 80%
        margin: 0 auto
        padding-top: 30px
        align-self: flex-start
    .input-wrap
        width: 45%
        display: flex
        flex-direction: column
        justify-content: space-between
        align-items: center
        padding: 30px 0 10px
        @include media-w667
            width: 100%
            &:nth-child(2)
                padding: 0
        .form-group
            position: relative
            width: 100%
            margin-bottom: 30px
            > span
                padding: 0
            label
                align-self: flex-start
                span
                    color: $red
            input, select, textarea
                margin-top: 7px
            textarea
                height: 123px
            p
                position: absolute
                bottom: -16px
                width: 100%
                font-size: 12px;
                padding-top: 5px
                align-self: flex-start
                color: $red
        button
            width: 100%
            font-size: 14px
            background: $beige
            padding: 6px 12px
            border: none
            border-radius: 3px
            margin-bottom: 30px
            color: $black
            @include media-w767
                color: $white
                background: $dark-beige
            &.disabled
                cursor: not-allowed
                pointer-events: none
                opacity: 0.7
            &:hover
                background: $dark-beige
                color: $white
.btns
    padding-top: 30px
    display: flex
    justify-content: space-between
    align-items: center
    a
        font-size: 14px
        color: $black
        &:hover
            color: $dark-beige
.checkorder-table
    width: 85%
    background: $white
    border: 1px solid $beige
    margin: 0 auto 30px
    @include media-w667
        width: 100%
    tr
        margin: 0 20px
        th, td
            line-height: 1.2
            text-align: center
            vertical-align: middle
            padding: 10px 5px
            margin: 10px
            font-size: 13px
        th
            color: $dark-beige
        td
            border-top: 1px solid $beige
            color: rgb(25,25,25)
            &.total-price
                padding: 15px 5px
                font-size: 15px
            img
                padding-left: 20px
                width: 100px
.checkinfo-table
    width: 85%
    background: $white
    border: 1px solid $beige
    margin: 0 auto 30px
    @include media-w667
        width: 100%
    tr
        margin: 0 20px
        th, td
            line-height: 1.2
            text-align: left
            vertical-align: middle
            padding: 10px 20px
            margin: 10px
            border-top: 1px solid $beige
        th
            color: $dark-beige
            font-size: 13px
        td
            color: rgb(25,25,25)
            font-size: 14px
.pay-btn
    width: 85%
    padding: 7px 12px
    @include media-w667
        width: 100% */
</style>
