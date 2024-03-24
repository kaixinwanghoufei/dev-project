// 设置要使用`import`命令加载的Vue构建版本（运行时或独立）在webpack.base.conf中设置别名。
import Vue from 'vue'//导入vue库
import App from './App'//导入组件app.vue
import router from './router'//导入vue router实例
import ElementUI from 'element-ui';//导入element ui库
import 'element-ui/lib/theme-chalk/index.css';//导入element ui的样式文件

// 禁用生产提示警告消息
Vue.config.productionTip = false
// 将Element UI作为Vue插件使用
Vue.use(ElementUI);

/* eslint-disable no-new */
// 创建一个新的Vue实例
new Vue({
  // 设置Vue挂载的元素
  el: '#app',
  // 将路由添加到实例
  router,
  // 将组件添加到实例
  components: { App },
  // 设置使用的模板
  template: '<App/>'
})

