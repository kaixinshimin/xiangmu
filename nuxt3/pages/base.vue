<template >
    <div class="basepage">
        <div class="baseimg">
            <img src="../assets/img/basebg.webp" alt />
        </div>
        <div class="content">
            <div class="introarea">
                <div class="title1">种植基地</div>
                <div
                    class="title2"
                >公司拥有完整、科学、质量管理体系，通过ISO14001，ISO22000国际质量体系认 证，有机产品认证，拥有大量先进、专业的生产设备和检测仪器，秉承“顾客至上，锐意进取”的经营理念，坚持“客户第一”的原则为广大客户提供优质的服务。</div>
                <div class="imglist">
                    <ul class="demo-image__preview" v-for="(item,index) in srcList" :key="index">
                        <li>
                            <el-image :src="item" :preview-src-list="srcList" class="images"></el-image>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const srcList = [
    '../assets/img/img1.jpg',
    '../assets/img/img2.jpg',
    '../assets/img/img3.jpg',
    '../assets/img/img4.jpg',
    '../assets/img/img5.jpg',
    '../assets/img/img6.jpg',
    '../assets/img/img7.jpg',
    '../assets/img/img8.jpg',
]
</script>

<style lang="less" scoped>
@import "@/assets/less/base.less";
</style>