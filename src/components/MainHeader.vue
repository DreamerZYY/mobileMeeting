<template>
    <header class="mui-bar mui-bar-nav">
         <a slot="goback" id="historyBtn" class="mui-icon mui-icon-left-nav mui-pull-left" ></a>
         <h1 slot="headername" class="mui-title" id="title">{{$store.state.title}}</h1>
         <a slot="rightheader">{{$store.state.rightIcon}}</a>
    </header>
</template>

<script>
import Header from 'components/header/Header'
export default {
    name:'MainHeader',
    components: {
        Header,
    },
    data(){
    }
}
</script>

<style scoped>

</style>
