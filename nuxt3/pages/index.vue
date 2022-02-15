<template>
  <div class="container">
    <div class="slider">
      <el-carousel height="48vw">
        <el-carousel-item v-for="item in list" :key="item.img">
          <img :src="item.img" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="content">
      <div class="mainbody">
        <div class="title1">
          <p id="p1">新茶上市</p>
          <p id="p2">Tea Leave</p>
        </div>

        <ul class="goodslist" v-for="item in goods.slice(0, 6)" :key="item._id">
          <li data-aos="fade-up" data-aos-once="true" class="goods">
            <nuxt-link :to="`/detail/${item._id}`">
              <img :src="item.src" alt="hhhh" />
              <p class="goodstitle">{{ item.name }}</p>
              <div class="line"></div>
            </nuxt-link>
            <p class="price">¥{{ item.price }}</p>
          </li>
        </ul>
        <div class="more">
          <button @click="hlog">→</button>
        </div>
      </div>
    </div>
    <div class="about">
      <div class="secondbody">
        <div class="title1">
          <p id="p1">关于我们</p>
          <p id="p2">About</p>
        </div>
        <div class="info">
          <div class="infoleft">
            <img src="../assets/img/infoimg.webp" alt="碧螺春" />
          </div>
          <div class="inforight">
            <span>茶叶源于中国，茶叶最早是被作为祭品使用的。但从春秋后期就被人们作为菜食，在西汉中期发展为药用，西汉后期才发展为宫廷高级饮料，普及民间作为普通饮料那是西晋以后的事。发现最早人工种植茶叶的遗迹在浙江余姚的田螺山遗址，已有6000多年的历史。饮茶始于中国。</span>
            <button>了解更多</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useRouter } from 'vue-router'

const router = useRouter()
const config = useRuntimeConfig();
if (!config.API_BASE) {
  AOS.init();
}

const hlog = () => {
  router.push('/tealist')
}
const list = ref([
  {
    url: '#abc',
    img: '../assets/img/slideimg1.webp'
  },
  {
    url: '#bsbsb',
    img: '../assets/img/slideimg2.png'
  }
])
const goods = useGoods()
const getdetails = async () => {
  if (config.API_BASE) {
    const { data } = await useFetch(`${config.API_BASE}/product/list`)
    goods.value = data._rawValue.msg
  } else {
    const { data } = await useFetch(`/product/list`)
    if (data.value) {
      goods.value = data._rawValue.msg
    }
  }
}
getdetails();
</script>

<style lang="less" scoped>
@import "@/assets/less/index.less";
</style>

