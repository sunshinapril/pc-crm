<template>
  <a-sub-menu v-if="item.children && item.children.length > 0" :key="item.path">
    <template v-if="item.meta.icon" #icon><svg-icon :name="item.meta.icon"></svg-icon></template>
    <template #title>{{ item.meta.title }}</template>
    <SidebarItem v-for="sub in item.children" :key="sub.path" :item="sub"></SidebarItem>
  </a-sub-menu>
  <a-menu-item v-else :key="item.path" @click="goto(item)">
    <template v-if="item.meta.icon" #icon><svg-icon :name="item.meta.icon"></svg-icon></template>
    {{ item.meta.title }}
  </a-menu-item>
</template>
<script lang="ts" setup>
  import { useRoute } from 'vue-router';
  import { useRouter } from 'vue-router';
  defineProps({
    item: {
      type: Object,
    },
  });
  const router = useRouter();
  const route = useRoute();
  const goto = (item: any) => {
    if (route.path === item.path) return;
    router.push(item.path);
  };
</script>
