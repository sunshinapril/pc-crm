<template>
  <div class="global-main-style valuation-container">
    <sub-title>估值API</sub-title>
    <div class="form-container">
      <a-form :model="form" layout="inline">
        <a-form-item field="companyName" label="项目公司名称">
          <a-input
            v-model="form.companyName"
            placeholder="请输入项目公司名称"
            style="width: 200px"
          />
        </a-form-item>
        <a-form-item field="status" label="申请状态">
          <a-select v-model="form.status" :style="{ width: '130px' }" placeholder="请选择">
            <a-option v-for="item of statusList" :value="item.value" :label="item.label" />
          </a-select>
        </a-form-item>
        <a-form-item field="userName" label="操作人用户名">
          <a-input v-model="form.userName" placeholder="请输入用户名" style="width: 180px" />
        </a-form-item>
        <a-form-item field="nickName" label="显示名">
          <a-input v-model="form.nickName" style="width: 180px" placeholder="请输入显示名" />
        </a-form-item>

        <a-form-item field="applyTime" label="申请时间">
          <a-range-picker v-model="form.applyTime" style="width: 256px" />
        </a-form-item>

        <a-button type="primary" class="mgR10">搜索</a-button>
        <a-button>重置</a-button>
      </a-form>
    </div>
    <div class="table-container">
      <!-- <t-table :columns="columns" :query="query"></t-table> -->
      <t-table :columns="columns" :query="query">
        <template #version="{ record }">
          <t-button @click="goVersion(record)">{{ record.version }}</t-button>
        </template>
        <template #operator="{ record }">
          <t-button @click="goDetail(record)">查看</t-button>
        </template>
      </t-table>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import type { TableColumnData } from '@arco-design/web-vue';
  import { ref, reactive, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  const router = useRouter();

  const statusList = [
    {
      value: '状态id-1',
      label: '待处理',
    },
    {
      value: '状态id-2',
      label: '已处理',
    },
    {
      value: '状态id-3',
      label: '已关闭',
    },
  ];

  const form = ref({
    companyName: '',
    status: '',
    userName: '',
    nickName: '',
    applyTime: [],
  });
  const columns = reactive<TableColumnData[]>([
    {
      title: '序号',
      dataIndex: 'id',
    },
    {
      title: '项目公司名称',
      dataIndex: 'companyName',
    },
    {
      title: '发起时间',
      dataIndex: 'startTime',
    },
    {
      title: '状态',
      dataIndex: 'status',
    },
    {
      title: '处理时间',
      dataIndex: 'handleTime',
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
      title: '估值版本',
      slotName: 'version',
    },
    {
      title: '操作',
      slotName: 'operator',
      fixed: 'right',
    },
  ]);
  const query = ref(null);
  const data = ref([
    {
      id: 1,
      companyName: '正泰安能数字能源（浙江）股份有限公司',
      startTime: '2023-04-24 16:25',
      status: '待处理',
      handleTime: '2023-04-24 16:25',
      userName: 'Sale_1',
      nickName: '李华',
      version: 'V2',
    },
    {
      id: 2,
      companyName: '新香数字能源（浙江）股份有限公司',
      startTime: '2023-04-24 16:25',
      status: '已处理',
      handleTime: '2023-04-24 16:25',
      userName: 'Sale_2',
      nickName: '王强',
      version: 'V3',
    },
    {
      id: 3,
      companyName: '盛宝金融科技有限公司',
      startTime: '2023-04-24 16:25',
      status: '已关闭',
      handleTime: '2023-04-24 16:25',
      userName: 'Sale_3',
      nickName: '张易',
      version: '金融科技估值',
    },
    {
      id: 4,
      companyName: '盛宝金融科技有限公司',
      startTime: '2023-04-24 16:25',
      status: '已处理',
      handleTime: '2023-04-24 16:25',
      userName: 'Admin',
      nickName: '张易',
      version: '新能源',
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
  const goDetail = (row) => {
    console.log(row);
    // router.push('/valuation/detail');
    router.push({
      path: '/valuation/detail',
      query: { itemData: row.id },
    });
  };
  const goVersion = (row) => {
    window.open('https://www.baidu.com', '_blank');
  };
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

  .valuation-container {
    padding-left: 0;
    padding-top: 0;
  }
</style>
