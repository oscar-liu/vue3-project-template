<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item
      v-for="(item, index) in listBread"
      :key="index + '-'+item.path">
      <span v-if="index == 0">{{ item.meta.title }}</span>
      <router-link v-else :to="item.path">{{ item.meta.title }}</router-link>
    </el-breadcrumb-item>
  </el-breadcrumb>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { watchEffect } from "@vue/runtime-core";
import { useRoute } from "vue-router";

const listBread = ref([]);
const route = useRoute();

// 监听路由变化
watchEffect(() => {
  listBread.value = route.matched;
});

</script>

<style lang="less" scoped>
  .breadcrumb{
    padding: 20px;
    background-color: #fff;
  }
</style>