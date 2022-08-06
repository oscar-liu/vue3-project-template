import NProgress from 'nprogress' // Progress 进度条
import router from './router'
import 'nprogress/nprogress.css'
import { ElMessageBox } from "element-plus";
const whiteList = ['/login'] // 不重定向白名单


router.beforeEach((to, from, next) => {
  NProgress.start()
  let userinfo = localStorage.getItem('USERINFO');
  // 白名单不校验是否有权限
  if ( whiteList.includes(to.path) ) {
    next()
  } else {
    if (userinfo) {
      next();
    } else {
      ElMessageBox.alert('非法访问，请返回登录', 'Error', {
        confirmButtonText: '确定',
        center: true,
        callback: () => {
            next({
              path: '/login'
            });
        },
      })

    }
  }
});

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
