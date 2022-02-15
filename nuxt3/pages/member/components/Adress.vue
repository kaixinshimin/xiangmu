<template>
  <div>
    <div class="address">
      <div class="title">
        <el-icon>
          <Location />
        </el-icon>
        <span>收货地址</span>
      </div>
      <div :class="bujian">
        <div v-for="item in adresslist" :key="item._id" class="adressmain">
          <span style="font-size: 14px">{{ item.adressname }}</span>
          <span @click="shanchu(item._id)" style="cursor: pointer" class="delete">删除</span>
          <p class="xinxi">{{ item.adress }}</p>
          <p class="xinxi">{{ item.name }}</p>
          <p class="xinxi">{{ item.phone }}</p>
        </div>
        <div class="newadress" @click="xinzeng">新增地址</div>
      </div>
      <div :class="xiaoshi">
        <el-form ref="Form" label-width="120px" class="demo-ruleForm" label-position="top">
          <el-form-item label="地址标注" prop="biaozhu">
            <el-input v-model="useradress.adressname"></el-input>
          </el-form-item>
          <el-form-item label="省市区" prop="address">
            <el-select v-model="value1" placeholder="请选择">
              <el-option
                @click="change1"
                v-for="item in china"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-select v-model="value2" style="margin-left: 20px" placeholder="请选择">
              <el-option
                @click="change2"
                v-for="item in sheng"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-select v-model="value3" placeholder="请选择" style="margin-left: 20px">
              <el-option
                v-for="item in city"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="地址" prop="address">
            <el-input v-model="dizhi"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="useradress.name"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="phone">
            <el-input v-model="useradress.phone"></el-input>
          </el-form-item>
        </el-form>
        <div class="modify">
          <div @click="getdata2" class="one">保存更改</div>
          <div @click="xinzeng2" class="two">返回</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { Location } from "@element-plus/icons";
import { ref, reactive } from "vue";
import { ElNotification } from "element-plus/lib";
const config = useRuntimeConfig();
const { user } = useUser();
const china = ref([]);
const sheng = ref([]);
const city = ref([]);
const value1 = ref("");
const value2 = ref("");
const value3 = ref("");
const pro = ref([]);
const dizhi = ref("");
const xiaoshi = ref("xiaoshi");
const bujian = ref("chixian");
const adresslist = getAdress()
const useradress = reactive({
  adress: "",
  name: "",
  phone: "",
  username: user.value,
  adressname: "",
});

//提交地址
const getdata2 = async () => {
  useradress.adress = value1.value + value2.value + value3.value + dizhi.value;
  if (
    useradress.adress &&
    useradress.name &&
    useradress.phone &&
    useradress.adressname
  ) {
    let { data } = await useFetch(`/infos/getadress`, {
      method: "post",
      body: {
        useradress,
      },
    });
    ElNotification({
      title: "消息",
      message: "保存成功",
      type: "success",
    });
    getadress();
    xiaoshi.value = "xiaoshi";
    bujian.value = "chuxian";
  } else {
    ElNotification({
      title: "消息",
      message: "请填写所有信息",
      type: "warning",
    });
  }
}; 
//拿城市数据
if (config.API_BASE) {
  let { data } = await useFetch(`/product/citydata`);
  if (data.value) {
    china.value = data.value;
  }
} else {
  let { data } = await useFetch(`/product/citydata`);
  if (data.value) {
    china.value = data.value;
  }
}
//从数据库拿地址
const getadress = async () => {
  let { data } = await useFetch(`/infos/adress`,{server:false});
  if (data.value) {
    adresslist.value = data.value.msg;
  }
};
getadress();

//新增地址
const xinzeng = () => {
  bujian.value = "xiaoshi";
  xiaoshi.value = "chuxian";
  value1.value = '';
  value2.value = '';
  value3.value = '';
  useradress.phone = '';
  useradress.adressname = '';
  useradress.name = '';
  dizhi.value = '';
};
const xinzeng2 = () => {
  xiaoshi.value = "xiaoshi";
  bujian.value = "chuxian";
  getadress();
};
//根据省选择城市
const change1 = () => {
  for (var i = 0; i < china.value.length; i++) {
    if (value1.value == china.value[i].value) {
      sheng.value = china.value[i].children;
    }
  }
};
//根据城市选择区
const change2 = () => {
  for (var i = 0; i < sheng.value.length; i++) {
    if (value2.value == sheng.value[i].value) {
      city.value = sheng.value[i].children;
    }
  }
};

//删除地址
const shanchu = async (e) => {
  let { data } = await useFetch(`/infos/delete`, {
    method: "post",
    body: { id: e },
    server: false,
  });
  getadress();
};
</script>
<style lang="scss">
.address {
  :deep(.el-form-item__error) {
    // position:;
    position: static;
    display: inline-block;
    margin-top: 6px;
    font-size: 12px;
    padding: 5px 10px;
    background-color: #d14242;
    color: #fff;
    border-radius: 5px;
  }
  .el-form {
    padding: 0 15px;
    .right {
      margin-left: 65px;
      border: 0 !important;
    }
    :deep(.el-form-item__label) {
      padding: 0 !important;
    }
    :deep(.el-form-item) {
      margin-bottom: 0 !important;
    }
  }
  .modify {
    text-align: center;
    margin-top: 15px;
    border-top: solid 1px #ddd;
    line-height: 30px;
    padding: 15px;
    overflow: hidden;
    .one {
      float: left;
      width: 74px;
      height: 30px;
      background-color: black;
      border: solid 1px #ddd;
      color: #fff;
      cursor: pointer;
    }
    .two {
      float: right;
      width: 48px;
      height: 30px;
      background-color: #fff;
      cursor: pointer;
    }
  }
  .title {
    padding: 15px 10px;
    border-bottom: solid 1px #e8e8e8;
    font-size: 17px;
    .el-icon {
      font-size: 20px;
      vertical-align: middle;
      color: color;
    }
    > span {
      vertical-align: middle;
      margin-left: 10px;
    }
  }
}
.xiaoshi {
  display: none;
}
.chuxian {
  display: block;
}

.newadress {
  border-bottom: 1px solid rgb(221, 221, 221);
  height: 80px;
  line-height: 80px;
  text-align: center;
  color: #888;
  cursor: pointer;
}
.adressmain {
  border-bottom: 1px solid rgb(221, 221, 221);
  height: 100px;
  padding: 10px;
  box-sizing: border-box;
}
.delete {
  float: right;
  border: 1px solid black;
  font-size: 12px;
  display: inline-block;
  height: 20px;
  width: 30px;
  line-height: 20px;
  text-align: center;
}
.xinxi {
  height: 20px;
  margin: 0;
  font-size: 14px;
  color: #aaa;
}
</style>