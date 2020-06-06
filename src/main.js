// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import firebase from 'firebase/app'
import App from './App'
import router from './router'
// You sohuld import and register global base components from main.js, because it stores the global Vue instance
import AppDate from '@/components/AppDate'
import store from '@/store'

// This is how you register a component globally
Vue.component('AppDate', AppDate)

Vue.config.productionTip = false

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDkMahc7A2hikkgGWQCvyuUC5LTBDhytvo',
  authDomain: 'vue-school-forum-7c2f6.firebaseapp.com',
  databaseURL: 'https://vue-school-forum-7c2f6.firebaseio.com',
  projectId: 'vue-school-forum-7c2f6',
  storageBucket: 'vue-school-forum-7c2f6.appspot.com',
  messagingSenderId: '875343823337',
  appId: '1:875343823337:web:d8f9b653e836d4446ccb78'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  /* It passes the router file as an option
  to the Vue instance. This way, all application
  components are aware of the router and they have
  access to special components like router-view */
  router,
  store,
  template: '<App/>',
  components: { App }
})
