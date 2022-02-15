<template>
    <div class="prolist">
        <div class="procont">
            <!-- data-aos="fade-up" data-aos-once="true" -->
            <div
                class="proitem"
                v-for="item in list"
                :key="item._id"
                data-aos="fade-up"
                data-aos-once="true"
            >
                <div class="pitem_img">
                    <nuxt-link class="txtnone" :to="`/detail/${item._id}`">
                        <img :src="item.src" />
                    </nuxt-link>
                </div>
                <div class="pitem_name">
                    <nuxt-link class="txtnone" :to="`/detail/${item._id}`">
                        <div>{{ item.name }}</div>
                        <p>￥{{ item.price }}.0</p>
                    </nuxt-link>
                </div>
                <div class="pitem_go">
                    <nuxt-link class="txtnone" :to="`/detail/${item._id}`">
                        <el-icon>
                            <Right />
                        </el-icon>
                    </nuxt-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ref, watchEffect, watch } from 'vue'
import { Right } from '@element-plus/icons'
import AOS from 'aos';
import 'aos/dist/aos.css';

export default {
    components: {
        Right
    },
    props: {
        msg: String,
    },
    setup(props) {
        const config = useRuntimeConfig();
        const list = useList()
        const keyword = useKind();
        const pageindex = usePage();
        const allpro = useAllPro()//keyword 为全部时的产品列表

        if (props.msg) {      //search功能
            const searchlist = async () => {
                if (config.API_BASE) {
                    let { data } = await useFetch(`${config.API_BASE}/product/search`, {
                        method: "post", body: {
                            msg: props.msg
                        }
                    });
                    if (data.value.code == 1) {
                        list.value = data.value.msg
                    }
                }
                else {
                    let { data } = await useFetch(`/product/search`, {
                        method: "post", body: {
                            msg: props.msg
                        }
                    });
                    if (data.value.code == 1) {
                        list.value = data.value.msg
                    }
                }
            }
            if (!config.API_BASE) {
                AOS.init();
            }
            onMounted(() => {
                setTimeout(() => {
                    searchlist();
                }, 0)
            })
        } else {      //分类功能
            const getlist = async () => {
                if (config.API_BASE) {
                    let { data } = await useFetch(`${config.API_BASE}/product/list`, {
                        params: {
                            index: pageindex.value
                        }
                    });
                    if (pageindex.value == 1) {
                        allpro.value = data.value.msg
                    }
                    list.value = data.value.msg
                }
                else {
                    let { data } = await useFetch(`/product/list`, {
                        params: {
                            index: pageindex.value
                        }
                    });
                    if (data.value) {
                        if (pageindex.value == 1) {
                            allpro.value = data.value.msg
                        }
                        list.value = data.value.msg
                    }
                }
            }
            //根据茶种类筛选   sort
            const listchange = (net) => {
                let pro = []
                for (var i = 0; i < net.length; i++) {
                    if (keyword.value == "全部") {
                        pro = allpro.value;
                    } else if (keyword.value == net[i].sort) {
                        net[i].sort
                        pro.push(net[i]);
                    }
                }
                return pro
            }
            //监听keyword
            watch(keyword, async () => {
                if (config.API_BASE) {
                    let { data } = await useFetch(`${config.API_BASE}/product/list`);
                    if (data.value) {
                        list.value = listchange(data.value.msg);
                    }
                }
                else {
                    let { data } = await useFetch(`/product/list`);
                    if (data.value) {
                        list.value = listchange(data.value.msg);
                    }
                }
            })
            //监听pageindex
            watch(pageindex, () => {
                getlist()
            }, { immediate: true })
            //使用AOS
            onMounted(() => {
                AOS.init();
            })
        }
        return { list }
    }
}
</script>
<style lang="less" scoped>
.prolist {
    width: 100%;
    .procont {
        width: 92%;
        margin: auto;
        .proitem {
            width: 20%;
            padding: 15px;
            float: left;
            box-sizing: border-box;
            text-decoration: none;
            .pitem_img {
                overflow: hidden;
                display: block;
                width: 100%;
                text-align: center;
                padding-bottom: 10px;
                .txtnone {
                    text-decoration: none;
                    img {
                        max-width: 100%;
                    }
                }
            }
            .pitem_name {
                .txtnone {
                    text-decoration: none;
                    div {
                        position: relative;
                        padding-bottom: 15px;
                        color: #555555;
                        line-height: 16px;
                        vertical-align: top;
                        text-align: left;
                        width: 100%;
                        border-bottom: 1px solid #ededed;
                        box-sizing: border-box;
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
                    }
                    p {
                        padding: 10px 0;
                        margin: 0px;
                        text-align: left;
                        color: #8e8e8e;
                        font-size: 16px;
                    }
                }
            }
            .pitem_go {
                .txtnone {
                    text-decoration: none;
                    color: #d1d1d1;
                    font-size: 13px;
                    padding: 5px 8px;
                    border: solid 1px #d8d8d8;
                }
            }
            &:hover {
                .pitem_name {
                    .txtnone {
                        div {
                            color: #519f10;
                            &::after {
                                width: 100%;
                            }
                        }
                    }
                }
                .pitem_go {
                    .txtnone {
                        color: #519f10;
                        border-color: #519f10;
                    }
                }
            }
        }
    }
}
</style>
