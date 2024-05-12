import { createStore } from 'vuex'
import { StorageSerializers, useStorage } from '@vueuse/core'

export default createStore({
  state () {
    return {
      // 购物车信息
      // cartList{shopId：{productId:{},productId{}}]的形式
      // cartList: JSON.parse(localStorage.getItem("productList")) || {},
      cartList: useStorage('productList', {}, undefined, {
        serializer: StorageSerializers.Object
      }),
      // price: useStorage("price", 0, undefined, {
      //   serializer: StorageSerializers.Number,
      // }),
      titleName: useStorage('titleName', '', undefined, {
        serializer: StorageSerializers.String
      }),
      from: useStorage('from', '', undefined, {
        serializer: StorageSerializers.String
      })
    }
  },
  getters: {},
  mutations: {
    changeTitleName: function (state, payload) {
      state.titleName = payload
      // localStorage.titleName = JSON.stringify(payload);
    },
    // 改变购物车信息
    changeCartList: function (state, payload) {
      const { title, id: productId, ...productInfo } = payload
      const shopInfo = state.cartList[title]
      // 如果不存在该商店id
      if (!shopInfo) {
        state.cartList[title] = { [productId]: productInfo }
      } else {
        // 存在商店id
        state.cartList[title][productId] = productInfo
      }
      // 如果步进器将商品数量减到0，则删除该商品
      if (productInfo.count == 0) {
        delete state.cartList[title][productId]
      }
      // 如果该商店没有产品了，就删除该商店
      if (Object.keys(state.cartList[title]).length == 0) {
        delete state.cartList[title]
      }
      // localStorage.productList = JSON.stringify(state.cartList);
    },
    removeShop: function (state, payload) {
      const shopInfo = state.cartList[payload]
      if (shopInfo) {
        delete state.cartList[payload]
      }
      // localStorage.productList = JSON.stringify(state.cartList);
    },
    changeFrom: function (state, payload) {
      state.from = payload
    },
    allChecked: function (state, payload) {
      for (const i in state.cartList[payload]) {
        state.cartList[payload][i].checked = true
      }
    },
    allUnChecked: function (state, payload) {
      for (const i in state.cartList[payload]) {
        state.cartList[payload][i].checked = false
      }
    },
    clearCart: function (state, payload) {
      delete state.cartList[payload]
    }
    // 在店铺详情的时候计算id=xxx的所有商品价格，在结算的时候计算所有店铺所有商品的价格
    // 进入页面的时候触发一次，点击步进器的时候触发
    // changeTotalPrice: function (state, payload) {
    //   let totallPrice = 0;
    //   if (payload !== "all") {
    //     // 此时shop的数据结构为：{product01：{}，02：{}}
    //     let shop = state.cartList[payload];
    //     if (shop) {
    //       for (let i in shop) {
    //         totallPrice = totallPrice + shop[i].count * Number(shop[i].price);
    //       }
    //     }
    //   } else {
    //     for (let i in state.cartList) {
    //       for (let j in state.cartList[i]) {
    //         totallPrice =
    //           totallPrice +
    //           state.cartList[i][j].count * state.cartList[i][j].price;
    //       }
    //     }
    //   }
    //   state.price = totallPrice;
    // },
  },
  actions: {},
  modules: {}
})
