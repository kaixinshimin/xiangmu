<template>
    <div class="page-login">
        <div class="picture">
            <el-card class="box-card">
                <div class="head">
                    <nuxt-link to="/">
                        <img src="@/assets/img/logo.png" alt="茶道" />
                    </nuxt-link>
                    <p>演示用户名：demo@email.com</p>
                    <p>密码： demouser1234</p>
                </div>

                <div class="forgot">
                    <!-- <button
                        type="text"
                        v-show="active >= '1'"
                        class="return-page-wr"
                        @click="$router.go(-1)"
                    >
                        <i class="el-icon-arrow-left"></i> 上一步
                    </button> -->
                  

                    <div class="content">
                        <el-steps :active="active" finish-status="success" align-center>
                            <el-step title="账号验证"></el-step>
                            <el-step title="重置密码"></el-step>
                            <el-step title="完成设置"></el-step>
                        </el-steps>
                    </div>

                    <div v-if="active == '0'">
                        <el-form
                            ref="ruleFormRef"
                            :model="ruleForm"
                            :rules="rules"
                            class="demo-ruleForm"
                            label-width="100px"
                            @submit.native.prevent
                        >
                            <el-form-item prop="name" label="用户名">
                                <el-input placeholder="用户名/邮箱" v-model="ruleForm.name" />
                            </el-form-item>
                            <el-form-item prop="pwd" label="密保问题">
                                <div>请问8+6=？</div>
                            </el-form-item>
                            <el-form-item prop="answer" label="答案">
                                <el-input v-model="ruleForm.answer" type="text"></el-input>
                            </el-form-item>
                        </el-form>
                        <div class="btn-wr">
                            <el-button style="margin:30px 190px;width:200px" @click="next">下一步</el-button>
                        </div>
                    </div>

                    <div v-if="active == '1'">
                        <el-form
                            ref="ruleFormRef"
                            :model="ruleForm"
                            :rules="rules"
                            class="demo-ruleForm"
                            label-width="100px"
                            @submit.native.prevent
                        >
                            <el-form-item label="密码" prop="pwd">
                                <el-input placeholder="密码" v-model="ruleForm.pwd" type="password" />
                            </el-form-item>
                            <el-form-item label="确认密码" prop="cpwd">
                                <el-input
                                    placeholder="确认密码"
                                    v-model="ruleForm.cpwd"
                                    type="password"
                                />
                            </el-form-item>
                        </el-form>
                        <div class="btn-wr">
                            <el-button style="margin:30px 190px;width:200px" @click="next">确认</el-button>
                        </div>
                    </div>

                    <div v-if="active == '2'">
                        <div style="margin:30px 270px">设置成功，去登录</div>
                        <div class="btn-wr">
                            <nuxt-link to="/login">
                                <el-button style="margin:30px 240px;width:200px">完成</el-button>
                            </nuxt-link>
                        </div>
                    </div>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
export default {
    layout: false,
}
</script>

<script setup>
import { ref, reactive } from 'vue'
import CryptoJS from 'crypto-js'
import { useRouter } from 'vue-router'
const router = useRouter();

const active = ref(0)
const error = ref('')
const checked = ref(true)
const ruleFormRef = ref()
const ruleForm = reactive({
    name: "",
    pwd: "",
    answer: "",
    cpwd: ""
})
const options = ref([])

//确认密码的自定义校验器
const validatecpwd = (rule, value, callback) => {
    if (value !== ruleForm.pwd) {
        callback(new Error("两次密码需要一致"))
    } else {
        callback()
    }
}

const rules = reactive({
    name: [
        {
            required: true,
            type: "string",
            message: "请输入用户名/邮箱",
            trigger: "blur"
        },
    ],
    pwd: [
        {
            required: true,
            message: "请输入密码",
            trigger: "blur"
        },
        {
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
            message: '密码至少包含数字和英文，长度6-20位'
        }
    ],
    cpwd: [
        {
            required: true,
            message: "请输入确认密码",
            trigger: "blur"
        },
        {
            validator: validatecpwd,
            trigger: 'blur'
        }
    ],
})

const next = () => {
    if (active.value++ > 2)
        active.value = 0;
    console.log(active.value)
}


// const login = () => {
//     ruleFormRef.value.validate(async (valid) => {
//         if (valid) {
//             const { data } = await useFetch("/api/users/signin", {
//                 method: "post",
//                 body: {
//                     // encodeURIComponent: 对中文进行编码
//                     username: window.encodeURIComponent(ruleForm.name),
//                     // CryptoJS.MD5 加密
//                     password: CryptoJS.MD5(ruleForm.pwd).toString()
//                 }
//             })
//             if (data.value.code === 0) {
//                 //登录成功之后，获取用户信息
//                 // const { data: user } = await useFetch("/api/users/userinfo");

//                 router.push({ path: '/' })
//             }
//             else {
//                 error.value = data.value.msg;
//             }
//         }
//     });
// }
</script>

<style lang="scss" scoped>
@import "@/assets/css/login/member.scss";
</style>