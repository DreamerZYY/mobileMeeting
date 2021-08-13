<template>
<div id="mineContent">
    <mine-bar />
</div>
</template>

<script>
import mineBar from './childComps/mineBar'
export default {
    name:'Mine',
    components:{
        mineBar
    },
    created() {
         //不同页面显示的header内容不同
        this.$emit('showLeft', true,false,false);
    },
    
}
</script>

<style>
.mui-content{
    width:100%;
}
    #mineContent{
        position: absolute;
        top:44px;
        bottom: 50px;
        width: 100%;
        padding-top: 0;
    }
    
</style>
