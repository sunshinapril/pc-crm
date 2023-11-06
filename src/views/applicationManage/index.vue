<template>
  <div class="application-manage-container global-main-style">
    <sub-title>申请管理</sub-title>
    <div class="application-manage-body">
      <div class="form-container">
        <a-form :model="form" layout="inline">
          <a-form-item field="company" label="公司/机构">
            <a-input v-model="form.company" placeholder="请输入公司名称" style="width: 200px;" />
          </a-form-item>
          <a-form-item field="username" label="客户姓名">
            <a-input v-model="form.username" placeholder="请输入客户姓名" style="width: 200px;" />
          </a-form-item>
          <a-form-item field="phone" label="手机号">
            <a-input-number hide-button v-model="form.phone" placeholder="请输入手机号" style="width: 200px;" />
          </a-form-item>
          <a-form-item field="status" label="状态">
            <a-select :style="{ width: '200px' }" v-model="form.status" placeholder="请选择" allow-clear>
              <a-option v-for="item in applicationStatusConfig" :key="item.value" :value="item.value">{{ item.label }} </a-option>
            </a-select>
          </a-form-item>
          <a-button type="primary" class="mgR20" @click="search">搜索</a-button>
          <a-button @click="reset">重置</a-button>
        </a-form>
      </div>
      <div class="table-container">
        <t-table :columns="columns" :query="query"></t-table>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { applicationStatusConfig } from '@/config/config';
import type { TableColumnData } from '@arco-design/web-vue';
import TButton from '@/components/TButton/index.vue';
import { ref, reactive, onMounted, h } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const form = ref({
  company: '',
  username: '',
  phone: '',
  status: ''
})
const columns = reactive<TableColumnData[]>([
  {
    title: '序号',
    dataIndex: 'id',
  },
  {
    title: '公司/机构',
    dataIndex: 'company',
  },
  {
    title: '客户姓名',
    dataIndex: 'username',
  },
  {
    title: '手机号',
    dataIndex: 'phone',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
  },
  {
    title: '申请时间',
    dataIndex: 'applicationTime',
  },
  {
    title: '状态',
    dataIndex: 'status',
    render: ({record}) => {
      return h('span', {
        style: {
          color: applicationStatusConfig[record.status].color
        }
      }, applicationStatusConfig[record.status].label);
    }
  },
  {
    title: '操作人',
    dataIndex: 'operatorPerson',
  },
  {
    title: '操作',
    fixed: 'right',
    render: ({record}) => {
      return h(TButton, {
        onClick: () => {
          goDetail(record)
        }
      }, '审核');
    }
  },
])
const query = ref(null);
const data = ref([
  {
    id: 1,
    company: '盛宝金科',
    username: '小铭',
    phone: '137****9983',
    email: '123****88@qq.com',
    applicationTime: '2022-11-07 14:16:12',
    status: 0,
    operatorPerson: 'me'
  },
  {
    id: 2,
    company: '盛宝金科',
    username: '小和',
    phone: '137****1125',
    email: '123****88@qq.com',
    applicationTime: '2022-11-07 14:16:12',
    status: 2,
    operatorPerson: 'me'
  },
  {
    id: 3,
    company: '盛宝金科',
    username: '小花',
    phone: '137****2223',
    email: '123****88@qq.com',
    applicationTime: '2022-11-07 14:16:12',
    status: 1,
    operatorPerson: 'me'
  }
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
    phone: '',
    status: ''
  }
  setQuery();
}
const goDetail = (row) => {
  console.log(row);
  router.push('/application/detail');
}

</script>

<style lang="less" scoped>
.application-manage-body {
  padding: 0 20px;

  .table-container {
    margin-top: 20px;
  }
}
</style>