// vant
// 引入vant报错   npm i vant -D
// 把vant导入所有组件代码放入main.js    import必须在上面
// 把按钮组件放入App.vue

// Rem适配
// 1. npm i amfe-flexible
// 2. 在main.js中  import 'amfe-flexible        分为10份
// 将px转为rem
// 1. npm i postcss-pxtorem -D
// 2. 在项根目录中创建.postcssrc.js文件   内容文vantRem布局适配网页提供的代码
// 重启服务器生效      报错  npm i postcss-pxtorem@5.1.1 
// 根据不同情况下的适配方案在.postcssrc.js中设置
/* rootValue ({file}) {
    return file.indexOf('vant') !== -1 ? 37.5 : 75
}, */

// 封装请求模块
// npm i axios
// 在utiles中创建request.js  里面导入和设置接口和导出的基准路径
