<template>
    <div id="employMeeting">
        <div id="topTime">
            <ul id="startTimeBlockUl" ref="startTimeBlockUl">
               <li v-for="index in 15" :class="setClass(index)">{{index|filterName}}</li>
            </ul>  
        </div>
        <div id="meetingContent">
            <ul id="meetingContentBlockUl" ref="meetingContentBlockUl">
     
                <li v-for="index in 15" class="timeBlock">
                    
                    <b time=" " v-html="emptyBlock"></b><b v-html="emptyBlock"></b><b v-html="emptyBlock"></b><b v-html="emptyBlock"></b>
                </li>
            </ul>
        </div>
        <div id="bottomTime">
            <ul id="endTimeBlockUl" ref="endTimeBlockUl">
                <li v-for="index in 15" :class="setEndClass(index)">{{index|filterEndName}}</li>
            </ul>
        </div>
        
    </div>
</template>

<script>
import {getNowDate} from '@/commonjs/util.js'
import {addZero} from '@/commonjs/util'
import {getTimeSec} from '@/commonjs/util'
export default {
    name:'EmplyMeeting',
    data(){
        return{
            // time1:'',
            // time2:''
            emptyBlock:"&nbsp;"
        }
    },
    props:{
        orderList:Array,
        time1:String,
        time2:String
    },
    created(){
       this.counputedInner()
    },
    methods:{
        setClass(num){
            return "item"+(num+7);
        },
        setEndClass(num){
            return "item"+(num+8);
        },
        counputedInner(){
            if(this.orderList.length!=0){
                for(var i=0;i<this.orderList.length;i++){
                    var str=this.orderList[i]
                    var stratTime=str.StartTime;
                    var endTime=str.Endtime;
                    var startInfo=stratTime.split(" ")[1];
                    var endInfo=endTime.split(" ")[1];
                    var startH=startInfo.split(":")[0];
                    var startM=startInfo.split(":")[1];
                    var startS=startInfo.split(":")[2];
                    var endH=endInfo.split(":")[0];
                    var endM=endInfo.split(":")[1];
                    var endS=endInfo.split(":")[2];
                    var querystartId=this.$refs.startTimeBlockUl;
                    var queryStartTime=querystartId.querySelectorAll('li');
                    var meetingIndex=0;
                    var endIndex=0;
                    for(var m=0;m<queryStartTime.length;m++){
                        if(queryStartTime[m].innerHTML.split(":")[0]==startH){
                            meetingIndex=m;
                            break;
                        }
                    }
                    var timeSec=(getTimeSec(stratTime,endTime))/(1000*60);//开会总用时
                    var spanIndex=0;
                    //开始时间所占用的第几块
                    if(startM!="00"){
                        spanIndex=Math.ceil(parseInt(startM)/15)
                    }else{
                        spanIndex=Math.ceil(parseInt(startM)/15)+1;
                    }
                    //结束时间所占用的第几块
                    endIndex=Math.ceil(parseInt(endM)/15);
                    var totalBlock=((parseInt(endH)-parseInt(startH))-1)*4+(4-spanIndex+1)+endIndex;//会议用时占用的所有块数
                    
                    var startBlock=((parseInt(startH)-8)*4)+spanIndex;
                    //开始会议所占用的第几块
                    var blockul=this.$refs.meetingContentBlockUl;
                    var lengthb=blockul.querySelectorAll("b");
                    for(var k=startBlock;k<totalBlock+startBlock;k++){
                        lengthb[k-1].innerHTML="有会";
                    }
                }
            }else{
                if(this.time1!=""&&this.time1!=undefined){
                    var blockul=this.$refs.meetingContentBlockUl;
                     var lengthb=blockul.querySelectorAll("b");
                    if(blockul!=undefined){
                        
                        for(var k=0;k<lengthb.length;k++){
                            lengthb[k].innerHTML="&nbsp;";
                        }
                      }
                    
                }
                
            }
            
        },
       
       
    },
    filters:{
        filterName(name){
            return addZero((name+7),2,'0')+":00";
        },
        filterEndName(name){
            return addZero((name+8),2,'0')+":00";
        }
    },
    computed:{
        startListItemTime(item){
            return item.StartTime.split(" ")[0]
        },
        timeCom(){
            return time1.split(' ')[0]
        },
        
        //获取时间差,并返回秒数
        getTimeSec(str1,str2){
            //var date=new Date();
            var str=new Date(str2).getTime()-new Date(str1).getTime();
            return str;
        }
    },
    watch:{
        // orderList(newvalue,oldvalue){
        //     debugger;
        //     this.counputedInner();
        // }
    }
   
}
</script>

<style scoped>
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
#meetingContentBlockUl{
    /* height: 200px; */
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

</style>
