<template>
    <div class="box">订单</div>
</template>


<script setup>
import { ref, watch } from 'vue'
const config = useRuntimeConfig();
const order = useOrder()
const getorder = async () => {
    let { data: buyorder } = await useFetch(`/car/getbuydata`, { method: 'post', server: false });
    if (!config.API_BASE) {
        watch(()=>buyorder.value,()=>{
            console.log(buyorder.value)
            order.value=buyorder.value
        })
    }
}
getorder()
</script>




<style lang="less" >
@import "@/assets/less/member/order.less";
</style>