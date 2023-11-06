<!--
 * @Description: 
 * @Date: 2022-08-08 10:55:18
 * @LastEditTime: 2022-08-09 10:02:10
-->
<template>
  <div class="header-container">
    <img class="logo" src="@/assets/imgs/common/logo.png" alt="" />
    <div class="right">
      <UserInfo></UserInfo>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import UserInfo from '@/components/layout/UserInfo.vue';
</script>

<style scoped lang="less">
  .header-container {
    height: 80px;
    width: 100%;
    background: #ffffff;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 35px;
    .logo {
      width: 120px;
      display: block;
      // cursor: pointer;
    }
    .right {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .separator {
        width: 0.5px;
        height: 16px;
        background: #d8dcdf;
        margin: 0 30px;
      }
    }
  }
</style>
