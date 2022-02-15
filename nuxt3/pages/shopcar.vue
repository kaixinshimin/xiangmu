<template>
    <div class="shopcar-container">
        <div class="hasthings" v-if="shopListState[0].things">
            <div class="shopcar-container-topmax">
                <CarCars />
            </div>
            <el-row :gutter="40">
                <el-col :span="15">
                    <div class="hasthings-left">
                        <div class="hasthings-left-top">
                            <el-table :data="shopListState[0].shop" style="width: 100%">
                                <el-table-column label="商品" width="150" align="center">
                                    <template #default="scope">
                                        <img :src="scope.row.src" alt width="90" height="90" />
                                    </template>
                                </el-table-column>
                                <el-table-column label width="100" align="center">
                                    <template #default="scope">
                                        <span style="margin-left: 10px">{{ scope.row.name }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="价格" width="120" align="center">
                                    <template #default="scope">
                                        <span style="margin-left: 10px">￥{{ scope.row.price }}</span>
                                    </template>
                                </el-table-column>

                                <el-table-column label="数量" width="150" align="center">
                                    <template #default="scope">
                                        <span style="margin-left: 10px">
                                            <el-input-number
                                                v-model="scope.row.num"
                                                size="mini"
                                                :min="1"
                                                @change="changenum"
                                            />
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="合计" width="130" align="center">
                                    <template #default="scope">
                                        <span style="margin-left: 10px">￥{{ scope.row.sum }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="删除" align="center">
                                    <template #default="scope">
                                        <el-button
                                            size="mini"
                                            type="danger"
                                            @click="handleDelete(scope.$index, scope.row)"
                                        >删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </el-col>
                <el-col :span="9">
                    <div class="hasthings-span9">
                        <div class="hasthings-mian1">
                            购物车总计
                            <span>¥{{ shopListState[0].allsum }}.0</span>
                        </div>
                        <div class="hasthings-mian2">
                            购物车小计
                            <span>免费送货</span>
                        </div>
                        <div class="hasthings-mian3">
                            运费
                            <span>¥0.0</span>
                        </div>
                        <div class="hasthings-mian4">
                            订单总计
                            <span>¥{{ shopListState[0].allsum }}.0</span>
                        </div>
                        <div class="hasthings-mian5">
                            <el-button
                                class="hasthings-mian5-bt"
                                @click="$router.push('/order')"
                            >前往收银台</el-button>
                        </div>
                        <div class="hasthings-mian6">优惠券:</div>
                        <div class="hasthings-mian7">
                            <input type="text/" class="hasthings-mian7-input" placeholder="优惠券代码" />
                        </div>
                        <div class="hasthings-mian8">
                            <el-button class="hasthings-mian8-bt" :disabled="disply">使用优惠券</el-button>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="nothings" v-else>
            <div class="nothings-main">
                <CarCars2 />
                <div class="nothings-main-top">您的购物车是空的。</div>
                <div class="nothings-main-bt">
                    <el-button class="nothings-main-back" @click="$router.push('/tealist')">
                        <el-icon>
                            <Back />
                        </el-icon>返回商店
                    </el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { defineComponent, ref, computed, watchEffect, watch } from 'vue'
import { Back, Timer } from '@element-plus/icons'
import { useRouter } from 'vue-router'
import { createTrue } from 'typescript';

//购物车是否有数据
const tableData = ref([]);
const config = useRuntimeConfig();
const { shopList, shopListState } = useShopCar()
const ShoppingCar = useCarValue()
const router = useRouter()
const login = useLogin()
shopListState.value = [{ things: true, allsum: 0,shop:[] }]

//从数据库获取购物车数据
const gets = async () => {
    if (!config.API_BASE) {
        let { data: carlist } = await useFetch("/car/cars", { server: false });
        watch(() => carlist.value, () => {
            if (carlist.value) {
                if (carlist.value.code === 0) {
                    if (carlist.value.cardata.length == 0) {
                        shopListState.value[0].things=false
                        shopList.value = carlist.value.cardata;
                        ShoppingCar.value = carlist.value.cardata.length
                        shopListState.value[0].shop=carlist.value.cardata//
                    } else
                        if (carlist.value.cardata.length != 0) {
                            shopList.value = carlist.value.cardata;
                            ShoppingCar.value = carlist.value.cardata.length
                            shopListState.value[0].shop=carlist.value.cardata//
                            if (shopListState.value[0].shop == 0) {
                                shopListState.value[0].things=false
                            }
                            // 调用计算总价函数
                            jisuan()
                            jisuanallsum()

                        }
                } else if (carlist.value.code === -1) {
                    if (!login.value) {
                        router.push('/login')
                    }
                }
            }
        }, { immediate: true })
    }
}
gets()
//num变化更新单商品总价
const changenum = () => {
    jisuan()
    jisuanallsum()
}

const handleDelete = async (index, row) => {
    let { data } = await useFetch("/car/detele", {
        method: 'post', body: { id: row.id, }, server: false
    });
    gets()
}
//计算总价
const jisuan = () => {
    let sum = 0;
    shopList.value.map(item => {
        sum = item.price * item.num;
        item.sum = sum
    })
    shopListState.value[0].shop=shopList.value
}
let allsum = ref(0)
const jisuanallsum = () => {
    allsum.value = 0
    for (var i = 0; i < shopList.value.length; i++) {
        allsum.value = allsum.value + shopList.value[i].sum
    }
    shopListState.value[0].allsum = allsum.value
}
//优惠券能否点击
const disply = ref(true)

</script>
<style lang="less" scoped>
.shopcar-container {
    .shopcar-container-topmax {
        width: 90%;
        margin: auto;
        margin-top: 60px;
    }
    .hasthings {
        padding: 60px;
        .hasthings-span9 {
            position: relative;
            span {
                float: right;
                font-size: 14px;
                font-weight: normal;
                color: #777777;
            }
            &::after {
                content: "";
                position: absolute;
                height: 100px;
                width: 0px;
                border-left: 3px solid #808080;
                left: 1px;
                top: 1px;
            }
            .hasthings-mian1 {
                font-size: 16px;
                font-weight: bold;
                color: #555555;
                height: 30px;
                line-height: 30px;
                margin-left: 20px;
                border-bottom: 3px solid #ccc;
            }
            .hasthings-mian2 {
                font-size: 14px;
                font-weight: bold;
                color: #777777;
                height: 40px;
                line-height: 40px;
                margin-left: 20px;
            }
            .hasthings-mian3 {
                font-size: 14px;
                font-weight: bold;
                color: #777777;
                height: 20px;
                line-height: 20px;
                margin-left: 20px;
                border-bottom: 1px solid #ccc;
            }
            .hasthings-mian4 {
                font-size: 14px;
                font-weight: bold;
                color: #777777;
                height: 40px;
                line-height: 40px;
                margin-left: 20px;
                border-bottom: 3px solid #ccc;
            }
            .hasthings-mian5 {
                padding: 20px 0px;
                margin-left: 20px;
                color: white;

                .hasthings-mian5-bt {
                    color: white;
                    span {
                        margin: auto;
                        color: white !important;
                    }
                    width: 469px;
                    padding-right: 23px;

                    background: #519f10;
                }
            }
            .hasthings-mian6 {
                font-size: 16px;
                font-weight: bold;
                color: #555555;
                height: 30px;
                line-height: 30px;
                margin-left: 20px;
                border-bottom: 3px solid #ccc;
            }
            .hasthings-mian7 {
                margin-left: 20px;
                padding: 10px 8px 10px 0px;
                .hasthings-mian7-input {
                    width: 100%;
                    height: 30px;
                }
            }
            .hasthings-mian8 {
                margin-left: 20px;
                .hasthings-mian8-bt {
                    span {
                        margin: auto;
                        color: white;
                    }
                    width: 469px;
                    padding-right: 16px;

                    background: #90af6b;
                }
            }
        }
    }
    .nothings {
        .nothings-main {
            padding: 80px;
            border: 1px solid #ccc;
            .nothings-main-top {
                text-align: center;
                font-size: 16px;
                font-weight: normal;
                color: #777777;
                margin-top: 50px;
            }
            .nothings-main-bt {
                text-align: center;
                margin-top: 20px;
                .nothings-main-back {
                    color: white;
                    background: #519f10;
                }
            }
        }
    }
}
</style>