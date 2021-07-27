import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state={
    title:"会议室",
    Ticket:'',
    MaxTicket:'',
    username:''
}
const store=new Vuex.Store({
    state,
    getters:{

    },
    mutations:{
        changeItem(state,name){
            state.title=name
        },
      getTicket(state,obj){
            state.Ticket="Bearer "+obj.ticket;
            state.maxTicket=obj.maxticket;
        }
    },
    actions:{

    }
})
//3、导出对象
export default store