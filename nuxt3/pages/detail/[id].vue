<template>
    <div class="detail-contain">
        <div class="detail-top">
            <nuxt-link to="/tealist">茶叶</nuxt-link>
            <span>></span>
            <nuxt-link to="/tealist">全部</nuxt-link>
            <span>></span>
            <nuxt-link :to="`/search/${carLists.sort}`">{{ carLists.sort }}</nuxt-link>
            <span>></span>
            <a href class="top-a">{{ carLists.name }}</a>
        </div>
        <div class="detail">
            <div class="detail-main">
                <el-row>
                    <el-col :span="10">
                        <img :src="carLists.src" alt class="leftimg" />
                        <div class="leftbt">
                            <ul>
                                <li>
                                    <img
                                        :src="carLists.src"
                                        alt
                                        class="leftimgsmall"
                                    />
                                </li>
                            </ul>
                        </div>
                    </el-col>
                    <el-col :span="14">
                        <div class="main-top">{{ carLists.name }}</div>
                        <div class="main-middle">¥{{ carLists.price }}.0</div>
                        <div
                            class="main-middle2"
                        >饮茶不但是传统饮食文化，同时，由于茶中含有多种抗氧化物质与抗氧化营养素，对于消除自由基有一定的效果。因此喝茶也有助防老，具养生保健功能，每天喝三两杯茶可起到防老的作用。茶叶中含有多种维生素和氨基酸，喝茶对于清油解腻，增强神经兴奋以及消食利尿也具有一定的作用。</div>
                        <div class="main-yellow">商品编号： {{ carLists.number }}</div>
                        <div class="main-botton">
                            分类：
                            <a href>{{ carLists.sort }}</a>
                        </div>
                        <div class="main-botton2">
                            <el-button class="main-botton2-tocar" @click="addshop">加入购物车</el-button>
                            <el-input-number
                                v-model="num"
                                :min="1"
                                :max="100"
                                controls-position="right"
                                @change="handleChange"
                            />
                        </div>
                        <div class="main-botton3">
                            <el-icon>
                                <Goods></Goods>
                            </el-icon>收藏
                        </div>
                    </el-col>
                </el-row>
            </div>

            <div class="detail-middle">
                <div class="detail-middle-top">描述</div>
                <div
                    class="detail-middle-bt"
                >饮茶不但是传统饮食文化，同时，由于茶中含有多种抗氧化物质与抗氧化营养素，对于消除自由基有一定的效果。因此喝茶也有助防老，具养生保健功能，每天喝三两杯茶可起到防老的作用。茶叶中含有多种维生素和氨基酸，喝茶对于清油解腻，增强神经兴奋以及消食利尿也具有一定的作用。 但并不是喝得越多越好，也不是所有的人都适合喝茶。一般来说，每天1-2次，每次3-5克、400毫升的饮量是比较适当的。一般，人们说喝茶还指喝水。</div>
                <div class="detail-middle-bt2">
                    <img src="../../assets/img-wjl/aHR0cDovLzVjZGQzYWE1YzQ2ZWEu.jpg" alt />
                </div>
                <div class="detail-middle-bt3">
                    <div class="detail-middle-bt3-top">相关商品</div>
                    <div class="detail-middle-bt3-img">
                        <ul>
                            <li>
                                <div class="detail-middle-bt3-imgs1">
                                    <a href>
                                        <img
                                            src="../../assets/img-wjl/aHR0cDovLzVjZGQzYWE1YzQ2ZWEudDczp_3D.jpg"
                                            altF
                                        />
                                    </a>
                                </div>
                                <div class="detail-middle-bt3-imgtext">
                                    <nuxt-link to="/detail/61c2e2e36ff23ec2dbe4ade6">白牡丹</nuxt-link>
                                </div>
                                <div class="detail-middle-bt3-imgtext2">¥1,235.0</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { defineComponent, ref, watch } from 'vue'
import {
    Goods
} from '@element-plus/icons'

import { useRouter, useRoute } from 'vue-router'
const { carLists } = useCar()
const config = useRuntimeConfig();
const router = useRouter();
const route = useRoute();
//获取数据

const detailmsg = ref({})

//加入购物车数据
let carlist = ref({
    //用户登录后id
    id: "",
    src: "",
    name: "",
    price: 1,
    num: 1,
})

const get = async () => {
    if (config.API_BASE) {
        let { data } = await useFetch(`${config.API_BASE}/product/detail`, { params: { id: route.params.id } });
        carLists.value = data.value.msg;
        //加入购物车
        carlist.value.userid = "111111";
        carlist.value.id = carLists.value._id;
        carlist.value.src = carLists.value.src;
        carlist.value.name = carLists.value.name;
        carlist.value.price = carLists.value.price;
    } else {
        let { data } = await useFetch(`/product/detail`, { params: { id: route.params.id } });
        if (data.value) {
            carLists.value = data.value.msg;
            //加入购物车
            carlist.value.userid = "111111";
            carlist.value.id = carLists.value._id;
            carlist.value.src = carLists.value.src;
            carlist.value.name = carLists.value.name;
            carlist.value.price = carLists.value.price;
        }

    }


}
get()


//饿了么插件购买数量

const num = ref(1)
const handleChange = (value) => {
    num.value = value;
    //加入购物车数量改变
    carLists.value.num = num.value;

}

//向vuex存入数据


//加入购物车
// id name num price src
const addshop = async () => {
    carLists.value.num = num.value;
    let { data } = await useFetch(`/car/add`, {
        method: "post",
        body: {
            id: carLists.value._id,
            name: carLists.value.name,
            num: carLists.value.num,
            price: carLists.value.price,
            src: carLists.value.src
        },
        server: false
    });
    if (data.value.code === 0) {
        router.push('/shopcar')
    } else {
        router.push('/login')
    }

}

//获取路由参数
// console.log($route.params.id)
</script>

<style lang="less" scoped>
body {
    padding: 0px;
    margin: 0px;
}
.detail-contain {
    .detail-top {
        background: #f9f9f9;
        padding-left: 40px;
        line-height: 59px;
        color: black;
        font-size: 10px;
        height: 59px;
        border-bottom: 1px dotted #d9d9d9;
        font-family: "微软雅黑", Helvetica, Arial, Verdana, sans-serif;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        span {
            color: #90af6b;
        }
        a {
            text-decoration: none;
            color: black;
        }
        .top-a {
            color: #90af6b;
        }
    }
    .detail {
        width: 1030px;
        margin: auto;

        .detail-main {
            padding: 20px;
            margin-top: 20px;
            width: 100%;
            height: 552px;
            border: 1px solid #ccc;
            .leftimg {
                width: 400px;
                height: 400px;
            }
            .el-row {
                height: 552px;
                .el-col-14 {
                    padding: 10px;
                }
            }
            .leftbt {
                margin-top: 20px;
                line-height: 60px;
                height: 60px;

                .toleft {
                    float: left;
                    margin-top: 21px;
                }
                .toright {
                    float: left;
                    margin-top: 21px;
                }
                ul {
                    padding-left: 0px;
                    padding-right: 0px;
                    width: 93px;
                    height: 93px;
                    margin: 0px;
                    list-style: none;
                    float: left;
                    li {
                        display: inline;
                        padding: 0px;
                        width: 93px;
                        height: 93px;
                        img {
                            width: 93px !important;
                            height: 93px !important;
                        }
                    }
                }
                .leftimgsmall {
                    width: 60px;
                    height: 60px;
                    border: 1px solid #ccc;
                }
            }
            .main-top {
                color: black;
                height: 50px;
                line-height: 50px;
                font-size: 22px;
                font-weight: normal;
                border-bottom: 1px dotted #d9d9d9;
            }
            .main-middle {
                color: black;
                height: 54px;
                font-size: 22px;
                line-height: 50px;
                font-weight: normal;
                font-family: "宋体", "微软雅黑", Arial, Helvetica, sans-serif;
            }
            .main-middle2 {
                line-height: 20px;
                font-size: 13px;
                color: #939393;
                padding-bottom: 20px;
                border-bottom: 1px dotted #d9d9d9;
            }
            .main-yellow {
                font-size: 14px;
                font-weight: normal;
                color: #777777;
                border-color: #dddddd;
                padding: 7px 0;
                border-bottom: 1px dotted #d9d9d9;
            }
            .main-botton {
                font-size: 14px;
                font-weight: normal;
                color: #777777;
                border-color: #dddddd;
                padding: 7px 0;
                border-bottom: 1px dotted #d9d9d9;
                a {
                    text-decoration: none;
                    color: #627f9a;
                }
            }
            .main-botton2 {
                padding-top: 20px;
                .main-botton2-tocar {
                    width: 130px;
                    height: 40px;
                    border: none;
                    background: #519f10;
                    color: white;
                }
            }
            .main-botton3 {
                color: #666;
                padding-top: 20px;
                font-size: 12px;
                vertical-align: middle;
                .icon {
                    vertical-align: middle;
                }
            }
            .shopimg1 {
                margin-top: 30px;
            }
            .shopimg2 {
                margin-top: 30px;
                margin-left: 20px;
            }
        }
        .detail-middle {
            margin-top: 20px;
            .detail-middle-top {
                border-top: 1px solid #ccc;
                height: 44px;
                line-height: 44px;
                color: #333333;
                font-size: 15px;
                font-weight: bold;
                text-indent: 2em;
                position: relative;
                padding-bottom: 20px;
                &::after {
                    content: "";
                    position: absolute;
                    top: 0px;
                    left: 0px;
                    width: 80px;
                    height: 0px;
                    border-top: 4px solid black;
                }
            }
            .detail-middle-bt {
                color: #777777;
                font-size: 15px;
                line-height: 24px;
            }
            .detail-middle-bt2 {
                padding-bottom: 40px;
                border-bottom: 1px solid #ccc;
            }
            .detail-middle-bt3 {
                .detail-middle-bt3-top {
                    height: 40px;
                    line-height: 40px;
                    font-size: 20px;
                    font-weight: normal;
                    color: #555555;
                }
                .detail-middle-bt3-img {
                    ul {
                        list-style: none;
                        margin: 0px;
                        padding: 0px;
                        li {
                            padding: 0px 20px 0px 0px !important;
                            float: left;
                            margin: 0px;

                            margin: 0px;
                            padding: 0px;

                            .detail-middle-bt3-imgtext {
                                a {
                                    font-size: 16px;
                                    font-weight: normal;
                                    color: #8e8e8e;
                                    height: 30px;
                                    line-height: 30px;
                                    text-decoration: none;
                                }
                            }
                            .detail-middle-bt3-imgtext2 {
                                padding-bottom: 20px;
                                font-size: 16px;
                                font-weight: normal;
                                color: #8e8e8e;
                                height: 30px;
                                line-height: 30px;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>

