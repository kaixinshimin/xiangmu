<template>
    <div class="carts-index">
      <el-icon><Check /></el-icon>    成功添加进您的购物车.
      <el-button class="nothings-main-back" @click="$router.push('/tealist')">
                        继续购物
                    </el-button>
    </div>
</template>
<script setup>
import {
Check
} from '@element-plus/icons'

</script>
<style lang="less" scoped>
.carts-index{
    padding-left: 10px;
   width: 99%;
   height: 50px;
   line-height: 50px;
   margin: auto;
   border: 1px solid #88dfae;
   color: green;
   .icon{
       font-weight: 800;
   }
   .nothings-main-back{
       float: right;
       margin-top: 5px;
       margin-right: 5px;
       background: #10ac62;
       color: white;
   }
}
</style>