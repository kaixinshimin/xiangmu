<template>
  <div>
    <div v-text="$t('message.Home')"></div>
    <div>{{ $t('message.About') }}</div>
    <el-button @click="change('zh')">中文</el-button>
    <el-button @click="change('en')">English</el-button>
    <div>
      <indexbar></indexbar>
    </div>
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n'
import indexbar from '@/components/echarts/indexbar.vue'
export default {
  name: 'userIndex',
  components: {
    indexbar,
  },
  setup() {
    const { t, locale } = useI18n()

    const change = type => {
      locale.value = type
    }

    return {
      change,
    }
  },
}
</script>

<style lang="scss" scoped>
.home {
  color: $mainColor;
}
</style>
