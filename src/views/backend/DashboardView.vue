<template>
  <PageLoading
    loader="bars"
    :active="isLoading"
    :can-cancel="true"
    :is-full-page="false"
  ></PageLoading>
  <div class="container-fluid w-100" style="box-sizing: border-box">
    <BackNavbar />
    <RouterView v-if="verify" />
    <FrontFooter />
  </div>
</template>

<script>
import BackNavbar from '@/components/BackNavbar.vue';
import FrontFooter from '@/components/FrontFooter.vue';

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
  },
  methods: {
    logout() {
      const api = `${process.env.VUE_APP_API}/logout`;
      this.$http
        .post(api)
        .then((response) => {
          alert(response, '登出');
          if (response.data.success) {
            this.$router.push('/trueusLogin');
            this.verify = false;
          }
        })
        .catch((error) => {
          alert(error.response, '錯誤訊息');
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
      .then(() => {
        this.isLoading = false;
        this.verify = true;
      })
      .catch(() => {
        this.$router.push('/trueusLogin');
        this.isLoading = false;
      });
  },
};
</script>
