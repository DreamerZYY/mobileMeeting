<template>
    <div id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
        <div class="mui-scroll">
            <a class="mui-control-item mui-active" id="no" @click="myOrder('0')">
                已预约
            </a>
            <a class="mui-control-item" id="have" @click="myOrder('1')">
                已结束
            </a>
        </div>
    </div>
</template>
<<script>
export default {
    name: 'sliderbarMine',
    data(){
        return{
           type:"0"
        }
    },
    mounted() {
       
    },

    mounted() {
        
    },
    methods: {
        myOrder(type){
            debugger;
            this.type=type;
            this.$store.commit('changeOrderStatus',type);
            this.$emit('myOrder', type);
        }
    },
};
</script>
<style  scoped>
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