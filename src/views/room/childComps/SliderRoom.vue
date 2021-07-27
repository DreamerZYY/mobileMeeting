<template>
    <div id="slider" class="mui-slider" >
        <ul class="mui-slider-group mui-slider-loop mui-table-view" id="swiperList">
            <!-- 重复最后一个轮播 -->
            <li class="mui-slider-item mui-table-view-cell mui-media" :class="" :roomid="last.roomID" >
                <p class='leftImg'>
                    <img class='mui-media-object mui-pull-left' :src='last.roomPic' :onerror='defaultPic'>
                    <span class='roomStatus'>{{last.roomStatus|statusParse}}</span>
                </p>
                <div class='mui-media-body'>
                    {{last.roomName}}
                    <span style='font-size:12px;padding-left:10px;'>
                        坐席{{last.roomCount}}人
                    </span>
                    <p class='mui-ellipsis'>
                        <span>会议室地点：{{last.roomAddress}}</span>
                    </p>
                    <p class='mui-ellipsis roomDeviceList'>
                        <span class='deviceList' v-for="(device,index) in last.deviceList">{{device.deviceName}}</span>
                    </p>
                </div>
            </li>



			<li class="mui-slider-item mui-table-view-cell mui-media" :class="" v-for="(item,index) in swiperList" :roomid="item.roomID" >
                <p class='leftImg'>
                    <img class='mui-media-object mui-pull-left' :src='item.roomPic' :onerror='defaultPic'>
                    <span class='roomStatus'>{{item.roomStatus|statusParse}}</span>
                </p>
                <div class='mui-media-body'>
                    {{item.roomName}}
                    <span style='font-size:12px;padding-left:10px;'>
                        坐席{{item.roomCount}}人
                    </span>
                    <p class='mui-ellipsis'>
                        <span>会议室地点：{{item.roomAddress}}</span>
                    </p>
                    <p class='mui-ellipsis roomDeviceList'>
                        <span class='deviceList' v-for="(device,index) in item.deviceList">{{device.deviceName}}</span>
                    </p>
                </div>
            </li>

             <!-- 重复第一张轮播图 -->
             <li class="mui-slider-item mui-table-view-cell mui-media" :class="" :roomid="first.roomID" >
                <p class='leftImg'>
                    <img class='mui-media-object mui-pull-left' :src='last.roomPic' :onerror='defaultPic'>
                    <span class='roomStatus'>{{first.roomStatus|statusParse}}</span>
                </p>
                <div class='mui-media-body'>
                    {{first.roomName}}
                    <span style='font-size:12px;padding-left:10px;'>
                        坐席{{first.roomCount}}人
                    </span>
                    <p class='mui-ellipsis'>
                        <span>会议室地点：{{first.roomAddress}}</span>
                    </p>
                    <p class='mui-ellipsis roomDeviceList'>
                        <span class='deviceList' v-for="(device,index) in first.deviceList">{{device.deviceName}}</span>
                    </p>
                </div>
            </li>

        </ul>
        <div class="mui-slider-indicator">
            <div class="mui-indicator" v-for="(item,i) in swiperList"></div>
        </div>
    </div>
</template>

<script>
import {request} from '@/network/request'
import {statusParse} from '@/filter'
export default {
    name:'SliderRoom',
    data(){
        return{
           swiperList:[],
           deviceList:[],
           first:'',
           last:'',
           defaultPic:'this.src="' + require('@/assets/images/default.jpg') + '"'
        }
    },
    created(){
        this.getSwiperData();
    },
    computed: {
    },
    mounted(){
        this.mui.init({
            // 启用滑动
            swipeBack: true
        });
        var slider = mui("#slider");
        // 配置定时轮播滑动
        slider.slider({
            interval: 2000
        });
    },
    methods:{
        getSwiperData(){
            request({
                url:'api/room/getroomList',
                headers:{
                    "Authorization":localStorage.getItem("Ticket")
                }, 
                method:'get',
            }).then(res=>{
                var data=res.data;
                this.swiperList=data;
                this.first=data[0];
                this.last=data[data.length-1];
                setTimeout(function() {
                    //获得slider插件对象
                    var gallery = mui(".mui-slider");
                    gallery.slider({
                        interval: 3000 //自动轮播周期，若为0则不自动播放，默认为0；
                    });
                }, 300);
            }).catch(err=>{

            })
        }
    }
}
</script>

<style scoped>
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
</style>
