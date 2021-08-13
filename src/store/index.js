import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state={
    title:"会议室",
    Ticket:'',
    MaxTicket:'',
    username:'',
    rightIcon:'',
    aa:'2',
    cc:'0'
}
const store=new Vuex.Store({
    state,
    getters:{

    },
    mutations:{
        changeItem(state,name){
            state.title=name;
            if(name=="会议室"){
                state.rightIcon="rihtIcon"
            }
        },
        getTicket(state,obj){
            state.Ticket="Bearer "+obj.ticket;
            state.maxTicket=obj.maxticket;
        },
        changeStatus(state,type){
            state.aa=type;
        },
        changeOrderStatus(state,type){
            state.cc=type;
        }
    },
    actions:{

    }
})
//3、导出对象
export default store