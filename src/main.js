import Vue from 'vue'
import App from './index.vue'
import Json from '../json'

const json = type=>{
  return new Promise(resolve=>{
    setTimeout(()=>{
      resolve(Json[type]);
    },500)
  })
}

Vue.config.productionTip = false

Vue.prototype.$api = {json};

new Vue({
  render: h => h(App),
}).$mount('#app')