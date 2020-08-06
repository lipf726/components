import Vue from 'vue'
import App from './lib/Cps/index'

sessionStorage.setItem('cpsImg', require('./assets/logo.png'))

new Vue({
  el: '#app',
  render: h => h(App)
})
