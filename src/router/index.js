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
      // children: [
      //   {
      //     path: '/', // 空路徑表示默認頁面，例如/member
      //     component: () => import('@/views/member_center.vue'),
      //   },
      //   {
      //     path: 'track',
      //     component: () => import('@/views/member_track.vue'),
      //   },
      //   {
      //     path: 'customer_feedback',
      //     component: () => import('@/views/member_feedback.vue'),
      //   },
      //   // 其他子路由...
      // ]
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
    }
    ]
})

export default router
