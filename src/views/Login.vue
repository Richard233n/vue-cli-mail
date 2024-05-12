<template>
  <div class="wrap">
    <img src="http://webapi.hanmaweilai.com/public/static/images/user.png" alt="" />
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field v-model="username" name="手机号" label="手机号" placeholder="请输入手机号"
          :rules="[{ required: true, message: '请填写用户名' }]" />
        <van-field v-model="password" type="password" name="密码" label="密码" placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]" />
      </van-cell-group>
      <div style="margin: 0.32rem">
        <van-button round block type="primary" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
    <div class="footer">
      <router-link to="/register"><span>立即注册</span></router-link>
      <span class="verticalBar"></span>
      <span>忘记密码</span>
    </div>
  </div>
</template>

<script>
import { getLogin } from '@/request/api/login.js'
import router from '@/router/index'
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    onSubmit: async function () {
      const res = await getLogin({
        username: this.username,
        password: this.password
      })
      if (res.data.msg == 'ok') {
        this.$toast.success('登录成功');
        (localStorage.userInfo = JSON.stringify(res.data)), (localStorage.isLogin = true)
        setTimeout(() => {
          router.push('/')
        }, 2000)
      } else {
        this.$toast.success(res.data.msg)
      }
    }
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
    .verticalBar {
      display: inline-block;
      width: 0.05rem;
      height: 0.32rem;
      margin: 0 0.33rem;
      background-color: black;
    }
  }
}
</style>
