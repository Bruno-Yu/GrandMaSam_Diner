<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fix-top">
    <div class="container-fluid">
      <router-link class="navbar-brand fw-bold" to="">富蘭克林 餐酒館</router-link>
      <div></div>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mb-2 mb-lg-0 me-auto">
          <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" to="/">首頁</router-link>
          </li>
        </ul>
        <form class="d-flex">
          <input
            class="form-control my-2 me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-light my-2 text-nowrap" type="submit">搜尋</button>
        </form>
      </div>
    </div>
  </nav>
  <div class="container">
    <router-view />
  </div>
</template>

<style lang="scss">
@import 'bootstrap/scss/bootstrap';
</style>
