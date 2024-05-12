<template>
  <div class="top">
    <p>我的订单</p>
  </div>
  <div class="content">
    <div class="orderItem" v-for="item in productList" :key="item.id" @click="toCreateOrder(item)">
      <div class="orderTop">
        <p>{{ item.shop_name }} <span
            style="color:gray; font-size: 0.23rem;font-weight: 500;margin-left: 0.15rem;">订单号:{{ item.order_no }}</span>
        </p>

        <p style="color: gray;">{{ item.order_status }}</p>
      </div>
      <div class="orderContent">
        <div class="img">
          <img :src="img.img_url" alt="" v-for="(img, index) in item.products" :key="index">
        </div>
        <div class="priceandcount">
          <div style="color:red">￥{{ item.totalValue }}</div>
          <div style="font-weight: 600;margin-left: 0.1rem;font-size: 0.24rem;">共{{ item.products.length }}件</div>
        </div>
      </div>
    </div>
  </div>
  <div style="height:1rem"></div>
  <!-- <docker /> -->
</template>

<script setup>
import docker from '@/components/Home/_docker.vue'
import { onMounted, ref } from 'vue'
import { getOrderList } from '@/request/api/order.js'
import { useComputePricePro } from '@/composible/priceComputed.js'
import { useRouter } from 'vue-router'

const userinfo = JSON.parse(localStorage.getItem('userInfo')) || {}
const productList = ref([])
const changeProducts = function () {
  const initial = productList.value
  for (let i = 0; i < productList.value.length; i++) {
    initial[i].products = JSON.parse(initial[i].products)
    initial[i].totalValue = useComputePricePro(initial[i].products)
  }
  productList.value = initial
}

const router = useRouter()

const toCreateOrder = function (data) {
  router.push({ name: 'createorder', params: { product: JSON.stringify(data) } })
}

onMounted(async () => {
  const result = await getOrderList(userinfo.data.id)
  if (result.data.data.length >= 20) {
    for (let i = 0; i < 20; i++) {
      productList.value.push(result.data.data[i])
    }
  } else {
    productList.value = result.data.data
  }

  // productList.value = result.data.data[0];
  changeProducts()
  // console.log(productList.value)
})
</script>
<style lang="scss">
.top {
  width: 100%;
  height: 1.34rem;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    margin-top: 0.48rem;
    font-size: 0.33rem;
    font-weight: 600;
  }
}

.content {
  min-height: 10.9rem;
  background-color: #f8f8f8;
  padding-top: 0.35rem;

  .orderItem {
    width: 89%;
    background-color: white;
    margin-left: 5.5%;
    margin-bottom: 0.35rem;
    padding: 0.3rem 0.36rem;

    .orderTop {
      display: flex;
      justify-content: space-between;

      p {
        font-size: 0.3rem;
        font-weight: 600;
      }
    }

    .orderContent {
      display: flex;
      flex-direction: row;
      align-items: center;

      .img {
        width: 80%;
        min-height: 0.8rem;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin-top: 0.2rem;

        img {
          width: 0.9rem;
          height: 0.9rem;
          margin-right: 0.2rem;
        }
      }

      .priceandcount {
        margin-top: 0.2rem;
        margin-left: 0.4rem;
      }
    }
  }
}
</style>
