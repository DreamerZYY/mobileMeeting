<template>
<div>
   <div id="meetingEdit">
       <ul id="meetingInfo">
           <li class="mui-input-row">
                <div class="mui-input-row">
                    <label>会议主题</label>
                    <input type="text" id="Title" class="mui-input-clear" placeholder="*会议主题必填" v-model="meetingTitle">
                    <b>*</b>
                </div>
            </li>
            <li>
                
                <div class="mui-input-row">
                    <label>申请部门</label>
                    <input type="text" id="deptname" readonly="readonly" v-model="deptName" placeholder="">
                </div>
            </li>
            <li>
                <div class="mui-input-row">
                    <label>预约人</label>
                    <input type="text" readonly="readonly" id="username" placeholder="" v-model="username">
                    <label style="color: #ababab;" id="mineMeeting">
                        <input name="notJoin" type="checkbox" id="notJoin" @click="changeJoin()" :checked="joinMeeting" >我要参会</label>
                </div>
            </li>
            <li>
                <div class="mui-input-row">
                    <label>联系人</label>
                    <input type="text" id="Linkman" class="mui-input-clear"  placeholder="*联系人为必填" v-model="Linkman"/>
                    <b>*</b>
                </div>
                
            </li>
            <li>
                <div class="mui-input-row">
                    <label>联系方式</label>
                    <input type="text" id="LinkPhone" class="mui-input-clear" placeholder="*联系方式为必填" v-model="LinkPhone" />
                    <b>*</b>
                </div> 
            </li>
            <li>
                <div class="mui-input-row">
                    <span class="selectTimeSpan">开始时间</span>
                    <span id='time1' class="selectBtn" align="right" data-options='{}' @click="selectTimeFun($event)">
                        {{morTime}}
                        <!-- <span class="mui-icon mui-icon-forward"></span> -->
                    </span>		
                </div> 
            </li>
            <li>
                <div class="mui-input-row">
                    <span class="selectTimeSpan">结束时间</span>
                    <span id='time2' class="selectBtn" align="right" data-options='{}'  @click="selectTimeFun($event)">
                        {{afterTime}}
                        <!-- <span class="mui-icon mui-icon-forward"></span> -->
                    </span>
                </div>	
            </li>
            <li>
                <div class="mui-content">
                    <div class="mui-checkbox mui-left">
                        <label>上午</label>
                        <input :checked="chooseMo" name="checkbox" value="Item 1" type="checkbox" id="selectMorning" @change="selectMoring($event)"/>
                    </div>
                    <div class="mui-checkbox mui-left">
                        <label>下午</label>
                        <input  :checked="chooseAft" name="checkbox" value="Item 2" type="checkbox"  id="selectAftorn" @change="selectAfterNoon($event)"/>
                    </div>
                </div>
            </li>
           <li>
                <div class="mui-input-row">
                    <label>参会人</label>
                    <input type="button" class="orderMeetingCommon" id="selectMeetingMember" value="请选择参会人员" placeholder="请选择参会人" @click="showMeetingMember">
                    <span >(<i id="selectCount">{{selectCount}}</i>)</span>
                </div>
            </li>
            <li>
                <div class="mui-input-row">
                    <label>主持人</label>
                    <input id='showUserPicker' class="mui-btn mui-btn-block mui-input-clear" ref="hostName" type="text" placeholder="请选择主持人" readonly="readonly" @click="selectHost" :value="selectHostObj.name"/>
                </div>	
            </li>
            <li>
                <div class="mui-input-row">
                    <label>联系方式</label>
                    <input id="hostPhone" type="text" ref="hostPhone" class="mui-input-clear" placeholder="" :value="selectHostObj.phone" />
                </div>
            </li>
            <li>
                <div class="mui-input-row">
                    <label>设备</label>
                    <a href="#middlePopover">
                        <input type="button" class="orderMeetingCommon" id="selectMeetingDevice" value="请选择设备" placeholder="请选择设备" >
                    </a>  
                </div>
            </li>
            <li style="height:100px;">
                <div class="mui-input-row">
                    <label>其他需求</label>
                    <textarea id="specialText" type="text" class="mui-input-clear" placeholder="定制化服务填写" style="width:100%;font-size:14px;padding: 10px;box-sizing: border-box;" v-model="spccial"></textarea>
                </div>
                
            </li>
       </ul>
       
   </div>
   
</div>
</template>

<script>
var timeSpace=15;//最短时间间隔
import {request} from '@/network/request'
import {addZero} from '@/commonjs/util'
import loginInfo from '@/commonjs/util'
export default {
    name:'OrderEdit',
    data(){
        return{
            time1:'',
            time2:'',
            deptName:'',
            username:'',
            Linkman:'',
            LinkPhone:'',
            joinMeeting:true,
            chooseMo:true,
            chooseAft:false,
            meetingTitle:"",
            selectHostObj:{"name":'',"phone":''},
            spccial:''
        }
    },
    props:{
        manList:Array,
        allInfo:Array,
        hostArr:Array,
        myJoin:Boolean,
       // joinMeeting:Boolean
    },
    watch:{
        joinMeeting(a,b){
        //     debugger;
         this.$emit('joinMeet', this.joinMeeting);
            return this.myJoin;
           
        },
        myJoin(a,b){
            this.joinMeeting=a;
        },
        time1(newValue, oldValue) {
            this.$emit("changeTime1",this.time1);
          //  console.log("1_"+this.time1)
            this.$parent.getData();
        },
        time2(newValue, oldValue) {
            this.$emit("changeTime2",this.time2);
           // this.$parent.getData();
       },
    },
    components:{
    },
    
    methods: {   
        addOrderTime() {         
        },
        //根据所传参数得到指定时间格式
		defaultDate(type){
            var str="";
            var date=new Date();
            var nextDate = new Date(date.getTime() + 24*60*60*1000); //后一天
            var year=date.getFullYear();
            var month=date.getMonth()+1;
            var day=date.getDate();
            var hours=date.getHours();
            var minutes=date.getMinutes();
            if(type=="day"){
                str=year+"-"+addZero(month,2,"0")+"-"+addZero(day,2,"0")
            }else if(type=="next"){
                str=nextDate.getFullYear()+"-"+addZero(nextDate.getMonth()+1,2,"0")+"-"+addZero(nextDate.getDate(),2,"0");
            }else if(type=="nextMinuStartMo"){
                
                str=nextDate.getFullYear()+"-"+addZero(nextDate.getMonth()+1,2,"0")+"-"+addZero(nextDate.getDate(),2,"0")+" 08:00";
            }else if(type=="nextMinuEndtMo"){
                str=nextDate.getFullYear()+"-"+addZero(nextDate.getMonth()+1,2,"0")+"-"+addZero(nextDate.getDate(),2,"0")+" 12:00";
            }else if(type=="nextMinuStartAf"){
                str=nextDate.getFullYear()+"-"+addZero(nextDate.getMonth()+1,2,"0")+"-"+addZero(nextDate.getDate(),2,"0")+" 14:00";
            }else if(type=="nextMinuEndAf"){
                str=nextDate.getFullYear()+"-"+addZero(nextDate.getMonth()+1,2,"0")+"-"+addZero(nextDate.getDate(),2,"0")+" 18:00";
            }else{
                str=year+"-"+addZero(month,2,"0")+"-"+addZero(day,2,"0")+" "+addZero(hours,2,"0")+":"+addZero(minutes,2,"0");
            }
            
            return str;
        },
        //调出选择参会人员列表
        showMeetingMember(){
            debugger;
            mui('#offCanvasWrapper').offCanvas('show');
            //打开选择人员列表时才判断是否有人才会，随后在人员列表页进行选中的操作
            this.$parent.selectUser();
        },
        //选择是否参会
        changeJoin(){
            var mineJoinObj=new Object();
			mineJoinObj.userID=loginInfo.loginInfo.data.userid;
			mineJoinObj.fullname=decodeURI(escape(loginInfo.loginInfo.data.name));
			mineJoinObj.UserLevel=0;
			mineJoinObj.SeatCode="0";	
            mineJoinObj.tel=decodeURI(escape(loginInfo.loginInfo.exp));
            this.joinMeeting=!this.joinMeeting;
            
            if(this.joinMeeting){
                if(this.manList.includes((loginInfo.loginInfo.data.userid).toString())){                    
                }else{
                    this.allInfo.push(mineJoinObj);
                    this.hostArr.push({
                        value:mineJoinObj,
                        text:mineJoinObj.fullname
                    });
                    this.manList.push((loginInfo.loginInfo.data.userid).toString());
                }   
            }else{
                if(this.manList.includes((loginInfo.loginInfo.data.userid).toString())){
                    for(var i=0;i<this.manList.length;i++){
                        if(this.manList[i]==loginInfo.loginInfo.data.userid){
                            this.allInfo.splice(i,1);
                            this.hostArr.splice(i,1);
                            this.manList.splice(i,1);
                        }
                    } 
                }else{
                   // this.allInfo.push(mineJoinObj);
                }
            }
            this.$emit('joinMeet',this.joinMeeting);
        },
        //选择主持人
        selectHost(){
            var that=this;
            var join=that.joinMeeting;
            var sameCount=0;
            var userPicker = new mui.PopPicker();
            var mineJoinObj=new Object();
			mineJoinObj.userID=loginInfo.loginInfo.data.userid;
			mineJoinObj.fullname=decodeURI(escape(loginInfo.loginInfo.data.name));
			mineJoinObj.UserLevel=0;
			mineJoinObj.SeatCode="0";	
            mineJoinObj.tel=decodeURI(escape(loginInfo.loginInfo.exp));
            if(that.manList.length==0&&that.joinMeeting){
                that.hostArr.push({
                    value:mineJoinObj,
                    text:mineJoinObj.fullname
                })
            }
            userPicker.setData(that.hostArr);
            userPicker.show(function(items) { 
                that.selectHostObj.name=items[0].text
                that.selectHostObj.phone=(items[0].value).tel
                // that.$refs.hostName.value=items[0].text;
                // that.$refs.hostPhone.value=(items[0].value).tel;
            });
        },
        //选择上午
        selectMoring(e){
            var value=!this.chooseMo;
            this.chooseMo=value;
            if(value){
                this.time1=this.time1.split(" ")[0]+" 08:00";
                if(!this.chooseAft){        
                    this.time2=this.time2.split(" ")[0]+" 12:00";
                }else{
                    this.time2=this.time2.split(" ")[0]+" 18:00";
                }
            }else{
                 if(!this.chooseAft){   
                    this.time1=this.time1.split(" ")[0]+" 08:00";     
                    this.time2=this.time2.split(" ")[0]+" 12:00";
                }else{
                    this.time1=this.time1.split(" ")[0]+" 14:00";
                    this.time2=this.time2.split(" ")[0]+" 18:00";
                }
            }
        },
        //选择下午
        selectAfterNoon(e){
            var value=!this.chooseAft;
            this.chooseAft=value;
            if(value){
                if(!this.chooseMo){
                    this.time1=this.time1.split(" ")[0]+" 12:00";                  
                }else{
                    this.time1=this.time1.split(" ")[0]+" 08:00";   
                }
                 this.time2=this.time2.split(" ")[0]+" 18:00";
            }else{
                this.time1=this.time1.split(" ")[0]+" 08:00";
                this.time2=this.time2.split(" ")[0]+" 12:00";
            }
        },
        selectTimeFun(e){
            var _self = e.target;
            var that=this;
            if(_self.picker) {
                _self.picker.show(function (rs) {
                    _self.innerText = '选择结果: ' + rs.text;
                    _self.picker.dispose();
                    _self.picker = null;
                });
            } else {
                _self.setAttribute("data-options",this.getNowDate());
                var optionsJson = _self.getAttribute('data-options') || '{}';
                var options = JSON.parse(optionsJson);
                var id = _self.getAttribute('id');
            
                /*
                    * 首次显示时实例化组件
                    * 示例为了简洁，将 options 放在了按钮的 dom 上
                    * 也可以直接通过代码声明 optinos 用于实例化 DtPicker
                    */
                _self.picker = new mui.DtPicker(options);
                _self.picker.show(function(rs) {
                    // console.log(rs.txt);
                    /*
                        * rs.value 拼合后的 value
                        * rs.text 拼合后的 text
                        * rs.y 年，可以通过 rs.y.vaue 和 rs.y.text 获取值和文本
                        * rs.m 月，用法同年
                        * rs.d 日，用法同年
                        * rs.h 时，用法同年
                        * rs.i 分（minutes 的第二个字母），用法同年
                        */
                    if(_self.id=="time1"){
                        var time2=document.getElementById('time2').innerText;
                        if(isNaN(Date.parse(time2))){
                           // _self.innerText=rs.text;
                            that.time1=rs.text
                        }else{
                            var time1val=Date.parse(rs.text);
                            var time2val=Date.parse(time2);
                            if(time2val-time1val>(1000*timeSpace*60)){
                               // _self.innerText=rs.text;
                                that.time1=rs.text
                            }else{
                                _self.picker.dispose();
                                _self.picker = null;
                                mui.toast("开始时间不能小于最短时间间隔");
                            }
                        }
                        
                    }else if(_self.id=="time2"){
                        var time1=document.getElementById('time1').innerText;
                        if(isNaN(Date.parse(time1))){
                           // _self.innerText=rs.text;
                            that.time2=rs.text;
                        }else{
                            var time1val=Date.parse(document.getElementById('time1').innerText);
                            var time2val=Date.parse(rs.text);
                            if(time2val-time1val>(1000*timeSpace*60)){
                               // _self.innerText=rs.text;
                                that.time2=rs.text;
                            }else{
                                _self.picker.dispose();
                                _self.picker = null;
                                mui.toast("会议时间不能小于最短时间间隔");
                            }
                        }
                        
                    }
                    
                    /* 
                        * 返回 false 可以阻止选择框的关闭
                        * return false;
                        */
                    /*
                        * 释放组件资源，释放后将将不能再操作组件
                        * 通常情况下，不需要示放组件，new DtPicker(options) 后，可以一直使用。
                        * 当前示例，因为内容较多，如不进行资原释放，在某些设备上会较慢。
                        * 所以每次用完便立即调用 dispose 进行释放，下次用时再创建新实例。
                        */
                    //_self.picker.dispose();
                   
                    _self.picker = null;
                     
                });
            }
       
        },
        getNowDate(){
            var str="";
            var date=new Date();
            var year=date.getFullYear();
            var month=date.getMonth()+1;
            var day=date.getDate();
            var hours=date.getHours();
            var minutes=date.getMinutes();
            str='{"beginYear":'+year+',"beginMonth":'+month+',"beginDay":'+day+',"beginHours":'+hours+',"beginMinutes":'+minutes+'}';
            return str;
        }
    },
    created(){
        
        this.deptName=decodeURI(escape(loginInfo.loginInfo.data.deptName));
    
        this.username=decodeURI(escape(loginInfo.loginInfo.data.username));
        this.Linkman=decodeURI(escape(loginInfo.loginInfo.data.name));
        this.LinkPhone=decodeURI(escape(loginInfo.loginInfo.exp));
        this.$emit("changeTime1",this.time1);
        this.$emit("changeTime2",this.time2);
       
    },
    mounted() {
        this.time1=this.defaultDate("nextMinuStartMo");
        this.time2=this.defaultDate("nextMinuEndtMo");
        
    },
    computed: {
        selectCount() {
            if(this.manList.length==0&&this.joinMeeting){
                return 1;
            }else{
                return this.manList.length;
            }  
        },
        joinMeeting1(){
            if(this.manList.length==0&&this.joinMeeting){
                return this.joinMeeting=true; 
                
            }else if(this.manList.length!=0&&!this.manList.includes((loginInfo.loginInfo.data.userid).toString())){
                return this.joinMeeting=false; 
            }else if(this.manList.length!=0&&this.manList.includes((loginInfo.loginInfo.data.userid).toString())){
                return this.joinMeeting=true; 
            }else if(this.manList.length==0&&!this.joinMeeting){
                return this.joinMeeting=false; 
            }     
        },
        morTime(){
            return this.time1;
        },
        afterTime(){
            return this.time2;
        }
    },
   
}
</script>

<style scoped>
body{
    font-size: 14px;;
}
#meetingEdit {
    background: #fff;
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
.mui-slider{
    height:92px;
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
    width: 78%;
    display: block;
    float: left;
    font-family: 'Helvetica Neue',Helvetica,sans-serif;
    line-height: 1.1;
    float: left;
    width: 60%;
    /* padding: 11px 15px; */
    line-height: 40px;
}
.mui-icon{
    width:20px;
    float: right;
    margin: 0!important;
    
}
.mui-icon-forward{
    margin-top:8px!important;
    
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
#meetingInfo li{
    border-bottom: 1px solid #c8c7cc;
    height: 40px;
    line-height: 40px;
}
#meetingInfo li input[type="text"]{
    font-size: 14px;
}
.mui-input-row label{
    width:27%;
}
.mui-input-row label~input, .mui-input-row label~select, .mui-input-row label~textarea{
    width: 46%;
    float: left;
}
#mineMeeting{
    color: #ababab;
    float: right;
}
.selectTimeSpan{
    width: 27%;
    display: block;
    float: left;
    font-family: 'Helvetica Neue',Helvetica,sans-serif;
    line-height: 1;
    float: left;
    width: 35%;
    padding: 0 15px;
    line-height: 40px;
}
.mui-checkbox, .mui-radio{
    width: 50%;
    float: left;
}
#employMeeting{
    width: 100%;
    overflow: auto;
    white-space: nowrap;
}
#topTime{
    width: 100%;
}
#startTimeBlockUl{
    width: 100%;
}
#startTimeBlockUl li{
    display: inline-block;
    width: 80px;
    height: 40px;
    text-align: center;
    line-height: 40px;
}
#endTimeBlockUl li{
    display: inline-block;
    width: 80px;
    height: 40px;
    text-align: center;
    line-height: 40px;
}
#meetingContentBlockUl li{
    display: inline-block;
    width: 80px;
    height: 40px;
    text-align: center;
    line-height: 40px;
}
#meetingContentBlockUl li b{
    display: block;
    width: 80%;
    height: 100%;
    line-height: 40px;
    text-align: center;
    margin: 0 auto;
    background: #cbc8c8;
    margin-top:10px;
}
#submitBtn{
    text-align: center;
}
.mui-input-row label{
    padding:11px 10px;
}
#selectMeetingMember{
    color: #fff;
    background: #0075ff;
    margin-top: 5px;
    height: 30px;
    box-sizing: border-box;
    width: 100px;
    margin-right: 20px;
}
#selectMeetingDevice{
    color: #fff;
    background: #0075ff;
    margin-top: 5px;
    height: 30px;
    box-sizing: border-box;
    width: 100px;
    margin-right: 20px;
}
#showUserPicker{
    float: left;
    width: 200px;
    text-align: left;
    padding: 0;
    margin: 0;
}
#meetingInfo b{
    color:red;
    font-size: 20px;
    float: right;
    margin-right: 10px;

}
#meetingInfo{
    bottom:100px;
}
.mui-content {
    /* padding: 10px; */
}
</style>
