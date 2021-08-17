<template>
<div id="mainOrder">
    <!--侧滑菜单容器-->
    <div id="offCanvasWrapper" class="mui-off-canvas-wrap mui-draggable mui-slide-in">
        <!-- 菜单部分 -->
        <user-list @manStr='getManList' @allStr='getAllInfo' :orderJoin='myJoin' @joinMeet="myCheck" @newStr='getHostArr' ref="userList" @orderJoin11="orderJoin11"></user-list>
        <div class="mui-inner-wrap">
            <div id="offCanvasContentScroll" class="mui-content mui-scroll-wrapper">
                <div class="mui-scroll">
                    <div id="oderContent" class="mui-inner-wrap">
                        <room-info @orderList="orderList" :time1="time1" :time2="time2" :dataListArr="dataListArr" ref="roominfo" ></room-info>
                        <!--将数据传递给子组件-->
                        <order-edit ref="orderEdit" :manList="manList" :allInfo="allInfo" @joinMeet='joinMeet' :hostArr="hostArr" :myJoin="myJoin" @changeTime1="changeTime1" @changeTime2="changeTime2"></order-edit>
                        <emply-meeting ref="emply" :orderList="orderListArr" :time1="time1" :time2="time2"></emply-meeting>
                        <div id="submitBtn">
                            <button type="button" class="commSubmitBtn activeBtn" id="submitOrderBtn" @click="submitOrder()">
                                确认
                            </button>
                            <button type="button" class="commSubmitBtn" id="backOrderBtn" @click="resetOrderPage()">
                                重置
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- off-canvas backdrop -->
            <div class="mui-off-canvas-backdrop" id="backdrop" @click="closeOffCanvas"></div>
        </div>
        
    </div>
    <div id="middlePopover" class="mui-popover">
        <div class="mui-popover-arrow"></div>
        <div class="mui-scroll-wrapper">
            <div class="mui-scroll">
                <ul class="mui-table-view" id="deviceList">
                    <li class="mui-table-view-cell"  v-for="(item,index) in deviceList" :deviceId="item.ID" :deviceName="item.DeviceName">
                        <div class="mui-input-row mui-checkbox mui-left" style="width:100%;">
                            <label style="width:100%">{{item.DeviceName}}({{item.Amount}})</label>
                            <input name="checkbox" type="checkbox" :deviceId="item.ID" :deviceName="item.DeviceName" remark="" @change="selecDevie($event)"/>
                        </div>    
                    </li>
                    
                </ul>
            </div>
        </div>
    
    </div>
    
</div>
</template>

<script>
import UserList from './childComps/UserList'
import OrderEdit from './childComps/OrderEdit'
import RoomInfo from './childComps/RoomInfo'
import EmplyMeeting from './childComps/EmplyMeeting'
import {request} from '@/network/request'
export default {
    name:'Order',
    data(){
        return{
            manList:[],
            allInfo:[],
            hostArr:[],
            myJoin:true,
            deviceList:[],
            checkDevice:[],
            orderListArr:[],
            time1:"",
            time2:"",
            dataListArr:{}
        }   
    },
    components:{
        UserList,
        OrderEdit,
        RoomInfo,
        EmplyMeeting
        
    },
    watch:{
         '$route':{ 
            handler:function(route){
                 this.$store.commit("changeItem",this.$route.meta.title);
            },
            immediate: true//router改变立即执行 
        },
        myJoin(){
            return this.myJoin
        }
    },
    created(){
        mui.init();
        //不同页面显示的header内容不同
        this.$emit('showLeft', true,false);
        this.getRoomDeviceList();
       
    },
    mounted() {
        //解决侧滑组件导致页面无法滚动的问题
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
        var that=this;
         setTimeout(function(){
             that.getData();
         },200)
       
    },
    methods: {
        getData(){
            var startTime=this.time1;
            var endTime=this.time2;
            var roomid=this.$route.params&&this.$route.params.id;
            request({
                url:'api/room/get/v2',
                data:'get',
                 headers:{
                    "Authorization":localStorage.getItem("Ticket")
                }, 
                params:{
                    roomID:roomid,
					startTime:startTime==undefined?"":startTime,
					endTime:endTime==undefined?"":endTime,
                }
            }).then(res=>{
                this.dataListArr=res.data.data[0];
                this.orderListArr=res.data.data[0].OrderList;
                var that=this;
                setTimeout(function(){
                    that.$refs.emply.counputedInner();
                },200)
                //this.$emit("orderList",this.dataList.OrderList);
            }).catch(err=>{
            
            })
        },
        getRoomDeviceList(){
            var deviceQuery={
                roomid: this.$route.params&&this.$route.params.id,
                deviceName:"",
                type:"",
                sort:"",
                pageSize:"100",
                page:1
            };
            request({
                url:'api/device/getdeviceList',
                headers:{
                    Authorization:localStorage.getItem("Ticket")
                },
                params:deviceQuery
            }).then(res=>{
                if(res.code=="0"){
                    var dataList=res.data.data;
                    this.deviceList=dataList;    
                }

            }).catch(err=>{

            })
        },
        selecDevie(e){
            var eleid=e.target.getAttribute("deviceid");
            var elename=e.target.getAttribute("deviceName");
            if(e.target.checked){
                var ret2 = this.checkDevice.find((v) => {
                    return v.deviceid == eleid;
                });
                if(ret2==undefined){
                    this.checkDevice.push({
                        deviceid:eleid,
                        deviceName:elename,
                        remark:''
                    })
                }
                
            }else{
                for(var i=0;i<this.checkDevice.length;i++){
                    if(this.checkDevice[i].deviceid==eleid){
                        this.checkDevice.splice(i,1);
                    }
                }
            }
        },
        //接收order（子组件）的数据
        getManList(res) {
            this.manList=res;
        },
        getAllInfo(res){
            this.allInfo=res;
        },
        joinMeet(res){
            return this.myJoin=res;
        },
        getHostArr(res){
            return this.hostArr=res;
        },
        myCheck(res){
            this.myJoin=res;
        },
        parentFn(){
            this.$refs.userList.sendToTree();
        },
        //关闭侧滑列表
        closeOffCanvas(){
            event.detail.gesture.preventDefault();
            this.$refs.userList.closeCanvas();
        },
        orderJoin11(res){
            this.myJoin=res;
        },
        orderList(res){
            this.orderListArr=res;
        },
        changeTime1(res){
            this.time1=res;
        },
        changeTime2(res){
            this.time2=res;
        },
         submitOrder(){
             this.checkFiled()
        },
        resetOrderPage(){

        },
        checkFiled(){
            if(this.$refs.orderEdit.meetingTitle==""){
                mui.toast("会议主题为必填项")
                return false;
                
            }else if(this.$refs.orderEdit.Linkman==""){
                mui.toast("联系人为必填项")
                return false;
                
            }else if(this.$refs.orderEdit.LinkPhone==""){
                mui.toast("联系电话为必填项")
                return false;
                
            }else{
                this.submitCheckOrder();
            }
        },
        submitCheckOrder(){
            var roomid=this.$route.params&&this.$route.params.id;
            var order1={
                "MeetingRoomID": roomid,
                "Title":this.$refs.orderEdit.meetingTitle,
                "StartTime": this.$refs.orderEdit.time1+":00",
                "Endtime": this.$refs.orderEdit.time2+":00",
                "Linkman": this.$refs.orderEdit.Linkman,
                "LinkPhone": this.$refs.orderEdit.LinkPhone,
                "Hoster":  this.$refs.orderEdit.selectHostObj.name,
                "HosterPhone": this.$refs.orderEdit.selectHostObj.phone,
                "Amount": this.$refs.orderEdit.selectCount,
                "Special": this.$refs.orderEdit.spccial,
                "userList": this.$refs.orderEdit.allInfo,
                "deviceList": this.checkDevice
            };
            request({
                url:'api/order/insert',
                method:'post',
                headers:{
                    "Authorization":localStorage.getItem("Ticket")
                }, 
                data:order1
            }).then(res=>{
                if(res!=undefined){
                    mui.toast(res.message);
                    this.$router.push("/room");
                }
                
            })
        },
        selectUser(){
            debugger;
            this.$refs.userList.selectUser()
        }
    },
}
</script>

<style scoped>
#mainOrder{
    width: 100%;
    height: 100%;
    padding-top: 44px;
    padding-bottom: 50px;
}
#oderContent{
    width: 100%;
   
}
#topPopover {
    position: fixed;
    top: 16px;
    right: 6px;
}
#topPopover .mui-popover-arrow {
    left: auto;
    right: 6px;
}
.mui-popover {
    height: 300px;
}
#submitBtn{
    text-align: center;
}
</style>
