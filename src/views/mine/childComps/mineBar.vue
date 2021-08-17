<template>
    <div class="mui-content">
        <table id="barTop" border="0" cellpadding="0" cellspacing="0">
            <tr>
                <td id="myOrder" class="index">
                    <a class="index-name" @click="changeShowing(1)">
                        <img src="@/assets/images/mineyuyue.png" class="img"/><br>
                        <span class="index-name">我的预约</span>
                    </a>
                </td>
                <td id="myMeeting" class="index">
                    <a class="index-name" @click="changeShowing(2)">
                        <img src="@/assets/images/minehuiyi.png" class="img"><br>
                        <span class="index-name">我的会议</span>
                    </a>
                </td>
                <td class="index">
                    <a class="index-name" @click="changeShowing(3)">
                        <img src="@/assets/images/mineguanli.png" class="img"/><br>
                        <span class="index-name">常用会议室</span>
                    </a>
                </td>
            </tr>
        </table>
        <router-view @showLeft="showLeft"/>
    </div>
</template>

<script>
export default {
    name:'mineBar',
    
    created() {
        
    },
    mounted() {
       
    },
    
    methods: {
        changeShowing(type) {
            if(type=="1"){
                //此处无法使用replace,使用replace 后无法返回
                this.$router.push('/mine/myOrder').catch(err=>{});
                //this.$router.push('/myOrder').catch(err=>{})//加catch是解决多次点击同一个按钮报错的问题;
            }else if(type=="2"){
                 this.$router.push('/mine/myMeeting').catch(err=>{});
                //this.$router.push('/myMeeting').catch(err=>{})//加catch是解决多次点击同一个按钮报错的问题;
            }else if(type=="3"){
                this.$router.push('/mine/myRoom').catch(err=>{});
               // this.$router.push('/mine/myRoom').catch(err=>{})//加catch是解决多次点击同一个按钮报错的问题;
            }
            this.$store.commit("changeItem",this.$route.meta.title)
        },
        showLeft(a,b,c){
            this.$emit('showLeft', a,b,c);
        }
        
    },
}
</script>

<style scoped>
.mui-content{
    width:100%;
}
#barTop{
    width: 100%;
    margin: 0;
    background: #fff;
}
#barTop tr{
    width:100%;
}
.index{
    height: 95px;
    width: 33.3%;
    border: 1px solid #dddddd;
    text-align: center;
    border-top:none;
}
.index a{
    display:block;
}
.img{
    width: 42px;
    margin-bottom: 10px;
    max-width: 32px;
    vertical-align: middle;
    /* margin-top: 10px;	 */
}
.index-name{
    font-size: 15px;
    color: #000000;
}
.signOut{
    position:absolute;
    top:-44px;
    right:0;
    z-index:99;
}
</style>
