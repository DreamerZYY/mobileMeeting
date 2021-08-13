<<template>
    <div class="mui-slider-group">
        <div id="item1mobile" class="mui-slider-item mui-control-content mui-active">
            <div id="scroll1" class="mui-scroll-wrapper">
                <div class="mui-scroll">
                    <ul class="mui-table-view" id="list">
                        <li v-for="item in orderList" class="dataList mui-table-view-cell">
                            <div v-if="type==0">
                                <img :src='item.Picture' :onerror='defaultPic'/>
                                <ul class='right'>
                                    <li class='size'>{{item.Title}}</li>
                                    <li class='address'>地点：{{item.RoomName}}</li>
                                    <li class='time'>时间：
                                        <span>{{item.StartTime|startTimeChange}}</span>&nbsp;&nbsp;
                                        <span>{{item.StartTime|changeHTime}}:{{item.StartTime|changeMTime}}-{{item.Endtime|changeHTime}}:{{item.Endtime|changeMTime}}</span>
                                    </li>
                                    <li class='status'>
                                        <span :style="{'color':mtColorStr(item.Status)}">{{status(item.Status)}}</span>
                                        <span :style="{'color':roomColorStr(item.RoomStatus),'margin-left':'15px'}">{{rStatus(item.RoomStatus)}}</span>
                                    </li>
                                </ul>
                            </div>
                            <div v-else-if="type==1">
                                <img :src='item.Picture' :onerror='defaultPic'/>
                                <ul class='right'>
                                    <li class='size'>{{item.Title}}</li>
                                    <li class='address'>地点：{{item.RoomName}}</li>
                                    <li class='time'>时间：
                                        <span>{{item.StartTime|startTimeChange}}</span>&nbsp;&nbsp;
                                        <span>{{item.StartTime|changeHTime}}:{{item.StartTime|changeMTime}}-{{item.Endtime|changeHTime}}:{{item.Endtime|changeMTime}}</span>
                                    </li>
                                    <li class='status'>
                                        <span :style="{'color':mtColorStr(item.Status)}">{{status(item.Status)}}</span>
                                        <span :style="{'color':roomColorStr(item.RoomStatus),'margin-left':'15px'}">{{rStatus(item.RoomStatus)}}</span>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<<script>
import {request} from '@/network/request'
import {addZero} from '@/commonjs/util'
export default {
    name: 'orderItem',
    data() {
        return {
            //type:0,
            pageIndex:1,
            pageTotal:1,
            orderList:[],
            defaultPic:'this.src="' + require('@/assets/images/default.jpg') + '"',
            isOver:false,
            pullToRefresh:'',
        };
    },
    props:{
        type:String
    },
    created() {
        debugger;
        this.myOrder("");
    },
    computed: {
        mtColorStr() {
            var mtColorStr="";
            return(status)=>{
                if (status == "0") {
                
                    mtColorStr = "";
                } else if (status == "1") {
                    
                    mtColorStr = "";
                } else if (status == "11") {
                    
                    mtColorStr = "";
                } else if (status == "2") {
                
                    mtColorStr = "red";
                } else if (status == "12") {
                
                    mtColorStr = "red";
                } else if (status == "99") {
                    
                    mtColorStr = "red";
                }
                return mtColorStr;
            }  
        },
        status(){
            var status="";
            return (status)=>{
                if (status == "0") {
                    status = "会议未审核"; 
                } else if (status == "1") {
                    status = "会议审核通过";
                
                } else if (status == "11") {
                    status = "会议审核通过";
                
                } else if (status == "2") {
                    status = "会议审核不通过";
                
                } else if (status == "12") {
                    status = "会议审核不通过";
                    
                } else if (status == "99") {
                    status = "会议取消";
                    
                }
                return status;
            }  
        },
        roomColorStr(){
            var roomColorStr="";
            return (rStatus)=>{
           
                if (rStatus == "0") { //判断会议室状态
                
                    roomColorStr = "#a701f9";
                } else if (rStatus == "1") {
                    
                    roomColorStr = "orange";
                } else if (rStatus == "2") {
                    
                    roomColorStr = "#f1ba54";
                } else if (rStatus == "3") {
                    //不需要审批,预约审核通过
                    
                    roomColorStr = "";
                } else if (rStatus == "4") {
                    
                    roomColorStr = "red";
                } else if (rStatus == "99") {
                    
                    roomColorStr = "red";
                }
                return roomColorStr
            }
            
            
        },
        rStatus(){
            var rStatus="";
            return (rStatus)=>{
                if (rStatus == "0") { //判断会议室状态
                    rStatus = "未选择会议室";
                   
                } else if (rStatus == "1") {
                    rStatus = "会议室待审批";
                    
                } else if (rStatus == "2") {
                    rStatus = "会议室审批中";
                   
                } else if (rStatus == "3") {
                    //不需要审批,预约审核通过
                    rStatus = "会议室审批通过";
                   
                } else if (rStatus == "4") {
                    rStatus = "会议室审批未通过";
                    
                } else if (rStatus == "99") {
                    rStatus = "会议取消"; //
                    
                }
                return rStatus;
            }
            
        }
    },
    mounted() {
        var that = this; 
        mui.init({
            swipeBack: false,
        })
        that.pullToRefresh= mui('.mui-scroll').pullToRefresh({         
            up: {
                show: true, //显示底部上拉加载提示信息，可选；  
                contentinit: '上拉显示更多', //可以上拉提示信息  
                contentdown: '上拉显示更多', //上拉结束提示信息  
                contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                callback: function() {
                    var self = this;
                    that.isOver=true;
                    debugger;
                    //此处需要加延时，否则移动鼠标会一直回调
                    setTimeout(() => {
                        that.myOrder(7);
                        self.endPullUpToRefresh();
                    }, 1000);
                    
                }
            }
        }); 
        var deceleration = mui.os.ios ? 0.003 : 0.0009;
        mui('.mui-scroll-wrapper').scroll({
            bounce: false,
            indicators: true, //是否显示滚动条
            deceleration: deceleration
        });
    },
    methods: {
        myOrder(res){
            //this.type=res;
            var page= this.pageIndex;
            var total=this.pageTotal; 
            if(res==undefined||res==""){
                page=1;
                total=1;
                this.pageIndex=page;
                this.pageTotal=total;
                this.orderList=[];
            }else{
                page= this.pageIndex;
                total=this.pageTotal;
            }
            request({
                url:'api/order/getorder',
                type:'get',
                headers:{
                    "Authorization":localStorage.getItem("Ticket")
                }, 
                params:{
                    roomName: "",
                    status: this.$store.state.cc, //0=未结束的，=1一结束的
                    pageSize: 20, //默认是20条
                    page: page
                }
            }).then(res=>{
                this.pageTotal=res.data.pageCount;
               // this.orderList=res.data.data;
                var addedArray = [];
                if(this.pageIndex<=this.pageTotal){ 
                    addedArray=res.data.data;
                    this.orderList=this.orderList.concat(addedArray)
                    this.pageIndex++;
                }else{
                    this.isOver = false;//上拉没有更多数据时将变量设置为false
                    this.pullToRefresh.endPullUpToRefresh(true); //传true代表无更多信息，默认可不传；  
                    this.pullToRefresh.setStopped(true); 
                    setTimeout(function(){
                        mui.toast('我是有底线的.');
                    },3000);
                }
                //console.log( this.orderList);
            })
        },
        
    },
};
</script>
<style scoped>
 * {
    list-style: none;
    padding: 0;
    margin: 0;
    touch-action: none;
}

html,
body {
    background-color: #efeff4;
}

.mui-bar~.mui-content .mui-fullscreen {
    top: 44px;
    height: auto;
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
    /*-webkit-backface-visibility: hidden;
-webkit-transition-duration: 400ms;
transition-duration: 400ms;*/
    margin: 0;
}

.mui-pull-top-wrapper .mui-icon,
.mui-pull-top-wrapper .mui-spinner {
    margin-top: 7px;
}

.mui-pull-bottom-tips {
    text-align: center;
    background-color: #efeff4;
    font-size: 15px;
    line-height: 40px;
    color: #777;
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

#sliderSegmentedControl .mui-scroll {
    width: 100%;
    border: none;
}

#no,
#have {
    width: 50%;
}

#list,
#list2 {
    /* margin-top: 12px; */
}

.mui-table-view {
    background: none;
}

.dataList {
    height: 120px;
    width: 100%;
    border-bottom: 1px solid #E7E7E7;
    position: relative;
    background: #fff;
}

.mui-slider .mui-slider-group .mui-slider-item .dataList img {
    /* float: left; */
    /* margin-right: 10px; */
    height: 70px;
    width: 80px;
    /* margin-top:20px; */
    /* margin-left:20px; */
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translate(0, -50%);
}

.dataList ul {
    /* margin-top:20px; */
    position: absolute;
    left: 110px;
    top: 50%;
    transform: translate(0, -50%);
}

.size {
    font-size: 14px;
    text-align: left;
    color: #333;
}

.time,
.address {
    font-size: 14px;
    text-align: left;
    margin-left: 0px;
    color: #666666;
    /* padding-top:2px;
box-sizing: border-box; */
}

.status {
    font-size: 12px;
    color: #999;
}

#free {
    display: block;
    margin: 100px auto 20px auto;
    height: 105px;
    width: 105px;
}

#free2 {
    text-align: center;
    width: 100%;
}

.caozuo span {
    color: #13b5b1;
    border: 1px solid #13b5b1;
    padding: 2px 6px;
    margin-right: 10px;
    font-size: 12px;
    border-radius: 4px;
}   
</style>