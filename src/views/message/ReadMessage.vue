<template>
    <div id="msgContent">
        <ul class="mui-table-view" id="msgUl">
			<li v-for="(item,index) in titleContent">
                <div v-if="index==0" v-html="content(item)">
                    
                </div>
                <div v-else>
                    {{item}}
                </div>
               
            </li>
        </ul>
        
        <div id="infoBtn">
            <li v-if="dataArr.Status==1">
                
            </li>
            <li v-else-if="dataArr.Status==2" style="color:#006cff">
                "您已同意"
            </li>
            <li v-else-if="dataArr.Status==3" style="color:red;">
                "您已拒绝"
            </li>
            <li v-else>
                <p v-if="dataArr.Type==1||dataArr.Type==8">
                    <button type="button" @click="mesApproval(true,InstanceID,NodeID)">同意</button>
                    <button type="button" @click="mesApproval(false,InstanceID,NodeID)">拒绝</button>
                </p>
                 <p v-if="dataArr.Type==2">
                    <button type="button" @click="orderMeeting(true)">同意</button>
                    <button type="button" @click="orderMeeting(false)">拒绝</button>
                </p>
            </li>
        </div>
    </div>
</template>

<script>
import {request} from '@/network/request'
export default {
    name:'ReadMessage',
    components:{

    },
    data(){
        return{
            msgid:this.$route.params&&this.$route.params.id,
            dataArr:[],
            titleContent:[],
            InstanceID:'',
            NodeID:''
        }
       
    },
    created() {
          //不同页面显示的header内容不同
        this.$emit('showLeft', true,true,true);
        this.getOneMsg();
    },  
    computed:{
        content(){
            //需使用闭包传值 否则参数不正确
            return function(ele){
                debugger;
                return ele.split("】")[0]+"】<br>"+ ele.split("】")[1]
            }
            
        }
    },
    methods:{
        getOneMsg(){
            request({
                url:'api/infrom/getone',
                data:'get',
                headers:{
                    "Authorization":localStorage.getItem("Ticket")
                }, 
                params:{
                    "id":this.msgid
                }
            }).then(res=>{
                debugger;
                console.log(res);
                this.dataArr=res.data;
                debugger;
                var msgArr=[];
                if(res.data.Title.indexOf("@")>=0){
                    msgArr=res.data.Title.split("@");
                    if(msgArr.length>1&&msgArr[1].indexOf("；")>=0){
                        this.titleContent=msgArr[1].split("；");
                    }
                }
                if(res.data.Title.split("@")[0].indexOf("InstanceID")>=0){
                    this.InstanceID=res.data.Title.split("@")[0].split("InstanceID=")[1].split("&")[0];	
                }
                if(res.data.Title.split("@")[0].indexOf("NodeID")>=0){
                    this.NodeID=res.data.Title.split("@")[0].split("NodeID=")[1].split("&")[0];
                }
            })
        },
        mesApproval(type,inID,nodeID){
            request({
                url:'api/order/approval',
                method:'post',
                headers:{
                    "Authorization":localStorage.getItem("Ticket")
                }, 
                data:{
                    "isOK":type,
                    "processContent":"",
                    "inID":inID,
                    "nodeID":nodeID,
                    "MsgID":this.msgid
                }
            }).then(res=>{
                this.$router.push('/Message');
            })
        },
        orderMeeting(type){
            request({
                url:'api/conf/approval',
                method:'post',
                headers:{
                    "Authorization":localStorage.getItem("Ticket")
                }, 
                data:{
                    "isOK":type,
					"processContent":"",
                    "MsgID":this.msgid
                }
            }).then(res=>{
                this.$router.push('/Message');
            })
        }
    },

}
</script>

<style scoped>
li{
    list-style: none;
}
#msgContent{
    position: absolute;
    top:44px;
    bottom: 50px;
    width: 100%;
    padding-top: 0;
    height: 100%;
    background: #fff;
}
#msgUl{
    border: none;
    padding: 20px 0;
    width: 90%;
    margin: auto;
    font-size: 17px;
}
#msgUl li{
    line-height: 40px;
}
#infoBtn{
    text-align: center;
}
#infoBtn button{
    margin-right: 10px;
    margin-top: 20px;
}
</style>

