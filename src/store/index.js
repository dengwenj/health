import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from 'utils/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 保存用户登录的数据
    user: getItem('user'),
  },
  mutations: {
    setUser(state, data) {
      // 这里引入 本地存储 仅仅是为了数据持久化 防止 页面刷新 数据丢失
      setItem('user', data)
      state.user = getItem('user')
    },
  },
  actions: {},
  modules: {},
})
