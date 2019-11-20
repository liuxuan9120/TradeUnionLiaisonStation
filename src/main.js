import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/vant.js'
import './plugins/vuescroll.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import QS from 'qs'
import config from './config'
import { ImagePreview } from 'vant';


Vue.use(VueAxios, axios);
Vue.prototype.qs = QS;
Vue.config.productionTip = false;
Vue.prototype.$API = config.api;
Vue.prototype.$IMG = config.imgUrl;
Vue.use(ImagePreview);
if (module.hot) {
  module.hot.accept();
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
