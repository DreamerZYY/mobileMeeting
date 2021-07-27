<template>
    <a :class="{'mui-active':isActive}" class="mui-tab-item" @click="itemclik"> 
        <slot name="item-icon"></slot>
        <slot name="item-text"></slot>
    </a>
</template>

<script>
export default {
    name:'TabBarItem',
    props:{
        //接受父组件属性值
        path:String
    },
    data(){
        return{
           // isActive:true
        }
    },
    computed: {
        //通过计算属性动态查看当前的路径从而判断当前按钮是否处于活跃状态
        isActive(){
            return this.$route.path.indexOf(this.path)!==-1
        }
    },
    methods: {
        itemclik() {
           this.$router.replace(this.path).catch(err=>{})//加catch是解决多次点击同一个按钮报错的问题;
           this.$store.commit("changeItem",this.$route.meta.title)
        },
    },
}
</script>

<style scoped>

#tab-bar{
  display: flex;
}
</style>
