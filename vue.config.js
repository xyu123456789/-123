const { defineConfig } = require('@vue/cli-service')
const { resolve } = require('path')
const cpns = resolve(__dirname, 'src/components')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: true,
  configureWebpack: {
    devServer: {
      open: true,
      port: 8888,
      host: 'localhost'
    },
    // 路径别名
    resolve: {
      alias: {
        cpns
      }
    }
  }
})
