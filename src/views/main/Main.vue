<template>
    <div id="mainPage">   
        <header class="mui-bar mui-bar-nav">
            <a v-show="showgoback"  slot="goback" id="historyBtn" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 slot="headername" class="mui-title" id="title">{{$store.state.title}}</h1>
            <span v-if="!messageShown">
                <a  v-show="rightCon" slot="rightheader"  id="signOut" style="float: right;"></a>
            </span> 
            <span v-else>
                <a v-show="rightCon" slot="rightheader"  id="readAll" style="float: right;" @click="readAll()">
                    <span class="mui-icon mui-icon-checkmarkempty"></span>
                </a>
            </span>            
            
        </header>
        <router-view @showLeft="showother"/>
        <main-tab-bar></main-tab-bar>
    </div>
</template>

<script>
import {request} from '@/network/request'
import Header from 'components/header/Header'
import MainTabBar from 'components/MainTabBar'
import MainHeader from 'components/MainHeader'
export default {
    name:"Main",
     data(){
        return{
            messageShown:true,
            title:this.$store.state.title,
            showgoback:false,
            rightCon:false
        }
    },
    components:{
        MainTabBar,
        MainHeader
    },
    methods: {
        //是否显示左侧
        //bool1:显示左侧
        //BOO2:显示右侧
        //bool3：显示消息已读/登陆登出
        //true为显示登出，false为已读，默认是false
        showother(bool1,bool2,bool3) {
            this.messageShown=bool3;
            this.showgoback=bool1;
            this.rightCon=bool2;
            this.messageShown=(bool3==undefined?false:true)
        }, 
        //一键已读
        readAll(){
            request({
                url:'api/infrom/read',
                method:'post',
                headers:{
                    "Authorization":localStorage.getItem("Ticket")
                }, 
            }).then(res=>{
                debugger;
                mui.toast(res.message);
                this.$router.go(0);
            })
        }
    },
}
</script>

<style scoped>
*{
    font-size: 14px;
}
#mainPage{
    height:100%;
    width:100%;
}
#signOut {
    color: #666;
    font-size: 12px;
    display: block;
    height: 44px;
    line-height: 44px;
    float: right;
}
</style>
