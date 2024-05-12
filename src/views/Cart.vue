<template>
  <div class="top">
    <span>我的全部购物车 </span><span>({{ shopCount }})</span>
  </div>
  <!-- 分商店内部与外部，首先是for循环外部 -->
  <!-- item=>{id1:{},id2:{}} -->
  <div class="wrap">
    <div class="shopItem" v-for="(item, key) in local">
      <div class="shopName">{{ key }}</div>
      <div class="right">
        <div v-for="product in item" :key="product.id" class="productItem">

          <img :src="product.img_url" alt="" />
          <div class="rightContent">
            <p>{{ product.name }}</p>
            <div class="rightContentButtom">
              <span style="color: red">￥{{ product.price }}x{{ product.count }}</span>
              <span>￥{{ product.price * product.count }}</span>
            </div>
          </div>

        </div>
        <div class="buttom">
          <div class="totallInfo">共计{{ checkCount(key) }}件/{{ checkprice(key) }}元</div>
          <router-link :to="{ name: 'createorder', params: { title: key } }">
            <div class="tocheck">去结算</div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <!-- <docker></docker> -->
</template>

<script setup>
import { onMounted, ref } from 'vue'
import docker from '@/components/Home/_docker.vue'
import { useComputePrice } from '@/composible/priceComputed.js'

// 每个商店都有单独的价格和数量，所以传入自己的商店名，及逆行计算价格
const checkprice = function (title) {
  const { computedShopPrice } = useComputePrice(title)
  return computedShopPrice
}
const checkCount = function (title) {
  const { computedShopCount } = useComputePrice(title)
  return computedShopCount
}

// 商店数量
const shopCount = ref(0) // 修改需要改value哦
const totalshopcount = function () {
  for (const i in local.value) {
    if (local.value[i]) {
      shopCount.value++
    }
  }
}
// 渲染列表
const local = ref({})
local.value = JSON.parse(localStorage.getItem('productList')) || {}

const removeFalse = function () {
  for (const i in local.value) {
    // 把没选中的删除
    for (const j in local.value[i]) {
      if (!local.value[i][j].checked) {
        delete local.value[i][j]
      }
    }
    // 如果这个商店全是没选中的商品，就该把这个商店去除
    if (Object.keys(local.value[i]).length == 0) {
      delete local.value[i]
    }
  }
}
onMounted(() => {
  totalshopcount()
  // 除去本地缓存中select为false的那项
  removeFalse()
})
</script>

<style lang="scss" scoped>
.top {
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    vertical-align: middle;
  }

  span:first-child {
    font-weight: 800;
  }
}

.wrap {
  width: 100%;
  min-height: 12rem;
  background-color: #faf7f8;
  padding: 0.2rem 0.5rem;
  margin-bottom: 0.5rem;

  .shopItem {
    display: flex;
    width: 100%;
    flex-direction: column;
    background-color: white;
    padding: 0.2rem;
    margin-left: 0;
    margin-bottom: 0.4rem;

    .shopName {
      width: 100%;
      height: 0.5rem;
      // text-align: center;
      line-height: 0.5rem;
      font-weight: 700;
      font-size: 0.28rem;
      margin-left: 0;
    }

    .right {
      width: 100%;

      .productItem {

        display: flex;
        flex-direction: row;
        margin: 0.4rem 0;

        img {
          width: 1rem;
          height: 1rem;
        }

        .rightContent {
          padding-left: 0.5rem;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          p {
            font-weight: 500;
          }

          .rightContentButtom {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding-left: 0;
            margin-left: 0;
          }
        }

      }

      .buttom {
        height: 0.6rem;
        border: 0.02rem solid #7444df;
        display: flex;
        flex-direction: row;
        margin-top: 0.3rem;
        padding: 0;

        div {
          height: 0.6rem;
          text-align: center;
          line-height: 0.6rem;
        }

        .totallInfo {
          color: #7444df;
          width: 70%;
        }

        a {
          .tocheck {
            color: white;
            background-color: #7444df;
            width: 2rem;
          }
        }

      }
    }
  }
}
</style>
