<template>
  <div class="box">
    <div class="contant">
      <div class="left">
        <div class="head">
          <span class="face">
            <el-icon color="#888" size="68"><User></User></el-icon>
          </span>
          <div>
            <span class="zhanghao"
              ><span>{{ user }}</span
              ><el-icon class="elicon" color="#333" size="17"
                ><Edit></Edit
              ></el-icon>
            </span>
            <br />
            <span @click="btn5" class="xiugai">修改密码</span>
            <span class="xiugai">第三方账号</span>
          </div>
        </div>
        <!-- head -->
        <div @click="bt1" :class="active1" class="list">
          <el-icon class="elicon" color="#888" size="20"><Menu></Menu></el-icon
          ><span class="spleft">我的订单</span>
          <span class="spright"
            ><el-icon class="elicon" color="#888" size="20"
              ><ArrowRight></ArrowRight></el-icon
          ></span>
          <span class="number">2</span>
        </div>
        <div @click="bt2" :class="active2" class="list">
          <el-icon class="elicon" color="#888" size="20"
            ><Ticket></Ticket></el-icon
          ><span class="spleft">优惠券</span>

          <span class="spright"
            ><el-icon class="elicon" color="#888" size="20"
              ><ArrowRight></ArrowRight></el-icon
          ></span>
          <div>0</div>
        </div>
        <div @click="bt3" :class="active3" class="list">
          <el-icon
            style="margin-right: 4px"
            class="elicon"
            color="#888"
            size="20"
            ><UserFilled></UserFilled></el-icon
          ><span class="spleft">个人资料</span>
          <span class="spright"
            ><el-icon class="elicon" color="#888" size="20"
              ><ArrowRight></ArrowRight></el-icon
          ></span>
        </div>
        <div @click="bt4" :class="active4" class="list">
          <el-icon
            style="margin-right: 1px"
            class="elicon"
            color="#888"
            size="20"
            ><AddLocation></AddLocation
          ></el-icon>
          <span class="spleft">收货地址</span>
          <span class="spright"
            ><el-icon class="elicon" color="#888" size="20"
              ><ArrowRight></ArrowRight></el-icon
          ></span>
        </div>
      </div>

      <div class="middle"></div>

      <div class="right">
        <component :is="right"></component>
      </div>
    </div>
  </div>
</template>

<script>
import adress from "./components/Adress.vue";
import order from "./components/Order.vue";
import preferential from "./components/Preferential.vue";
import personal from "./components/Personal.vue";
import password from "./components/password.vue";
export default defineComponent({
  components: {
    adress,
    order,
    preferential,
    personal,
    password,
  },
});
</script>

<script setup>
import {
  User,
  Edit,
  Menu,
  Ticket,
  UserFilled,
  AddLocation,
  ArrowRight,
} from "@element-plus/icons";
const config = useRuntimeConfig();
const login = useLogin()
const router = useRouter()
const { user } = useUser()
import { useRouter } from 'vue-router'
if (!config.API_BASE) {
    setTimeout(() => {
        if (!login.value) {
            router.push('/login')
        }
    }, 100);
}

const right = ref("order");
const active1 = ref("active");
const active2 = ref("");
const active3 = ref("");
const active4 = ref("");
const bt1 = () => {
  active1.value = "active";
  active2.value = "";
  active3.value = "";
  active4.value = "";
  right.value = "order";
};
const bt2 = () => {
  active1.value = "";
  active2.value = "active";
  active3.value = "";
  active4.value = "";
  right.value = "preferential";
};
const bt3 = () => {
  active1.value = "";
  active2.value = "";
  active3.value = "active";
  active4.value = "";
  right.value = "personal";
};
const bt4 = () => {
  active1.value = "";
  active2.value = "";
  active3.value = "";
  active4.value = "active";
  right.value = "adress";
};
const btn5 = () => {
  active1.value = "";
  active2.value = "";
  active3.value = "";
  active4.value = "";
  right.value = "password";
};
</script>



<style lang="less">
@import "@/assets/less/member/member.less";
</style>