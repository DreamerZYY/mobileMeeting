<template>
    <div class="login-layout mui-ios mui-ios-13 mui-ios-13-2 mui-ios-13-2-3">
        <div class="loginBox">
            <form id='login-form'>
                <fieldset>
                    <login-main>
                        <div class="block input-icon icon-logo">
                            <img src="@/assets/images/login/hflogo.png" style="width: 50px;height: 50px;position: absolute;left: 36%;">												
                        </div>
                    </login-main>
                    <login-main>
                        <div class="block input-icon icon-logo">
                            <label for="loginname" class="login-label name-label lable12">慧峰会议预约</label>
                        </div>
                    </login-main>
                    <login-main>
                        <div class="block input-icon labelDiv" style="">
                            <select class="form-control" id="companyID">
                                <option :value="item.companyID" v-for="(item,index) in companyList">{{item.companyName}}</option>
                            </select>	
                            <i id="icon-select"></i>
                        </div>
                    </login-main>
                    <login-main>
                        <div class="block input-icon labelDiv">
                            <label for="loginname" class="login-label name-label lable11">
                                <img src="@/assets/images/login/user.png" />
                            </label>
                            <input  autocapitalize="off" autocorrect="off"  type="text" class="form-control" id="name" placeholder="登录名">														
                        </div>
                    </login-main>
                    <login-main>
                        <div class="block input-icon labelDiv">
                            <label for="loginpwd" class="login-label name-label lable11">
                                <img src="@/assets/images/login/password.png" />
                            </label>
                            <input type="password" class="form-control" id="pwd" placeholder="密码">				
                        </div>
                    </login-main>
                    <login-main>
                        <div class="block input-icon" style="left:16%;">
                            <button type="button" id="login" @click="loginUser()">登录</button>
                        </div>
                    </login-main>
                </fieldset>
            </form>
        </div>
    </div>
</template>

<script>
import LoginMain from './loginCom/LoginMain'
import {request} from '../../network/request'
import {getCookie,addCookie} from '../../commonjs/util.js'
export default {
    name:'Login',
    components:{
        LoginMain
    },
    data(){
        return{
            companyList:[]
        }  
    },
    created(){
        request({
            url:'api/users/getcompanyList'
            }).then(res=>{
                this.companyList=res.data;
            }).catch(err=>{
        })
    },
    methods: {
        loginUser() {
            var companyID=document.querySelector("#companyID").value;
		 	var username=document.querySelector("#name").value;
		 	var password=document.querySelector("#pwd").value;
            request({
                url:'api/users/gettokenbyjwt/v2',
                params:{
                    companyid:companyID,
		 			username:username,
		 			password:password
                },
                method:'get',
            }).then(res=>{
                
                var loginTicket={ticket:res.data.Ticket,maxticket:res.data.MaxTicket}
                if(res!=undefined){
                    this.$store.commit("getTicket",loginTicket);
                    this.$router.replace('/main');
                    localStorage.setItem("Ticket","Bearer "+res.data.Ticket);
                    localStorage.setItem("MaxTicket",res.data.MaxTicket);
                }
            }).catch(err=>{

            })
        },
    },
}
</script>

<style scoped>

html, body{
    height: 100%;
    width: 100%;
    overflow: hidden;
}

* {
    padding: 0;
    margin: 0;
}
#app{
    width: 100%;
    height: 100%;
}
.login-layout{
    padding-bottom: 0;
    background-color: #e4e6e9;
    min-height: 100%;
    font-family: 'Open Sans';
    font-size: 13px;
    color: #393939;
    line-height: 1.5;
    background: url("~@/assets/images/login/login.jpg") no-repeat; 
    background-size: 100% 100%;
    /*min-height:700px;*/
    /*overflow:hidden;*/
}

fieldset{
    border: 0;
}

.login-layout label {
    margin-bottom: 11px;
}
.lable12 {
    position: absolute;
    z-index:3;
    top: 2px;
    width: 100%;
    font-size: 20px;
    color: #fff;
    text-align: center;
}
.loginBox{
    width: 98%;
    margin: auto;
    position:relative;
    top: 134.4px;
}
.input-icon {
    position: relative;
}
.block {
    display: block!important;
}
.login-layout label {
    margin-bottom: 11px;
}

.lable11 {
    position: absolute;
    z-index: 3;
    top: 2px;
    left: 6px;
    width: 39px;
    background: url("~@/assets/images/login/user.png") no-repeat;
}
.icon-logo{
    background-color: transparent;
    border-radius: 8px !important;
    width: 67%;
    height: 44px;
    margin: auto;
}

#login-form .labelDiv{
    background-color: transparent;
    border-radius: 8px !important;
    width: 67%;
    height: 44px;
    margin: auto;
    border:1px solid #fcfcfc;
}
.labelDiv img{
    width: 20px;
    height: 20px;
    position: absolute;
    top: 8px;
    left: 6px;
}
#companyID{
    color: black;
    width: 100%;
    position:absolute;
    top:-1px;
    height: 43px; 
    background: rgba(255,255,255,.5);
    border-bottom-right-radius: 8px !important;
    border-top-right-radius: 8px !important;
    padding: 10px;
}

#login,#login:focus{
    border-radius: 8px;
    left: 0px;
    position: relative;
    border: 1px solid transparent;
    text-align: center;
    background-color: transparent;
    border-color: white;
    width: 239px;
    height: 45px;
    font-size:20px;
    color:#fff;
    width: 67%;
    margin:1px;
    letter-spacing:3px
}
#pwd{
    border:0px;
    color: black;
    width: 82%;
    height: 43px;
    margin-left:18.5%;
    background: rgba(255,255,255,.5);
    border-bottom-right-radius: 8px !important;
    border-top-right-radius: 8px !important;
    padding: 10px;
}
#name{
    border:0px;
    color: black;
    width: 82%;
    height: 43px;
    margin-left: 18.5%;
    background-color: rgba(255,255,255,.5);
    border-bottom-right-radius: 8px !important;
    border-top-right-radius: 8px !important;
    padding: 10px;
}

#icon-select{
    height:12px;
    width:12px;
    background:url('~@/assets/images/login/icon_select.png') no-repeat;
    background-size:100% 100%;
    position:absolute;
    top:50%;
    right:5px;
    transform: translate(0,-50%);
    z-index:4;
}

</style>
