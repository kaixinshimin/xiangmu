<template>
  <div>
    <div class="head">
      <el-icon class="elicon" color="#888" size="20"
        ><UserFilled></UserFilled
      ></el-icon>
      <span class="mima">个人资料</span>
    </div>

    <div class="body">
      <div @click="change" class="ziliao" :class="touming">资料明细</div>
      <form ref="ruleFormRef" :model="member" :class="infos1">
        <div class="nicheng">
          <span>昵称</span>
          <input v-model="member.nicheng" />
        </div>

        <div>
          <span>名</span>
          <input v-model="member.name" />
        </div>
        <div>
          <span>姓</span>
          <input v-model="member.lastname" />
        </div>
        <div style="height: 100px">
          <span>个人简介</span>
          <textarea v-model="member.myself" id="jianjie"></textarea>
        </div>
        <div class="sexsex">
          性别
          <el-radio-group class="sexbox" v-model="member.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </div>
      </form>

      <div
        @click="change2"
        :class="touming2"
        style="margin-top: 5px"
        class="ziliao"
      >
        账户明细
      </div>
      <form :class="infos2">
        <div style="margin-top: 10px">
          <span>电子邮箱</span>
          <input v-model="member.email" />
        </div>
        <div>
          <span>旧密码</span>
          <input />
        </div>
        <div>
          <span>新密码</span>
          <input />
        </div>
        <div>
          <span>再输一次密码</span>
          <input />
        </div>
        <div class="yz">
          <div class="yanzheng">
            <span>密码强度</span>
            <div class="qiangdu"></div>
          </div>
        </div>
      </form>
    </div>
    <div class="foot">
      <button @click="tijiao" class="baocun">保存更改</button>
      <button class="quxiao">取消</button>
    </div>
  </div>
</template>

<script setup>
import { UserFilled, User } from "@element-plus/icons";
import { renderList } from "nuxt3/dist/app/compat/capi";
import { ElNotification } from "element-plus/lib";
const { user } = useUser();
const { emails } = getEmail();
const { member } = useGetmember();
const config = useRuntimeConfig();
member.value = {
  username: user.value,
  nicheng: "",
  name: "",
  lastname: "",
  myself: "",
  sex: "",
  email: emails.value,
  oldpassword: "",
  newpassword: "",
  passagain: "",
};
const getdata = async () => {
  if (config.API_BASE) {
    let { data } = await useFetch(`${config.API_BASE}/infos/getmember`, {
      method: "post",
      body: {
        name: member.value.username,
        emails: member.value.email,
      },
    });
    member.value = data.value.msg;
  } else {
    let { data } = await useFetch(`/infos/getmember`, {
      method: "post",
      body: {
        name: member.value.username,
        emails: member.value.email,
      },
    });
    if (data.value) {
      member.value = data.value.msg;
   
    }
  }
};
getdata();
const tijiao = async () => {
  const { data } = await useFetch("/infos/member", {
    method: "post",
    body: member.value,
  });
  if (data.value.code == 0) {
    console.log('xxxx')
    ElNotification({
      title: "消息",
      message: "保存成功",
      type: "success",
    });
  }
};

const infos1 = ref("");
const touming = ref("");
const change = () => {
  if (infos1.value == "") {
    infos1.value = "wu";
    touming.value = "touming";
  } else {
    infos1.value = "";
    touming.value = "";
  }
};
const infos2 = ref("");
const touming2 = ref("");
const change2 = () => {
  if (infos2.value == "") {
    infos2.value = "wu2";
    touming2.value = "touming2";
  } else {
    infos2.value = "";
    touming2.value = "";
  }
};
</script>

<style lang="less">
@import "@/assets/less/member/personal.less";
.sexbox {
  width: 400px;
  float: right;
}
.sexsex {
  font-size: 12px;
  height: 40px !important;
  line-height: 40px;
}
</style>
