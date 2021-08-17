<template>
        <!--菜单部分-->
        <aside id="offCanvasSide" class="mui-off-canvas-right">
            <div id="offCanvasSideScroll" class="mui-scroll-wrapper">
                <div class="mui-scroll">
                    <p id="selectStartTime" class="commonTime">
                        <span id="startTime" align="left" class="commonSelectTime">开始时间</span>
                        <span id='time1' class="selectBtn" align="right" data-options='{}'>选择开始时间
                            <span class="mui-icon mui-icon-forward"></span>
                        </span>							
                    </p>
                    <p id="selectEndTime" class="commonTime">
                        <span id="endTime" align="left" class="commonSelectTime">结束时间</span>
                        <span id='time2' class="selectBtn" align="right" data-options='{}'>选择结束时间
                            <span class="mui-icon mui-icon-forward"></span>
                        </span>
                    </p>
                    <p class="commonTime">
                        <span class="commonSelectTime">参会人数</span>
                        <input id="selectNumCount" class="commonInput" type="text" value="" placeholder="容纳人数" autocomplete='off'/>
                    </p>
                    <div class="selectDevice">
                        <p class="commonTime">
                            <span style="margin-left: 10px;">设备名</span>
                            <input id="selectDevice" class="commonInput" type="text" value="" placeholder="多个设备用英文,分隔 " autocomplete='off'/>
                        </p>
                       
                    </div>
                </div>
                <div class="bottomBtn">
                    <button type="button" class="commSubmitBtn" id="resetBtn">
                        重置
                    </button>
                    <button type="button" class="commSubmitBtn activeBtn" id="submitBtn">
                        确认
                    </button>
                </div>
            </div>
        </aside>
</template>

<script>
export default {
    name:'Inquire',
    data(){
        return{
            shown:false
        }
    },
    props:{
        fathershow:false,    
    },
    watch:{
        fathershow:{
            handler:function(){
               debugger;
                 this.shown=mui('#offCanvasWrapper').offCanvas().isShown()
                 console.log(this.shown);
                if(this.fathershow){
                    mui('#offCanvasWrapper').offCanvas('show');
                   console.log(this.fathershow+"111");
                }
                else{
                    mui('#offCanvasWrapper').offCanvas('close');
                     console.log(this.fathershow+"222");
                }
            }
        },
        shown:{
            handler:function(){
                // console.log(this.shown)
                // if(!this.shown){
                //     this.fathershow=true;
                // }else{
                //     this.fathershow=false;
                // }
               // console.log(mui('#offCanvasWrapper').offCanvas().isShown())
            }
        }
    },
    mounted() {
        mui.init();
    },
    methods:{
        btnClick(){
            debugger;
            var offCanvasWrapper = mui('#offCanvasSide');
            offCanvasWrapper.offCanvas('show');
        }
    }
}
</script>

<style scoped>
#offCanvasSide{
    background: #fff;
}
.mui-media-body{

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
#.commonTime span{
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
#selectNumCount{
    margin: 0;
    padding: 0px 10px;
    
    line-height: 20px;
    font-size: 14px;
    display: block;
    height: 100%;
    float: right;
    margin-right: 10px;
    width: 100px;
    border: none;
    text-align: right;
}
#selectDevice{
    margin: 0;
    padding: 0px 10px;
    
    line-height: 20px;
    font-size: 14px;
    display: block;
    height: 100%;
    float: right;
    margin-right: 10px;
    width: 150px;
    border: none;
    text-align: right;
}
.selectDevice{
    color:#8f8f94;
    font-size: 14px;
}
#roomDeviceList li{
    display: block;
    float: left;
    font-size: 4px;
    border: 1px solid #888;
    margin-right: 5px;
    padding: 2px;
    margin-left: 10px;
    margin-bottom: 10px;
}
.bottomBtn{
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: 40px;
    background: #f7f7f7;
}
.bottomBtn button{
    width: 50%;
    border: none;
    margin-left: 0;
    box-sizing: border-box;
    margin-right: 0px;
    float: left;
    height: 100%;
    border-radius: 0;
}
.activeBtn{
    background: #007aff;
    color: #fff;
    font-size: 14px;
}
.mui-toast-container {bottom: 50% !important;}  

</style>
