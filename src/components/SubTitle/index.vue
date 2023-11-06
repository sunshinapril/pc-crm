<template>
  <div class="sub-title-container">
    <slot />
  </div>
</template>
<script setup lang="ts">
</script>
<style lang="less" scoped>
.sub-title-container {
  height: 64px;
  padding: 20px;
  background: #fff;
  display: flex;
  align-items: center;
  color: #161616;
  font-size: 16px;
  font-weight: 600;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    width: 3px;
    height: 22px;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    background: #066E48;
  }
}
</style>