<template>
    <div style="height:0.4rem"></div>
    <!-- <van-nav-bar class="top" title="管理收货地址" left-text="返回" right-text="编辑" left-arrow @click-left="onClickLeft()"
            @click-right="onClickRight()" /> -->
    <div class="addresstop">
        <van-icon name="arrow-left" color="#fadfed" size="0.5rem" class="icon" @click="onClickLeft" />
        <div class="text">管理收货地址</div>
        <div @click="onClickRight">{{ edit }}</div>
    </div>
    <div class="wrap">
        <p>我的收货地址</p>
        <van-address-list style="width:100%" v-model="chosenAddressId" :list="list" default-tag-text="默认" @add="onAdd"
            @edit="onEdit">
            <template v-slot:item-bottom="item">
                <div v-if="show">
                    <van-button style="margin-top:0.2rem" @click="setdefault(item)" class="bedefault" size="mini"
                        color="#f08a5d" plain>设为默认
                    </van-button>
                    <van-button style="margin-top:0.2rem;margin-left: 3.9rem;" @click="deleteAdd(item)"
                        class="bedefault" size="mini" color="#f08a5d" plain>删除
                    </van-button>
                </div>
            </template>
        </van-address-list>
    </div>
</template>
    
<script setup>
import { onMounted, ref, defineProps } from 'vue'
import { useRouter } from 'vue-router';
import { getAddress, beDefault, deleteAddress } from "@/request/api/address.js";
import { useStore } from 'vuex';

const store = useStore();

let show = ref(false);
let edit = ref('编辑');
const chosenAddressId = ref(0);
const list = ref([]);

const props = defineProps({
    address: String,
})

const router = useRouter();
const onClickLeft = function () {
    router.back()
}
let from = store.state.from;
const onClickRight = function () {
    // 如果是从选取地址页面进入,没传具体地址信息，也没传from
    if (from == 'fromCreateOrder') {
        router.push({
            name: 'createorder',
            params: {
                address: JSON.stringify(list.value[chosenAddressId.value])
            }
        })
    }
    // 从编辑页面退回，从新建页面退回，都没传值
    else {
        show.value = !show.value;
        edit.value = show.value ? '完成' : '编辑';
    }

}
let data = JSON.parse(localStorage.getItem('userInfo')).data.id;

const changeData = function (data) {
    let res = [];
    for (let i = 0; i < data.length; i++) {
        res[i] = {
            'id': i, 'name': data[i].real_name, 'tel': data[i].mobile,
            'address': data[i].city + data[i].area + data[i].house
            , 'address_id': data[i].id, 'isDefault': data[i].is_default, 'city': data[i].city, 'area': data[i].area, 'house': data[i].house
        }
        if (data[i].is_default) {
            chosenAddressId.value = i
        }
    }
    if (data.length == 1) {
        res[0].isDefault = 1;
    }
    list.value = res
}
const onEdit = function (data, index) {
    // console.log(data)
    router.push({ name: 'editaddress', params: { data: JSON.stringify(data) } })
};

const setdefault = function (listItem) {
    beDefault(data, {
        id: listItem.address_id,
        is_default: 1
    });
    list.value.forEach(item => {
        if (listItem.name == item.name) {
            item.isDefault = 1
        } else {
            item.isDefault = 0
        }
    })
};

const deleteAdd = function (listItem) {
    deleteAddress(data, {
        id: listItem.address_id
    })
    for (let i = 0; i < list.value.length; i++) {
        if (list.value[i].name == listItem.name) {
            list.value.splice(i, 1);
            break;
        }
    }
}

const onAdd = function () {
    router.push({ name: 'newaddress' })
};

onMounted(async () => {
    if (from == 'fromCreateOrder') {
        edit.value = '确认';
    }
    let res = await getAddress(data);
    changeData(res.data.data)
})

</script>
    
<style lang="scss" scoped>
.addresstop {
    padding: 0.25rem 0.5rem;
    width: 100%;
    height: 0.7rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;


}

.wrap {
    min-height: 11.6rem;
    background-color: #f8f8f8;
    padding: 0.27rem 0.4rem;

    p {
        margin-bottom: 0.27rem;
    }

    // .addressitem{

    // }
}
</style>