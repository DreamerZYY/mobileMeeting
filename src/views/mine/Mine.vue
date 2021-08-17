<template>
<div id="mineContent">
    <mine-bar  @showLeft="showLeft"/>
</div>
</template>

<script>
import mineBar from './childComps/mineBar'
export default {
    name:'Mine',
    components:{
        mineBar
    },
    watch:{
        //监测router的变化，当回到当前页时，不显示返回按钮
        '$route'(){
            this.$emit('showLeft', false,false,false);
            this.$store.commit("changeItem",this.$route.meta.title);
        }
    },
    created() {
         this.$emit('showLeft', false,false,false);
    },
    methods:{
        showLeft(a,b,c){
            this.$emit('showLeft', a,b,c);
        }
    }
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
