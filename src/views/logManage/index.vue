<template>
  <div class="global-main-style log-container">
    <sub-title>操作记录</sub-title>
    <div class="form-container">
      <a-form :model="form" layout="inline">
        <a-form-item field="userName" label="操作人用户名">
          <a-input v-model="form.userName" placeholder="请输入用户名" style="width: 200px" />
        </a-form-item>
        <a-form-item field="nickName" label="显示名">
          <a-input v-model="form.nickName" style="width: 200px" placeholder="请输入显示名" />
        </a-form-item>
        <a-button type="primary" class="mgR10">搜索</a-button>
        <a-button>重置</a-button>
      </a-form>
    </div>
    <div class="table-container">
      <t-table :columns="columns" :query="query"> </t-table>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import type { TableColumnData } from '@arco-design/web-vue';
  import { ref, reactive, onMounted } from 'vue';

  const form = ref({
    userName: '',
    nickName: '',
  });
  const columns = reactive<TableColumnData[]>([
    {
      title: '序号',
      dataIndex: 'id',
    },
    {
      title: '操作人用户名',
      dataIndex: 'userName',
    },
    {
      title: '显示名',
      dataIndex: 'nickName',
    },
    {
      title: '操作内容',
      dataIndex: 'msg',
    },
    {
      title: '操作时间',
      dataIndex: 'time',
    },
  ]);
  const query = ref(null);
  const data = ref([
    {
      id: 1,
      userName: 'Sale_1',
      nickName: '李华',
      msg: '申请管理-审核-12345',
      time: '2022-11-07 14:16:12',
    },
    {
      id: 2,
      userName: 'Sale_2',
      nickName: '王强',
      msg: '订单管理-新建订单-订单id12345',
      time: '2022-11-07 14:16:12',
    },
    {
      id: 3,
      userName: 'Sale_3',
      nickName: '张易',
      msg: '申请管理-审核-12345',
      time: '2022-11-07 14:16:12',
    },
    {
      id: 4,
      userName: 'Admin',
      nickName: '张易',
      msg: '权限管理-新建角色-角色序号',
      time: '2022-11-07 14:16:12',
    },
  ]);

  const setQuery = () => {
    query.value = (page, size) => {
      const params = {
        pageIndex: page,
        pageSize: size,
        ...form.value,
      };
      return Promise.resolve({
        data: data.value,
        total: 100,
      });
    };
  };
  onMounted(() => {
    setQuery();
  });
</script>
<style lang="less" scoped>
  .table-container {
    margin-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
  }
  .form-container {
    padding-left: 20px;
  }

  .log-container {
    padding-left: 0;
    padding-top: 0;
  }
</style>
