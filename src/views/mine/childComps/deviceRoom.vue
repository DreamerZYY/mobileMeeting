<template>
<div>
    <span class='deviceList' v-for="(item,index) in deviceList" :key="index">{{item.DeviceName}}</span>
</div>
</template>

<script>
import {request} from '@/network/request'
export default {
    name:'deviceRoom',
    data(){
        return{
            deviceList:[]
        }
    },
    props:{
        roomid:Number
    },
    created() {
        this.getDeviceRoomList()
    },
    
    methods:{
        getDeviceRoomList(){
             request({
                url:'api/device/getdeviceList',
                type:'get',
                headers:{
                    "Authorization":localStorage.getItem("Ticket")
                }, 
                params:{
                    roomid:this.roomid,
					deviceName:"",
					type:"",
					sort:"",
					pageSize:"100",
					page:1
                }
            }).then(res=>{
                debugger;
                this.deviceList=res.data.data;
               
            })
        }
    }
}
</script>

<style scoped>
 .deviceList{
    font-size: 12px;
    color:#666;
    border:1px solid #ccc;
    margin-right:4px;
    margin-bottom:4px;
    padding:0 4px;
    box-sizing: border-box;
    float:left;
    transform: scale(1);
}
</style>
