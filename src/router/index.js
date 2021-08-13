import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
const Login=()=>import('../views/login/Login')

const Main=()=>import('../views/main/Main')
const Room=()=>import('../views/room/Room')
const Order=()=>import('../views/order/Order')
const Message=()=>import('../views/message/Message')
const Mine=()=>import('../views/mine/Mine')

const ReadMessage=()=>import('../views/message/ReadMessage')

const MyBar=()=>import('../views/mine/childComps/mineBar')
const MyOrder=()=>import('../views/mine/childComps/myOrder')
const MyMeeting=()=>import('../views/mine/childComps/myMeeting')
const MyRoom=()=>import('../views/mine/childComps/myRoom')
Vue.use(Router)
//解决编程式路由往同一地址跳转时会报错的情况
const originalPush = Router.prototype.push;
const originalReplace = Router.prototype.replace;
//push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
};
//replace
Router.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalReplace.call(this, location, onResolve, onReject);
  return originalReplace.call(this, location).catch(err => err);
};
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
        path: '/readmessage/:id',
        component: ReadMessage,
        meta:{
          title:"消息通知"
        },
      },
      {
        path: '/mine',
        component: Mine,
        meta:{
          title:"个人中心"
        },
       
      },
      {
        path: '/myOrder',
        component: MyOrder,
        meta:{
          title:"我的预约"
        },
      },
      {
        path: '/myMeeting',
        component: MyMeeting,
        meta:{
          title:"我的会议"
        },
      },
      {
        path: '/myRoom',
        component: MyRoom,
        meta:{
          title:"常用会议室"
        },
      }
      
    ]
  },
  
]
export default new Router({
  routes: routes,
  mode:'history'
})
