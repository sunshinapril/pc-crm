<template>
  <div class="t-divider" :style="{ height: height + 'px', background: background, margin: margin }"></div>
</template>
<script lang="ts" setup>
defineProps({
  height: {
    type: String,
    default: '3'
  },
  background: {
    type: String,
    default: '#F8F8F8'
  },
  margin: {
    type: String,
    default: '20px 0'
  }
})
</script>
<style lang="less" scoped>
.t-divider {
  width: 100%;
}
</style>
