import { getUser } from '@/api/demo'
export default {
  namespaced: true,
  state: {
    user: JSON.parse(localStorage.getItem('USERINFO')) || {} , // 用户数据
  },
  mutations: {
    // 修改用户信息
    changeUser(state, data) {
      localStorage.setItem('USERINFO', JSON.stringify(data))
      state.user  = data
    },
    // 退出清空缓存数据
    exitUser() {
      localStorage.clear()
    }
  },
  actions: {
    // 获取用户信息
    login({ commit }, params) {
      return new Promise((resolve, reject) => {
        getUser(params).then(res => {
          // 更新用户资料
          commit('changeUser', res)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 用户退出
    userLogout({ commit }) {
      return new Promise((resolve, reject) => {
        // 根据业务需要，是否通知服务端，清空token有效期
        commit('exitUser')
        resolve({})
      })
    }
  },
  getters: {},
  modules: {},
};
