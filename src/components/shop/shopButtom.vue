<template>
  <van-icon name="shopping-cart" />
  <van-submit-bar :price="computedShopPrice * 100" decimal-length="1" button-text="去结算" @submit="onSubmit(title)">
    <van-icon name="cart-o" size="0.8rem" color="#b83b5e" style="margin-left:0.5rem" @click="show = !show" />
  </van-submit-bar>
  <van-overlay :show="show" @click="show = false" />

  <div class="minCart" v-show="show">
    <div class="top">
      <div>
        <van-switch size="0.3rem" @click="changeAllSelected" v-model="hasallchecked" style="margin-right:0.1rem" />
        <span>全选</span>
      </div>
      <div @click="clearCart">清空购物车</div>
    </div>
    <div class="item" v-for="(item, key) in productList">
      <div class="btn">
        <van-switch size="0.3rem" v-model="item.checked" style="margin-right:0.1rem" />
      </div>
      <div class="contenton">
        <img :src="item.img_url" alt="">
        <div>
          <p style="margin-bottom:0.25rem">{{ item.name }}</p>
          <span style="color: red;margin-right: 0.2rem">{{ item.price }}</span><span class="oldprice">{{ item.oldPrice
          }}</span>
          <van-stepper v-model="item.count" theme="round" min="0" button-size="0.35rem" class="button"
            @click="changeProduct({ ...item, id: key })" disable-input />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { useComputePrice } from "@/composible/priceComputed.js";
import { ref, onMounted, defineProps, computed, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useComputePrice } from "@/composible/priceComputed.js";
import { Dialog } from 'vant'

const store = useStore();
const props = defineProps({
  title: String,
})

let hasallchecked = ref(true);

let title = ref('');

title.value = props.title || JSON.parse(localStorage.getItem("titleName"));

const productList = computed(() => {
  return store.state.cartList[title.value]
})


// 只要有一个没被选中，全选按钮就为false
watch(() => productList.value,
  val => {
    let allchecked = true;
    for (let i in val) {
      if (!val[i].checked) {
        allchecked = false;
        break;
      }
    }
    hasallchecked.value = allchecked;
  }, {
  deep: true,
  immediate: true,
})
// 当全选按钮为true时，全都变为true
const changeAllSelected = function () {
  if (hasallchecked.value) {
    store.commit('allChecked', title.value);
  } else {
    store.commit('allUnChecked', title.value);
  }
  // console.log(hasallchecked.value)
}
let show = ref(false);


let { computedShopPrice } = useComputePrice(title.value);

const clearCart = function () {
  Dialog.confirm({
    title: '提示',
    message:
      '确定清空购物车吗？',
  })
    .then(() => {
      store.commit('clearCart', title.value);
      show.value = false;
    })
    .catch(() => {
      // on cancel
    });

}

// console.log(shop);
// const price = computed(() => {
//   return store.state.price * 100
// })
let router = useRouter();
const onSubmit = function (title) {
  router.push({
    name: 'createorder',
    params: {
      title: title
    }
  })
}

const changeProduct = function (data) {
  store.commit("changeCartList", { ...data, title: title.value }); //更改本地缓存
  // console.log(data);
};
</script>

<style lang="scss" scoped>
.minCart {
  position: absolute;
  bottom: 1rem;
  width: 100%;
  background-color: white;
  padding: 0.4rem;
  z-index: 5;
  max-height: 7rem;
  overflow-y: auto;

  .top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 0.4rem;
    line-height: 0.4rem;
  }

  .item {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 2rem;
    position: relative;

    .btn {}

    .contenton {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-left: 0.4rem;
      padding: 0.1rem;
      width: 100%;
      border-bottom: 1px solid #ccc;

      img {
        width: 1.4rem;
        height: 1.4rem;
      }

      div {
        .oldprice {
          text-decoration: line-through;
          color: #ccc;
        }

        .button {
          position: absolute;
          right: 0.4rem;
          bottom: 0.5rem;
        }
      }
    }
  }
}
</style>
