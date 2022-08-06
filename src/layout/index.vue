<!--
 * @Description: 后台的公用布局
 * @Author: oscar
 * @Date: 2021-12-03 15:28:06
-->
<template>
  <div class="common-layout">
    <el-container>
      <el-aside class="sidebar " >
        <Sidebar></Sidebar>
      </el-aside>
      <el-container>
        <el-header>
          <Header></Header>
        </el-header>
        <el-main>
          <Breadcrumb></Breadcrumb>
          <div class="layout-content">
            <div class="layout-main">
              <router-view />
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
  import Sidebar from "./sidebar/index.vue"
  import Header from "./header/index.vue"
  import Breadcrumb from './breadcrumb/index.vue'

</script>

<style lang="less" scoped>
  .common-layout{
    height: 100vh;
  }
  .el-header{
    padding: 0;
  }
  .el-main{
    padding: 0;
    background-color: #f2f2f2;
  }
  .sidebar{
    width: 230px;
    height: 100vh;
    background-color: #001529;
    overflow: hidden;
    -webkit-box-shadow: 2px 0 6px rgb(0 21 41 / 35%);
    box-shadow: 2px 0 6px rgb(0 21 41 / 35%);
    transition: all .2s;
  }
  .sidebar-hide{
    width: 70px;
  }
  .layout-content{
    padding: 15px;
  }
  .layout-main{
    background-color: #fff;
    padding: 15px;
    min-height: 40vh;
  }

</style>