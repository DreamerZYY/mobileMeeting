<template>
    <div id="dataList" class="mui-table-view mui-content mui-scroll-wrapper" >
        <div class="mui-scroll">
            <ul id='roomListUl'>
                <li v-for="item in roomList" class="ui-table-view-cell mui-media dataList">
                    <a @click="orderMeeting(item.roomID)">
                        <div class='roomLeft'>
                            <img :src='item.Picture' :onerror='defaultPic'/>
                            <span>{{rStatus(item.roomStatus)}}</span>
                        </div>
                        <ul>
                            <li>
                                <span class='roomName'>{{item.roomName}}</span>
                                <span class='count'>已使用{{item.Count}}次</span>
                            </li>
                            <li class='address'>会议室地点{{item.roomAddress}}</li>
                            <li>
                                <device-room :roomid="item.roomID"></device-room>   
                            </li>
                        </ul>
                    </a>
                </li>
            </ul>
            <div class="desc">(只统计常用的前五个会议室)</div>
        </div>
    </div>
</template>
<script>
import {request} from '@/network/request'
import deviceRoom from './deviceRoom'
export default {
    name: 'myRoom',
    components: {
        deviceRoom
    },
    watch:{
        '$route':{ 
            handler:function(route){
                 this.$store.commit("changeItem",this.$route.meta.title);
            },
            immediate: true//router改变立即执行 
        }
    },
    directives: {},
    data() {
        return {
            pageIndex:1,
            pageTotal:1,
            roomList:[],
            deviceList:[],
            defaultPic:'this.src="' + require('@/assets/images/default.jpg') + '"',
            isOver:false,
            pullToRefresh:'',
            roomid:''
        };
    },
    created() {
        //不同页面显示的header内容不同
        this.$emit('showLeft', true,false,false);
        this.getMeetRoom()
    },
    computed:{
        rStatus(){
            var rStatus="";
            return (rStatus)=>{
                if (rStatus == "0") { //判断会议室状态
                   rStatus="启用";
                   
                } else if (rStatus == "1") {
                   rStatus="审核";
                    
                } else if (rStatus == "2") {
                    rStatue="禁用";
                   
                } else if (rStatus == "3") {
                    //不需要审批,预约审核通过
                    rStatue="维修";
                   
                } else if (rStatus == "4") {
                    rStatue="预留"; 
                    
                } else if (rStatus == "99") {
                   rStatue="会议取消";
                    
                }
                return rStatus;
            }
            
        },
    },
    mounted() {
         mui.init();
         mui('.mui-scroll-wrapper').scroll({
          deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006 
        });    
    },
    methods: {
        getMeetRoom(){
            request({
                url:'api/room/getoftenroom',
                type:'get',
                headers:{
                    "Authorization":localStorage.getItem("Ticket")
                }, 
                params:{
                    num:"5"
                }
            }).then(res=>{
                debugger;
                this.roomList=res.data;
            })
        },
        orderMeeting(id){
            this.$router.push('/order/'+id);
            // this.$router.replace(this.path).catch(err=>{})//加catch是解决多次点击同一个按钮报错的问题;
            this.$store.commit("changeItem",this.$route.meta.title)
        }
    },
};
</script>
<style scoped>
    #dataList{
        /*bottom: 50px;*/
        position: absolute;
    }
    #dataList,#roomListUl{
        /* background:#fff; */
        width:100%;
    }
    
    *{
        list-style: none;
        padding:0;
        margin:0;
        /* touch-action: none; */
    }
    
    .dataList{
        display:block;
        width:100%;
        background:#fff;
        /* margin-bottom:10px; */
        position:relative;
        
    }
    #dataList #roomListUl .dataList a{
        display:block;
        height:120px;
    }
    .roomLeft{
        width:80px;
        height:90px;
        /* float: left; */
        position:absolute;
        left:15px;
        top:15px;
    }
    .dataList img{
        height:90px;
        width:80px;
    }
    .roomLeft span{
        position:absolute;
        bottom:0;
        width:80px;
        left:0;
        text-align: center;
        /* left:50%;
        transform: translate(-50%,0); */
        background:#1376c5;
        color:#fff;
        font-size:12px;
        border-radius: 4px;;
    }
    .dataList ul{
        position:absolute;
        left:105px;
        top:15px;
        overflow: hidden;
    }
    
    .roomName{
            font-size: 18px;
            color: rgb(62, 58, 57);
            font-weight:600;
    }
    .count{
        font-size: 12px;
        margin-left:12px;
        color:#999;	
    }
    .address{
        font-size: 14px;
        margin:4px 0;
        color:#666;
    }
   
    .mui-pull-bottom-tips .mui-pull-loading{
        display:block;
        text-align: center;
    }	
    .desc{
        margin-top:10px;
        text-align: center;
        font-size:12px;
        color:#666;
    }
</style>