<template>
  <div class="mobile-footer" :class="{ 'd-sm-none': isFooter_show }">
    <ul class="mobile-footer-menu">
      <li>
        <router-link to="/productsView">
          <i class="bi bi-shop"></i>
          <span>商店</span>
        </router-link>
      </li>
      <li>
        <router-link to="/userChallenges">
          <i class="bi bi-flag"></i>
          <span>挑戰</span>
        </router-link>
      </li>
      <li></li>
      <li>
        <router-link to="/localStorage">
          <i class="bi bi-suit-heart"></i>
          <span>收藏</span>
        </router-link>
      </li>
      <li>
        <router-link to="/cartView">
          <i class="bi bi-bag"></i>
          <span>訂單</span>
        </router-link>
      </li>
      <li>
        <router-link to="/trueusLogin">
          <i class="bi bi-person"></i>
          <span>登入</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cart: [],
      isFooter_show: false,
    };
  },
  methods: {
    getCart() {
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          this.cart = res.data.data.carts;
        })
        .catch((err) => {
          console.dir(err);
        });
    },
  },
  computed: {
    cartLen() {
      const temp = 0;
      const len = this.cart.reduce((pre, current) => pre + current.qty, temp);
      return len;
    },
  },
  watch: {
    $route(to) {
      if (
        // eslint-disable-next-line operator-linebreak
        to.fullPath.indexOf('/cartView') !== -1 &&
        to.fullPath.indexOf('/orderCheck') === -1
      ) {
        this.isFooter_show = true;
      } else {
        this.isFooter_show = false;
      }
    },
  },
  mounted() {
    this.getCart();
    this.$emitter.on('updateCart', (data) => {
      this.cart = data.carts;
    });
    if (
      // eslint-disable-next-line operator-linebreak
      this.$route.fullPath.indexOf('/cart') !== -1 &&
      this.$route.fullPath.indexOf('/cart/payment3') === -1
    ) {
      this.isFooter_show = true;
    } else {
      this.isFooter_show = false;
    }
  },
  unmounted() {
    this.$emitter.off('updateCart');
  },
};
</script>

<style lang="scss">
.mobile-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #f5f5f5;
  display: none;
  z-index: 1000;
  height: 80px;
  &-menu {
    display: flex;
    li {
      flex: 0 0 20%;
      padding: 8px;
      text-align: center;
      img {
        display: block;
        margin: 0 auto;
      }
      span {
        display: block;
        padding-top: 4px;
        white-space: nowrap;
      }
    }
  }
  // @include pad {
  //   display: flex;
  //   flex-direction: column;
  //   justify-content: center;
  // }
  // .cart-amount {
  //   position: absolute;
  //   height: 24px;
  //   width: 24px;
  //   border-radius: 50%;
  //   line-height: 24px;
  //   text-align: center;
  //   background-color: $secondary;
  //   color: white;
  //   top: 6px;
  //   left: 65%;
  //   transform: translate(-50%, -50%);
  //   @include mobile {
  //     left: 80%;
  //   }
  // }
}
</style>
