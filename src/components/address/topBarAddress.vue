<template>
    <van-nav-bar :title="titleName" left-text="返回" left-arrow>
        <template #right>
            <span @click="changeRightName">{{ rightName }}</span>
        </template>
    </van-nav-bar>
</template>
    
<script setup>
import { defineProps, ref } from 'vue';
const props = defineProps({
    title: String,
    right: String
})
let titleName = ref('');
let rightName = ref('');
let showComp = ref('');
titleName.value = props.title;
rightName.value = props.right;

const changeRightName = function (name) {
    if (rightName.value == '新建') {
        titleName.value = '新建收货地址'
        rightName.value = '保存'
        showComp.value = 'new'
    }
}
</script>
    
<style>
</style>