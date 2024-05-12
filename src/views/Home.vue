<template>
    <div style="width: 100%; overflow: hidden; overflow-y: auto">
        <div class="location">
            <img class="left" src="@/assets/images/local.png" alt="" />
            <span>古北城南三十里酒肆</span>
            <img class="right" src="@/assets/images/remind.png" alt="" />
        </div>
        <!-- search -->
        <div class="search">
            <input class="input" type="text" v-model="search" placeholder="汉码商城品牌优惠券" />
            <van-icon name="search" class="icon" size="0.5rem" />
        </div>
        <!-- banner -->
        <div class="banner">
            <img src="https://www.freeimg.cn/i/2024/05/11/663f1092d0308.jpeg" alt="" />
        </div>
        <!-- classification -->
        <div class="classification-wrap">
            <div v-for="item in classification" :key="item.name">
                <img :src="`http://webapi.hanmaweilai.com/public/static/images/${item.src}`" alt="" />
                <p>{{ item.name }}</p>
            </div>
        </div>
        <!-- shopList -->
        <div style="padding: 0.32rem 0.3rem">
            <h3>热门店铺</h3>
        </div>
        <!-- <Nearby></Nearby> -->
        <shopInfo :shopList="shopList"></shopInfo>
    </div>
    <div style="height: 1rem"></div>
    <!-- <docker></docker> -->
</template>

<script setup>
import docker from "@/components/Home/_docker.vue";
import { onMounted, ref } from "vue";
// import Nearby from "@/components/shop/Nearby.vue";
import shopInfo from "@/components/shop/shopInfo.vue";
import { getShopList } from "@/request/api/shop.js";
// search内容
let search = ref("");
let shopList = ref([]);
const classification = [
    { name: "便利超市", src: "便利超市.png" },
    { name: "生鲜蔬菜", src: "生鲜蔬菜.png" },
    { name: "品牌免运", src: "品牌免运.png" },
    { name: "红包优惠", src: "优惠.png" },
    { name: "水果零食", src: "水果零食.png" },
    { name: "鲜花绿植", src: "鲜花绿植.png" },
    { name: "医药健康", src: "医药健康.png" },
    { name: "家居时尚", src: "家居.png" },
    { name: "签到", src: "签到.png" },
    { name: "烘焙蛋糕", src: "蛋糕.png" },
];
onMounted(async () => {
    let res = await getShopList();
    shopList.value = res.data.data;
});
</script>

<style lang="scss" scoped>
@import "@/style/mixins.scss";

.location {
    display: flex;
    height: 0.5rem;
    width: 100vw;
    margin-top: 0.74rem;
    padding: 0 0.1rem;
    box-sizing: border-box;

    span {
        flex-grow: 1;
        font-weight: 600;
        font-size: 0.32rem;
        margin-right: 0.2rem;
        @include ellipsis;
    }

    img {
        width: 0.4rem;
        height: 0.4rem;
        margin: 0 0.2rem;
        vertical-align: top;
        flex-grow: 0;
        flex-shrink: 0;
    }
}

.input {
    width: 93vw;
    position: relative;
    margin-left: 50%;
    transform: translateX(-50%);
    border-radius: 0.2rem 0.2rem;
    height: 0.52rem;
    outline: none;
    border: none;
    padding: 0.3rem 0.9rem;
    box-sizing: border-box;
    background-color: #f1f2f6;
    margin-top: 0.25rem;
}

.classification-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 0 0.15rem;
    box-sizing: border-box;
    border-bottom: 0.2rem solid #f1f2f6;

    div {
        width: 18vw;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 0.01rem;

        img {
            width: 0.8rem;
            margin-bottom: 0.1rem;
        }

        p {
            font-size: 0.24rem;
            margin-bottom: 0.3rem;
        }
    }
}

.search {
    position: relative;

    .icon {
        // background-color: #8a8a8a;
        position: absolute;
        left: 0.6rem;
        top: 0.32rem;
        color: gray;
    }
}

.banner {
    height: 0;
    overflow: hidden;
    margin: 0.2rem 0.3rem;
    padding-bottom: 25.4%;

    img {
        width: 100%;
        border-radius: 0.15rem;
    }
}
</style>
