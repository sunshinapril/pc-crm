<template>
  <div class="sidebar-container">
    <a-menu :style="{ width: '200px', height: '100%' }" v-model:collapsed="collapsed" v-model:selected-keys="selectedKeys"
      :auto-open-selected="true" show-collapse-button breakpoint="xl" @collapse="onCollapse">
      <SidebarItem v-for="item in routers" :key="item?.path" :item="item"></SidebarItem>
    </a-menu>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, watch, computed } from 'vue';
import SidebarItem from './SidebarItem.vue';
import { useRoute } from 'vue-router';
import usePermission from '@/store/modules/permission';
import { cloneDeep } from 'lodash';

const filterAsyncRouter = (routers) => {

  return routers.filter((router) => {
    router.meta = router.meta && {
      ...router?.meta,
    };
    if (router.meta.hidden) {
      return false;
    }
    const children = router.children && router.children.filter(i => !i.meta.hidden)
    if (children && children.length === 1) {
      router.path = children[0]?.path;
      router.children = [];
    }
    if (children && children.length > 1) {
      router.children = filterAsyncRouter(children);
    }
    return true;
  });
};

const routers = computed(() => {
  const addRouters = cloneDeep(usePermission().addRouters || []);
  return filterAsyncRouter(addRouters);
});



const collapsed = ref(false);
const onCollapse = (val: boolean, type: any) => {
  collapsed.value = val;
};
const selectedKeys = ref([]);

const route = useRoute();
watch(
  () => route,
  (n) => {
    if (n.meta.hidden) {
      const list = n.matched;
      const len = list.length;
      selectedKeys.value = [list[len - 2].path];
    } else {
      selectedKeys.value = [n.path];
    }
  },
  {
    immediate: true,
  },
);
onMounted(() => {
  collapsed.value = false;
});
</script>
<style lang="less" scoped>
.sidebar-container {
  height: 100%;
  flex-shrink: 0;
  box-shadow: inset -1px 0px 0px #e5e6e8;
  background: #fafafa;
}

:deep(.arco-menu-light) {
  .arco-menu-item {
    color: #414650;

    .arco-menu-icon {
      color: #414650;
    }

    &:hover {
      color: #066e48;
      background: #E8F5F0;

      .arco-menu-icon {
        color: #066e48;
      }
    }
  }

  .arco-menu-inline {
    .arco-menu-selected {

      .arco-menu-icon,
      .arco-menu-title {
        color: #066e48;

      }
    }

    .arco-menu-icon,
    .arco-menu-title,
    .arco-menu-icon-suffix {
      color: #414650;
    }

    .arco-menu-inline-header {
      &:hover {
        background: #E8F5F0;

        .arco-menu-icon,
        .arco-menu-title,
        .arco-menu-icon-suffix {
          color: #066e48;
        }
      }
    }

    .arco-menu-item.arco-menu-selected {
      background: #E8F5F0;
      color: #066e48;

      .arco-menu-icon {
        color: #066e48;
      }
    }
  }

  .arco-menu-item.arco-menu-selected {
    color: #066e48;
    background: #E8F5F0;
    .arco-menu-icon {
      color: #066e48;
    }
  }

}
</style>
