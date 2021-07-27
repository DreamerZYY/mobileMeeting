import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

const Room=()=>import('../views/room/Room')
const Order=()=>import('../views/order/Order')
const Message=()=>import('../views/message/Message')
const Mine=()=>import('../views/mine/Mine')
const Login=()=>import('../views/login/Login')
const Main=()=>import('../views/main/Main')

Vue.use(Router)
const routes=[
  {
    path:'',
    redirect:'/login'
  },
  {
    path: '/login',
    component: Login,
    meta:{
      title:"登录"
    }
  },
  {
    path: '/main',
    component: Main,
    meta:{
      title:"会议室"
    },
    children:[
      {
        path:'',
        redirect:'/room'
      },
      {
        path: '/room',
        component: Room,
        meta:{
          title:"会议室"
        }
      },
      {
        path: '/order/:id',
        component: Order,
        meta:{
          title:"预约会议"
        }
      },
      {
        path: '/message',
        component: Message,
        meta:{
          title:"消息"
        }
      },
      {
        path: '/mine',
        component: Mine,
        meta:{
          title:"个人中心"
        }
      }
    ]
  },
  
]
export default new Router({
  routes: routes,
  mode:'history'
})
