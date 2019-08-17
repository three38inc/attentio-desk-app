import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import VueSocketIO from 'vue-socket.io';

import 'bulma/css/bulma.css'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(new VueSocketIO({
  debug: false,
  connection: 'http://206.189.136.1:3002',
  vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
  },
}))

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
