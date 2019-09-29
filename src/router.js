import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/stock',
      meta: {
        title: 'Stock',
      },
      name: 'Stock',
      // route level code-splitting
      // this generates a separate chunk (read.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "read" */ './views/Stock.vue')
    },
    {
      path: '/',
      meta: {
        title: 'Crafty Burgers',
      },
      name: 'Welcome',
      // route level code-splitting
      // this generates a separate chunk (read.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "read" */ './views/Welcome.vue')
    },
    {
      path: '/MainMenu',
      meta: {
        title: 'MainMenu',
      },
      name: 'MainMenu',
      // route level code-splitting
      // this generates a separate chunk (read.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "read" */ './views/MainMenu.vue')
    },
    {
      path: '/payment',
      meta: {
        title: 'Payment',
      },
      name: 'payment',
      // route level code-splitting
      // this generates a separate chunk (read.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "read" */ './views/Payment.vue')
    },
    {
      path: '/PremadeBurgers',
      meta: {
        title: 'PremadeBurgers',
      },
      name: 'PremadeBurgers',
      component: () => import(/* webpackChunkName: "read" */ './views/PremadeBurgers.vue')
    },
    {
      path: '/Drinks',
      meta: {
        title: 'Drinks',
      },
      name: 'Drinks',
      component: () => import(/* webpackChunkName: "read" */ './views/Drinks.vue')
    },
    {
      path: '/Sides',
      meta: {
        title: 'Sides',
      },
      name: 'Sides',
      component: () => import(/* webpackChunkName: "read" */ './views/Sides.vue')
    },
    {
      path: '/Cart',
      meta: {
        title: 'Cart',
      },
      name: 'Cart',
      component: () => import(/* webpackChunkName: "read" */ './views/Cart.vue')
    },
    {
      path: '/Popup', //Confirm Item 
      meta: {
        title: 'Popup',
      },
      name: 'Popup',
      component: () => import(/* webpackChunkName: "read" */ './views/Popup.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router;
