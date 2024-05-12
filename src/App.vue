<template>
  <div>

    <router-view v-slot="{ Component }">
      <transition :name="transitionName" mode="out-in" appear>
        <div :key="route.name">
          <component :is="Component"></component>
        </div>
      </transition>
    </router-view>
    <docker v-if="show"></docker>
  </div>

</template>

<script setup>
// import docker from "@/components/Home/_docker.vue";
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import docker from '@/components/Home/_docker.vue'
// import cart from "./components/Home/cart.vue";

const show = ref(true)

const route = useRoute()
const router = useRouter()
const transitionName = ref('default')
router.beforeEach((to, from) => {
  show.value = to.meta.index == 1
  if (to.meta.index == from.meta.index) {
    transitionName.value = 'vis-a-vis'
  }
  // 如果是从一级进入二级，则向左滑动
  else {
    transitionName.value = to.meta.index > from.meta.index ? 'slide-left' : 'slide-right'
  }
})

</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

a {
  color: black;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 170ms;
  position: absolute;
}

.slide-right-enter-active {
  opacity: 0;
  transform: translateX(100%);
}

.slide-right-leave-active {
  opacity: 0;
  transform: translateX(100%);
}

.slide-left-enter-active {
  opacity: 0;
  transform: translateX(100%);
}

.slide-left-leave-active {
  opacity: 0;
  transform: translateX(-100%);

}
</style>
