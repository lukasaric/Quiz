// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import Buefy from 'buefy';
import { sync } from 'vuex-router-sync';
import store from '@/store/store';
import 'buefy/lib/buefy.css';
import 'font-awesome/css/font-awesome.css';
import 'material-icons/iconfont/material-icons.css';

Vue.use(Buefy, {
  defaultIconPack: 'mdi'
});

Vue.config.productionTip = false;

sync(store, router);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App, Buefy }
});
