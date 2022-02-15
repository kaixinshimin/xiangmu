<template>
    <div class="page-login">
        <div class="picture">
            <el-card class="box-card">
                <el-row>
                    <el-col :span="12">
                        <div class="left">
                            <img class="tea" src="@/assets/img/picture.png" />
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <section>
                            <nuxt-link to="/">
                                <img src="@/assets/img/logo.png" alt="茶道" />
                            </nuxt-link>
                            <p>演示用户名：demo@email.com</p>
                            <p>密码： demouser1234</p>
                            <span style="color:red">{{error}}</span>
                            <el-form
                                ref="ruleFormRef"
                                :model="ruleForm"
                                :rules="rules"
                                class="demo-ruleForm"
                                label-width="100px"
                            >
                                <el-form-item prop="name">
                                    <el-input placeholder="用户名" v-model="ruleForm.name" />
                                </el-form-item>
                                <el-form-item prop="email">
                                    <el-input placeholder="邮箱" v-model="ruleForm.email" />
                                </el-form-item>
                                <el-form-item prop="pwd">
                                    <el-input
                                        placeholder="密码"
                                        v-model="ruleForm.pwd"
                                        type="password"
                                    />
                                </el-form-item>
                                <el-form-item prop="cpwd">
                                    <el-input
                                        placeholder="确认密码"
                                        v-model="ruleForm.cpwd"
                                        type="password"
                                    />
                                </el-form-item>
                                <el-checkbox v-model="checked">我同意《用户手册》和《保密条款》</el-checkbox>
                                <el-form-item>
                                    <el-button
                                        type="success"
                                        @click="register"
                                        style="width:260px;background-color:rgb(49, 177, 49)"
                                    >马上注册</el-button>
                                </el-form-item>
                                <el-form-item>
                                    <nuxt-link to="/login">
                                        <el-button style="width:260px;">登录</el-button>
                                    </nuxt-link>
                                </el-form-item>
                            </el-form>
                        </section>
                    </el-col>
                </el-row>
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

const error = ref('')
const checked = ref(true)
const ruleFormRef = ref()
const ruleForm = reactive({
    name: "",
    pwd: "",
    cpwd: "",
    email: "",
})

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
            message: "请输入用户名",
            trigger: "blur"
        }
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
    email: [
        {
            required: true,
            type: "email",
            message: "请输入正确的邮箱",
            trigger: "blur"
        }
    ],
})

const register = () => {
    ruleFormRef.value.validate(async (valid) => {
        if (valid) {
            const { data } = await useFetch("/user/signup", {
                method: "post",
                body: {
                    // encodeURIComponent: 对中文进行编码
                    username: window.encodeURIComponent(ruleForm.name),
                    // CryptoJS.MD5 加密
                    password: CryptoJS.MD5(ruleForm.pwd).toString(),
                    email: ruleForm.email
                }
            })
            if (data.value.code === 0) {
                router.push({ path: '/login' })
            }
            else {
                error.value = data.value.msg;
            }
        }
    });
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/register/index.scss";
</style>