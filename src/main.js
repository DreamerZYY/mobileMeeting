import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'

import axios from 'axios'
import mui from '../static/mui/js/mui.js'
import pullToRefresh from '../static/mui/js/mui.pullToRefresh.js'
import pullMaterial from '../static/mui/js/mui.pullToRefresh.material.js'
import picker from'../static/mui/js/mui.picker.min.js'
import poppicker from'../static/mui/js/mui.poppicker.js'

import '../static/mui/css/base.css'
import '../static/mui/css/mui.min.css'
import '../static/mui/css/mui.picker.min.css'
import '../static/mui/css/mui.poppicker.css'
// import '../static/mui/css/mui.picker.min.css'
//引入过滤器 返回转换后的格式
import * as filter from './filter'
Object.keys(filter).forEach(key => {
  Vue.filter(key, filter[key])
})
Vue.config.productionTip = false
Vue.prototype.mui=mui
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
//1、基本使用
// axios({
//   url:'http://192.168.1.145:3344/api/users/getuser',
//   //专门针对get请求的参数拼接
//   params:{
//     //传参数
//   },
//   method:'get'//默认是get
// }).then(res=>{
//  //console.log(res)
// })
//2、axios发送并发请求
//请求的URL不再需要单独设置
//3、使用全局的配置在进行网络请求
// axios.defaults.baseURL='http://192.168.1.145:3344/';
// //设置超时时间
// axios.defaults.timeout=5000;
// axios.defaults.headers=""

// axios.all([axios({
//   url:'api/users/getuser'
// }),axios({
//   url:'api/users/getuser'
// })])
// .then(result=>{
//   console.log(result)
// })
//4、创建对应的axios实例
//可以创建多个实例
// const instance1=axios.create({
//   baseURL:'http://192.168.1.145:3344/',
//   timeout:5000
// })
// instance1({
//   url:'api/users/getuser'
// }).then(res=>{
//   console.log(res)
// })
// const instance2=axios.create({
//   baseURL:'http://192.168.1.145:3344/',
//   timeout:5000
// })
// instance2({
//   url:'api/users/getuser'
// }).then(res=>{
//   console.log(res)
// })
//5、封装网络请求
import {request} from './network/request'
//示例1：
// request({
//   url:'api/users/getuser',  
// },res=>{
//   console.log(res)
// },)
//示例2
// request({
//   baseConfig:{

//   },
//   success:function(res){

//   },
//   failure:function(err){

//   }
//})
//3、示例3

// request({
//   url:'api/users/getcompanyList'
//   }).then(res=>{
//     console.log(res)
//   }).catch(err=>{
//     console.log(err)
// })

