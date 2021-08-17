<template>
    <div id="offCanvasWrapper" class="mui-content mui-off-canvas-wrap mui-draggable mui-slide-in">   
        <inquire ref="inquire"/>
        <main-content>
            <slider-list></slider-list>
            <room-list @faterShown="faterShown"></room-list>  
        </main-content>   
    </div>   
</template>

<script>
import RoomList from './childComps/RoomList'
import SliderList from './childComps/SliderRoom'
import MainContent from 'components/content/MainContent'
import Inquire from './childComps/Inquire'
 export default {
    name:'Room',
    components:{
        RoomList,
        SliderList,
        MainContent,
        Inquire
    },
    created(){
        //不同页面显示的header内容不同
        mui.init({
            swipeBack: false,
        });
        this.$emit('showLeft', false,false);
    },
    methods:{
        faterShown(res){
            debugger;
            var offCanvasWrapper = mui('#offCanvasWrapper');
            offCanvasWrapper.offCanvas('show');
        }
    }
}
</script>

<style scoped>
.mui-bar-nav~.mui-content{
    position: absolute;
    top:44px;
    bottom: 50px;
    width: 100%;
    padding-top: 0;
    overflow:auto;
}
</style>
