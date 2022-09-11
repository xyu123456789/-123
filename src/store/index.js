import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

// 封装本地存储,vuex-persistedstats
// vuex-persistedstats-->持久化state
// 1.下载  -yarn add vuex-persistedstate@3.2.1
// 2.引入  -import createPersistedState from 'vuex-persistedstate'
// 3.调用  -plugins:[createPersistedState()]
// 配置项
// key：默认值是vuex 想修改传入key
// storage：存储的方式 默认值是本地存储
// reducer：指定持久化哪些数据，函数。return出来一个对象，对象就作为存储的value

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: 'HEIMA_TOUTIAO',
      // storage: window.sessionStorage,
      reducer({ tokenObj }) {
        console.log(tokenObj)
        return { tokenObj }
      }
    })
  ],
  state: {
    // tokenObj: JSON.parse(Window.localStorage.get('HEIMATOUTIAO_TOKEN')) || {}
    tokenObj: {}
  },
  getters: {
    isLogin(state) {
      return !!state.tokenObj.token
    }
  },
  mutations: {
    SET_TOKEN(state, token) {
      // 将token存在vuex
      state.tokenObj = token
      // token持久保存
      // window.localStorage.setItem('HEIMATOUTIAO_TOKEN', JSON.stringify(token))
    }
  }
})
