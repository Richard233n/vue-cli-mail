<template>
    <div style="height:0.4rem"></div>
    <!--<van-nav-bar class="top" title="编辑收货地址" left-text="返回" right-text="刷新" left-arrow @click-left="onClickLeft()"
        @click-right="onClickRight()" /> -->
    <div class="addresstop">
        <van-icon name="arrow-left" color="#fadfed" size="0.5rem" class="icon" @click="onClickLeft" />
        <div class="text">编辑收货地址</div>
        <div @click="onClickRight">刷新</div>
    </div>
    <van-address-edit :area-list="areaList" show-set-default :address-info="{
        name: info.name,
        tel: info.tel,
        addressDetail: info.addressDetail,
        // areaCode: info.areaCode,
        province: info.province,
        city: info.city,
        county: info.county,
        isDefault: info.isDefault,
    }" @save="onSave" />
</template>
    
<script setup>
import { onMounted, ref, defineProps } from 'vue'
import { useRouter } from 'vue-router';
import { updateAddress, beDefault } from "@/request/api/address.js";
import { areaList } from '@vant/area-data';

const props = defineProps({
    data: String,
})

const info = ref({});

const router = useRouter();
const onClickLeft = function () {
    router.go(-1)
};
const onClickRight = function () {

}

const userid = JSON.parse(localStorage.getItem('userInfo')).data.id;
const onSave = async function (content) {
    await updateAddress(userid, {
        id: info.value.address_id,
        real_name: content.name,
        mobile: content.tel,
        city: content.province + content.city,
        area: content.county,
        house: content.addressDetail
    });
    if (content.isDefault) {
        await beDefault(userid, {
            id: info.value.address_id,
            is_default: 1
        });
    }
    router.go(-1)
}
const formatData = function () {
    let data = JSON.parse(props.data);
    info.value = {
        address_id: data.address_id,
        name: data.name,
        tel: data.tel,
        addressDetail: data.area,
        // areaCode: data.areaCode,
        province: data.city,
        city: '',
        county: '',
        isDefault: data.isDefault,
    }
}
onMounted(() => {
    formatData();
})


</script>
    
<style scoped>
.addresstop {
    padding: 0.25rem 0.5rem;
    width: 100%;
    height: 0.7rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}
</style>