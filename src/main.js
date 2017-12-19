import Vue from 'vue';
import Axios from 'axios';
import App from './App';
import router from './router';
import config from './assets/js/config';
import './assets/scss/index.scss';

Vue.config.productionTip = false;
Axios.defaults.baseURL = config.baseUri;
Axios.interceptors.response.use(response => response, error => Promise.reject(error));

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
