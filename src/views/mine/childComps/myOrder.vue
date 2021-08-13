<template>
    <div class="mui-content">
         <div id="slider" class="mui-slider mui-fullscreen">
            <div id="sliderSegmentedControl"
            class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <a name="leftName" :class="{'mui-active':isActive,'mui-control-item':true}"  id="no" @click="myOrder('0')">
                    已预约
                </a>
                    <a name="leftName" :class="{'mui-active':otherActive,'mui-control-item':true}"id="have" @click="myOrder('1')">
                    已结束
                </a>   
            </div>
            <order-item ref="orderitem" :type="type"/>
         </div>
    </div>
</template>
<<script>
import sliderbarMine from './sliderbarMine'
import orderItem from './orderItem'

export default {
    name: 'myOrder',
     data(){
        return{
           type:"0",
           isActive:true,
           otherActive:false
        }
    },
    components: { 
        sliderbarMine,
        orderItem
    },
    created() {
        this.$store.commit('changeOrderStatus',this.type); 
    }, 
    mounted() {
        
    },
    methods: {
        myOrder(res){
            debugger;
            this.type=res;
            this.$store.commit('changeOrderStatus',res); 
            this.$refs.orderitem.myOrder("");
            if(res==0){
                this.isActive=true;
                this.otherActive=false;
            }else if(res==1){
                this.isActive=false;
                this.otherActive=true;
            }
        }
        
        
    },
};
</script>
<<style  scoped>
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
        bottom:50px;
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

    
   
    #list,
    #list2 {
        margin-top: 12px;
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

    #sliderSegmentedControl{
    /* border-bottom: 1px solid #aaa; */
    height:40px;
    line-height:40px;
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
    #no,
    #have {
        width: 50%;
    }
    .mui-slider .mui-segmented-control.mui-segmented-control-inverted .mui-control-item.mui-active{
        background-color: #007aff;
        color: #fff;
        height: 40px;
        line-height: 40px;
    }
</style>