import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      name: 'home',
      path: '/index',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/Home'));
        }, 'home');
      }
    },
    {
      name: 'detail', // 私有H5
      path: '/detail', // 商品ID
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/home/Detail'));
        }, 'detail');
      }
    },
    {
      name: 'categories',
      path: '/categories',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/Categories'));
        }, 'categories');
      }
    },
    {
      name: 'search',
      path: '/categories/search',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/categories/Search'));
        }, 'search');
      }
    },
    {
      name: 'cart',
      path: '/cart',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/Cart'));
        }, 'cart');
      }
    },
    {
      name: 'secure',
      path: '/cart/secure',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/cart/Secure'));
        }, 'secure');
      }
    },
    {
      name: 'addAddress',
      path: '/cart/addAddress',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/cart/AddAddress'));
        }, 'addAddress');
      }
    },
    {
      name: 'shippingAddress',
      path: '/cart/shippingAddress',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/cart/ShippingAddress'));
        }, 'shippingAddress');
      }
    },
    {
      name: 'addCard',
      path: '/cart/addCard',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/cart/AddCard'));
        }, 'addCard');
      }
    },
    {
      name: 'successful',
      path: '/cart/successful',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/cart/Successful'));
        }, 'successful');
      }
    },
    {
      name: 'failure',
      path: '/cart/failure',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/cart/Failure'));
        }, 'failure');
      }
    },
    {
      name: 'my',
      path: '/my',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/My'));
        }, 'my');
      }
    },
    {
      name: 'profile',
      path: '/my/profile',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/my/Profile'));
        }, 'my');
      }
    },
    {
      name: 'points',
      path: '/my/points',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/my/Points'));
        }, 'my');
      }
    },
    {
      name: 'coupon',
      path: '/my/coupons',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/my/Coupon'));
        }, 'my');
      }
    },
    {
      name: 'history',
      path: '/my/historyview',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/my/HistoryView'));
        }, 'my');
      }
    },
    {
      name: 'sign',
      path: '/my/sign',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/my/Sign'));
        }, 'my');
      }
    },
    {
      name: 'forgetpwd',
      path: '/my/forgetpwd',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/my/ForgetPassword'));
        }, 'my');
      }
    },
    {
      name: 'forgetSendSuccess',
      path: '/my/forgetSendSuccess',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/my/SendSuccess'));
        }, 'my');
      }
    },
    {
      name: 'finance',
      path: '/my/finance',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/my/Finance'));
        }, 'my');
      }
    },
    {
      name: 'income',
      path: '/my/income',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/my/Income'));
        }, 'my');
      }
    },
    {
      name: 'fans',
      path: '/my/fans',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/my/Fans'));
        }, 'my');
      }
    },
    {
      name: 'orderlist',
      path: '/my/orderlist',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/my/OrderList'));
        }, 'my');
      }
    },
    {
      name: 'orderDetail',
      path: '/my/orderDetail',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/my/OrderDetail'));
        }, 'my');
      }
    },
    {
      name: 'logistics',
      path: '/my/logistics',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/my/Logistics'));
        }, 'my');
      }
    },
    {
      name: 'orderDetail',
      path: '/my/orderDetail',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/my/OrderDetail'));
        }, 'my');
      }
    },
    {
      name: 'activity',
      path: '/activity',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/activity/index.vue'));
        }, 'activity');
      }
    },
    {
      name: '404',
      path: '/404',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('components/layout/404.vue'));
        }, '404');
      }
    },
    {
      path: '*',
      redirect: '/index'
    }

  ]
});

