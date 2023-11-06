<template>
  <div class="g-main">
    <Header></Header>
    <div class="g-container">
      <Sidebar></Sidebar>
      <div class="g-router-view">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Header from '@/components/layout/Header.vue';
  import Sidebar from '@/components/layout/Sidebar.vue';
</script>

<style lang="less" scoped>
  .g-main {
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
    background: url(@/assets/imgs/common/bg-mask.png) no-repeat top / 100%,
      linear-gradient(180deg, #fbfbfb 0%, #d9d9d9 100%);
    background-position-y: 80px;

    .g-container {
      height: calc(100% - 32px);
      width: calc(100% - 32px);
      padding-top: 80px;
      margin: 16px;
      display: flex;
      .g-router-view {
        height: 100%;
        width: 100%;
        margin-left: 16px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        overflow-y: auto;
      }
    }
  }
</style>
