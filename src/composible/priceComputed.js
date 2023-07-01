import { ref, computed } from "vue";
import { useStore } from "vuex";

export const useComputePricePro = function (arr) {
  let price = 0;
  for (let i = 0; i < arr.length; i++) {
    price += arr[i].count * Number(arr[i].price);
  }
  return price;
};
export const useComputePrice = function (title) {
  const store = useStore();

  let cartList = store?.state?.cartList || {};
  //
  let shop = computed(() => {
    return store?.state?.shopList?.find((item) => item.title === title);
  });

  // 单个商店的总价
  let shopPrice = ref(0);
  const computedShopPrice = computed(() => {
    let price = 0;
    // 监听该商店
    let shop = cartList[title];
    if (shop) {
      for (let i in shop) {
        if (shop[i].checked) {
          price += shop[i].count * Number(shop[i].price);
        }
      }
      shopPrice.value = price;
    } else {
      shopPrice.value = 0;
    }
    return shopPrice.value;
  });
  // 单个商店所有商品的数量
  let shopCount = ref(0);
  const computedShopCount = computed(() => {
    let count = 0;
    let shop = cartList[title];
    if (shop) {
      for (let i in shop) {
        if (shop[i].checked) {
          count += shop[i].count;
        }
      }
      shopCount.value = count;
    } else {
      shopCount.value = 0;
    }
    return shopCount.value;
  });
  //所有商店的总价
  // let totallPrice = ref(0);
  // const computedTotallPrice = computed(() => {
  //   for (let i in cartList) {
  //     for (let j in cartList[i]) {
  //       totallPrice.value =
  //         state.cartList[i][j].count * state.cartList[i][j].price;
  //     }
  //   }
  //   return totallPrice.value;
  // });
  return { shop, computedShopCount, computedShopPrice };
};
