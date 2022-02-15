<template>
    <div class="container0">
        <div class="tea_bg">
            <image src="../assets/img/tea_bg.webp" />
        </div>

        <div class="about_us">
            <div class="header_title">春茶</div>

            <div class="tea_introduce">
                <div>饮茶不但是传统饮食文化，同时，由于茶中含有多种抗氧化物质与抗氧化营养素，对于消除自由基有一定的效果。</div>
                <div>因此喝茶也有助防老，具养生保健功能，每天喝三两杯茶可起到防老的作用。</div>
            </div>
        </div>

        <div class="introduce_">
            <div class="introduce_count">
                <div>{{ number.a1 }}</div>
                <div>{{ number.a2 }}</div>
                <div>{{ number.a3 }}</div>
                <div>{{ number.a4 }}</div>
            </div>
            <div class="introduce_explain">
                <div>历史悠久</div>
                <div>冲泡温度</div>
                <div>碧螺春等级</div>
                <div>茶园面积</div>
            </div>

            <div class="about_us">
                <div class="header_title">喝茶的好处</div>

                <div class="tea_introduce">
                    <div>
                        饮茶不但是传统饮食文化，同时，由于茶中含有多种抗氧化物质与抗氧化营养素，对于消除自由基有一定的效果。因此喝茶也有助防老，具养生保健功能，每天喝三两杯茶可起到防老的作用。茶叶中含有多种维生素和氨基酸，喝茶对于清油解腻，增强神经兴奋以及消食利尿也具有一定的作用。
                        但并不是喝得越多越好，也不是所有的人都适合喝茶。一般来说，每天1-2次，每次3-5克、400毫升的饮量是比较适当的。一般，人们说喝茶还指喝水。
                    </div>
                </div>
            </div>
            <div class="about_us_2">
                <div>
                    <image class src="../assets/img/tea_planning.webp" />
                    <div class="center_title">
                        <span>茶园规划</span>
                    </div>
                    <div>
                        <span>明万历二十三年（1595）张源撰写的《茶录》中，对当时洞庭东西山绿茶（炒青）的采摘、炒制有较为详细的记载，其炒制过程分杀青、轻团、焙干等工序，已与当今洞庭碧螺春的炒制工艺基本一致。</span>
                    </div>
                </div>
                <div>
                    <image class src="../assets/img/tea_identify.webp" />
                    <div class="center_title">
                        <span>茶叶品质鉴别</span>
                    </div>
                    <div>
                        <span>明万历二十三年（1595）张源撰写的《茶录》中，对当时洞庭东西山绿茶（炒青）的采摘、炒制有较为详细的记载，其炒制过程分杀青、轻团、焙干等工序，已与当今洞庭碧螺春的炒制工艺基本一致。</span>
                    </div>
                </div>
                <div>
                    <image class src="../assets/img/tea_art.webp" />
                    <div class="center_title">
                        <span>冲泡工艺</span>
                    </div>
                    <div>
                        <span>明万历二十三年（1595）张源撰写的《茶录》中，对当时洞庭东西山绿茶（炒青）的采摘、炒制有较为详细的记载，其炒制过程分杀青、轻团、焙干等工序，已与当今洞庭碧螺春的炒制工艺基本一致。</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { reactive } from 'vue'
const number = reactive({
    a1: 0,//138
    a2: 0,//95
    a3: 0,//1
    a4: 0,//567
})
const timer = setInterval(() => {
    number.a1 += 2
    number.a2 += 1
    number.a3 += 0
    number.a4 += 8
    if (number.a1 == 138) {
        number.a2 = 95;
        number.a3 = 1;
        number.a4 = 567
        clearInterval(timer)
    }
}, 10)
</script>
<style lang="less">
* {
    padding: 0;
    margin: 0;
}

.container0 {
    width: 100%;
    height: 100%;

    margin-top: 30px;
    font-family: "微软雅黑", Helvetica, Arial, Verdana, sans-serif;
}

.about_us {
    width: 100%;
    height: 100%;
    padding: 50px 40px 0px;
}

.tea_bg img {
    width: 100%;
    overflow: hidden;
    background-size: 100%;
    background-position: center center;
    margin-bottom: 50px;
}

.header_title {
    font-size: 24px;

    font-style: normal;
    color: #232323;
    padding: 0 0 5px 0;
    text-align: center;
    vertical-align: bottom;
}

/* .introduce_ {
    width: 100%;
    height: 100%;

  } */

.tea_introduce {
    text-align: center;
    color: #8d9095;
    font-size: 16px;
    line-height: 24px;
    padding-top: 22px;
    margin-bottom: 60px;
}

.introduce_count {
    width: 100%;
    height: 100%;
    padding-top: 100px;
    font-size: 60px;
    font-family: courier new;
    color: #3c3c3c;
    border-top: 1px solid #ddd;
    display: flex;
}

.introduce_count > div {
    height: 100%;
    width: 25%;
    /* float: left; */
    text-align: center;
    border-right: 1px solid #ddd;
}

.introduce_explain {
    width: 100%;
    height: 100%;
    font-size: 14px;
    padding-bottom: 100px;
    display: flex;
    /* background-color: skyblue; */
    border-bottom: 1px solid #ddd;
    margin-bottom: 10px;
}

.introduce_explain div {
    height: 100%;
    width: 25%;
    color: #8d9095;
    text-align: center;
    border-right: 1px solid #ddd;
}

.introduce_explain div:last-child,
.introduce_count div:last-child {
    border-right: none;
}

.about_us_2 {
    padding: 20px 40px;
    display: flex;
    font-size: 14px;
    color: #8d9095;
}

.about_us_2 > div {
    /* position: relative; */
    top: 0px;
    transition: all 1s ease;
}

.about_us_2 > div:hover {
    position: relative;
    top: -14px;
    transition: all 1s ease;
}

.about_us_2 .center_title {
    font-size: 18px;
    font-style: normal;
    color: #232323;
    padding: 17px 0 12px 0;
    text-align: center;
    vertical-align: bottom;
}

.about_us_2 > div {
    width: 33.3%;
    height: 100%;
    padding: 0px 40px 20px 0px;
    margin-top: 10px;
}

.about_us_2 img {
    width: 100%;
    overflow: hidden;
    background-size: 100%;
    background-position: center center;
}
</style>