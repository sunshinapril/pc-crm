<template>
  <div class="title-container">
    <icon-left class="left" @click="back"/>
    <slot />
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
const back = () => {
  router.go(-1);
}
</script>
<style lang="less" scoped>
.title-container {
  height: 64px;
  padding: 20px;
  background: #fff;
  display: flex;
  align-items: center;
  color: #161616;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
  .left {
    cursor: pointer;
    margin-right: 8px;
  }
}
</style>