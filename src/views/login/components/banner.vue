<template>
  <div class="banner">
    <div class="banner-inner">
      <a-carousel class="carousel" animation-name="fade">
        <a-carousel-item v-for="item in carouselItem" :key="item.slogan">
          <div :key="item.slogan" class="carousel-item">
            <img class="logo-img" :src="logoImg" />
            <div class="carousel-title">{{ item.slogan }}</div>
          </div>
        </a-carousel-item>
      </a-carousel>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import logoImg from '@/assets/imgs/common/logo-login.png';

  const carouselItem = computed(() => [
    {
      slogan: '项目估值测算管理服务平台',
    },
  ]);
</script>

<style lang="less" scoped>
  .banner {
    display: flex;
    align-items: center;
    justify-content: center;

    &-inner {
      flex: 1;
      height: 100%;
    }
  }

  .logo-img {
    width: 260px;
  }

  .carousel {
    height: 100%;
    background: #193554;

    &-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
    }

    &-title {
      color: var(--color-fill-1);
      font-weight: 400;
      font-size: 26px;
      margin-top: 30px;
    }
  }
</style>
