<template>
<div>
    
    <li v-for="(item,index) in folder" class="mui-table-view-cell mui-collapse" :pdepartID="item.pdeptID" :departID="item.deptID" >
        <span class="mui-checkbox mui-left">
            <input name="checkbox" type="checkbox" @change="checkUserEvent($event.target)"/>
        </span>
        <a class="mui-navigate-right qq">{{item.deptName}}</a>
        <!-- 生成叶子结点 -->
         <ul v-if="item.userLists && item.userLists.length > 0" class="mui-table-view mui-table-view-chevron">
            <li class="mui-table-view-cell leaf" v-for="leaf in item.userLists" ref="leaf" :departID="leaf.deptID" :email="leaf.email" :fullname="leaf.fullname" :tel="leaf.tel" :userID="leaf.userID" :username="leaf.username" :userlevel="leaf.userlevel" :pdepartID="leaf.pdeptID">
                <span class="mui-checkbox mui-left">
                    <input name="checkbox" type="checkbox" @change="checkUserEvent($event)"/>
                </span>
                <a>{{leaf.fullname}}</a>
            </li>
        </ul> 
        <!-- 递归调用 -->
        <ul v-if="item.deptLists && item.deptLists.length > 0" :class="[{'specClass':(item.userLists && item.userLists.length > 0)}]" class="mui-table-view mui-table-view-chevron">
            <trees :folder="item.deptLists"></trees>
        </ul>  
    </li>
</div>
</template>

<script>
import loginInfo from '@/commonjs/util'
var manListArr=[];
var allInfoArr=[];
export default {
    name:'Trees',
    components:{  
    },
    data(){
        return{
            currentInput:{},
            changeStatus:true,
            mainlistStr:'',
            manListArr1:[],
            allInfoArr1:[],
            detailInfo: {}
        }
    },
    props:{
         folder:Array,
         mySeJoin:Boolean//存储变量 是否参会  和orderEdit组件进行通信
    },
    created() {
        // var that=this;
        // setTimeout(function(){
        //     that.selectUser();
        // },1000);
       
    },
    watch:{
        mySeJoin(){
           // this.changeStatus=this.mySeJoin
            //this.selectUser();
          
        },
        
    },
    mounted() {
    },
    computed: {
        mainList() {
           return this.manListArr;
        },
    },
    methods: {
        checkUserEvent(e){   
            //alert("1,"+this.manListArr);
            console.log(111);
           var _this=this;
            _this.mainlistStr='11';
            _this.currentInput=e;
            _this.changeStatus=e.target.checked;
            var parent=e.target.parentNode.parentNode;
            var input=parent.getElementsByClassName("mui-table-view-cell");
            
            if(parent.getAttribute("departid")!=undefined){//说明选中的是部门
                //var manList1=[];	
               
                for(var i=0;i<input.length;i++){
                    var moreInfoObj=new Object();
                    input[i].getElementsByTagName("input")[0].checked=_this.changeStatus;
                    var userId=input[i].getAttribute("userid");
                    var userEmail=input[i].getAttribute("email");
                    var userTel=input[i].getAttribute("tel");
                    var userName=input[i].getAttribute("username");
                    var fullname=input[i].getAttribute("fullname");
                    var userlevel=input[i].getAttribute("userlevel");
                    var tel=input[i].getAttribute("tel");
                    moreInfoObj.userID=userId;
                    moreInfoObj.fullname=fullname;
                    moreInfoObj.userlevel=userlevel;
                    moreInfoObj.SeatCode="0";
                    moreInfoObj.tel=userTel;
                    if(_this.changeStatus){
                        if(manListArr.includes(userId)){
                        }else{
                            if(userId!=null){//null为部门，不加入数组中
                                manListArr.push(userId);
                                allInfoArr.push(moreInfoObj);
                            }	
                        }
                    }else{
                        for(var a=0;a<allInfoArr.length;a++){
                            if(manListArr[a]==userId){
                                manListArr.splice(a,1);
                            }
                        }
                        for(var k=0;k<allInfoArr.length;k++){
                            if(allInfoArr[k].userID==userId){
                                allInfoArr.splice(k,1);
                            }
                        }
                    }   
                }
            }else{
                var moreInfoObj=new Object();
                var userId=parent.getAttribute("userid");
                var userEmail=parent.getAttribute("email");
                var userTel=parent.getAttribute("tel");
                var userName=parent.getAttribute("username");
                var fullname=parent.getAttribute("fullname");
                var userlevel=parent.getAttribute("userlevel");
                moreInfoObj.userID=userId;
                moreInfoObj.fullname=fullname;
                
                moreInfoObj.userlevel=userlevel;
                moreInfoObj.SeatCode="0";
                moreInfoObj.tel=userTel;
                if(_this.changeStatus){
                    if(manListArr.includes(userId)){
                    }else{
                        manListArr.push(userId);
                        allInfoArr.push(moreInfoObj);
                   
                    }
                }else{			
                    for(var a=0;a<allInfoArr.length;a++){
                        if(manListArr[a]==userId){
                            manListArr.splice(a,1);
                        }
                    }
                    for(var h=0;h<allInfoArr.length;h++){
                        if(allInfoArr[h].userID==userId){
                            allInfoArr.splice(h,1);
                        }
                    }
                }
            }
            var pid=parent.getAttribute("pdepartid");
            var userList=document.querySelectorAll("li[pdepartid='"+pid+"']");//所属部门的id
            var sameCount=0;//用于计数,判断是否当前部门下的人员全部被选中
            if(pid!="0"){
                if(!this.changeStatus){
                    document.querySelector("li[departid='"+pid+"']").getElementsByTagName("input")[0].checked=this.changeStatus;
                }else{
                    for(var j=0;j<userList.length;j++){
                        
                        if(userList[j].getElementsByTagName("input")[0].checked!=this.changeStatus){
                            //return false;
                        }else{
                            sameCount++;
                            if(sameCount==userList.length){
                                document.querySelector("li[departid='"+pid+"']").getElementsByTagName("input")[0].checked=this.changeStatus;
                                console.log(sameCount);
                            }
                        }		
                    }
                }	
            }
            if(document.getElementById("userTree").querySelectorAll("li[userid]").length==manListArr.length){
                
                document.querySelector("li").getElementsByTagName("input")[0].checked=this.changeStatus;
            }
            this.manListArr1=manListArr;
            this.allInfoArr1=allInfoArr;
            // this.mySeJoin=this.changeStatus;
            this.$emit('mySeJoin111', this.changeStatus);
        },
        selectUser(){
            debugger;
            //每次打开回到最顶部
            mui('#offCanvasSideScroll').scroll().scrollTo(0, 0)
            var queryLi=document.querySelector("li");
            //当不是第一次选择时，将之前的选中，并将列表展开
            queryLi.classList.add("mui-active");
          //  console.log(this.mySeJoin);
            if(this.mySeJoin){
                if(!document.getElementById("userTree").querySelector("li[userID='"+loginInfo.loginInfo.data.userid+"']").getElementsByTagName("input")[0].checked){
                    console.log("1_"+document.getElementById("userTree").querySelector("li[userID='"+loginInfo.loginInfo.data.userid+"']").getElementsByTagName("input")[0].getElementsByTagName("input")[0]);
                    document.getElementById("userTree").querySelector("li[userID='"+loginInfo.loginInfo.data.userid+"']").getElementsByTagName("input")[0].click();
                }	
            }else{
                if(document.getElementById("userTree").querySelector("li[userID='"+loginInfo.loginInfo.data.userid+"']").getElementsByTagName("input")[0].checked){ 
                    console.log("2_"+document.getElementById("userTree").querySelector("li[userID='"+loginInfo.loginInfo.data.userid+"']").getElementsByTagName("input")[0].getElementsByTagName("input")[0]);
                   document.getElementById("userTree").querySelector("li[userID='"+loginInfo.loginInfo.data.userid+"']").getElementsByTagName("input")[0].click();
                }	
            }
            
        }
    },
}
</script>

<style scoped>
.mui-off-canvas-left, .mui-off-canvas-right{
    background:#fff;
}
.mui-card{
    margin:0;
}
#selectUserTitle{
    background:#fff;
    padding: 10px;    
    border-bottom: 1px solid #aaa;
}

.mui-table-view-cell.mui-active{
    background: #fff;
}
.mui-table-view-cell.mui-checkbox.mui-left, .mui-table-view-cell.mui-radio.mui-left{
    padding-left: 0px;
}
.mui-checkbox input[type=checkbox], .mui-radio input[type=radio]{
    position: unset;
}
.mui-checkbox.mui-left input[type=checkbox], .mui-radio.mui-left input[type=radio]{
    float: left;
}
.mui-checkbox.mui-left label, .mui-radio.mui-left label{
    display: contents;
}
.mui-table-view-chevron .mui-table-view-cell>a:not(.mui-btn){
    /* display: contents; */
    float: left;
    width: calc(100% - 80px);
    margin: -7px 0px;
}
.mui-table-view-chevron .mui-table-view-cell>a:not(.mui-btn).mui-active{
    margin-left:0px;
}
.muiTreeDepart{
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    padding-right: 65px;
    position: relative;
    overflow: hidden;
    padding: 11px 5px;
}
.muiTreeDepart a{
    margin-right: -65px;
    position: relative;
    display: block;
    overflow: hidden;
    margin: -11px -15px;
    padding: inherit;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: inherit;
    float: left;
    width: calc(100% - 20px);
    margin-left: 10px;
}
.mui-icon-extra{
    display: block;
    float: left;
}
.mui-table-view-cell.mui-collapse .mui-table-view{
    margin-top:30px;
    margin-bottom: -15px;
}
.mui-active{
    margin-left:0px!important;
    /* padding-left: 31px!important; */
    
}
.mui-table-view-chevron .mui-table-view-cell{
    padding-right: 25px;
}
.mui-checkbox, .mui-radio{
    display: block;
    float: left;
}
.mui-table-view-chevron{
    margin-top: 10px;
}
.specClass{
    margin-top:10px!important;
}
</style>
