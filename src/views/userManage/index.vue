<template>
  <div class="user-manage-container global-main-style">
    <sub-title>客户管理</sub-title>
    <div class="user-manage-body">
      <div class="form-container">
        <a-form :model="form" layout="inline">
          <a-form-item field="company" label="公司/机构">
            <a-input v-model="form.company" placeholder="请输入公司名称" style="width: 200px;" />
          </a-form-item>
          <a-form-item field="createTime" label="注册时间">
            <a-range-picker v-model="form.createTime" style="width: 256px;" />
          </a-form-item>
          <a-button type="primary" class="mgR10" @click="search">搜索</a-button>
          <a-button @click="reset">重置</a-button>
        </a-form>
      </div>
      <div class="table-container">
        <t-table :columns="columns" :query="query">
        </t-table>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { TableColumnData } from '@arco-design/web-vue';
import { ref, reactive, onMounted, h } from 'vue';
import TButton from '@/components/TButton/index.vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const form = ref({
  company: '',
  createTime: []
})
const columns = reactive<TableColumnData[]>([
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: '公司/机构',
    dataIndex: 'company',
  },
  {
    title: '用户名',
    dataIndex: 'userName',
  },
  {
    title: '手机号',
    dataIndex: 'phone',
  },
  {
    title: '注册时间',
    dataIndex: 'createTime',
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
    userName: '小铭',
    phone: '137****9983',
    createTime: '2022-11-07 14:16:12'
  },
  {
    id: 2,
    company: '盛宝金科',
    userName: '小铭',
    phone: '137****9983',
    createTime: '2022-11-07 14:16:12'
  },
  {
    id: 3,
    company: '盛宝金科',
    userName: '小铭',
    phone: '137****9983',
    createTime: '2022-11-07 14:16:12'
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
    createTime: []
  }
  setQuery();
}
const goDetail = (row) => {
  console.log(row);
  router.push('/user/detail');
}

</script>

<style lang="less" scoped>
.user-manage-body {
  padding: 0 20px;

  .table-container {
    margin-top: 20px;
  }
}
</style>