<template>
  <div style="width: 100%; overflow: hidden; overflow-y: auto">
    <shopTop @searchRes="searchRes"></shopTop>
    <shopInfo :shopList="shopList"></shopInfo>
    <shopContent :id="props.id" :searchProduct="searchProduct" :title="props.title"></shopContent>
    <shopButtom :title="title"></shopButtom>
  </div>
</template>

<script setup>
import { defineProps, ref, onMounted, watchEffect } from "vue";
import shopButtom from "@/components/shop/shopButtom.vue";
import shopInfo from "@/components/shop/shopInfo.vue";
import shopTop from "@/components/shop/shopTop.vue";
import shopContent from "@/components/shop/shopContent.vue";
import { getShopInfo } from "@/request/api/shop.js";
let shopList = ref([]),
  searchProduct = ref("");
let props = defineProps({
  id: String,
  title: String,
});
const searchRes = function (product) {
  searchProduct.value = product;
};
onMounted(async () => {
  let res = await getShopInfo(props.id);
  shopList.value = [res.data.data];
  // console.log($ref.shopInfodata)
});
</script>

<style>
</style>
