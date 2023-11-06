<template>
  <div class="container">
    <LoginBanner />
    <div class="content">
      <!-- <div :style="loginBgImg" class="bg-img" ></div> -->
      <div class="content-inner">
        <LoginForm />
      </div>
      
    </div>
  </div>
</template>

<script lang="ts" setup>
  import LoginBanner from './components/banner.vue';
  import LoginForm from './components/login-form.vue';
</script>

<style lang="less" scoped>
  .container {
    display: flex;
    height: 100vh;

    .bg-img {
      position: absolute;
      z-index: -1;
      height: 100%;
    }

    .banner {
      width: 550px;
      background: linear-gradient(163.85deg, #001c54 100%, #000612 100%);
    }

    .content {
      position: relative;
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: center;
      padding-bottom: 40px;
      background: url('src/assets/imgs/common/bg-login.png') no-repeat top;
    }

    .footer {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 100%;
    }
  }
</style>
