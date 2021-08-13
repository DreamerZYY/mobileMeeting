<<template>
    <div name="content" id="itemmobile" class="mui-slider-item mui-control-content mui-active">
        <div id="scroll" class="mui-scroll-wrapper">
            <div class="mui-scroll">
                <ul class="mui-table-view" id="messageList">
                    <li v-for="item in msgList" class="mui-table-view-cell" @click="readMessage(item.ID)">
                        <a v-if="item.Status==0" :messageId="item.ID" :type="item.Type" @click='readMessage(item.ID)' class="notread">
                            {{item.Title.split("@")[1]}}
                        </a>
                        <a v-else :messageId="item.ID" :type="item.Type" @click='readMessage(item.ID)'>
                            {{item.Title.split("@")[1]}}
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import {request} from '@/network/request'
export default {
    name: 'slideItem',
    components: {},

    directives: {},

    data() {
        return {
            itemid:'',
            scrollid:'',
            msgList:[],
            msgList1:[],
            msgList2:[],
            msgList3:[],
            pageIndex:1,
            pageSize:20,
            pageTotal:1,
            isOver:false,
            pullToRefresh:'',
            msgIndex:2,
            
        };
    },
    props:{
       
    },
    watch:{
        type(newvalue,oldvalue){
           this.msgIndex= newvalue;
        }
    },
    computed:{
        
    },
    created(){
        this.getMessage();      
    },
    mounted() {
        var that = this; 
        mui.init({
            swipeBack: false,
        })
        that.pullToRefresh= mui('#itemmobile').pullToRefresh({         
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
                        that.getMessage(1);
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
        getMessage(type1){ 
            var page= this.pageIndex;
            var total=this.pageTotal;
            if(type1!=""&&type1!=undefined){
                page= this.pageIndex;
                total=this.pageTotal;
            }else{
                this.pageIndex=1;
                this.pageTotal=1;
                page= this.pageIndex;
                total=this.pageTotal;
                this.msgList=[];
            }
            request({
                url:'api/infrom/getlist',
                headers:{
                    "Authorization":localStorage.getItem("Ticket")
                },
                params:{
                    page:page,
                    status:this.$store.state.aa,
                    pageSize:this.pageSize
                } 
            }).then(res=>{
                this.pageTotal=res.data.pageCount;
                var addedArray = [];
                if(this.pageIndex<=this.pageTotal){ 
                    addedArray=res.data.data;
                    this.msgList=this.msgList.concat(addedArray)
                    this.pageIndex++;
                }else{
                    this.isOver = false;//上拉没有更多数据时将变量设置为false
                    this.pullToRefresh.endPullUpToRefresh(true); //传true代表无更多信息，默认可不传；  
                    this.pullToRefresh.setStopped(true); 
                    setTimeout(function(){
                        mui.toast('我是有底线的.');
                    },3000);
                }
            })
        },
        //读取消息
        readMessage(id){
             request({
                url:'api/infrom/getlist',
                headers:{
                    "Authorization":localStorage.getItem("Ticket")
                },
                params:{
                    id:id
                } 
            }).then(res=>{
                // this.$store.commit("changeStatus",type);
                // this.$emit('showMessage', this.dataType);
            })
        },
        itemMobileId(){
            return "item"+this.type+"mobile"
        },
        scrollTypeid(){
            return "scroll"+this.type
        },
        readMessage(id){
            this.$router.push('/readmessage/'+id);
            // this.$router.replace(this.path).catch(err=>{})//加catch是解决多次点击同一个按钮报错的问题;
            this.$store.commit("changeItem",this.$route.meta.title)
        }
    },
};
</script>
<<style scoped>
    .mui-control-content {
        background-color: white;
        min-height: 215px;
    }
    .mui-scroll-wrapper {
        height: 100%;
    }
    .notread{
        background:#e8e7e7;
    }
</style>