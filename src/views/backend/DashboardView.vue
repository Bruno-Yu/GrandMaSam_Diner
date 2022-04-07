<template>
  <div class="container-fluid w-100" style="box-sizing: border-box">
    <BackNavbar />
    <RouterView />
    <FrontFooter />
  </div>
</template>

<script>
import BackNavbar from '@/components/BackNavbar.vue';
import FrontFooter from '@/components/FrontFooter.vue';

export default {
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
          }
        })
        .catch((error) => {
          alert(error.response, '錯誤訊息');
        });
    },
  },
  created() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1',
    );
    this.$http.defaults.headers.common.Authorization = `${token}`;
    this.$http
      .post(`${process.env.VUE_APP_API}/api/user/check`)
      .then(() => {})
      .catch(() => {
        this.$router.push('/trueusLogin');
      });
  },
};
</script>
