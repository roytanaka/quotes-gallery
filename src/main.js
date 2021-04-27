import Vue from 'vue';
import App from './App.vue';
import Axios from 'axios';

Axios.defaults.baseURL = '.netlify/functions';
Axios.defaults.headers.get['Accept'] = 'application/json';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
