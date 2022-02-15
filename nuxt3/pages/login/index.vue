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
                            <span style="color:red">{{ error }}</span>
                            <el-form
                                ref="ruleFormRef"
                                :model="ruleForm"
                                :rules="rules"
                                class="demo-ruleForm"
                                label-width="100px"
                            >
                                <el-form-item prop="name">
                                    <el-input placeholder="用户名/邮箱" v-model="ruleForm.name" />
                                </el-form-item>
                                <el-form-item prop="pwd">
                                    <el-input
                                        placeholder="密码"
                                        v-model="ruleForm.pwd"
                                        type="password"
                                    />
                                </el-form-item>
                                <el-checkbox v-model="checked">请记住我(请在私人设备上使用此功能)</el-checkbox>
                                <!-- <el-form-item>
                                        <a
                                            class="f1"
                                            href="http://www.meituan.com/about/terms"
                                            target="_blank"
                                        >《美团网用户协议》</a>
                                </el-form-item>-->
                                <el-form-item>
                                    <el-button
                                        type="success"
                                        @click="Login"
                                        style="width:260px;background-color:rgb(49, 177, 49)"
                                    >立即登录</el-button>
                                </el-form-item>
                                <el-form-item>
                                    <nuxt-link to="/register">
                                        <el-button style="width:260px;">马上注册</el-button>
                                    </nuxt-link>
                                </el-form-item>
                                <el-form-item>
                                    <nuxt-link class="f1" to="/login/member">忘记密码？点这里找到</nuxt-link>
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
})
const login = useLogin()
const { user } = useUser()
const { emails } = getEmail();

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
})
const Login = () => {
    ruleFormRef.value.validate(async (valid) => {
        if (valid) {
            const { data } = await useFetch("/user/signin", {
                method: "post",
                body: {
                    // encodeURIComponent: 对中文进行编码
                    username: window.encodeURIComponent(ruleForm.name),
                    // CryptoJS.MD5 加密
                    password: CryptoJS.MD5(ruleForm.pwd).toString()
                }
            })
            if (data.value.code === 0) {
                const { data } = await useFetch(`/user/userinfo`, { server: false })
                if (data.value) {
                    login.value = data.value.login
                    user.value = data.value.name;
                    emails.value = data.value.email;
                    router.go(-1)
                }
            }
            else {
                error.value = data.value.msg;
            }
        }

    });
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/login/index.scss";
</style>