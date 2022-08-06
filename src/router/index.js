import {
  createRouter,
  createWebHashHistory,
} from 'vue-router'

import { commonRoutes } from "./common"; // 公共路由
// import { imageRoutes } from "./image/index"; // 业务模块

const routes = [
  ...commonRoutes,
  // ...imageRoutes
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})


export default router