<template>
  <div class="header">
    <div class="trigger">
      <el-icon >
        <DArrowLeft />
      </el-icon>
    </div>
    <div class="f5">
      <el-icon><RefreshRight /></el-icon>
    </div>

    <el-popover placement="bottom" :width="160" trigger="click">
      <template #reference>
        <div class="header-right">
          <el-avatar size="small" :icon="UserFilled" />
          <span class="name">Admin</span>
          <el-icon><ArrowDown /></el-icon>
        </div>
      </template>
      <div class="person" @click="exit">
        <!-- 暂无扩展内容 -->
        <span>退出登录</span>
        <el-icon><Close /></el-icon>
      </div>
    </el-popover>

  </div>
</template>

<script setup>
  import { UserFilled } from '@element-plus/icons-vue'

  function exit() {
    consolelog('exit localStroge clear')
  }


</script>

<style lang="less" scoped>
  @uiColor: #409eff;
  .header {
    position: relative;
    height: 60px;
    padding: 0;
    background: #fff;
    -webkit-box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
    box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  }
  .trigger{
    height: 60px;
    line-height: 60px;
    vertical-align: top;
    padding: 0 22px;
    display: inline-block;
    cursor: pointer;
    -webkit-transition: all .3s,padding 0s;
    transition: all .3s,padding 0s;
  }
  .f5{
    height: 60px;
    line-height: 60px;
    vertical-align: top;
    display: inline-block;
  }
  .header-right{
    float: right;
    height: 100%;
    margin-left: auto;
    overflow: hidden;
    display: flex;
    align-items: center;
    padding-right: 20px;
    cursor: pointer;
  }
  .header-right:hover{
    color: @uiColor;
  }
  .header-right .name{
    padding: 0 8px;
  }
  .person{
    display: flex;
    justify-content: end;
    align-items: center;
    cursor: pointer;
    span{
      padding-right: 5px;
    }
  }
</style>