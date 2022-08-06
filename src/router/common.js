
import Layout from "@/layout/index.vue";
import Home from "@/pages/home/index.vue";

export const commonRoutes = [
  {
    path: "/login",
    name: "登录",
    component: () => import("@/pages/login/index.vue"),
  },
  {
    path: "/",
    name: "home",
    component: Layout,
    meta: {
      title: '运营中心'
    },
    redirect: "/home",
    children: [
      {
        path: "home",
        name: "Home-Index",
        meta: {
          title: '控制台'
        },
        component: () => Home,
      }
    ],
  },
  {
    path: '/404',
    name: '404',
    component: Layout,
    meta: {
      title: 'Error'
    },
    children: [
      {
        path: "",
        name: "404page",
        meta: {
          title: '404'
        },
        component: () => import('@/pages/common/404.vue')
      }
    ],

  },
  {
      path: '/:pathMatch(.*)',
      redirect: '/404'
  }
];
