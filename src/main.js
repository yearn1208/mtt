import Vue from 'vue'
import App from './App.vue'
import ElementUi from 'element-ui'
import VueRouter from 'vue-router';
import 'element-ui/lib/theme-chalk/index.css';
import * as echarts from 'echarts'
import VueSignaturePad from 'vue-signature-pad'
import router from './router/index'
import "vue-virtual-scroller/dist/vue-virtual-scroller.css" // 引入它的 css
import selLoadMore from './directive/sel-loadmore/loadmore'

Vue.use(ElementUi)
Vue.use(VueSignaturePad)
Vue.use(VueRouter)
// 注册下拉框瀑布流指令
Vue.directive('loadmore', selLoadMore)
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
