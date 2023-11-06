<template>
  <div class="loading-container" v-show="msg.show">
    <div class="loading-box">
      <spin :size="48" class="icon-loading"></spin>
      {{ msg.title }}
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { Spin } from '@arco-design/web-vue';
  interface MsgProps {
    show: boolean;
    title: string;
  }
  interface Props {
    msg: MsgProps;
  }
  const props = defineProps<Props>();
</script>
<style lang="less" scoped>
  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .loading-container {
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 9999;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(255, 255, 255, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    .loading-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: rgb(var(--primary-6));
      font-weight: 600;
      .icon-loading {
        margin-bottom: 10px;
      }
    }
  }
</style>
