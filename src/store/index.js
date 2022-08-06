import { createStore } from "vuex";
import user from "@/store/module/user"; // 引入业务模块下的用户模块
import common from "@/store/common/menu"; // 引入公共模块下的菜单模块

export default createStore({
  modules: {
    user,
    common
  },
});
