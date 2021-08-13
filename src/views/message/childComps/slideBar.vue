<<template>
    <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
        <div class="mui-scroll">
            <a class="mui-control-item mui-active" @click="showMessage(2)">
                全部消息
            </a>
            <a class="mui-control-item"  @click="showMessage(0)">
                未读消息
            </a>
            <a class="mui-control-item"  @click="showMessage(1)">
                已读消息
            </a>
        </div>
        <!-- <div class="mui-scroll">
           
        </div> -->
    </div>
</template>
<script>
export default {
    name: 'slideBar',
    components: { 
     },
    directives: {  
    },

    data() {
        return {
            dataType:2
        };
    },
    created() {
        
    },
    updated() {
       
    },  
    
    mounted() {  
        mui.init({
            swipeBack: false
        }); 
    },

    methods: {
        showMessage(type){
            this.$store.commit("changeStatus",type);
            this.$emit('showMessage', this.dataType);
             
        }
    },
};
</script>
<<style lang="" scoped>
.mui-slider-indicator.mui-segmented-control {
    background-color: #efeff4;
}
.mui-scroll-wrapper {
    height: 100%;
}
</style>