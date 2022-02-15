<template>
    <div class="contect">
        <el-row class="content">
            <el-col class="topimg" :span="24">
                <img src="../assets/img/contact.webp" />
            </el-col>
            <el-col class="txt" :span="14">
                <span>中国历史上有很长的饮茶纪录，已经无法确切地查明到底是在什么年代了，但是大致的时代是有说法的。并且也可以找到证据显示，确实在世界上的很多地方饮茶的习惯是从中国传过去的。</span>
            </el-col>
        </el-row>
        <el-row class="icons">
            <el-col :span="8">
                <div>
                    <el-icon>
                        <message />
                    </el-icon>
                    <p class="i_tit">邮箱</p>
                    <p class="i_txt">info@email.com</p>
                </div>
            </el-col>
            <el-col :span="8">
                <div>
                    <el-icon>
                        <phone />
                    </el-icon>
                    <p class="i_tit">手机</p>
                    <p class="i_txt">13725415481/010 6888 6888</p>
                </div>
            </el-col>
            <el-col :span="8">
                <div>
                    <el-icon>
                        <location-information />
                    </el-icon>
                    <p class="i_tit">地址</p>
                    <p class="i_txt">苏州市建外SOHO东区2号楼</p>
                </div>
            </el-col>
        </el-row>
        <el-row class="map">
            <el-col :span="22">
                <Map></Map>
            </el-col>
        </el-row>
    </div>
</template>
<style lang="less" scoped>
.contect {
    .content {
        .header {
            img {
                width: 100%;
            }
        }
        .topimg {
            img {
                width: 100%;
            }
        }
        .txt {
            margin: auto;
            padding: 20px 10px;
            span {
                display: table;
                font-size: 14px;
                text-align: center;
                color: #808080;
            }
        }
    }
    .icons {
        margin-bottom: 30px;
        .el-col {
            div {
                .el-icon {
                    font-size: 70px;
                    color: #7b7b7b;
                    display: block;
                    margin: auto;
                }
                .i_tit {
                    font-size: 20px;
                    color: #333333;
                    vertical-align: bottom;
                    text-align: center;
                }
                .i_txt {
                    font-size: 14px;
                    text-align: center;
                    color: #bfbfbf;
                }
            }
        }
    }
    .map {
        margin-bottom: 20px;
        .el-col {
            margin: auto;
        }
    }
}
</style>
<script setup>
import { ref } from 'vue'
import { LocationInformation, Message, Phone } from '@element-plus/icons';

</script>
