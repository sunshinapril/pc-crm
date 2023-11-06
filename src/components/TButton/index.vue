<template>
  <div class="t-button">
    <slot />
  </div>
</template>
<script lang="ts" setup>
</script>
<style lang="less" scoped>
.t-button {
  color: #066E48;
  font-size: 14px;
  display: inline-block;
  cursor: pointer;
  & + .t-button {
    margin-left: 10px;
  }
}
</style>