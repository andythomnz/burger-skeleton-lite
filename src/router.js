import Vue from 'vue'
import Router from 'vue-router'
import Ordering from './views/Ordering.vue'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/Ordering',
      meta: {
        title: 'Ordering',
      },
      name: 'ordering',
      component: Ordering
    },
    {
      path: '/kitchen',
      meta: {
        title: 'Kitchen',
      },
      name: 'kitchen',
      // route level code-splitting
      // this generates a separate chunk (read.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "read" */ './views/Kitchen.vue')
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
      path: '/Ordering',
      meta: {
        title: 'Ordering',
      },
      name: 'Ordering',
      component: () => import(/* webpackChunkName: "read" */ './views/Ordering.vue')
    },
    {
      path: '/BurgerMenu',
      meta: {
        title: 'BurgerMenu',
      },
      name: 'BurgerMenu',
      component: () => import(/* webpackChunkName: "read" */ './views/BurgerMenu.vue')
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
      path: '/Popup',
      meta: {
        title: 'Popup',
      },
      name: 'Popup',
      component: () => import(/* webpackChunkName: "read" */ './views/Popup.vue')
    },
    {
      path: '/PremadeBurgers',
      meta: {
        title: 'PremadeBurgers',
      },
      name: 'PremadeBurgers',
      component: () => import(/* webpackChunkName: "read" */ './views/PremadeBurgers.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router;
