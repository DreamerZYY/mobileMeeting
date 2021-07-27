<template>
    <tab-bar>
          <tab-bar-item path="/room">
            <span slot="item-icon" class="mui-icon mui-icon-home"></span>
            <span slot="item-text" class="mui-tab-label">会议室</span>
          </tab-bar-item>
          <tab-bar-item path="/message">
            <span slot="item-icon"  class="mui-icon mui-icon-chatbubble"></span>
            <span slot="item-text" class="mui-tab-label">消息</span>
          </tab-bar-item>
          <tab-bar-item path="/mine">
            <span slot="item-icon" class="mui-icon mui-icon mui-icon-person"></span>
            <span slot="item-text" class="mui-tab-label">我的</span>
          </tab-bar-item>
      </tab-bar>
</template>

<script>
import TabBar from 'components/tabbar/TabBar'
import TabBarItem from 'components/tabbar/TabBarItem'
export default{
    name:"MainTabBar",
    components:{
        TabBar,
        TabBarItem
    }
    
}
</script>

<style>

</style>
