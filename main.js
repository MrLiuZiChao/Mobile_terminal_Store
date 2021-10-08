import Vue from 'vue'
import App from './App'
import VueLazyLoad from 'vue-lazyload'


Vue.use(VueLazyLoad,{
    error:'./static/images/err.jpg',                        //报错需要的图片
    loading:'./static/images/loading.gif'					// 替换需要的图片
})

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
