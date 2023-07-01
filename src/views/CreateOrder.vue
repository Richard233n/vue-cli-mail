<template>
    <div class="wrap">
        <van-popup class="mask" round v-model:show="show"
            :style="{ height: '3.1rem', width: '6rem', textAlign: 'center' }">
            <p style="margin-top: 0.5rem;color: gray;font-size: large;font-weight: 600;">确认要离开收银台?</p>
            <p style="margin-top:0.2rem;font-size: 0.27rem;color: gray;">请尽快完成支付,否则将被取消</p>
            <div class="button">
                <div @click="cancel">取消订单</div>
                <div style="color:white;background-color: #7442e0;">确认支付</div>
            </div>
        </van-popup>
        <div class="top">
            <van-icon name="revoke" color="#fadfed" size="0.5rem" class="icon" @click="goback" />
            <div class="text">确认订单</div>
        </div>
        <div class="address">
            <p class="addressp1">收货地址</p>
            <div>
                <p class="addressp2">{{ checkAddress.city + checkAddress.area + checkAddress.house }}</p>
                <span>{{ checkAddress.real_name || checkAddress.name }} (先生)
                    {{ checkAddress.tel || checkAddress.mobile }}</span>
            </div>
            <van-icon name="exchange" class="exchange" size="0.8rem" @click="toChangeAddress" />
        </div>
        <div class="content">
            <div class="shopCart">
                <div class="cartTop">
                    <div class="shopname">{{ productList.shop_name }}</div>
                    <div class="ordernumber">订单号： {{ productList.order_no }}</div>
                </div>
                <div class="cartItem" v-for="item in productList.products" :key="item.id">
                    <img :src="item.img_url" alt="">
                    <div class='right'>
                        <div class="productname">
                            <p>{{ item.name }}</p>
                        </div>
                        <div class="priceandcount">
                            <p style="color:red">￥{{ item.price }}x{{ item.count }}</p>
                            <p>￥{{ item.price * item.count }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div style="height:1rem"></div>
        </div>
        <div class="bottom">
            <p>实付金额￥{{ prices }}</p>
            <div>提交订单</div>
        </div>
    </div>

</template>
    
<!-- 创建订单页面： -->
<!--    从购物车进入，传入title，之后上传获取数据进行渲染 -->
<!--    从订单页面进入，就只需要对订单信息进行渲染即可 -->
<script setup>
import { useComputePricePro } from "@/composible/priceComputed.js";
import { useRouter } from "vue-router";
import { getCreateOrder, getDefaultAddress } from "@/request/api/createOrder.js";

import { defineProps, ref, onMounted, onUnmounted, onBeforeUnmount, } from "vue";
import { useStore } from "vuex";


let store = useStore();
// 如果从订单页面进入，传入product，从主页
const props = defineProps({
    title: String,
    product: String,
    address: String,
})

let show = ref(false);

// 处理要发送请求的数据
let shop = store.state.cartList[props.title];
let shopid = ref(0);
let products = ref([]);
const handleProduct = function () {
    for (let i in shop) {
        if (shop[i] && shop[i].checked) {
            products.value.push({ id: parseInt(i, 10), num: shop[i].count });
            shopid.value = shop[i].shop_id;
            // console.log(typeof shop[i].shop_id)
        }
    }
}
// 删除state中该商店的信息
const removeShop = function (title) {
    store.commit('removeShop', title);
}
// 处理地址：发送请求获取默认地址，换地址之后，更新地址，接受传参
const userid = JSON.parse(localStorage.getItem('userInfo')).data.id;


// 发送请求获取订单和商品信息
let productList = ref([]);

// 渲染全部价格
// 从商品详情页面进入，
// let { useComputePrice } = useComputePrice(props.title);
// let price = computedShopPrice.value || 0;

let prices = ref(0);

let checkAddress = ref({});
onMounted(() => {
    // 如果是从地址选取页面进入
    if (props.address) {
        checkAddress.value = JSON.parse(props.address);
    } else {
        getDefaultAddress(userid).then(res => {
            checkAddress.value = res.data.data;
        });
    }
    // 不是从订单列表过来的而且不是原地刷新的情况，属于是从商品页面进来
    if (!props.product && props.title) {
        // 从商品页面进来，就发送请求，获取商品信息
        handleProduct();
        getCreateOrder({
            id: JSON.parse(localStorage.getItem('userInfo')).data.id,
            addressId: 1,
            shopId: shopid.value,
            shopName: props.title,
            products: JSON.stringify(products.value)
        }).then(res => {
            productList.value = res.data.data;
            prices.value = useComputePricePro(productList.value.products);
            removeShop(props.title);
        })
        // 计算总价,因为方法是计算属性，所以会在删除该商店信息之后再次改变值，所以直接赋值给一个定值就消除了响应式
    }
    else {
        // 从订单列表页面进来，或者原地刷新,或者从地址选取页面返回。就接受传参或者取本地缓存开始渲染
        elsefunction();
        localStorage.removeItem('orderInfo')
    }
})
const elsefunction = function () {
    if (props.product) {
        productList.value = JSON.parse(props.product)
    }
    else {
        productList.value = JSON.parse(localStorage.getItem('orderInfo'))
    }
    prices.value = useComputePricePro(productList.value.products)
}
// 跳转到别的页面触发,刷新不会触发
onBeforeUnmount(() => {
    localStorage.setItem('orderInfo', JSON.stringify(productList.value));
})

// 返回按钮
const router = useRouter();
const cancel = function () {
    router.push({ name: 'order' });
}
// 模态框出现
const goback = function () {
    show.value = true
}
const toChangeAddress = function () {
    router.push({ name: 'address' });
    store.commit('changeFrom', 'fromCreateOrder');
}
// 路由跳转走，但是不会触发这两个事件，会触发onBeforeUnmount、onUnmounted事件
// 所以这里只处理刷新事件
window.addEventListener('beforeunload', function () {
    localStorage.setItem('orderInfo', JSON.stringify(productList.value));
})
window.addEventListener('load', function () {
    localStorage.removeItem('orderInfo')
})

</script>
    
<style lang="scss" scoped>
.wrap {
    .mask {
        .button {
            width: 100%;
            display: flex;
            flex-direction: row;
            margin-top: 0.45rem;
            padding-left: 1.2rem;

            div {
                margin-right: 0.6rem;
                width: 1.5rem;
                border-radius: 0.3rem 0.3rem;
                border: 0.02rem solid #7942cf;
                height: 0.6rem;
                line-height: 0.6rem;
            }
        }
    }

    .top {

        width: 100%;
        height: 3.1rem;
        background-color: #8351e2;
        position: relative;
        z-index: 1;

        .icon {
            position: absolute;
            top: 0.8rem;
            left: 0.3rem;
        }

        .text {
            position: absolute;
            top: 0.8rem;
            left: 3.17rem;
            font-size: 0.3rem;
            color: #fadfed;
        }
    }

    .address {
        position: absolute;
        background-color: #fffeff;
        width: 90%;
        height: 2.2rem;
        z-index: 2;
        top: 1.8rem;
        left: 5%;
        padding-left: 5%;
        border-radius: 0.1rem 0.1rem 0.1rem 0.1rem;

        .addressp1 {
            height: 1.05rem;
            line-height: 1.05rem;
            font-weight: 700;
        }

        div {
            .addressp2 {
                font-size: 0.28rem;
                font-weight: 400;
                margin-bottom: 0.15rem;
            }

            span {
                font-size: 0.24rem;
                font-weight: 400;
                margin-bottom: 0.15rem;
            }
        }

        .exchange {
            position: absolute;
            right: 0.3rem;
            top: 0.85rem;
        }
    }

    .content {
        padding-top: 1.25rem;
        min-height: 9.15rem;
        background-color: #faf7fa;
        overflow-y: auto;

        .shopCart {
            width: 90%;
            // height: 1rem;
            margin-left: 5%;
            padding: 0 5%;
            border-radius: 0.1rem 0.1rem 0.1rem 0.1rem;
            background-color: white;

            .cartTop {
                width: 100%;
                height: 0.9rem;
                display: flex;
                flex-direction: row;
                justify-content: space-between;

                .shopname {
                    line-height: 0.9rem;
                    font-weight: 600;
                }

                .ordernumber {
                    font-size: 0.24rem;
                    line-height: 0.9rem;
                }
            }

            .cartItem {
                display: flex;
                flex-direction: row;
                width: 100%;
                margin-bottom: 0.2rem;

                img {
                    height: 1.1rem;
                    width: 1.1rem;
                    margin-right: 0.2rem;
                }

                .right {
                    width: 100%;
                    height: 1.1rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;

                    .productname {
                        font-weight: 600;
                    }

                    .priceandcount {
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                    }
                }
            }
        }
    }

    .bottom {
        width: 100%;
        height: 1rem;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding-left: 5%;
        position: fixed;
        bottom: 0;
        background-color: white;

        p {
            height: 1rem;
            line-height: 1rem;
            font-weight: 700;
        }

        div {
            width: 2.2rem;
            height: 1rem;
            line-height: 1rem;
            text-align: center;
            background-color: #8351e2;
            color: white;
        }
    }
}
</style>