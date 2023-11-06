<template>
  <a-spin :loading="loading" style="width: 100%;" :size="32">
    <a-table ref="tableRef" :columns="columns" :data="list" :bordered="false" :pagination="pagination"
      @page-change="pageChange" @page-size-change="pageSizeChange" v-bind="{ ...$attrs }">
      <template #empty>
        <table-empty></table-empty>
      </template>
      <template v-for="slot in slotKeys" v-slot:[slot]="data">
        <slot :name="slot" v-bind="data" />
      </template>
    </a-table>
  </a-spin>
</template>
<script lang="ts" setup>
import type { TableColumnData } from '@arco-design/web-vue';
import { reactive, useSlots, ref, watch } from 'vue';
const slots = useSlots();
const slotKeys = Object.keys(slots || {});

interface Props {
  columns: TableColumnData;
  query: Function | null;
  pageSize: Number
}
const props = defineProps<Props>();
const tableRef = ref();
const list = ref([]);
const pagination = reactive({
  showPageSize: true,
  showTotal: true,
  hideOnSinglePage: true,
  pageSizeOptions: [10, 20, 50, 100],
  total: 0,
  pageSize: props.pageSize || 50,
  current: 1,
})
const loading = ref<boolean>(true);
const getData = () => {
  if (!props.query) {
    return;
  }
  loading.value = true;
  props
    .query(pagination.current, pagination.pageSize)
    .then(newData => {
      list.value = newData.data;
      pagination.total = newData.total;
    })
    .catch(err => {
      console.log(err, "err");
    })
    .finally(() => {
      setTimeout(() => {
        loading.value = false;
      }, 500)
    });
};

watch(
  () => props.query,
  () => {
    pagination.current = 1;
    list.value = [];
    getData();
  },
  {
    immediate: true
  }
);

const pageSizeChange = val => {
  pagination.current = 1;
  pagination.pageSize = val;
  getData();
};

const pageChange = val => {
  pagination.current = val;
  getData();
};

defineExpose({
  tableRef
});
</script>
