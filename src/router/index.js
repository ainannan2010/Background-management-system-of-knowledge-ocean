import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: () => import('@views/layout/Home/Home.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    redirect: '/index',
    meta: { title: '首页' },
    component: () => import('@views/layout/Home/Home.vue'),
    children: [
      {
        path: '/index',
        name: 'index',
        component: () => import('@views/layout/Index/index.vue'),
      },
      {
        path: '/sts',
        name: 'sts',
        meta: { title: '数据统计' },
        component: () => import('@views/layout/DataStatus/index.vue'),
      },
      {
        path: '/mmt',
        name: 'mmt',
        redirect: '/mmt/index',
        meta: { title: '信息管理' },
        component: () => import('@views/layout/Message/index.vue'),
        children: [
          {
            path: '/mmt/index',
            name: 'list',
            meta: { title: '列表展示' },
            component: () => import('@views/layout/Message/ListShow/index.vue'),
          },
          {
            path: '/mmt/user',
            name: 'user',
            meta: { title: '用户统计' },
            component: () => import('@views/layout/Message/Usersts/index.vue'),
          },
        ]
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@views/Login.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
