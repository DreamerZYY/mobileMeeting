<template>
    <div>
        <div class="selectContent">
            <!-- <p  id="offCanvasShow">筛选</p> -->
            <p id="offCanvasShow" style="padding: 5px;">
                筛选
            </p>
        </div>
        <ul class="mui-table-view mui-content mui-scroll-wrapper" id='roommListUl'>
            <li :roomid="item.roomID" class="mui-table-view-cell mui-media" v-for="(item,index) in roomList" @click="orderMeeting(item.ID)" >
                <a>
                    <p class="leftImg">
                        <img class='mui-media-object mui-pull-left' :src='item.Picture' :onerror='defaultPic'>
                        <span class='roomStatus'>{{item.Status|statusParse}}</span>
                    </p>
                    <div class='mui-media-body'>
                        {{item.RoomName}}
                        <span style='font-size:12px;padding-left:10px;'>坐席{{item.Contain}}人</span>
                        <p class='mui-ellipsis'>
                            <span>会议室地点：{{item.MeetingAddress}}</span>
                        </p>
                        <p class='mui-ellipsis roomDeviceList'>
                            <span class='deviceList' v-for="(device,index) in item.deviceList">{{device.deviceName}}</span>
                        </p>
                    </div>
                </a>
            </li>			
        </ul>
    </div>
</template>

<script>
import {request} from '@/network/request'
// import {getHomeMulidata} from '@/network/room.js'
export default {
    name:'RoomList',
    data(){
        return{
            roomList:[],
            pageIndex:1,
            pageSize:20,
            pageTotal:1,
            defaultPic:'this.src="' + require('@/assets/images/default.jpg') + '"',
            pullToRefresh:'',
            isOver:false
        }
    },
    created(){
        this.getRoomList();
       
        mui.init({
            swipeBack: false,
        });
        
    },
    methods:{
        getRoomList(){
            var startTime="";
            var endTime="";
            var deviceID="";
            var peopleCount="";
            request({
                url:'api/room/get',
                headers:{
                    "Authorization":localStorage.getItem("Ticket")
                }, 
                params:{
                    roomName:"",
					startTime:startTime==undefined?"":startTime,
					endTime:endTime==undefined?"":endTime,
					sort:"",
					pageSize:this.pageSize,
					page:this.pageIndex,
					deviceName:deviceID,
					contain:peopleCount
                },
                methods:'get'
            }).then(res=>{
     
                //console.log(res);
               // this.mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
                var addedArray = [];
                this.pageTotal=res.data.pageCount;
                if(this.pageIndex<=this.pageTotal){ 
                    addedArray=res.data.data;   
                    this.roomList=this.roomList.concat(addedArray);
                    //console.log(addedArray)
                    this.pageIndex++;
                    //console.log(this.pageIndex);
                }else{
                    this.isOver = false;//上拉没有更多数据时将变量设置为false
                    this.pullToRefresh.endPullUpToRefresh(true); //传true代表无更多信息，默认可不传；  
                    this.pullToRefresh.setStopped(true); 
                    setTimeout(function(){
                        mui.toast('我是有底线的.');
                    },3000);
                }
                
            }).catch(err=>{

            })
        },
        orderMeeting(id){
            this.$router.push('/order/'+id);
            // this.$router.replace(this.path).catch(err=>{})//加catch是解决多次点击同一个按钮报错的问题;
            this.$store.commit("changeItem",this.$route.meta.title)
        }
    },
    mounted() {
        var that = this; 
        that.pullToRefresh = mui("#roomList").pullToRefresh({ 
            up: {
                show: true, //显示底部上拉加载提示信息，可选；  
                contentinit: '上拉显示更多', //可以上拉提示信息  
                contentdown: '上拉显示更多', //上拉结束提示信息  
                contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                callback: function() {
                    var self = this;
                    that.isOver=true;
                    that.getRoomList(that.isOver);
                    self.endPullUpToRefresh();
                }
            }
        }); 
    }
}
</script>

<style scoped>
*{
    touch-action: none;
}

.mui-media-body{			
    margin-left: 10px;
    padding-left:10px;
}
.mui-pull-bottom-tips {
    text-align: center;
    background-color: #efeff4;
    font-size: 15px;
    line-height: 40px;
    color: #777;
}
.mui-pull-top-tips {
    position: absolute;
    top: -20px;
    left: 50%;
    margin-left: -25px;
    width: 40px;
    height: 40px;
    border-radius: 100%;
    z-index: 1;
}
.mui-bar~.mui-pull-top-tips {
    top: 24px;
}
.mui-pull-top-wrapper {
    width: 42px;
    height: 42px;
    display: block;
    text-align: center;
    background-color: #efeff4;
    border: 1px solid #ddd;
    border-radius: 25px;
    background-clip: padding-box;
    box-shadow: 0 4px 10px #bbb;
    overflow: hidden;
}
.mui-pull-top-tips.mui-transitioning {
    -webkit-transition-duration: 200ms;
    transition-duration: 200ms;
}
.mui-pull-top-tips .mui-pull-loading {

    margin: 0;
}
.mui-pull-top-wrapper .mui-icon,
.mui-pull-top-wrapper .mui-spinner {
    margin-top: 7px;
}
.mui-slider{
    height:100px;
}
.selectContent p{
    margin-top: 10px;
    background: #fff;
    text-align: right;
    padding-right: 10px;
    line-height: 30px;
}
.mui-off-canvas-right {
    color: #fff;
}
.title {
    margin: 35px 15px 10px;
}
.title+.content {
    margin: 10px 15px 35px;
    color: #bbb;
    text-indent: 1em;
    font-size: 14px;
    line-height: 24px;
}
h5.mui-content-padded:first-child {
    margin-top: 12px !important;
}
.mui-btn {
    font-size: 16px;
    padding: 8px;
    margin: 3px;
}
.ui-alert {
    text-align: center;
    padding: 20px 10px;
    font-size: 16px;
}
* {
    touch-action: pan-y;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
}
.mui-off-canvas-wrap.mui-slide-in .mui-off-canvas-right{
    background:#fff;
}
.commonTime{
    height:30px;
    line-height: 30px;
    border-top:1px solid #ccc;
    border-bottom: 1px solid #ccc;
    margin-top:10px;
    margin-bottom: 10px;
}
.commonTime span{
    display: block;
    margin:0px 10px;
}
.commonSelectTime{
    float: left;
    margin-left:10px;
}
.selectBtn{
    float: right;
    margin-right: 10px;
}
.mui-icon{
    width:20px;
    float: right;
    margin: 0!important;
    margin-top:3px!important;
    
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
.mui-table-view .mui-media-object.mui-pull-left{
    margin-bottom: 5px;
}
.roomStatus{
    display: block;
    width: 100%;
    height: 20px;
    text-align: center;
    overflow: hidden;
    /* margin-top: 10px; */
    background: #4398f6;
    color: #fff;
    line-height:20px;
}
.swiperName{
    line-height: 20px;
}
.mui-slider .mui-slider-group .mui-slider-item{
    background: #fff;
}
.mui-pull-top-canvas {
    overflow: hidden;
    background-color: #fafafa;
    border-radius: 40px;
    box-shadow: 0 4px 10px #bbb;
    width: 40px;
    height: 40px;
    margin: 0 auto;
}
.mui-pull-top-canvas canvas {
    width: 40px;
}
.mui-slider-indicator.mui-segmented-control {
    background-color: #efeff4;
}
.mui-slider .mui-slider-group.mui-slider-loop{
    height:100%;
}
#slider a{
    line-height: 20px;
}
#roommListUl{
    height: 100%;
}
.mui-pull-bottom-tips{
    text-align: center;
    background-color: #efeff4;
    font-size: 15px;
    line-height: 40px;
    color: #777;
}
</style>
