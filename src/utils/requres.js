// 1.下载  -yarn add axios
// 2.引入  -axios
// 3.配置  -axios
import axios from 'axios'
// 第一种 耦合性太强不利于其他页面的请求容易搞混
// axios.defaults.baseURL = 'http://toutiao.itheima.net'
// axios.defaults.timeout = 5000

// axios.create() -克隆axios
const request = axios.create({
  timeout: 5000,
  baseURL: 'http://toutiao.itheima.net'
})

export default request
