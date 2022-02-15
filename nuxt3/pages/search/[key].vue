<template>
    <div class="search">
        <div class="shead">
            <div class="content">
                <div class="stitle">产品搜索</div>
                <div class="entry">
                    <input v-model="key" class="put" placeholder="花茶" />
                    <a @click.prevent="tosea" class="sub">搜索</a>
                </div>
            </div>
        </div>
        <ProList :msg="key"></ProList>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons'
import { useRoute, useRouter } from "vue-router";

const key = ref('');
const route = useRoute()
const router = useRouter()
key.value = route.params.key
const tosea = () => {
    if (key.value) {
        router.push(`/search/${key.value}`)
    } else {
        router.push(`/search/花茶`)
    }
}
</script>
<style scoped lang="less">
.search {
    .shead {
        width: 100%;
        padding: 60px 0;
        background-color: #f9f9f9;
        .content {
            height: 90px;
            width: 70%;
            margin: auto;
            .stitle {
                font-size: 26px;
                text-align: center;
                color: #333333;
                padding: 0 0 15px 0;
            }
            .entry {
                display: flex;
                .put {
                    height: 44px;
                    padding: 0px;
                    flex: 1;
                    border: 1px solid #e8e8e8;
                    border-right: 0px;
                    &:focus-visible {
                        outline: 0px;
                        border-color: black;
                    }
                }
                .sub {
                    float: right;
                    width: auto;
                    line-height: 46px;
                    height: 46px;
                    background: #519f10 none repeat scroll 0 0;
                    border: 0 none;
                    color: #ffffff;
                    text-decoration: none;
                    cursor: pointer;
                    font-size: 14px;
                    margin: 0;
                    padding: 0px 10px;
                    text-indent: 0;
                    text-shadow: none;
                    transition: all 0.2s ease 0s;
                }
            }
        }
    }
}
</style>
