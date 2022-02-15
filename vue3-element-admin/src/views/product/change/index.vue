<template>
  <div class="createPost-container">
    <!--表单-->
    <el-form
      ref="postFormRef"
      :model="msg"
      :rules="rules"
      class="form-container"
    >
      <div class="createPost-main-container">
        <el-row>
          <el-col :span="12">
            <el-form-item style="margin-bottom: 40px">
              <el-form-item
                label-width="100px"
                label="茶叶ID"
                class="postInfo-container-item"
              >
                <el-input required disabled v-model="msg._id" />
              </el-form-item>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item style="margin-bottom: 40px">
              <el-form-item
                label-width="100px"
                label="茶叶名字"
                class="postInfo-container-item"
                prop="name"
              >
                <el-input required v-model="msg.name" />
              </el-form-item>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item style="margin-bottom: 40px">
              <el-form-item
                label-width="100px"
                label="茶叶类别"
                class="postInfo-container-item"
                prop="sort"
              >
                <el-input required v-model="msg.sort" />
              </el-form-item>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item style="margin-bottom: 40px">
              <el-form-item
                label-width="100px"
                label="茶叶价格"
                class="postInfo-container-item"
                prop="price"
              >
                <el-input required v-model="msg.price" />
              </el-form-item>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item style="margin-bottom: 40px">
              <el-form-item
                label-width="100px"
                label="商品编号"
                class="postInfo-container-item"
                prop="number"
              >
                <el-input required v-model="msg.number" />
              </el-form-item>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item style="margin-bottom: 40px">
              <el-form-item
                label-width="100px"
                label="图片路径"
                class="postInfo-container-item"
                prop="src"
              >
                <el-input required v-model="msg.src" />
              </el-form-item>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item style="margin-bottom: 40px">
              <el-form-item
                label-width="100px"
                label="商品描述"
                class="postInfo-container-item"
                prop="described"
              >
                <el-input
                  required
                  v-model="msg.described"
                  :autosize="{ minRows: 1, maxRows: 10 }"
                  type="textarea"
                />
              </el-form-item>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div :style="{ textAlign: 'center' }">
              <el-button
                v-loading="loading"
                style="margin-left: 10px"
                type="success"
                @click="submit"
              >
                确认修改
              </el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-form>
  </div>
</template>
<script>
import { defineComponent, ref, reactive, toRefs, onMounted } from 'vue'
import { ElNotification } from 'element-plus'
import { changeProduct, searchDetail } from '../../../api/product'
import useCloseTag from '@/hooks/useCloseTag'
export default defineComponent({
  name: 'changeProduct',
  props: ['id'],
  setup(props) {
    onMounted(() => {
      getdata()
    })
    const { closeTag } = useCloseTag()
    const postFormRef = ref(null)
    const getdata = async () => {
      const { msg } = await searchDetail(props.id)
      input.msg = msg
    }
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(rule.field + '不能为空'))
      } else {
        callback()
      }
    }
    const input = reactive({
      msg: {
        _id: '',
        name: '',
        sort: '',
        price: 0,
        number: '',
        src: 'http://shadowplay.top/',
        described:
          '饮茶不但是传统饮食文化，同时，由于茶中含有多种抗氧化物质与抗氧化营养素，对于消除自由基有一定的效果。因此喝茶也有助防老，具养生保健功能，每天喝三两杯茶可起到防老的作用。茶叶中含有多种维生素和氨基酸，喝茶对于清油解腻，增强神经兴奋以及消食利尿也具有一定的作用。 但并不是喝得越多越好，也不是所有的人都适合喝茶。一般来说，每天1-2次，每次3-5克、400毫升的饮量是比较适当的。一般，人们说喝茶还指喝水。',
        desSrc: 'http://shadowplay.top/dec.png',
      },
      loading: false,
      //表单校验规则
      rules: {
        _id: [{ validator: validateRequire }],
        name: [{ validator: validateRequire }],
        sort: [{ validator: validateRequire }],
        price: [{ validator: validateRequire }],
        number: [{ validator: validateRequire }],
        src: [{ validator: validateRequire }],
        described: [{ validator: validateRequire }],
        desSrc: [{ validator: validateRequire }],
      },
    })
    const submit = () => {
      postFormRef.value.validate(valid => {
        //如果表单校验通过
        if (valid) {
          input.loading = true
          console.log('xx')
          //发送请求
          changeProduct(input.msg).then(response => {
            if (response.code === 1) {
              input.loading = false
              //提示信息
              ElNotification.success({
                title: '成功',
                message: '修改商品成功',
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
                message: '修改商品错误',
                type: 'error',
                duration: 2000,
              })
            }
          })
        }
      })
    }
    return { ...toRefs(input), submit, postFormRef }
  },
})
</script>

<style lang="less" scoped>
.createPost-container {
  position: relative;

  .createPost-main-container {
    padding: 40px 45px 20px 50px;

    .postInfo-container {
      position: relative;
      margin-bottom: 10px;

      .postInfo-container-item {
        float: left;
      }
    }
  }

  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
}

.article-textarea {
  :deep(textarea) {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}
</style>
