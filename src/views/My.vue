<template>
  <div>
    <van-action-sheet v-model:show="show" :actions="actions" @select="onSelect" />
    <div class="top">
      <van-icon color="#fff" size="0.5rem" name="setting-o" class="setting" @click="show = true" />
    </div>
    <div class="info">
      <div class="photo">
        <img src=".././assets/images/profile.jpg" id="img" alt="">
        <!-- <ImgCutter originalGraph="true" class="upload" label="Crop local pictures" tool="false"
        style="width:2rem;height:2rem" @cutDown="cutDown" rate="4:3" :toolBoxOverflow="false" :cutWidth="200"
        :cutHeight="200">
        <template #open>
          <button>选择图片</button>
        </template>
      </ImgCutter> -->
        <van-uploader :after-read="afterRead" preview-size="1rem" upload-icon="plus" class="upload" />
      </div>
      <div class="userinfo">
        <p>{{ userInfo.nickname }}</p>
        <span>ID:{{ userInfo.id }}</span>
      </div>
      <div class="packet">
        <div>
          <p>红包</p>
          <span>218</span>
        </div>
        <div>
          <p>优惠券</p>
          <span>12张</span>
        </div>
        <div>
          <p>仙豆</p>
          <span>88</span>
        </div>
        <div>
          <p>白条</p>
          <span>1000</span>
        </div>
      </div>
    </div>
    <div class="mycart">
      <div>
        <img src="../assets/images/钱包.png" alt="">
        <span>我的钱包</span>
        <van-icon name="arrow" class="arrow" />
      </div>
      <div @click="toaddress">
        <img src="../assets/images/地址.png" alt="">
        <span>我的地址</span>
        <van-icon name="arrow" class="arrow" />
      </div>
      <div>
        <img src="../assets/images/在线客服.png" alt="">
        <span>我的客服</span>
        <van-icon name="arrow" class="arrow" />
      </div>
    </div>
  </div>
  <!-- <docker /> -->
</template>

<script setup>
import docker from "@/components/Home/_docker.vue";
import { ref } from "vue";
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
// import ImgCutter from 'vue-img-cutter';

const store = useStore();
const show = ref(false);

const actions = [
  {
    name: "退出登录",
  }, {
    name: "更改账户信息",
  }
];
const onSelect = (item) => {
  if (item.name === '退出登录') {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('isLogin')
    router.push({
      name: 'login'
    })
  }
  if (item.name === '更改账户信息') {
    router.push({
      name: 'changeuserinfo'
    })
  }
}

const afterRead = function (file) {
  const img = document.getElementById('img');
  img.setAttribute('src', file.content);
  // console.log(file);
}



let userInfo = JSON.parse(localStorage.getItem('userInfo')).data;

const router = useRouter();
let toaddress = function () {
  router.push({
    name: 'address',
    params: {
      address: 'fromMy'
    }
  })
  store.commit('changeFrom', 'fromMy');
}
</script>

<style lang="scss" scoped>
// .smooth-leave-active {
//   transition: opacity 0.3s ease;
// }

// .smooth-leave-to {
//   opacity: 0;
// }
div {
  .top {
    // width: 7.5rem;
    width: 100%;
    height: 4.7rem;
    background-color: #8b58f4;
    clip-path: circle(5.95rem at 3.75rem -0.9rem);

    .setting {
      position: absolute;
      right: 0.5rem;
      top: 1rem;
    }
  }

  .info {
    width: 6.9rem;
    height: 4.7rem;
    background-color: #fff;
    position: absolute;
    top: 2.35rem;
    left: 0.3rem;
    border-radius: 0.25rem 0.25rem;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    ;

    .photo {
      width: 2.4rem;
      height: 2.4rem;
      border-radius: 50%;
      position: absolute;
      top: -1.2rem;
      left: 2.25rem;
      overflow: hidden;

      .upload {
        position: absolute;
        z-index: 2;
        left: 0.8rem;
        top: 0.75rem;
        opacity: 0;
      }

      // &:hover {
      //   .upload {
      //     z-index: 2;
      //   }
      // }

      img {
        width: 3.5rem;
        height: 2.4rem;
      }



    }

    .userinfo {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 1.5rem;

      p {
        font-size: 0.5rem;
        font-weight: 600;
        font-family: '宋体';
      }

      span {
        font-size: 0.25rem;
        margin-top: 0.1rem;
        color: gray;
        font-family: sans-serif;
      }
    }

    .packet {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      margin-top: 0.25rem;
      padding-top: 0.25rem;
      border-top: 0.02rem solid #ced6e0;

      div {
        text-align: center;

        p {
          font-size: 0.29rem;
          font-weight: 600;
          font-family: 'Tahoma';
          color: rgb(164, 176, 190);
          margin-bottom: 0.25rem;
        }

        span {
          font-size: 0.4rem;
          font-weight: 600;
          color: #3d3d3d;
          font-family: sans-serif;
        }
      }
    }
  }

  .mycart {
    position: absolute;
    width: 6.9rem;
    margin-left: 0.3rem;
    margin-top: 2.7rem;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    background-color: #fff;

    div {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 0.25rem 0.25rem;

      img {
        width: 0.5rem;
        height: 0.5rem;
      }

      .arrow {
        margin-left: 4.4rem;
      }
    }
  }
}
</style>
