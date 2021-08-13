<template>
<div id="messageContent">
    <div class="mui-content">
        <div id="slider" class="mui-slider mui-fullscreen">
            <slide-bar @showMessage="showMessage"></slide-bar>
            <slide-content ref="sideContent"></slide-content>
        </div>
    </div>
</div>
</template>

<script>
import slideBar from './childComps/slideBar'
import slideContent from './childComps/slideContent'
export default {
    name:'Message',
    data(){
        return{
            type:2
        }
        
    },
    components: { 
        slideBar,
        slideContent
     },
    created(){
         //不同页面显示的header内容不同
        this.$emit('showLeft', false,true,true);
        mui.init({
            swipeBack: false
        });
    },
    updated(){
        var sliderMuiObj = mui(".mui-slider");//滑动科目
        sliderMuiObj.slider();
    },
    mounted() {
    },
    updated(){
        //获得slider插件对象
		var gallery = mui('.mui-slider');
		gallery.slider({
			interval: 1000, //自动轮播周期，若为0则不自动播放，默认为0；
		});
    },
    methods: {
        sliderFun(e) {
            debugger;
            console.log("slide");
        },
        showMessage(res){
            debugger;
            this.type=res;
            this.$refs.sideContent.showMessage(res);
        }
    },
}
</script>

<style scoped>
#messageContent{
    position: absolute;
    top:44px;
    bottom: 50px;
    width: 100%;
    padding-top: 0;
}
.mui-content {
    height: 100%;
}
.mui-slider {
    height: 100%;
}
</style>
