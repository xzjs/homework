// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store';
import axios from './api/api'
import ElementUI from 'element-ui'
import VueAxios from 'vue-axios'
import 'element-ui/lib/theme-chalk/index.css'
/*公共样式*/
import '@/assets/css/reset.css'

Vue.config.productionTip = false;
// Vue.prototype.$http = axios;
Vue.use(VueAxios,axios);
Vue.use(ElementUI);

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  mounted() {
    setRem();
  }
});
function setRem() {
  var whdef = 100/1920;// 表示1920的设计图,使用100PX的默认值
  var bodyWidth = document.body.clientWidth;// 当前窗口的宽度
  if(bodyWidth < 1200){
    bodyWidth = 1200
  }
  var rem = bodyWidth * whdef;// 以默认比例值乘以当前窗口宽度,得到该宽度下的相应FONT-SIZE值
  document.getElementsByTagName('html')[0].style.fontSize = rem + 'px';
}
window.addEventListener('load', setRem);
window.addEventListener('resize', setRem);
