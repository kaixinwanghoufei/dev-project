import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 导出一个新的路由实例
export default new Router({
  // 路由配置
  routes: [
    // 重定向 '/' 到 'loginc'
    {
      path: '/',
      redirect: 'loginc',
    },
    // 登录页面，路径为 '/loginb'
    {
      path: '/loginb',
      name: 'loginb',
      component: () => import('@/views/b/login.vue'),
    },
    // 主页，路径为 '/indexb'，重定向到 '/categoryb'
    {
      path: '/indexb',
      name: 'indexb',
      component: () => import('@/views/b/index.vue'),
      redirect: '/categoryb',
      children: [
        // 分类页面，路径为 '/categoryb'
        {
          path: '/categoryb',
          name: 'categoryb',
          component: () => import('@/views/b/category.vue'),
        },
        // 产品页面，路径为 '/productb'
        {
          path: '/productb',
          name: 'productb',
          component: () => import('@/views/b/product.vue'),
        },
        // 账单页面，路径为 '/billb'
        {
          path: '/billb',
          name: 'billb',
          component: () => import('@/views/b/bill.vue'),
        }
      ]
    },
    // 登录页面，路径为 '/loginc'
    {
      path: '/loginc',
      name: 'loginc',
      component: () => import('@/views/c/login.vue'),
    },
    // 主页，路径为 '/indexc'，重定向到 '/bestsellproductc'
    {
      path: '/indexc',
      name: 'indexc',
      component: () => import('@/views/c/index.vue'),
      redirect: '/bestsellproductc',
      children: [
        // 最佳销售产品页面，路径为 '/bestsellproductc'
        {
          path: '/bestsellproductc',
          name: 'bestsellproductc',
          component: () => import('@/views/c/bestsellproduct.vue'),
        },
        // 所有产品页面，路径为 '/productc'
        {
          path: '/productc',
          name: 'productc',
          component: () => import('@/views/c/allproduct.vue'),
        },
        // 购物车页面，路径为 '/basketc'
        {
          path: '/basketc',
          name: 'basketc',
          component: () => import('@/views/c/basket.vue'),
        },
        // 联系我们页面，路径为 '/contactc'
        {
          path: '/contactc',
          name: 'contactc',
          component: () => import('@/views/c/contact.vue'),
        }
      ]
    },
  ]
})
