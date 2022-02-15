<template>
    <div>
        <div class="head">
             <el-icon class="elicon" color="#888" size="20"><Lock></Lock></el-icon>
             <span class="mima">修改密码</span>
        </div>
        <div class="body">
            <div class="old">
                <span>旧密码</span>
                <input>
            </div>
            <div>
                <span>新密码</span>
                <input type="password">
            </div>
            <div>
                <span>再输一次密码</span>
                <input type="password">
            </div>
            <div class="yz">
                <div class="yanzheng">
                    <span>密码强度</span>
                <div class="qiangdu">

                </div>
                </div>
            </div>
        </div>
        <div class="foot">
            <button class="baocun">保存更改</button>
            <button class="quxiao">取消</button>
        </div>
    </div>
</template>

<script setup>
import {Lock} from '@element-plus/icons'

</script>

<style lang="less">
@import "@/assets/less/member/password.less";
</style>

