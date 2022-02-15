<template>
    <div class="tealist">
        <el-row class="choice">
            <el-col class="listtit" :span="4" :push="1">
                <span>茶叶</span>
            </el-col>
            <el-col class="kinds" :span="20" :pull="1">
                <ul>
                    <li
                        v-for="item in kind"
                        :key="item"
                        @click="actkind(item)"
                        :class="iskind == item ? 'active' : ''"
                    >{{ item }}</li>
                </ul>
            </el-col>
        </el-row>
        <div class="prolist">
            <ProList></ProList>
        </div>

        <div class="page" :class="iskind=='全部'?'block':''">
            <el-pagination background layout="prev, pager, next" @next-click="next" @prev-click="prev" @current-change="current" :page-count="2"></el-pagination>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const kind = ref(['全部', '绿茶', '黄茶', '乌龙茶', '红茶', '黑茶', '白茶', '花茶'])
const iskind = useKind();
const pageindex=usePage();

const next = () => {
    console.log("next")
    pageindex.value+=1;
    if(pageindex.value>2){
        pageindex.value=2
    }
}
const prev = () => {
    console.log("prev")
    pageindex.value-=1;
    if(pageindex.value<=0){
        pageindex.value=1
    }
}
const current = (e) => {
    pageindex.value=e
}
const actkind = (tem) => {
    iskind.value = tem;
}
</script>

<style lang="less" scoped>
.tealist {
    .img {
        .header {
            img {
                width: 100%;
            }
        }
    }
    .choice {
        width: 100%;
        padding: 20px 0px;
        background-color: #f9f9f9;
        .listtit {
            float: left;
            font-size: 24px;
            color: #333333;
            // padding: 0 0 15px 0;
            display: block;
        }
        .kinds {
            ul {
                margin: 0px;
                display: block;
                height: 30px;
                float: right;
                li {
                    float: left;
                    list-style: none;
                    width: 60px;
                    position: relative;
                    padding: 10px 0;
                    text-align: center;
                    line-height: 15px;
                    font-size: 15px;
                    color: #808080;
                    margin: 0px 5px;
                    &::after {
                        content: "";
                        display: block;
                        /*开始时候下划线的宽度为0*/
                        width: 0;
                        height: 1px;
                        position: absolute;
                        left: 0;
                        bottom: -1px;
                        background: #90af6b;
                        /*这里我们设定所有改变都有动画效果，可以自己指定样式才有动画效果*/
                        transition: all 0.3s ease-in-out;
                    }
                    &:hover {
                        color: #90af6b;
                        cursor: pointer;
                    }
                    &:hover::after {
                        width: 100%;
                    }
                }
                .active {
                    color: #90af6b;
                    border-bottom: 1px solid #90af6b;
                }
            }
        }
    }
    .prolist {
        overflow: hidden;
    }
    .page {
        margin: 20px 0;
        display: none ;
        .el-pagination{
            width: 20%;
            margin: auto;
        }
    }
    .block{
        display: block;
    }
}
</style>
