<template>
  <div>
    <div class="container">
      <div class="leftbox">
        <h3>订单地址</h3>
        <div>
          <select @change="selectadd" v-if="adresslist.length != 0">
            <option
              v-for="(item,index) in adresslist"
              :key="item._id"
              :value="index"
            >{{ item.adress }}</option>
          </select>
        </div>
        <div class="change_your_address">
          <nuxt-link to="/member">新增地址</nuxt-link>
        </div>

        <div class="customer_details">
          <div>
            <label for>
              姓名
              <abbr class="required">*</abbr>
            </label>
            <div>
              <input type="text" v-model="addressValue.name" />
            </div>
          </div>

          <div class="gap">&nbsp;</div>

          <div>
            <label for>
              电话
              <abbr class="required">*</abbr>
            </label>
            <div>
              <input type="text" v-model="addressValue.phone" />
            </div>
          </div>
        </div>

        <div class="fill_address">
          <div>
            <label for>
              地址
              <abbr class="required">*</abbr>
            </label>
            <div>
              <input type="text" placeholder="编辑地址" v-model="addressValue.address" />
            </div>
          </div>
          <h3>其他信息</h3>
          <div>
            <label for>订单备注</label>
            <div>
              <textarea type="text" placeholder="有关订单的注释，例如，交货的特殊注释" v-model="addressValue.remark"></textarea>
            </div>
          </div>
        </div>
      </div>

      <div class="rightbox">
        <h3>订单详情</h3>
        <table class="product_table">
          <tr>
            <th>商品</th>
            <th>合计</th>
          </tr>
          <tr v-for="item in shopListState[0].shop" :key="item.id">
            <td>
              <nuxt-link :to="`/detail/${item.id}`" class="nuxtto">
                <span class="span1">
                  <img :src="item.src" />
                </span>
                <span class="span2">{{ item.name }}</span>
              </nuxt-link>
              × {{ item.num }}
            </td>
            <td>
              <span>{{ item.sum }}</span>
            </td>
          </tr>
          <tr>
            <th>购物车小计</th>
            <td>
              <span>{{ shopListState[0].allsum }}</span>
            </td>
          </tr>
          <tr>
            <th>运费</th>
            <td>
              <span>免费送货</span>
            </td>
          </tr>
          <tr>
            <th>订单总计</th>
            <td>
              <span>{{ shopListState[0].allsum }}</span>
            </td>
          </tr>
        </table>
        <ul>
          <li>
            <input type="radio" name="pay_way" checked />&nbsp;
            <label for class="product_pay">银行汇款（线下）</label>
          </li>
          <li>
            <p>直接付款到我们的银行账户。请使用订单号作为付款名目。我们会在资金到账后配送订单。</p>
          </li>
          <li>
            <input type="radio" name="pay_way" />&nbsp;
            <label for class="product_pay">
              支付宝&nbsp;
              <img src="../assets/img/alipay.png" />
            </label>
          </li>
        </ul>
        <div class="booking">
          <input type="button" value="下单" @click="buy" />
        </div>
      </div>
    </div>
    <div class="address_foot">
      <input type="text" placeholder="优惠卷代码" />
      <input type="button" value="使用优惠券" />
    </div>
    <!-- <el-select v-model="addressValue" placeholder="Select">
      <el-option
        v-for="item in adresslist"
        :key="item._id"
        :label="item.adress"
        :value="item.adress"
      ></el-option>
    </el-select>-->
  </div>
</template>
<script setup>
import { watch, ref, watchEffect, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElNotification } from "element-plus/lib";
const config = useRuntimeConfig();
const router = useRouter()
const { user } = useUser()
const { emails } = getEmail();
const { shopListState } = useShopCar()
const adresslist = getAdress()
const ShoppingCar = useCarValue()
const addressValue = reactive({
  name: '',
  phone: '',
  address: '',
  remark: '',
  newtime: '',
  email: '',
  state: '已支付'
})

const selectadd = (e) => {
  const num = e.target.value
  addressValue.name = adresslist.value[num].name
  addressValue.phone = adresslist.value[num].phone
  addressValue.address = adresslist.value[num].adress
}
const buy = async () => {
  addressValue.newtime = timestampToTime()
  addressValue.email = emails.value
  const a = {
    username: user.value,
    shop: shopListState.value[0],
    info: addressValue
  }
  if (addressValue.name && addressValue.phone && addressValue.address && shopListState.value[0].shop.length != 0) {
    let { data } = await useFetch(`/car/buy`, {
      method: 'post',
      body: a
    });
    if (data.value.code === 0) {
      let { data: deleteCar } = await useFetch(`/car/deleteCar`, {
        method: 'post',
      });
      if (deleteCar.value.code === 0) {
        ElNotification({
          title: "消息",
          message: "下单成功",
          type: "success",
        });
        shopListState.value[0] = {}
        ShoppingCar.value = 0
        setTimeout(() => {
          router.push('/member')
        }, 1000);
      }
    }
  } else {
    ElNotification({
      title: "消息",
      message: "还未填写信息或购物车没物品",
      type: "warning",
    });
  }
}

//获取当前时间
const timestampToTime = () => {
  var date = new Date();
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate() + ' ';
  var hh = date.getHours() < 10 ? '0' + date.getHours() : date.getHours() + ':';
  var mm = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes() + ':';
  var ss = date.getSeconds() < 10 ? '0' + date.getDate() : date.getSeconds();
  return Y + M + D + hh + mm + ss;
}

let { data: address } = await useFetch(`/infos/adress`, { server: false });
if (!config.API_BASE) {
  watchEffect(() => {
    if (address.value) {
      if (address.value.code === 0) {
        adresslist.value = address.value.msg;
        if (address.value.msg.length != 0) {
          addressValue.name = address.value.msg[0].name
          addressValue.phone = address.value.msg[0].phone
          addressValue.address = address.value.msg[0].adress
        }
      } else {
        router.push('/login')
      }
    }
  })
}
</script>

<style lang="less" scoped>
* {
  padding: 0;
  margin: 0;
}
.nuxtto {
  vertical-align: middle;
  text-decoration: none;
  .span1 {
    vertical-align: middle;
    margin-right: 5px;
  }
  .span2 {
    color: #519f10;
    vertical-align: middle;
    font-size: 14px;
    margin-right: 5px;
  }
}

body {
  font: 14px;
  word-spacing: normal;
  color: #8d9095;
  font-family: "微软雅黑", Helvetica, Arial, Verdana, sans-serif;
  font-style: normal;
  font-weight: normal;
}

ul {
  list-style: none;
}

.container {
  overflow: hidden;
  width: 1200px;
  margin: auto;
  margin-top: 40px;
  padding: 0 40px;
}

/* 左边部分 */
.leftbox {
  float: left;
  width: 50%;
  padding-right: 30px;
  line-height: 2em;
}

h3 {
  font-size: 24px;
  font-weight: normal;
  color: #444444;
  margin-bottom: 10px;
}

.change_your_address {
  width: 100%;
}

.change_your_address a {
  color: #85bf41;
  text-decoration: none;
  font-size: 16px;
  /* font-weight: bold; */
}

.change_your_address a:hover {
  cursor: pointer;
}

.required {
  color: #777;
}

.customer_details {
  width: 100%;
}

.customer_details > div {
  float: left;
  width: 47%;
}

.customer_details .gap {
  width: 6%;
  /* background-color: red; */
}

.customer_details label {
  display: inline-block;
  width: 100%;
  font-size: 14px;
  font-weight: bold;
  color: #4d4d4d;
  height: 27.52px;
  line-height: 27.52px;
  font-weight: bold;
}

.leftbox .customer_details input {
  width: 100%;
  font-size: 14px;
  height: 35.3px;
  line-height: 35.3px;
  font-weight: normal;
  color: #555555;
  background-color: #ffffff;
  padding-top: 7px;
  padding-bottom: 7px;
  padding-left: 7px;
  padding-right: 7px;
  border: solid 1px #e0e0e0;
  outline: none;
}

.fill_address {
  width: 100%;
  font-size: 14px;
  font-weight: normal;
  color: #555555;
  border-color: #cccccc;
  background-color: #ffffff;
}

.fill_address label {
  display: inline-block;
  width: 100%;
  font-size: 14px;
  font-weight: bold;
  color: #4d4d4d;
  height: 28.2px;
  line-height: 28.2px;
  margin-top: 10px;
}

.fill_address select {
  width: 32%;
  height: 36.8px;
  line-height: 2em;
  font-size: 14px;
  font-weight: normal;
  color: #555555;
  border-color: #cccccc;
  background-color: #ffffff;
  padding-top: 7px;
  padding-bottom: 7px;
  padding-left: 7px;
  padding-right: 7px;
  outline: none;
}

.fill_address select:hover {
  cursor: pointer;
}

.fill_address select:nth-child(2) {
  margin: 0 2%;
}

.fill_address input {
  width: 100%;
  font-size: 14px;
  height: 35.2px;
  line-height: 35.2px;
  font-weight: normal;
  color: #555555;
  background-color: #ffffff;
  padding-top: 7px;
  padding-bottom: 7px;
  padding-left: 7px;
  padding-right: 7px;
  border: solid 1px #e0e0e0;
  outline: none;
  margin-bottom: 10px;
}

.fill_address textarea {
  width: 100%;
  font-size: 14px;
  height: 56px;
  line-height: 30px;
  font-weight: normal;
  color: #555555;
  background-color: #ffffff;
  padding-top: 7px;
  padding-bottom: 7px;
  padding-left: 7px;
  padding-right: 7px;
  border: solid 1px #e0e0e0;
  outline: none;
}

/* 
  .fill_address textarea:active {
    transition: 2s;

    opacity: 0;

  } */

/* 右边部分 */
.rightbox {
  float: left;
  width: 50%;
  padding: 30px;
  border: 3px solid #444444;
}

table {
  width: 100%;
}

table.product_table th,
table.product_table td:first-child {
  text-align: left;
  font-size: 16px;
  font-weight: bold;
  color: #555;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 12px;
  padding-right: 12px;
  border-bottom: 1px solid #ddd;
}

table.product_table th:nth-child(2) {
  text-align: right;
}

table.product_table td {
  height: 100%;
  text-align: right;
  font-size: 14px;
  font-weight: normal;
  color: #777777;
  padding: 8px 16px 8px 0px;
  border-color: #dddddd;
  border-bottom: 1px solid #ddd;
}

table.product_table img {
  width: 40px;
  height: 40px;
}

.product_pay {
  font-size: 15px;
  font-weight: normal;
  color: #4d4d4d;
}

ul li:nth-child(1),
ul li:nth-child(3) {
  line-height: 32px;
}

li p {
  display: inline-block;
  font-size: 15px;
  font-weight: normal;
  color: #777777;
  border-bottom: 1px solid #ddd;
  padding-bottom: 15px;
}

ul img {
  width: 62px;
  height: 22px;
  line-height: 34wpx;
  margin: 0px 0px -6px 6px;
}

.booking {
  padding: 10px 3px 3px;
  margin-bottom: 6px;
}

.booking input {
  font-size: 16px;
  font-weight: normal;
  color: #ffffff;
  border: 1px solid #519f10;
  background-color: #519f10;
  padding: 8px 25px;
  margin-top: 10px;
}
.booking input:hover {
  cursor: pointer;
}
.address_foot {
  width: 1200px;
  margin: auto;
  padding: 20px 40px;
  border-bottom: 2px solid #ddd;
  border-top: 2px solid #ddd;
}

.address_foot input {
  display: block;

  width: 320px;
  height: 36.8px;
  padding: 7px 10px;
  border: solid 1px #999;

  background-color: #fff;
  margin-bottom: 15px;
  outline: none;
  font-size: 16px;
  font-weight: normal;
  color: #919191;
}

.address_foot input:last-child {
  color: #ffffff;
  border-color: #90af6b;
  background-image: none;
  background-color: #90af6b;
}
.address_foot input:last-child:hover {
  cursor: pointer;
}
</style>