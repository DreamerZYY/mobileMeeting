<template>
  <div id="app">
    <!-- <main-header></main-header> -->
    <router-view/>
    <!-- <main-tab-bar></main-tab-bar>  -->
    
  </div>
</template>

<script>

import Login from 'views/login/Login'
export default {
  name: 'App',
  
  components:{
    // MainTabBar,
    // MainHeader
  },
  created(){
    
  }
}
</script>

<style>                                     
  *{ touch-action: none;}
</style>
