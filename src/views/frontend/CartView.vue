<template>
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
            <th>刪除鍵</th>
            <th class="d-none d-lg-block">預覽圖</th>
            <th>品名</th>
            <th>數量/單位</th>
            <th class="d-none d-lg-block">單價/總價</th>
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
                style="
                  height: 100px;
                  width: 300px;
                  background-size: cover;
                  background-position: center;
                "
                :style="{ backgroundImage: `url(${item.product.imageUrl})` }"
              ></div>
            </td>
            <td class="fw-bolder text-decoration-underline">
              {{ item.product.title }}
              <!-- <div class="text-success">已套用優惠券</div> -->
            </td>
            <td>
              <div class="input-group input-group-sm">
                <div class="input-group mb-3">
                  <select
                    id=""
                    class="form-select"
                    v-model="item.qty"
                    @change="updateCartItem(item)"
                    :disabled="isLoadingItem === item.id"
                  >
                    <option
                      :value="num"
                      v-for="num in 20"
                      :key="`${num}-${item.id}`"
                    >
                      {{ num }}
                    </option>
                  </select>
                  <span class="input-group-text" id="basic-addon2">{{
                    item.product.unit
                  }}</span>
                </div>
              </div>
            </td>
            <td class="d-none d-lg-table-cell">
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
            <td></td>
            <td colspan="3" class="text-end">總計</td>
            <td class="text-end">{{ cartData.total }}元</td>
          </tr>
          <!-- <tr>
              <td></td>
              <td colspan="3" class="text-end text-success">折扣價</td>
              <td class="text-end text-success">{{ }}</td>
            </tr> -->
        </tfoot>
      </table>
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
</template>

<script>
import cartMessage from '@/components/cartMessage.vue';

export default {
  data() {
    return {
      // 購物車列表
      cartData: {
        carts: [],
      },
      products: [],
      productId: '',
      isLoadingItem: '',
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
          console.log(res);
          this.cartData = res.data.data;
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
      // this.$http
      //   .delete(
      //     `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`,
      //   )
      //   .then(() => {
      //     // 取得購物車的資料
      //     this.getCart();
      //   });
      this.isLoadingItem = '';
    },
    removeCartAll() {
      this.isLoadingItem = 'deleteAll';
      this.$refs.cartMessage.openModal(false, '', true);
      // this.$http
      //   .delete(
      //     `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`,
      //   )
      //   .then(() => {
      //     this.getCart();
      //   });
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
    nextPage() {
      this.$router.push('/userContact');
    },
  },
  mounted() {
    this.getCart();
  },
};
</script>
