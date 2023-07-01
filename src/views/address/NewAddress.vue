<template>
    <div style="height:0.4rem"></div>
    <!-- <van-nav-bar class="top" title="新建收货地址" left-text="返回" right-text="重新输入" left-arrow @click-left="onClickLeft()"
        @click-right="onClickRight()" /> -->
    <div class="newaddresstop">
        <van-icon name="arrow-left" color="#fadfed" size="0.5rem" class="icon" @click="onClickLeft" />
        <div class="text">新建收货地址</div>
        <div @click="onClickRight">重新输入</div>
    </div>
    <van-address-edit :area-list="areaList" :address-info="{
        name: info.name,
        tel: info.tel,
        addressDetail: info.addressDetail,
        areaCode: info.areaCode,
        province: info.province,
        city: info.city,
        county: info.county,
        isDefault: info.isDefault,
    }" @save="onSave" />
</template>
    
<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { saveAddress, beDefault } from "@/request/api/address.js";
import { areaList } from '@vant/area-data';

const info = ref([]);
const userid = JSON.parse(localStorage.getItem('userInfo')).data.id;
const router = useRouter();
const onClickLeft = function () {
    router.go(-1)
};
const onClickRight = function () {
    info.value = [];
}
const onSave = async function (content) {
    // console.log(content)
    await saveAddress(userid, {
        real_name: content.name,
        mobile: content.tel,
        city: content.province + content.city,
        area: content.county,
        house: content.addressDetail
    })
    router.go(-1)
}

</script>
    
<style>
.newaddresstop {

    padding: 0.25rem 0.5rem;
    width: 100%;
    height: 0.7rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}
</style>