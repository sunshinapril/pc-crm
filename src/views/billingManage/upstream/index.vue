<!-- 上游方对账单 -->
<template>
  <div class="global-main-style valuation-container">
    <sub-title>上游方对账单</sub-title>
    <div class="form-container">
      <a-form :model="form" layout="inline">
        <a-form-item field="companyName" label="公司/机构">
          <a-input
            v-model="form.companyName"
            placeholder="请输入所属公司/机构"
            style="width: 200px"
          />
        </a-form-item>
        <a-form-item field="status" label="拉取方">
          <a-select v-model="form.status" :style="{ width: '130px' }" placeholder="请选择">
            <a-option v-for="item of statusList" :value="item.value" :label="item.label" />
          </a-select>
        </a-form-item>

        <a-form-item field="applyTime" label="拉取时间">
          <a-range-picker v-model:picker-value="form.applyTime" style="width: 256px" />
        </a-form-item>

        <a-button type="primary" class="mgR10">搜索</a-button>
        <a-button class="mgR10">重置</a-button>
        <a-button>导出</a-button>
      </a-form>
    </div>
    <div class="table-container">
      <t-table :columns="columns" :query="query"></t-table>
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
    applyTime: [],
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
      title: '拉取次数',
      dataIndex: 'pullNumber',
    },
    {
      title: '拉取方',
      dataIndex: 'pullType',
    },
    {
      title: '拉取时间',
      dataIndex: 'pullTime',
    },
  ]);
  const query = ref(null);
  const data = ref([
    {
      id: 1,
      companyName: '系统',
      apiName: '企业工商模糊查询',
      pullNumber: '1',
      pullType: '翔树',
      pullTime: '2023-04-24 16:25',
    },
    {
      id: 2,
      companyName: '系统',
      apiName: '企业工商基本信息查询',
      pullNumber: '110',
      pullType: '翔树',
      pullTime: '2023-04-24 16:25',
    },
    {
      id: 3,
      companyName: '盛宝金融科技',
      apiName: '企业融资信息查询',
      pullNumber: '21',
      pullType: '租户方',
      pullTime: '2023-04-24 16:25',
    },
    {
      id: 4,
      companyName: '盛宝金融科技',
      apiName: '企业关键指标信息查询（万）',
      pullNumber: '2',
      pullType: '租户方',
      pullTime: '2023-04-24 16:25',
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
