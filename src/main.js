import Vue from 'vue';
import Vue2TouchEvents from 'vue2-touch-events';

import App from './App.vue';

import '@/scss/main.scss';

import Axios from 'axios';

Vue.use(Vue2TouchEvents);

Axios.defaults.baseURL = '.netlify/functions';
Axios.defaults.headers.get['Accept'] = 'application/json';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
