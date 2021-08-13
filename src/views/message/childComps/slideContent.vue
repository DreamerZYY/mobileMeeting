<<template>
    <div class="mui-slider-group">
        <slot>
            <slide-item ref="slideItem"></slide-item>
         
        </slot>
    </div>
</template>
<<script>
import slideItem from './slideItem'
export default {
    name: 'slideContent',
    components: { 
        slideItem
    },

    directives: { },

    data() {
        return {
            dataType:2
        };
    },
    created() {
       
    },
    
    mounted() {
         mui.init({
            swipeBack: false
        });
    },

    methods: {
        showMessage(){
            this.$refs.slideItem.getMessage()
        }
    },
};
</script>