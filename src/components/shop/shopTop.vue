<template>
  <div style="width:100%;height:0.6rem"></div>
  <van-nav-bar style="margin-bottom:0.25rem" left-arrow @click-left="onClickLeft">
    <template #right>
      <!-- <van-icon name="search" size="18" /> -->
      <input @keyup.enter="searching" class="searchProduct" type="text" placeholder="请输入商品名称" v-model="search" />
    </template>
  </van-nav-bar>
</template>

<script>
export default {
  data() {
    return { search: "" };
  },
  methods: {
    onClickLeft: function () {
      this.$router.go(-1);
    },
    searching: function () {
      this.$emit("searchRes", this.search);
    },
  },
};
</script>

<style>
.searchProduct {
  width: 85vw;
  height: 0.6rem;
  outline: none;
  border: none;
  padding-left: 0.3rem;
  background-color: #f1f2f6;
}
</style>
