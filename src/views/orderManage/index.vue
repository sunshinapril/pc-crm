<template>
  <div class="order-manage-container global-main-style">
    <sub-title>订单列表</sub-title>
    <div class="order-manage-body">
      <div class="form-container">
        <a-form :model="form" layout="inline">
          <a-form-item field="username" label="用户名">
            <a-input v-model="form.username" placeholder="请输入用户名" style="width: 200px;" />
          </a-form-item>
          <a-form-item field="company" label="公司/机构">
            <a-input v-model="form.company" placeholder="请输入公司名称" style="width: 200px;" />
          </a-form-item>
          <a-form-item field="customerName" label="客户姓名">
            <a-input v-model="form.customerName" placeholder="请输入客户姓名" style="width: 200px;" />
          </a-form-item>
          <a-form-item field="type" label="类型">
            <a-select :style="{ width: '200px' }" v-model="form.type" placeholder="请选择" allow-clear>
              <a-option v-for="item in orderTypeConfig" :key="item.value" :value="item.value">{{ item.label }} </a-option>
            </a-select>
          </a-form-item>
          <a-form-item field="buyTime" label="购买时间">
            <a-range-picker v-model="form.buyTime" style="width: 256px;" />
          </a-form-item>
          <a-form-item field="deadTime" label="订单失效时间≤">
            <a-input v-model="form.deadTime" placeholder="请输入" style="width: 120px;">
              <template #append>
                天
              </template>
            </a-input>
          </a-form-item>
          <a-form-item field="packetResidual" label="数据包余量≤">
            <a-input v-model="form.packetResidual" placeholder="请输入" style="width: 120px;">
              <template #append>
                条
              </template>
            </a-input>
          </a-form-item>
          <a-button type="primary" class="mgR20" @click="search">搜索</a-button>
          <a-button @click="reset">重置</a-button>
        </a-form>
      </div>
      <a-button type="primary" @click="createOrder">新建订单</a-button>
      <div class="table-container">
        <t-table :columns="columns" :query="query" :scroll="scroll"></t-table>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { orderTypeConfig } from '@/config/config';
import type { TableColumnData } from '@arco-design/web-vue';
import { ref, reactive, onMounted, h } from 'vue';
import { useRouter } from 'vue-router';
import TButton from '@/components/TButton/index.vue';
const router = useRouter()
const form = ref({
  company: '',
  username: '',
  customerName: '',
  type: '',
  buyTime: [],
  deadTime: '',
  packetResidual: ''
})
const scroll = ref({
  x: 1800,
})
const columns = reactive<TableColumnData[]>([
  {
    title: '用户ID',
    dataIndex: 'id',
    width: 80,
  },
  {
    title: '用户名',
    dataIndex: 'username',
    width: 120,
  },
  {
    title: '公司/机构',
    dataIndex: 'company',
  },
  {
    title: '客户姓名',
    dataIndex: 'customerName',
    width: 120,
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    width: 120,
  },
  {
    title: '类型',
    dataIndex: 'type',
    width: 80,
    render: ({ record }) => {
      return h('span', {
        // style: {
        //   color: orderTypeConfig[record.type].color
        // }
      }, orderTypeConfig[record.type].label);
    }
  },
  {
    title: '购买时间',
    dataIndex: 'buyTime',
  },
  {
    title: '生效时间',
    dataIndex: 'effectTime',
  },
  {
    title: '失效时间',
    dataIndex: 'failureTime',
  },
  {
    title: '数据包总量',
    dataIndex: 'totalPackets',
    width: 120,
  },
  {
    title: '数据包余额',
    dataIndex: 'packetBalance',
    width: 120,
  },
  {
    title: '操作人',
    dataIndex: 'operatorPerson',
    width: 100,
  },
  {
    title: '操作',
    fixed: 'right',
    width: 120,
    render: ({ record }) => {
      return h(TButton, {

        onClick: () => {
          goDetail(record)
        }
      }, '查看');
    }
  },
])
const query = ref(null);
const data = ref([
  {
    id: 1,
    company: '盛宝金科',
    username: '小铭',
    customerName: '王小铭',
    phone: '137****9983',
    type: 1,
    buyTime: '2023-05-16 15:30:20',
    effectTime: '2023-05-16 15:30:20',
    failureTime: '2023-06-16 15:30:20',
    totalPackets: 13355,
    packetBalance: 335,
    operatorPerson: 'me'
  },
])

const setQuery = () => {
  query.value = (page, size) => {
    const params = {
      pageIndex: page,
      pageSize: size,
      ...form.value
    };
    return Promise.resolve({
      data: data.value,
      total: 51
    })
  };
};
onMounted(() => {
  setQuery();
})

const search = () => {
  setQuery()
}
const reset = () => {
  form.value = {
    company: '',
    username: '',
    customerName: '',
    type: '',
    buyTime: [],
    deadTime: '',
    packetResidual: ''
  }
  setQuery();
}
const goDetail = (row) => {
  console.log(row);
  router.push('/order/detail');
}

const createOrder = () => {
  router.push('/order/detail');
}

</script>

<style lang="less" scoped>
.order-manage-body {
  padding: 0 20px;

  .table-container {
    margin-top: 20px;
  }
}
</style>