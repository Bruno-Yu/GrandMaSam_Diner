<template>
  <PageLoading
    loader="bars"
    :active="isLoading"
    :can-cancel="true"
    :is-full-page="false"
  ></PageLoading>
  <div class="container-fluid w-100" style="box-sizing: border-box">
    <BackNavbar />
    <ToastMessages></ToastMessages>
    <div class="container">
      <RouterView v-if="verify" />
    </div>
    <FrontFooter />
  </div>
</template>

<script>
import BackNavbar from '@/components/BackNavbar.vue';
import FrontFooter from '@/components/FrontFooter.vue';
import '@/libs/emitter';
import ToastMessages from '@/components/ToastMessages.vue';

export default {
  data() {
    return {
      isLoading: false,
      verify: false,
    };
  },
  components: {
    BackNavbar,
    FrontFooter,
    ToastMessages,
  },
  methods: {
    logout() {
      const api = `${process.env.VUE_APP_API}/logout`;
      this.$http
        .post(api)
        .then((response) => {
          this.$httpMessageState(response, '登出');
          if (response.data.success) {
            this.$router.push('/trueusLogin');
            this.verify = false;
          }
        })
        .catch((error) => {
          this.$httpMessageState(error.response, '錯誤訊息');
          this.verify = false;
        });
    },
  },
  created() {
    this.isLoading = true;
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1',
    );
    this.$http.defaults.headers.common.Authorization = `${token}`;
    this.$http
      .post(`${process.env.VUE_APP_API}/api/user/check`)
      .then((response) => {
        this.$httpMessageState(response, '登入');
        this.verify = true;
        this.isLoading = false;
      })
      .catch(() => {
        this.$router.push('/trueusLogin');
        this.isLoading = false;
      });
  },
};
</script>
