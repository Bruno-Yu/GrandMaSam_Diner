<template>
  <PageLoading
    loader="bars"
    :active="isLoading"
    :can-cancel="true"
    :is-full-page="false"
  ></PageLoading>
  <div class="container-fluid bg-warning vh-90 my-1 mt-4">
    <div
      class="row row-cols-1 row-cols-lg-2 d-flex align-items-center justify-content-center"
    >
      <div class="col col-lg-5">
        <div class="my-2 ratio ratio-1x1">
          <div class="aidsHelp" />
        </div>
      </div>
      <div
        class="col col-lg-5 me-lg-5 header-content shadow p-4 mb-5 mt-2 bg-warning rounded"
      >
        <h3 class="my-3 text-light font-Noto fw-600">很遺憾地聽到這消息</h3>
        <p class="fw-bold">
          但莫擔心莫害怕，我們政府衛生福利部疾病管理署早就立定了維護罹患愛滋朋友的相關權益，若有您有遭受以下行為皆能申訴，以下是節錄部分:
        </p>
        <ol>
          <li>
            如果感染者所遭受的
            歧視行為產生的結果具有行政處分性質，例如：基於感染者身分所為之教師免職處分、學生退學處分等
          </li>
          <li>如果感染者勞工因就業歧視或相關不公平待遇導致遭雇主違法解僱</li>
        </ol>
        <p class="fw-bold">感染者可尋求之相關資源</p>
        <ol>
          <li>
            感染者權益保障團體：中華民國愛滋感染者權益促進會、社團
            法人台灣露德協會等相關民間團體，提供感染者申訴案件之協助。
          </li>
          <li>
            法律諮詢資源：各縣市政府免費法律諮詢服務、區公所調解
            委員會法律諮詢服務，另相關民間公益團體，如：財團法人
            法律扶助基金會等亦有提供免費諮詢服務。
          </li>
        </ol>
        <p class="fw-bold">
          看完以上節錄的內容若覺得有所幫助，但需要更詳盡的說明的畫，可以到以下連結參考出處原文
        </p>
        <p class="fs-5 fw-bold text-light">出自: 衛生福利部疾病管制署</p>
        <ul>
          <li class="text-nowrap">
            <a
              href="https://www.cdc.gov.tw/Category/MPage/Zz9yglWGHewdUrqnozQcFQ"
              class="link-dark fw-bold"
              >重要指引與教材</a
            >
          </li>
          <li class="text-nowrap">
            <a
              href="https://www.cdc.gov.tw/File/Get/jfHiRTv3GAi8ocWYY0qFhA"
              class="link-dark fw-bold"
              >感染者權益保障 PDF</a
            >
          </li>
        </ul>
        <p class="fs-5 fw-bold">
          看到這麼用心的台灣主管機關所編撰的內容，是否有讓您回心轉意，要回到商店怒買一波以表達您的愛國心呢?
          <RouterLink to="/productsView" class="link-danger fw-bold"
            >回商店連結</RouterLink
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    backToStore() {
      this.isLoading = true;
      this.$router.push('/productsView');
      this.isLoading = false;
    },
  },
};
</script>
