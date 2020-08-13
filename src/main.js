import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api'
import { request } from '@utils/request'
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(VueCompositionApi); // 使用vue3.0+
Vue.config.productionTip = false;
Vue.prototype.$http = request
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
