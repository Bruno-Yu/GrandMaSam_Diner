<template>
<PageLoading
  loader="bars"
  :active="isLoading"
  :can-cancel="true"
  :is-full-page="false"
></PageLoading>

  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <RouterLink class="text-muted fw-bold" to="/user/articles"
            >公告列表</RouterLink
          >
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          {{ article.title }}
        </li>
      </ol>
    </nav>
    <div class="row justify-content-center mb-4">
      <article class="col-12 col-lg-8">
        <h2 class="display-3 fw-bold text-center">{{ article.title }}</h2>
        <p class="text-end mt-5 mb-3">
          <i>
            <small class="text-muted">{{ article.create_at }}</small> -
            <small class="text-muted">作者：{{ article.author }}</small></i
          >
        </p>
        <img
          v-if="id == '-N-tl8D5WkaIJ1frNRRB'"
          src="@/assets/images/Godsman.jpg"
          alt="GodsMan"
          class="img-fluid mb-5 border border-5 border-dark"
        />
        <img
          v-if="id == '-N-qk3J_UqL6i1RH6BRz'"
          src="@/assets/images/Brush.jpg"
          alt="Brush"
          class="img-fluid mb-5 border border-5 border-dark"
        />
        <img
          v-if="id == '-N-qjhkvfCqcb-6Mx1G-'"
          src="@/assets/images/Egg.jpg"
          alt="Egg"
          class="img-fluid mb-5 border border-5 border-dark"
        />
        <img
          v-if="id == '-N-qjTKf-jAcAT4ND249'"
          src="@/assets/images/TombSweeping.jpg"
          alt="TombSweeping"
          class="img-fluid mb-5 border border-5 border-dark"
        />
        <img
          v-if="id == '-N-qjOg2fvc8GOSgmkrN'"
          src="@/assets/images/Wallet.jpg"
          alt="Wallet"
          class="img-fluid mb-5 border border-5 border-dark"
        />
        <img
          v-if="id == '-N-qjALHXwnpNgIrpokr'"
          src="@/assets/images/MoneyIsTheProblem.jpg"
          alt="MoneyIsTheProblem"
          class="img-fluid mb-5 border border-5 border-dark"
        />
        <blockquote class="blockquote">
          <p
            class="fs-4 fw-bolder mb-4 text-decoration-underline"
            v-html="article.description"
          ></p>
        </blockquote>
        <div class="fs-5 lh-lg mb-5" v-html="article.content" />
        <br />
        <br />
        <br />
        <br />
        <br />
      </article>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      article: {},
      id: '',
    };
  },
  methods: {
    dateTimeFormat(item) {
      const date = new Date(item * 1000);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const dateFull = `${year}/${month}/${day}`;
      return dateFull;
    },
    getArticle() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/article/${this.id}`;
      this.isLoading = true;
      this.$http
        .get(api)
        .then((response) => {
          this.article = response.data.article;
          this.article.create_at = this.dateTimeFormat(this.article.create_at);
          this.isLoading = false;
        })

        .catch((error) => {
          this.isLoading = false;
          this.$frontHttpMessageState(error.response, '公告截取失敗');
        });
    },
  },
  created() {
    this.id = this.$route.params.articleId;
    this.getArticle();
  },
};
</script>
