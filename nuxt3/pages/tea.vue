<template>
  <div>
    <div>
      <img
        src="http://shadowplay.top/新闻图片.jpg"
        height="200"
        style="width: 100%"
      />
    </div>
    <el-tabs :tab-position="tabPosition" class="box1" >
      <el-tab-pane label="全部新闻">
        <div class="box2" v-for="item in newNews" :key="item.id" >
          <div class="left">
            <h1>
              <nuxt-link :to="`/journalism/${item.id}`" class="hh">{{
                item.name
              }}</nuxt-link>
            </h1>
            <br />
            <span>{{ item.title }}</span>
            <p>
              <nuxt-link :to="`/journalism/${item.id}`" style="color: #90af6b"
                >阅读正文→</nuxt-link
              >
            </p>
          </div>
          <div class="right">
            <nuxt-link :to="`/journalism/${item.id}`"
              ><img :src="item.img" alt=""
            /></nuxt-link>
          </div>
        </div>
        <dd @click="findmore" class="dd" ref="ss">点击加载更多↓</dd>
      </el-tab-pane>
      <el-tab-pane label="新茶动态">
        <div class="box2" v-for="item in arr1" :key="item.id">
          <div class="left">
            <h1>
              <nuxt-link :to="`/journalism/${item.id}`" class="hh">{{
                item.name
              }}</nuxt-link>
            </h1>
            <br />
            <span>{{ item.title }}</span>
            <p>
              <nuxt-link :to="`/journalism/${item.id}`" style="color: #90af6b"
                >阅读正文→</nuxt-link
              >
            </p>
          </div>
          <div class="right">
            <nuxt-link :to="`/journalism/${item.id}`"
              ><img :src="item.img" alt=""
            /></nuxt-link>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="产品新闻">
        <div class="box2" v-for="item in arr" :key="item.id">
          <div class="left">
            <h1>
              <nuxt-link :to="`/journalism/${item.id}`" class="hh">{{
                item.name
              }}</nuxt-link>
            </h1>
            <br />
            <span>{{ item.title }}</span>
            <p>
              <nuxt-link :to="`/journalism/${item.id}`" style="color: #90af6b"
                >阅读正文→</nuxt-link
              >
            </p>
          </div>
          <div class="right">
            <nuxt-link :to="`/journalism/${item.id}`"
              ><img :src="item.img" alt=""
            /></nuxt-link>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from "vue";
const ss = ref();
const arr = ref([]);
const arr1 = ref([]);
const tabPosition = ref("left");
const config = useRuntimeConfig();
const News = useNews();

const findmore = () => {
  newNews.value = News.value.slice(0, News.value.length);
  ss.value.style.display = "none";
};
if (config.API_BASE) {
  let { data } = await useFetch(`${config.API_BASE}/news/menu`);
  News.value = data.value.msg;
} else {
  let { data } = await useFetch(`/news/menu`);
  if (data.value) {
    News.value = data.value.msg;
  }
}

const newNews = ref(News.value.slice(0, 5));
News.value.forEach((item) => {
  if (item.id === 8 || item.id === 9) {
    arr.value.push(item);
  }
});
News.value.forEach((item) => {
  if (item.id < 7) {
    arr1.value.push(item);
  }
});

</script>

<style lang="less" scoped>
.box2:hover {
  img {
    transform: scale(1.2);
  }
}

.box1 {
  width: 1200px;
  margin: 0px auto;
  margin-top: 60px;
  .box2 {
    display: flex;
    // margin: 0px auto;
    // height: 400px;
    .left {
      width: 680px;
      margin: 0px 60px;
      h1 {
        font-family: 微软雅黑;
        white-space: nowrap;
        cursor: pointer;
        .hh {
          color: #000;
          text-decoration: none;
        }
        .hh:hover {
          color: #90af6b;
        }
      }

      span {
        color: #999999;
        font-size: 13px;
        font-family: 微软雅黑;
        line-height: 22px;
        padding-right: 20px;
      }
      p {
        cursor: pointer;
        margin: 20px 0px;
        font-size: 14px;
      }
    }

    .right {
      float: right;
      width: 200px;
      height: 130px;
      margin: 10px 50px 0px 0px;
      overflow: hidden;
      img {
        width: 200px;
        height: 130px;
        transition: all 0.6s;
        cursor: pointer;
      }
    }
  }
}
.dd {
  text-align: center;
  color: #999999;
  font-size: 14px;
  padding: 10px 0px;
  cursor: pointer;
}


:deep(.el-tabs__nav-scroll) {
  border: none;

  .el-tabs__item {
    height: 60px;
    line-height: 60px;
    color: #999999;
    box-sizing: border-box;
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
