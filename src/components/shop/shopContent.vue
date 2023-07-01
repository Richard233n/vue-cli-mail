<template>
  <div class="wrap">
    <!-- 左侧分类侧边导航栏 -->
    <van-sidebar class="left" v-model="active" @change="onChangeLeft">
      <van-sidebar-item v-for="item in categories" :title="item.name" />
    </van-sidebar>

    <!-- 右侧具体商品信息 -->
    <div class="right" style="overflow-y: auto; height: 69vh; overflow-x: hidden">
      <div class="rightItem" v-for="item in productList" :key="item.id">
        <img :src="item.img_url" alt="" />
        <div>
          <p>{{ item.name }}</p>
          <p>月售{{ item.sales }}件</p>
          <span style="color: red">{{ item.price }}</span><span class="oldprice">{{ item.oldPrice }}</span>
          <van-stepper v-model="item.count" theme="round" min="0" button-size="0.35rem" class="button"
            @click="changeProduct(item)" />
          <!-- disable-input -->
        </div>
      </div>
      <div style="height: 1.3rem"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, computed, ref, watch, defineProps, onUpdated } from "vue";
import { StorageSerializers, useStorage } from "@vueuse/core";
import { getProductList } from "@/request/api/shop.js";
import { computePrice } from "@/composible/priceComputed.js";
import { useStore } from "vuex";

let active = ref(0),
  // tab = ref("all"),
  productList = ref([]), //渲染商品列表
  searchList = ref([]); //渲染搜索结果
const categories = [
  { name: "全部商品", tab: "all" },
  { name: "新鲜水果", tab: "fruit" },
  { name: "休闲食品", tab: "food" },
  { name: "时令蔬菜", tab: "greens" },
  { name: "肉蛋家禽", tab: "meat" },
];
// let productLis = reactive({ productList: [] });
let props = defineProps({
  id: String,
  searchProduct: String,
  title: String,
});
// 因为props的值不能改，是只读的
let title = ref('');

let data = reactive({
  id: props.id,
  tab: "all",
});
//左侧分类导航点击事件，一进来不会触发
//请求返回之后，应该对返回数据进行二次处理=>跟vuex中的数据进行比较，如果有就将item.count变为vuex中的count
const onChangeLeft = async (index) => {
  data.tab = categories[index].tab;
  let res = await getProductList(data);
  localProduction(res.data.data);
};

//对返回数据进行初步修改，添加count属性和checked属性
const localProduction = function (list) {
  // 和store中的值进行对比，如果有就将count变为store中的count
  let product = store.state.cartList[title.value];
  if (!product) {
    //如果本地缓存中没有这个商店，所以
    list.forEach((item) => ((item.count = 0), (item.checked = true)));
    //有这个商店就看有没有这个产品
  } else {
    for (let j = 0; j < list.length; j++) {
      if (product[list[j].id]) {
        list[j].count = product[list[j].id].count;
        list[j].checked = true;
      } else {
        list[j].count = 0;
        list[j].checked = true;
      }
    }
  }
  productList.value = list;
  // console.log(productList.value);
};

//每次请求回来的数据都会进行处理，和store里的值进行比较，有就变，没有就不变
onMounted(async () => {
  // 我想知道这是哪个商店，一方面是进入时传入的值，另一方面时存入本地缓存中的值
  title.value = props.title || JSON.parse(localStorage.getItem("titleName"));
  let res = await getProductList(data);
  searchList.value = res.data.data; //备份用于搜索的
  localProduction(res.data.data); //对数据进行初步修改,添加count属性和checked属性
});

const store = useStore();
//当点击步进器时，将购物车信息存入store的cartList中
const changeProduct = function (data) {
  store.commit("changeCartList", { ...data, title: title.value }); //更改本地缓存
  // store.commit("changeTotalPrice", props.title);
};

// 监听搜索栏传来的searchProduct的数据变化
watch(
  () => props.searchProduct,
  (value) => {
    if (value == "") {
      productList.value = searchList.value;
    } else {
      productList.value = searchList.value.filter((item) => {
        return item.name.includes(value);
      });
    }
  }
);
// 当小卡片的值引起的数据变化时，应该更新本页面的数据
watch(() => store.state.cartList[title.value],
  newVal => {
    // 如果不是清除购物车，改变的只是某个商品的数量
    if (newVal) {
      out: for (let i in newVal) {
        for (let j in productList.value) {
          if (i == productList.value[j].id) {
            productList.value[j].count = newVal[i].count;
            productList.value[j].checked = newVal[i].checked;
            break out;
          }
        }
      }
    }
    // 清楚本店的购物车时
    else {
      productList.value.forEach(item => {
        item.count = 0;
        item.checked = true;
      })
    }
  },
  {
    deep: true
  }
)

//在刷新的时候赶紧设个缓存
window.addEventListener('beforeunload', function () {
  localStorage.setItem("titleName", JSON.stringify(title.value));
})
</script>

<style lang="scss" scoped>
.wrap {
  .left {
    height: 69vh;
    width: 25vw;
  }

  display: flex;
  flex-direction: row;

  .right {

    .rightItem {
      display: flex;
      flex-direction: row;
      width: 5.6rem;
      padding: 0.2rem;

      box-shadow: 0 0.01rem rgba(0, 0, 0, 0.1);

      img {
        width: 1.4rem;
        height: 1.4rem;
      }

      div {
        width: 4.6rem;
        position: relative;
        padding-left: 0.15rem;

        p {
          margin-bottom: 0.1rem;
        }

        .oldprice {
          text-decoration: line-through;
          font-size: small;
          margin-left: 0.2rem;
          color: #999;
        }

        .van-stepper {
          position: absolute;
          right: -2.9rem;
          bottom: 0.05rem;
        }
      }
    }
  }
}
</style>
