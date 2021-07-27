<template>
    <div id="roomContent">
        <div class="mui-table-view mui-content mui-scroll-wrapper" id="roomcontentID">
            <div class="mui-table-view-cell mui-media">
                <p class='leftImg'>
                    <img class='mui-media-object mui-pull-left' :src="dataListArr.Picture" :onerror="defaultPic">
                    <span class='roomStatus'>{{dataListArr.Status|statusParse}}</span>
                </p>
                <div class='mui-media-body' style=' width: calc(100% - 60px);'>
                    {{dataListArr.RoomName}}
                    <span style='font-size:12px;padding-left:10px;'>坐席{{dataListArr.Contain}}人</span>
                    <p class='mui-ellipsis'>
                        <span>会议室地点：{{dataListArr.MeetingAddress}}</span>
                    </p>
                    <p class='mui-ellipsis roomDeviceList'>
                        <span  class='deviceList' v-for="(item,index) in dataListArr.deviceList">{{item.deviceName}}</span>
                    </p>
                </div>
            </div>
        </div>	
    </div>
</template>

<script>
import {request} from '@/network/request'
export default {
    name:'RoomInfo',
    data(){
        return {
          
            defaultPic:'this.src="' + require('@/assets/images/default.jpg') + '"',    
        }
    },
    props:{
        time1:String,
        time2:String,
        dataListArr:Object
    },
    created(){
        this.$parent.getData();
    },  
    methods: {
       
    },
}
</script>

<style scoped>
.mui-media-body {
    float: left;
    margin-left: 10px;
}
.leftImg{
    display: block;
    width: 42px;
    height: 66px;
    float: left;
}
.mui-table-view-cell>a:not(.mui-btn){
    white-space:normal;
}
.roomStatus{
    display: block;
    width: 100%;
    height: 30px;
    text-align: center;
}
#roomContent{
    margin-bottom: 10px;
}
</style>
