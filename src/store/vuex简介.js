import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// vuex声明变量
//  -声明：在state里
//  -取出：$store.state.属性名

// vuex修改数据
// -自产自销
// -mutations：函数 函数命名采用大驼峰
// -mutations里的函数的参数
// 1.state: 数据 2.payload:载荷，触发mutations的参数
// 触发mutations的方法
// this.$store.commit('mutations方法名字')
// getters-->相当于computed计算属性
// getters的函数第一个参数state
export default new Vuex.Store({
  state: {
    count: 0
  },
  getters: {
    bigNum(state) {
      return state.count * 10
    }
  },
  mutations: {
    SET_COUNT(state, payload) {
      state.count += payload
    }
  }
})
