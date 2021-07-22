module.exports = {
  configureWebpack: {
    // 给路径取别名
    resolve: {
      alias: {
        'assets': '@/assets',
        'components': '@/components',
        'router': '@/router',
        'views': '@/views',
        'store': '@/store',
        'api': '@/api',
        'utils': '@/utils',
      }
    }
  }
}