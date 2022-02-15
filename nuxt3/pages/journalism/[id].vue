<template>
  <div>
    <div>
      <img
        src="http://shadowplay.top/新闻图片.jpg"
        height="200"
        style="width: 100%"
      />
    </div>
    <div class="b">
      <el-breadcrumb :separator-icon="ArrowRight" class="top">
        <div class="top-1">
          <el-breadcrumb-item
            ><nuxt-link to="/" class="xin">首页</nuxt-link></el-breadcrumb-item
          >
          <el-breadcrumb-item
            ><nuxt-link to="/tea" class="xin"
              >全部新闻</nuxt-link
            ></el-breadcrumb-item
          >
          <el-breadcrumb-item
            ><div class="wei">{{ msg }}</div></el-breadcrumb-item
          >
        </div>
      </el-breadcrumb>
    </div>
    <el-container>
      <el-tabs
        :tab-position="tabPosition"
        class="box"
        @tab-click="aa"
        v-model="number"
      >
        <el-tab-pane
          :label="item.name"
          v-for="item in Xiangq"
          :key="item.id"
          class="box2"
          :name="`xx${item.id}`"
        >
          <div>
            <div>
              <h1>{{ item.name }}</h1>
            </div>
            <div>
              <span
                >发布日期：2019-04-05 14:04
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                分享到：
                <img src="http://shadowplay.top/微信.png" alt="" />
                <img src="http://shadowplay.top/微博.png" alt="" />
                <img src="http://shadowplay.top/qq.png" alt="" />
                <img src="http://shadowplay.top/豆瓣.png" alt="" />
                <img src="http://shadowplay.top/B站.png" alt="" />
              </span>
            </div>
            <img :src="item.img" alt="" class="img" />
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ item.title }}</p>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-container>
  </div>
</template>

<script setup>
import { ArrowRight } from "@element-plus/icons";
import { ref } from "vue";
import { useRoute } from "vue-router";
const config = useRuntimeConfig();
const Xiangq = useXiangq();
const route = useRoute();
const number = ref("xx1");
number.value = "xx" + route.params.id;

const tabPosition = ref("right");
const msg = ref("");
const aa = (e) => {
  msg.value = e.props.label;
};

if (config.API_BASE) {
  let { data } = await useFetch(`${config.API_BASE}/news/xiang`);
  Xiangq.value = data.value.msg;
  msg.value = Xiangq.value[route.params.id - 1].name;
} else {
  let { data } = await useFetch(`/news/xiang`);
  if (data.value) {
    Xiangq.value = data.value.msg;
    msg.value = Xiangq.value[route.params.id - 1].name;
  }
}
</script>

<script>
export default {
  methods: {
    goback() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="less" scoped>
.xin:hover {
  color: #90af6b !important;
}

.b {
  width: 100%;
  height: 50px;
  background-color: #f9f9f9;
}
.top {
  width: 1200px;
  margin: 0px auto;
  margin-top: -7px;
  line-height: 50px;
  padding: 0px 10px;
  .top-1 {
    font-size: 15px;
    .wei {
      color: #90af6b !important;
    }
  }
}
.box {
  width: 1200px;
  margin: 0px auto;
  margin-top: 40px;
  padding: 0px 10px;
  div {
    h1 {
      line-height: 50px;
      font-family: 微软雅黑;
      color: #494949;
      font-weight: normal;
      font-size: 22px;
      font-style: normal;
      border-bottom: 1px solid #ededed;
    }
    span {
      display: block;
      font-size: 15px;
      width: 100%;
      line-height: 70px;
      border-bottom: 1px solid #ededed;
      img {
        margin-right: 3px;
        cursor: pointer;
      }
    }
    p {
      font-size: 15px;
      line-height: 25px;
      color: #333;
    }
  }
  .img {
    width: 100%;
    margin-top: 40px;
  }
}

:deep(.el-tabs__nav-scroll) {
  border: none;

  .el-tabs__item {
    height: 60px;
    line-height: 60px;
    color: #999999;
    box-sizing: border-box;
    border-bottom: 1px dashed #999999;
  }
  .el-tabs__item:hover {
    color: #90af6b;
  }
  .el-tabs__active-bar {
    background-color: #a4a5a4;
  }
}
.el-tabs--right .el-tabs__nav-wrap.is-right::after {
  background-color: #90af6b;
}
</style>
