import Vue from 'vue';
import App from './App.vue';
import Axios from 'axios';

Axios.defaults.baseURL = process.env.VUE_APP_QUOTES_URL;
Axios.defaults.headers.get['Accept'] = 'application/json';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
