<!-- 租户方对账单 -->
<template>
  <div class="global-main-style valuation-container">
    <sub-title>租户方对账单</sub-title>
    <div class="form-container">
      <a-form :model="form" layout="inline">
        <a-form-item field="companyName" label="公司/机构">
          <a-input
            v-model="form.companyName"
            placeholder="请输入所属公司/机构"
            style="width: 200px"
          />
        </a-form-item>
        <a-form-item field="status" label="是否计费">
          <a-select v-model="form.status" :style="{ width: '130px' }" placeholder="请选择">
            <a-option v-for="item of statusList" :value="item.value" :label="item.label" />
          </a-select>
        </a-form-item>

        <a-button type="primary" class="mgR10">搜索</a-button>
        <a-button class="mgR10">重置</a-button>
        <a-button>导出</a-button>
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

  const statusList = [
    {
      value: '状态id-1',
      label: '是',
    },
    {
      value: '状态id-2',
      label: '否',
    },
  ];

  const form = ref({
    companyName: '',
    status: '',
  });
  const columns = reactive<TableColumnData[]>([
    {
      title: '序号',
      dataIndex: 'id',
    },
    {
      title: '公司/机构',
      dataIndex: 'companyName',
    },
    {
      title: '接口名称',
      dataIndex: 'apiName',
    },
    {
      title: '是否为计费接口',
      dataIndex: 'status',
    },
    {
      title: '拉取时间',
      dataIndex: 'time',
    },
  ]);
  const query = ref(null);
  const data = ref([
    {
      id: 1,
      companyName: '盛宝金融科技',
      apiName: '2023-04-24 16:25',
      status: '是',
      time: '2023-04-24 16:25',
    },
    {
      id: 2,
      companyName: '新香数字能源（浙江）股份有限公司',
      apiName: '2023-04-24 16:25',
      status: '否',
      time: '2023-04-24 16:25',
    },
    {
      id: 3,
      companyName: '盛宝金融科技有限公司',
      apiName: '2023-04-24 16:25',
      status: '是',
      time: '2023-04-24 16:25',
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

  .valuation-container {
    padding-left: 0;
    padding-top: 0;
  }
</style>
