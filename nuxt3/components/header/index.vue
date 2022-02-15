<template>
    <div class="container">
        <div class="search" :style="dis ? 'display:block' : 'display:none'" @click="closeSearch">
            <div class="search_n" @click.stop>
                <div class="search_top">搜索</div>
                <div class="search_middle">
                    <input type="text" placeholder="请输入关键词" v-model="key" />
                </div>
                <div class="search_right">
                    <button class="but" @click="search">确认</button>
                    <button class="but" @click="closeSearch">取消</button>
                </div>
            </div>
        </div>
        <div class="left">
            <nuxt-link to="/">
                <img src="@/assets/img/Logo.jpg" />
            </nuxt-link>
        </div>
        <div class="right">
            <a href="#" class="icon" @click.prevent="toSearch">
                <el-icon size="28">
                    <Search />
                </el-icon>
            </a>
            <a href="#" class="icon" @click.prevent="toDetail">
                <el-icon size="28">
                    <Avatar />
                </el-icon>
            </a>
            <div class="detail" :style="det ? 'display:block' : 'display:none'">
                <div class="d1">
                    <el-icon size="13" class="detail_1">
                        <Avatar />
                    </el-icon>
                    <nuxt-link to="/member" class="detail_2" @click="det = false">个人资料</nuxt-link>
                </div>
                <div class="d1">
                    <el-icon size="13" class="detail_1">
                        <CreditCard />
                    </el-icon>
                    <nuxt-link to="/member" class="detail_2" @click="det = false">我的订单</nuxt-link>
                </div>
                <div class="d1">
                    <el-icon size="13" class="detail_1">
                        <SwitchButton />
                    </el-icon>
                    <nuxt-link to="/" class="detail_2" @click.prevent="exit">退出登录</nuxt-link>
                </div>
            </div>
            <div class="xx">
                <a class="icon point" @click.prevent="ani">
                    <el-icon size="28">
                        <ShoppingCart />
                    </el-icon>
                    <span
                        v-if="ShoppingCar != 0"
                        class="dot"
                        :class="{ cartoon: bool }"
                    >{{ ShoppingCar }}</span>
                </a>
                <div class="shop">
                    <div v-if="isShop" class="noshop">请登录后查看</div>
                    <div v-else class="isshop">
                        <ul class="list">
                            <li v-for="item in shopListState[0].shop" :key="item._id">
                                <div class="list_left">
                                    <img :src="item.src" />
                                </div>
                                <div class="list_right">
                                    <div class="title">
                                        <nuxt-link
                                            :to="`/detail/${item.id}`"
                                            class="title_to"
                                        >{{ item.name }}</nuxt-link>
                                    </div>
                                    <div class="price">{{ item.num }} × ¥{{ item.price }}.0</div>
                                    <div class="remove" @click="deleteCar(item.id)">✕</div>
                                </div>
                            </li>
                        </ul>
                        <div class="total">小计¥{{ shopListState[0].allsum }}.0</div>
                        <div class="clean">
                            <nuxt-link to="/order" class="to">结算</nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="middle">
            <ul>
                <li>
                    <nuxt-link to="/" class="varbar">
                        <span>首页</span>
                        <i class="underline"></i>
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/about" class="varbar">
                        <span>关于</span>
                        <i class="underline"></i>
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/tealist" class="varbar">
                        <span>茶叶</span>
                        <i class="underline"></i>
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/base" class="varbar">
                        <span>基地</span>
                        <i class="underline"></i>
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/tea" class="varbar">
                        <span>新闻</span>
                        <i class="underline"></i>
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/contact" class="varbar">
                        <span>联系</span>
                        <i class="underline"></i>
                    </nuxt-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script setup>
import { ref, watchEffect, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Search, ShoppingCart, Avatar, CreditCard, SwitchButton } from '@element-plus/icons'
const dis = ref(false)
const det = ref(false)
const bool = ref(true)
const isShop = ref(false)
//是否登录
const login = useLogin()
const ShoppingCar = useCarValue()
const { shopList, shopListState } = useShopCar()
const router = useRouter()
const config = useRuntimeConfig();
shopListState.value = [{ things: true, allsum: 0, shop: [] }]
const key = ref()
const ani = () => {
    router.push('/shopcar')
}
const num = ref(0)

const gets = async () => {
    if (!config.API_BASE) {
        let { data: carts } = await useFetch("/car/cars", { server: false });
        watch(carts.value, () => {
            if (carts.value) {
                if (carts.value.code === 0) {
                    bool.value = false
                    //出现购物车商品
                    isShop.value = false
                    ShoppingCar.value = carts.value.cardata.length
                    shopList.value = carts.value.cardata;
                    shopListState.value[0].shop = carts.value.cardata//
                    if (carts.value.cardata.length === 0) {
                        shopListState.value[0].things = false
                    }

                    jisuan()
                    jisuanallsum()
                    setTimeout(() => {
                        bool.value = true
                    }, 100)
                } else {
                    isShop.value = true
                }
            }
        }, { immediate: true })
    }
}
if (!config.API_BASE) {
    setTimeout(() => {
        if (login.value) {
            gets()
        } else {
            isShop.value = true
        }
    }, 100);
}
const deleteCar = async (e) => {
    let { data } = await useFetch("/car/detele", {
        method: 'post', body: { id: e, }, server: false
    });
    gets()
    console.log(shopListState.value[0])
}
const toSearch = () => {
    dis.value = true
}
const closeSearch = () => {
    dis.value = false
}
const search = () => {
    if (key.value) {
        router.push(`/search/${key.value}`)
    } else {
        router.push(`/search/茶`)
    }
    dis.value = false
}
const toDetail = () => {
    if (login.value) {
        if (det.value) {
            det.value = false
        } else {
            det.value = true
        }
    } else {
        router.push('/login')
    }
}
const exit = async () => {
    const { data } = await useFetch(`/user/exit`, { server: false })
    watchEffect(() => {
        if (data.value.code === 0) {
            login.value = false
            det.value = false
            isShop.value = true
            ShoppingCar.value = 0
            shopList.value = []
        }
    })
}
//计算总价
const jisuan = () => {
    let sum = 0;
    shopList.value.map(item => {
        sum = item.price * item.num;
        item.sum = sum
    })
    shopListState.value[0].shop = shopList.value
}
let allsum = ref(0)
const jisuanallsum = () => {
    allsum.value = 0
    for (var i = 0; i < shopList.value.length; i++) {
        allsum.value = allsum.value + shopList.value[i].sum
    }
    shopListState.value[0].allsum = allsum.value
}
</script>

<style lang="less" scoped>
@import "@/assets/less/header.less";
</style>