<template>
  <div class="wrap">
    <div @click="toshop(item.id, item.title)" v-for="item in shopList" :key="item.id" class="shopItem">
      <img :src="item.imgUrl" />
      <div>
        <p
          style="font-family:'Courier New', Courier, monospace;; font-weight: 600;font-size: 0.32rem;line-height: 0.25rem;margin-bottom: 0.25rem ">
          {{
              item.title
          }}</p>
        <p>
          月售:{{ item.sales }} 起送:{{ item.expressLimit }}基础运费：{{
              item.expressPrice
          }}
        </p>
        <p style="color: red">{{ item.desc }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const props = defineProps(['shopList'])

const router = useRouter()
const toshop = function (id, title) {
  router.push({ name: 'shop', params: { id: id, title: title } })
}
</script>

<style lang="scss" scoped>
.shopItem {
  display: flex;
  flex-direction: row;
  // align-items: center;
  padding: 0 0.1rem;
  margin-left: 0.25rem;
  margin-bottom: 0.2rem;
  box-sizing: border-box;

  img {
    width: 1.1rem;
    height: 1.1rem;
  }

  div {
    padding: 0.11rem;
    margin-left: 0.2rem;

    // box-sizing: border-box;
    p {
      font-size: 0.28rem;
      line-height: 0.5rem;
    }
  }
}
</style>
