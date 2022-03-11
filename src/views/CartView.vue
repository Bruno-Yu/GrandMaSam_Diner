<template>
  <div class="container">
    <div class="mt-4">
      <!-- 購物車列表 -->
      <!-- 做購物車的技巧: 由於是先 加入購物車 購物車內才有會有內容 ，可用{{cartData}}來作為反饋確認 -->
      <!-- 清空購物車按鈕 -->
      <div class="text-end">
        <button
          class="btn btn-outline-danger"
          type="button"
          @click="removeCartAll"
          :disabled="isLoadingItem === 'deleteAll' || cartData.carts.length === 0"
        >
          <span class="spinner-grow spinner-grow-sm" v-show="isLoadingItem === 'deleteAll'"></span
          >清空購物車
        </button>
      </div>
      <!-- 以上是清空購物車按鈕 -->
      <!-- 下方為驗證程式碼資料，方便使用，用後須刪除 -->
      <table class="table align-middle">
        <thead>
          <tr>
            <th></th>
            <th>預覽圖</th>
            <th>品名</th>
            <th style="width: 150px">數量/單位</th>
            <th class="text-end">單價/總價</th>
          </tr>
        </thead>
        <tbody>
          <!-- 購物車資料有沒有存在 -->
          <div v-if="cartData.carts">
            <!-- 使用v-for將購物車中的產品列表列出 -->
            <!-- 注意:產品資訊是包在carts陣列內部物件的product屬性中 -->
            <tr v-for="item in cartData.carts" :key="item.product.id">
              <td>
                <!-- 刪除品項 -->
                <!-- 注意: 刪除要刪除到資料庫 -->
                <!-- 對應remobdeCartItem方法 -->
                <!-- 加入loading效果 -->
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
              <td>
                <div
                  style="height: 100px; background-size: cover; background-position: center"
                  :style="{ backgroundImage: `url(${item.product.imageUrl})` }"
                ></div>
              </td>
              <td class="fw-bolder text-decoration-underline">
                {{ item.product.title }}
                <!-- <div class="text-success">已套用優惠券</div> -->
              </td>
              <td>
                <!-- 使用BS的input-group 將其群組化 -->
                <div class="input-group input-group-sm">
                  <div class="input-group mb-3">
                    <!-- 數量 -->
                    <!-- 注意: 要確保存數字，input標籤部分 要加type="number" -->
                    <!-- 問題:會有bug比如可以填入負值、英文數字e...等 -->
                    <!-- <input min="1" type="number" class="form-control"
                          v-model="item.qty"/> -->
                    <!-- 加入BS的樣式 class="form-select"下拉數字選單 -->
                    <!-- v-modal綁定物品數量 -->
                    <!-- 使用change方法，若數量改變，立即觸發updateCartItem方法，立即將修改對應數量 進行資料庫api回傳 -->
                    <select
                      id=""
                      class="form-select"
                      v-model="item.qty"
                      @change="updateCartItem(item)"
                      :disabled="isLoadingItem === item.id"
                    >
                      <!-- 數量，使用option 以這種方法可多出1~20的選項 -->
                      <!-- 注意v-for用法:使用選項數字就會自動增減1 -->
                      <!-- 注意，數量要存到資料庫 -->
                      <!-- 注意: 這邊的value對應的num是透過v-bind變成根元件的資料屬性變數 -->
                      <option :value="num" v-for="num in 20" :key="`${num}-${item.id}`">
                        {{ num }}
                      </option>
                    </select>
                    <!-- 單位 -->
                    <span class="input-group-text" id="basic-addon2">{{ item.product.unit }}</span>
                  </div>
                </div>
              </td>
              <td class="text-end">
                <span
                  class="spinner-grow spinner-grow-sm"
                  v-show="isLoadingItem === item.id"
                ></span>
                <span class="text-secondary fz-sm">單價 {{ item.product.price }}元 /</span
                ><span class="fw-bolder"> 總價{{ item.total }}元 </span>
              </td>
            </tr>
          </div>
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
    </div>
    <!-- 訂單資訊填寫 -->
    <!-- 要加入表單驗證VeeValidate -->
    <div class="my-5 row justify-content-center">
      <v-form ref="form" class="col-md-6" v-slot="{ errors }" @submit="onSubmit">
        <div class="mb-3">
          <label for="email" class="form-label"> Email </label>
          <v-field
            id="email"
            name="email"
            type="email"
            class="form-control"
            :class="{ 'is-invalid': errors['email'] }"
            placeholder="請輸入 Email"
            rules="email|required"
            v-model="form.user.email"
          ></v-field>
          <error-message name="email" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="name" class="form-label">收件人姓名</label>
          <v-field
            id="name"
            name="姓名"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['姓名'] }"
            placeholder="請輸入姓名"
            :rules="noEmpty"
            v-model="form.user.name"
          ></v-field>
          <error-message name="姓名" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="tel" class="form-label">收件人電話</label>
          <v-field
            id="tel"
            name="電話"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['電話'] }"
            placeholder="請輸入電話"
            :rules="isPhone"
            v-model="form.user.tel"
          ></v-field>
          <error-message name="電話" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="address" class="form-label">收件人地址</label>
          <v-field
            id="address"
            name="地址"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['地址'] }"
            placeholder="請輸入地址"
            :rules="noEmpty"
            v-model="form.user.address"
          ></v-field>
          <error-message name="地址" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="message" class="form-label">留言</label>
          <textarea
            id="message"
            class="form-control"
            cols="30"
            rows="10"
            :rules="{ required: false }"
            v-model="form.message"
          ></textarea>
        </div>
        <div class="text-end">
          <button
            type="submit"
            class="btn btn-danger"
            :disabled="Object.keys(errors).length > 0 || cartData.carts.length === 0"
          >
            送出訂單
          </button>
        </div>
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 購物車列表
      cartData: {
        carts: [],
      },
      // 產品列表 (客戶購物免登入的API)
      products: [],
      productId: '',
      // 局部讀取效果對應變數
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
  methods: {
    getCart() {
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          console.log(res);
          // 將購物車資料賦值至根元件資料中
          // 購物車api回傳的response物件中有兩層data，2層data後的carts陣列，是為已加入購物車的品項內容(array)
          // carts內品項的 價格有分 total:加入優惠券前 final_total:優惠券打折後最終結帳的價格
          // 所以存取的時候是res.data.data
          this.cartData = res.data.data;
        });
    },
    // 加入購物車按鈕對應方法
    // 對應api 客戶購物-購物車(Cart) POST
    // 注意: 加入購物車需帶入兩個參數 1.id 2.數量
    // 由於購物車頁面上沒有調整數量的欄位，所以第二參數可使用參數預設值帶入
    addToCart(id, qty = 1) {
      // post cart的api資料格式
      const data = {
        product_id: id,
        qty,
      };
      // 局部讀取效果賦值對應id
      this.isLoadingItem = id;
      // axios.post 加入購物車列表
      this.$http
        .post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`, { data })
        .then(() => {
          // 重新取得購物車內容
          this.getCart();
          // 清空局部讀取效果
          this.isLoadingItem = '';
        });
    },
    // 對應購物車產品列表的 刪除品項 按鈕
    removeCartItem(id) {
      // 記得要帶入對應的item.id
      this.isLoadingItem = id;
      // 注意: 對應的api是購物車的api
      this.$http
        .delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`)
        .then(() => {
          // 取得購物車的資料
          this.getCart();
          this.isLoadingItem = '';
        });
    },
    removeCartAll() {
      this.isLoadingItem = 'deleteAll';
      this.$http
        .delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`)
        .then(() => {
          // 取得購物車的資料
          this.getCart();
          this.isLoadingItem = '';
        });
    },
    // 更新數量，使用put cart api
    // 記得直接帶入對應品項
    updateCartItem(item) {
      const data = {
        product_id: item.product.id,
        qty: item.qty,
      };
      this.isLoadingItem = item.id;
      this.$http
        .put(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`, { data })
        .then(() => {
          // 取得購物車的資料
          this.getCart();
          this.isLoadingItem = '';
        });
    },
    // 驗證 表單觸發方法
    onSubmit() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`;
      const order = this.form;
      this.$http.post(url, { data: order }).then((response) => {
        alert(response.data.message);
        this.$refs.form.resetForm();
        this.getCart();
      });
    },
    // 不得為空
    noEmpty(value) {
      return value ? true : '此欄不得為空';
    },
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : '需要正確的電話號碼';
    },
  },
  mounted() {
    // 取得購物車的資料
    this.getCart();
  },
};
</script>
