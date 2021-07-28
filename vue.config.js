module.exports = {
  configureWebpack: {
    // 给路径取别名
    resolve: {
      alias: {
        assets: '@/assets',
        components: '@/components',
        router: '@/router',
        views: '@/views',
        store: '@/store',
        api: '@/api',
        utils: '@/utils',
      },
    },
  },
  // 解决跨域
  devServer: {
    // port: '8080', // 设置端口号
    proxy: {
      '/api': {
        target: 'http://139.196.94.15:8085', //API服务器的地址
        ws: true, //代理websockets
        changeOrigin: true, // 是否跨域，虚拟的站点需要更管origin
        pathRewrite: {
          // '^/api'是一个正则表达式，表示要匹配请求的url中，全部'http://localhost:8081/api' 转接为 http://localhost:8081/
          '^/api': '',
        },
      },
    },
  },
}
