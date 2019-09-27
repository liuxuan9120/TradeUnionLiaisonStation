import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/vant.js'
import './plugins/vuescroll.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import QS from 'qs'

Vue.use(VueAxios, axios);
Vue.prototype.qs = QS;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
