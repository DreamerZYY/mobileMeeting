<template>
    <header class="mui-bar mui-bar-nav">
        <div class="left">
            <slot name="goback"></slot>
        </div>
        <div class="center">
            <slot name="headername"></slot>
        </div>
        <div class="right">
            <slot name="rightSlot"></slot>
        </div>  
    </header> 
</template>

<script>
export default {
    name:"Header"
}
</script>

<style>

</style>
