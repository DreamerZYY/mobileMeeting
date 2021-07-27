<template>
    <div id="mainPage">   
        <header class="mui-bar mui-bar-nav">
            <a v-show="showgoback"  slot="goback" id="historyBtn" class="mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 slot="headername" class="mui-title" id="title">{{$store.state.title}}</h1>
            <a v-show="rightCon" slot="rightheader"  id="signOut" style="float: right;">退出登录</a>
        </header>
        <router-view @showLeft="showother"/>
        <main-tab-bar></main-tab-bar>
    </div>
</template>

<script>
import Header from 'components/header/Header'
import MainTabBar from 'components/MainTabBar'
import MainHeader from 'components/MainHeader'
export default {
    name:"Main",
     data(){
        return{
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
        showother(bool1,bool2) {
            this.showgoback=bool1;
            this.rightCon=bool2;
        },
       
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
