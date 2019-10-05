/* main file. Here we setup the app  */
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

//Home view /
import App from './App.vue'

Vue.use(BootstrapVue)
Vue.config.productionTip = false

//render to the home view the first time we call the app
new Vue({
  render: h => h(App),
}).$mount('#app')
