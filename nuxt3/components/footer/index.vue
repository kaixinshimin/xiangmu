<template>
    <div class="container">
        <div class="foot_top">
            <div class="mid">
                <div class="left">
                    <div class="l1">
                        <div class="l1_top">联系</div>
                        <div class="l1_bot">Contact</div>
                    </div>
                    <div class="l2">
                        <div class="l2_top">关注我们</div>
                        <div class="l2_bot">
                            <span class="bot1"></span>
                            <span class="bot2"></span>
                        </div>
                    </div>
                    <div class="l3">
                        <div class="l3_1">公司信息</div>
                        <div class="l3_2">地址：苏州市建外SOHO东区2号楼</div>
                        <div class="l3_2">邮编：100000</div>
                        <div class="l3_2">电话：010-69557550</div>
                    </div>
                </div>
                <div class="right">
                    <div class="r1">
                        <div>
                            <img src="@/assets/img/erwei.png" />
                        </div>
                        <div class="text">微博</div>
                    </div>
                    <div class="r1">
                        <div>
                            <img src="@/assets/img/erwei.png" />
                        </div>
                        <div class="text">微信</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="foot_but">COPYRIGHT (©) 2019 茶叶类网站 京ICP备41414141414-1号</div>
        <div class="backtop" v-if="btnFlag" @click="backTop">
            <el-icon :size="20">
                <ArrowUpBold />
            </el-icon>
        </div>
    </div>
</template>
<script setup>
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import { ArrowUpBold } from '@element-plus/icons'
const btnFlag = ref(false)
const scroll = ref()
onMounted(() => {
    window.addEventListener('scroll', scrollToTop)
})
onUnmounted(() => {
    window.removeEventListener('scroll', scrollToTop)
})
const backTop = () => {
    let timer = setInterval(() => {
        let ispeed = Math.floor(-scroll.value/10)
        document.documentElement.scrollTop = document.body.scrollTop = scroll.value + ispeed
        if (scroll.value === 0) {
            clearInterval(timer)
        }
    }, 16)
}
// 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
const scrollToTop = () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    scroll.value = scrollTop
    if (scroll.value > 60) {
        btnFlag.value = true
    } else {
        btnFlag.value = false
    }
}
</script>

<style lang="less" scoped>
@import "@/assets/less/footer.less";
</style>