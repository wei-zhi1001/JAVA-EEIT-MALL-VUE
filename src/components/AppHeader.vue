<template>
  <!-- navbar-->
  <header class="header bg-white">
    <div class="container px-lg-3">
      <nav class="navbar navbar-expand-lg navbar-light py-3 px-lg-0"><a class="navbar-brand" href="index.html"><span class="fw-bold text-uppercase text-dark">Boutique</span></a>
        <button class="navbar-toggler navbar-toggler-end" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <router-link to="/" class="nav-link active">首頁</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/product" class="nav-link active">商場</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/member_center" class="nav-link active">會員中心</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/cart" class="nav-link active">購物車</router-link>
            </li>
            <li class="nav-item dropdown"><a class="nav-link dropdown-toggle" id="pagesDropdown" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Pages</a>
              <div class="dropdown-menu mt-3 shadow-sm" aria-labelledby="pagesDropdown"><a class="dropdown-item border-0 transition-link" href="index.html">Homepage</a><a class="dropdown-item border-0 transition-link" href="shop.html">Category</a><a class="dropdown-item border-0 transition-link" href="detail.html">Product detail</a><a class="dropdown-item border-0 transition-link" href="cart.html">Shopping cart</a><a class="dropdown-item border-0 transition-link" href="checkout.html">Checkout</a></div>
            </li>
          </ul>
          <ul class="navbar-nav ms-auto">
            <li class="nav-item"><a class="nav-link" href="/cart"> <i class="fas fa-dolly-flatbed me-1 text-gray"></i>Cart<small class="text-gray fw-normal">(2)</small></a></li>
            <li class="nav-item"><a class="nav-link" href="#!"> <i class="far fa-heart me-1"></i><small class="text-gray fw-normal"> (0)</small></a></li>
            <li class="nav-item"><a class="nav-link" href="#!"> <i class="fas fa-user me-1 text-gray fw-normal"></i>Login</a></li>
          </ul>

          <div class="text-end">
            <router-link to="/login" class="text-decoration-none">
              <button
                  type="button"
                  class="btn btn-outline-light me-2"
                  v-if="!isLoggedIn">
                登入
              </button>
            </router-link>
            <template v-if="isLoggedIn">
              <router-link to="/profile" class="text-decoration-none">
                <button type="button" class="btn btn-warning">
                  {{ name }}
                </button></router-link>
              <img :src="photo" width="8%" class="mx-2" />

              <button type="button" class="btn btn-outline-light" @click="logout">
                登出
              </button>
            </template>
          </div>
        </div>
      </nav>
    </div>
  </header>

</template>
<script>
import { useUserStore } from "@/stores/userStore";
import axios from "axios";
import { mapState } from 'vuex';
export default {
  methods: {
    logout() {
      console.log("logout");
      axios
          .get(`${this.API_URL}/user/logout`)
          .then((rs) => {
            const userStore = useUserStore();
            userStore.logout();
            this.$router.push("/");
          })
          .catch((error) => {
            console.log("登出失敗", error);
          });
    },
  },
  computed: {
    ...mapState(['cartItemCount']),
    name() {
      const userStore = useUserStore();
      return userStore.userName;
    },
    id() {
      const userStore = useUserStore();
      return userStore.userId;
    },
    // photo() {
    //   const userStore = useUserStore();
    //   return userStore.userPhoto;
    // },
    isLoggedIn() {
      return useUserStore().isLoggedIn;
    },
  },
};
</script>
<style></style>
