import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/new_home.vue'),
    },
    {
      path: '/member_center',
      component: () => import('@/views/member_center.vue'),
     },
    {
      path: '/member_center/track',
      component: () => import('@/views/member_track.vue'),
    },
    {
      path: '/member_center/customer_feedback',
      component: () => import('@/views/member_feedback.vue'),
    },
    {
      path: '/member_center/member_data',
      component: () => import('@/views/member_data.vue'),
    },
    {
      path: '/member_center/member_data_update',
      component: () => import('@/views/member_data_update.vue'),
    },
    {
      path: '/member_center/member_reset_password',
      component: () => import('@/views/member_reset_password.vue'),
    },
    {
      path: "/product",
      component: () => import("@/views/product_page.vue"),
    },
    {
      path: "/iphoneIndex",
      component: () => import("@/views/iphone_page.vue"),
    },
    {
      path: "/login",
      component: () => import("@/views/LoginPage.vue"),
    },
    {
      path: "/register",
      component: () => import("@/views/RegisterPage.vue"),
    },
    {
      path: "/forget",
      component: () => import("@/views/ForgetPassword.vue"),
    },
    {
      path: "/OLoginSuccess",
      component: () => import("@/views/Oath2LoginSuccess.vue"),
    },
    {
      path: "/cart",
      component: () => import("@/views/Cart.vue"),
    },
    {
      path: "/checkout/paypal",
      component: () => import("@/views/payment/Paypal.vue"),
      name: "paypal",
    },
    {
      path: "/checkout/linepay",
      component: () => import("@/views/payment/Linepay.vue"),
    },
    {
      path: "/checkout/stripe",
      component: () => import("@/views/payment/Stripe.vue"),
    },
    ]
});


export default router
