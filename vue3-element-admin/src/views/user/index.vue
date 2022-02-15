<template>
  <el-form
    ref="postFormRef"
    :model="msg"
    status-icon
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
  >
    <el-form-item label="oldPassword">
      <el-input
        v-model="msg.oldPassword"
        type="password"
        autocomplete="off"
        show-password
      ></el-input>
    </el-form-item>
    <el-form-item label="newPassword" prop="newPassword">
      <el-input
        v-model="msg.newPassword"
        type="password"
        autocomplete="off"
        show-password
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit" v-loading="loading">
        确认修改
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { Revamp } from '@/api/login'
import { defineComponent, reactive, ref, toRefs } from 'vue'
import { ElNotification } from 'element-plus'
import useCloseTag from '@/hooks/useCloseTag'

export default defineComponent({
  name: 'revamp',
  setup() {
    const { closeTag } = useCloseTag()
    const postFormRef = ref(null)
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码不能为空'))
      } else if (value.length < 5 || value.length > 15) {
        callback(new Error('密码个数要在5-15之内'))
      } else {
        callback()
      }
    }
    const input = reactive({
      msg: {
        oldPassword: '',
        newPassword: '',
      },
      loading: false,
      rules: {
        newPassword: [{ validator: validateRequire }],
      },
    })
    const submit = () => {
      postFormRef.value.validate(valid => {
        //如果表单校验通过
        if (valid) {
          input.loading = true
          //发送请求
          Revamp(input.msg).then(response => {
            if (response.code === 1) {
              input.loading = false
              //提示信息
              ElNotification.success({
                title: '成功',
                message: '修改密码成功',
                type: 'success',
                duration: 2000,
              })
              //重置表单
              postFormRef.value.resetFields()
              setTimeout(() => {
                closeTag.value()
              }, 1000)
            } else {
              input.loading = false
              //提示信息
              ElNotification.success({
                title: '错误',
                message: '原密码输入错误',
                type: 'error',
                duration: 2000,
              })
            }
          })
        }
      })
    }
    return { postFormRef, ...toRefs(input), submit }
  },
})
</script>
