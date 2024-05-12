<template>
  <div class="wrap">
    <img
      src="http://webapi.hanmaweilai.com/public/static/images/user.png"
      alt=""
    />
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          placeholder="请输入用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        /><van-field
          v-model="repassword"
          type="password"
          name="密码"
          label="密码"
          placeholder="请再次输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 0.32rem">
        <van-button round block type="primary" native-type="submit">
          注册
        </van-button>
      </div>
    </van-form>
    <div class="footer">
      <router-link to="/login"> <span>已有账号去登录</span></router-link>
    </div>
  </div>
</template>

<script setup>
import { getRegister } from '@/request/api/register.js'
import { ref } from 'vue'
import router from '../router'
import { Toast } from 'vant'
const username = ref('')
const password = ref('')
const repassword = ref('')
const onSubmit = async () => {
  const res = await getRegister({
    username: username.value,
    password: password.value,
    repassword: repassword.value
  })
  if (res.data.msg == 'ok') {
    Toast.success('注册成功')
    router.push('/login')
  } else {
    Toast.fail(res.data.msg)
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    margin-bottom: 0.35rem;
  }
  .footer {
    margin-top: 0.15rem;
  }
}
</style>
