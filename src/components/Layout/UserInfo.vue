<template>
  <div class="user-info">
    <a-dropdown trigger="click">
      <div class="avatar-container">
        <a-avatar :size="32" :style="{ marginRight: '8px' }">
          <img class="avatar" src="@/assets/imgs/common/default_avatar.png" alt="" />
        </a-avatar>
        <div class="user-name">{{ info.username }}</div>
      </div>

      <template #content>
        <a-doption>
          <a-space @click="logout">
            <icon-export />
            <span>
              退出登录
            </span>
          </a-space>
        </a-doption>
      </template>
    </a-dropdown>
  </div>
</template>

<script setup lang="ts">
import { useUser } from '@/store/modules/user';
import { computed } from 'vue';
import { clearToken } from '@/utils/auth';
import { goLogin } from '@/utils';

const info = computed(() => {
  return useUser().getUserInfo;
});


const logout = () => {
  clearToken();
  useUser().setToken('');
  goLogin();
};
</script>

<style scoped lang="less">
.user-info {
  position: relative;

  .avatar-container {
    display: flex;
    align-items: center;

    .avatar {
      width: 32px;
      height: 32px;
      cursor: pointer;
      border-radius: 50%;
      margin-right: 10px;
    }
  }

  &:hover {
    .options-container {
      display: block;
    }
  }

  .options-container {
    position: absolute;
    width: 158px;
    right: 0;
    top: 37px;
    background: #ffffff;
    border-radius: 2px;
    display: none;
    box-shadow: 0px 2px 8px 8px rgba(84, 57, 255, 0.05);

    .options-item {
      height: 46px;
      width: 100%;
      padding: 0 20px;
      color: #242a32;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      cursor: pointer;

      &.active,
      &:hover {
        background: #f0f2ff;
        color: #5439ff;
      }

      :deep(.svg-icon) {
        margin-right: 8px;
        width: 18px;
        height: 18px;
      }
    }
  }
}</style>
