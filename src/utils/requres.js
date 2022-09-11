// 1.下载  -yarn add axios
// 2.引入  -axios
// 3.配置  -axios
import axios from 'axios'
import store from '@/store'
// 第一种 耦合性太强不利于其他页面的请求容易搞混
// axios.defaults.baseURL = 'http://toutiao.itheima.net'
// axios.defaults.timeout = 5000

// axios.create() -克隆axios
const request = axios.create({
  timeout: 5000,
  baseURL: 'http://toutiao.itheima.net'
})

// 添加请求拦截器,请求做些事情
// config是每一次请求的配置对象
request.interceptors.request.use(
  function (config) {
    // 每一次发请求都会执行
    // 在发送请求之前做些什么
    // 登陆了，所有的请求都加上Authorization
    const {
      getters: { isLogin },
      state: { tokenObj }
    } = store

    if (isLogin) {
      config.headers.Authorization = `Bearer ${tokenObj.token}`
    }

    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

export default request
