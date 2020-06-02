// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// You sohuld import and register global base components from main.js, because it stores the global Vue instance
import AppDate from '@/components/AppDate'
Vue.component('AppDate', AppDate)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  /* It passes the router file as an option
  to the Vue instance. This way, all application
  components are aware of the router and they have
  access to special components like router-view */
  router,
  template: '<App/>',
  components: { App }
})
