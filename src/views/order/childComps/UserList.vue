<template>
    <!--菜单部分-->
    <aside id="offCanvasSide" class="mui-off-canvas-right">
        <div id="offCanvasSideScroll" class="mui-scroll-wrapper">
            <div class="mui-scroll">
                <div class="mui-content">    
                    <div class="mui-card">
                        <p id="selectUserTitle">
                            <input id="searchUser" type="text" placeholder="输入姓名、手机号、或者部门名称" />
                            <span class="mui-icon mui-icon-search" id="searchBtn"></span>       
                        </p>
                        <ul id="userTree" class="mui-table-view mui-table-view-chevron  mui-collapse">						        <trees :folder="userList" ref="tree" :mySeJoin="orderJoin" @mySeJoin111="mySeJoin111"></trees>	
                        </ul>
                        <div id="selectContent" class="userCOntent">
                            <ul id="queryUl">                       
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="bottomBtn">
                    <button type="button" class="commSubmitBtn" id="resetBtn" @click="resetUser()">
                        重置
                    </button>
                    <button type="button" class="commSubmitBtn activeBtn" id="submitBtn" @click="submitUser()">
                        确认
                    </button>
                </div>
            </div>
        </div>  
    </aside>
</template>
<script>
import {request} from '@/network/request'
import Trees from './Trees'
import loginInfo from '@/commonjs/util'
export default {
    name:"UserList",
    components:{
       Trees
    },
    data(){
        return{
            userList:[],
            orderMainListStr:'',//声明变量存储选择选择的人员，方便选择主持人
            newArr:[],
            manListArr:[],
            allInfoArr:[],
            checkMyself:false
        }
    },
    props:{
        orderJoin:Boolean
    },
    created(){
        this.getUserList();
    },
    
    methods: {
        getUserList() {
            request({
                url:'api/users/getuserList',
                headers:{
                    Authorization:localStorage.getItem("Ticket")
                }
            }).then(res=>{
                
                this.userList=res.data;
                var that=this;
               setTimeout(()=>{
                that.$refs.tree.selectUser();
               },2000) 
            }).catch(err=>{

            })
        },
        submitUser(){
            var newArr1=[];
            var treeManList=this.$refs.tree.manListArr1;
            var treeAllInfo=this.$refs.tree.allInfoArr1;
            this.manListArr=treeManList;
            this.allInfoArr=treeAllInfo;
            var offCanvasWrapper = mui('#offCanvasWrapper');
            if(treeManList.length>0){
                this.orderMainListStr=treeManList.join(",");
                for(var k=0;k<treeAllInfo.length;k++){
                    newArr1.push({
                        value:treeAllInfo[k],
                        text:treeAllInfo[k].fullname
                    })
                }    
            }else{
                this.orderMainListStr=treeManList;
            }  
            this.newArr=newArr1;
            if(this.manListArr.includes((loginInfo.loginInfo.data.userid).toString())){
                this.checkMyself=true;
            }else{
                 this.checkMyself=false;
            }
            //向order（父组件）传递数据
            this.$emit('manStr',this.manListArr);
            this.$emit('allStr',this.allInfoArr);
            this.$emit('newStr',this.newArr);
            this.$emit('eleCheck',this.checkMyself);
			offCanvasWrapper.offCanvas('close');
        },
        sendToTree(){
            this.$refs.tree.selectUser();
        },
        closeCanvas(){
            this.$refs.tree.submitUser();
        },
        resetUser(){

        },
        mySeJoin111(res){ 
            this.checkMyself=res;
            this.$emit('orderJoin11', res);
        },
        selectUser(){
            this.$refs.name
        },
        selectUser(){
            this.$refs.tree.selectUser()
        }
    },
    mounted() {
        mui.init();
        //解决侧滑组件导致页面无法滚动的问题
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    },
}
</script>

<style scoped>
.mui-scroll-wrapper{
    padding-bottom: 50px;
    padding-top: 44px;
}
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
#searchUser{
    width:calc(100% - 30px);
    font-size: 10px;
}
.bottomBtn{
    margin-top: 10px;
    text-align: center;
}
#queryUl{
    width:90%;
    margin: auto;
}
#queryUl li{
    line-height: 40px;
}
#queryUl input{
    margin-right:20px;
    margin-top:7px;  
}
.mui-table-view-cell:after{
    display: none;
}
</style>
