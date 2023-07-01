<template>
   
</template>
    
<script setup>
import { ref,onMounted } from "vue";
import { useRouter } from 'vue-router';
import {saveUser} from '../../request/api/userInfo.js';



// const result = await request.post('/api/v1/saveUser/'+ userinfo.id, {
//             username: userinfo.username,
//             nickname: data.nickname,
//             mobile: data.mobile,
//             password: data.password,
//         })
let userinfo=ref({});
userinfo.value = JSON.parse(localStorage.getItem('userInfo')).data;
const save=function(){
    saveUser(userinfo.id,{
        username: userinfo.username,
        nickname: userinfo.nickname,
        mobile: userinfo.mobile,
        password: userinfo.password,
    }).then(res=>{
        console.log(res);
    })
}

onMounted(()=>{
})
</script>
    
<style>
</style>