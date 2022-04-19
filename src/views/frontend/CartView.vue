<template>
  <PageLoading
    loader="bars"
    :active="isLoading"
    :can-cancel="true"
    :is-full-page="false"
  ></PageLoading>
  <cartMessage ref="cartMessage" @get-cart="getCart()"></cartMessage>
  <div class="container">
    <div class="mt-4">
      <div class="text-end">
        <button
          class="btn btn-outline-danger"
          type="button"
          @click="removeCartAll"
          :disabled="
            isLoadingItem === 'deleteAll' || cartData.carts.length === 0
          "
        >
          <span
            class="spinner-grow spinner-grow-sm"
            v-show="isLoadingItem === 'deleteAll'"
          ></span
          >清空購物車
        </button>
      </div>
      <table class="table align-middle">
        <thead>
          <tr class="text-start">
            <th>刪<span class="d-none d-lg-inline">除鍵</span></th>
            <th class="d-none d-lg-table-cell">預覽圖</th>
            <th>品名</th>
            <th>數量<span class="d-none d-lg-inline">/單位</span></th>
            <th class="d-none d-lg-table-cell text-center">單價/總價</th>
          </tr>
        </thead>
        <tbody v-if="cartData.carts">
          <tr
            v-for="item in cartData.carts"
            :key="item.product.id"
            class="text-start"
          >
            <td>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="removeCartItem(item.id)"
                :disabled="isLoadingItem === item.id"
              >
                <span
                  class="spinner-grow spinner-grow-sm"
                  v-show="isLoadingItem === item.id"
                ></span>
                x
              </button>
            </td>
            <td class="d-none d-lg-table-cell">
              <div
                class="cartView-product"
                :style="{ backgroundImage: `url(${item.product.imageUrl})` }"
              ></div>
            </td>
            <td class="fw-bolder text-decoration-underline">
              {{ item.product.title }}
              <!-- <div class="text-success">已套用優惠券</div> -->
            </td>
            <td>
              <div class="input-group input-group-sm">
                <div class="input-group mb-sm-3">
                  <select
                    id=""
                    class="form-select"
                    v-model="item.qty"
                    @change="updateCartItem(item)"
                    :disabled="isLoadingItem === item.id"
                  >
                    <span
                      class="spinner-grow spinner-grow-sm"
                      v-show="isLoadingItem === item.id"
                    ></span>
                    <option
                      :value="num"
                      v-for="num in 20"
                      :key="`${num}-${item.id}`"
                    >
                      {{ num }}
                    </option>
                  </select>
                  <span
                    class="input-group-text d-none d-lg-table-cell"
                    id="basic-addon2"
                    >{{ item.product.unit }}</span
                  >
                </div>
              </div>
            </td>
            <td class="d-none text-center d-lg-table-cell">
              <span
                class="spinner-grow spinner-grow-sm"
                v-show="isLoadingItem === item.id"
              ></span>
              <span class="text-secondary fz-sm"
                >單價 {{ item.product.price }}元 /</span
              ><span class="fw-bolder"> 總價{{ item.total }}元 </span>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td class="d-none d-lg-table-cell"></td>
            <td colspan="2" class="text-end d-lg-none">總計</td>
            <td colspan="3" class="text-end d-none d-lg-table-cell">總計</td>
            <td class="text-end">
              {{ cartData.total }}<span class="d-none d-lg-inline"> 元</span>
            </td>
          </tr>
          <!-- <tr>
            <td></td>
            <td colspan="3" class="text-end text-success fw-bold">挑戰價</td>
            <td class="text-end text-success">{{}}</td>
          </tr> -->
        </tfoot>
      </table>
      <div class="row d-flex justify-content-end">
        <div class="col-12 col-lg-4">
          <div class="input-group mb-3 input-group-sm">
            <label for="CartView_coupon"> </label>
            <input
              type="text"
              id="CartView_coupon"
              class="form-control"
              v-model="coupon_code"
              placeholder="請輸入挑戰碼"
            />
            <div class="input-group-append">
              <button
                class="btn btn-outline-secondary"
                type="button"
                @click="addCouponCode"
              >
                套用挑戰碼
              </button>
            </div>
          </div>
          <div class="text-end my-3">
            <button
              class="btn btn-danger fw-bolder"
              type="button"
              @click="nextPage"
              :disabled="
                isLoadingItem === 'deleteAll' || cartData.carts.length === 0
              "
            >
              下一步
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cartMessage from '@/components/cartMessage.vue';
import emitter from '@/libs/emitter';

export default {
  data() {
    return {
      // 購物車列表
      cartData: {
        carts: [],
      },
      products: [],
      productId: '',
      isLoading: false,
      isLoadingItem: '',
      coupon_code: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    };
  },
  components: {
    cartMessage,
  },
  methods: {
    getCart() {
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          this.cartData = res.data.data;
          emitter.emit('cart-num', this.cartData.carts.length);
        });
    },
    addToCart(id, qty = 1) {
      const data = {
        product_id: id,
        qty,
      };
      this.isLoadingItem = id;
      this.$http
        .post(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`,
          { data },
        )
        .then(() => {
          this.getCart();
          this.isLoadingItem = '';
        });
    },
    removeCartItem(id) {
      this.isLoadingItem = id;
      this.$refs.cartMessage.openModal(false, id, false);
      this.isLoadingItem = '';
    },
    removeCartAll() {
      this.isLoadingItem = 'deleteAll';
      this.$refs.cartMessage.openModal(false, '', true);
      this.isLoadingItem = '';
    },
    updateCartItem(item) {
      const data = {
        product_id: item.product.id,
        qty: item.qty,
      };
      this.isLoadingItem = item.id;
      this.$http
        .put(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`,
          { data },
        )
        .then(() => {
          this.getCart();
          this.isLoadingItem = '';
        });
    },
    addCouponCode() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/coupon`;
      const coupon = {
        code: this.coupon_code,
      };
      this.isLoading = true;
      this.$http
        .post(url, { data: coupon })
        .then((response) => {
          this.$httpMessageState(response, '加入挑戰碼');
          this.getCart();
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;
          this.$httpMessageState(error.response, '尚無該挑戰');
        });
    },
    nextPage() {
      this.isLoading = true;
      this.$router.push('/userContact');
      this.isLoading = false;
    },
  },
  created() {
    this.isLoading = true;
    this.getCart();
    this.isLoading = false;
  },
};
</script>
