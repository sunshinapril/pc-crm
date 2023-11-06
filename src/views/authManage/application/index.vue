<template>
  <div class="user-manage-container global-main-style">
    <sub-title>授权申请</sub-title>
    <div class="user-manage-body">
      <div class="form-container">
        <a-form :model="form" layout="inline">
          <a-form-item field="targetCompanyName" label="项目公司名称">
            <a-input v-model="form.targetCompanyName" placeholder="请输入项目公司名称" style="width: 200px;" />
          </a-form-item>
          <a-form-item field="status" label="申请状态">
            <a-select :style="{ width: '200px' }" v-model="form.status" placeholder="请选择" allow-clear>
              <a-option v-for="item in authApplicationStatusConfig" :key="item.value" :value="item.value">{{ item.label }}
              </a-option>
            </a-select>
          </a-form-item>
          <a-form-item field="userId" label="用户ID">
            <a-input v-model="form.userId" placeholder="请输入用户ID" style="width: 200px;" />
          </a-form-item>
          <a-form-item field="username" label="用户名">
            <a-input v-model="form.username" placeholder="请输入用户名" style="width: 200px;" />
          </a-form-item>
          <a-form-item field="belongCompany" label="所属公司/机构">
            <a-input v-model="form.belongCompany" placeholder="请输入所属公司/机构" style="width: 200px;" />
          </a-form-item>
          <a-form-item field="applicationTime" label="申请时间">
            <a-range-picker v-model="form.applicationTime" style="width: 256px;" />
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
import { Divider, Modal, type TableColumnData } from '@arco-design/web-vue';
import { ref, reactive, onMounted, h } from 'vue';
import TButton from '@/components/TButton/index.vue';
import { useRouter } from 'vue-router';
import { authApplicationStatusConfig } from '@/config/config';
const router = useRouter()
const form = ref({
  targetCompanyName: '',
  status: '',
  userId: '',
  username: '',
  belongCompany: '',
  applicationTime: []
})
const columns = reactive<TableColumnData[]>([
  {
    title: '序号',
    dataIndex: 'id',
  },
  {
    title: '目标公司名称',
    dataIndex: 'targetCompanyName',
  },
  {
    title: '申请方式',
    dataIndex: 'applicationType',
  },
  {
    title: '申请状态',
    dataIndex: 'status',
    render: ({ record }) => {
      return h('span', {
        // style: {
        //   color: authApplicationStatusConfig[record.status].color
        // }
      }, authApplicationStatusConfig[record.status].label);
    }
  },
  {
    title: '申请时间',
    dataIndex: 'applicationTime',
  },
  {
    title: '生效时间',
    dataIndex: 'effectTime',
  },
  {
    title: '用户ID',
    dataIndex: 'userId',
  },
  {
    title: '用户名',
    dataIndex: 'username',
  },
  {
    title: '所属公司名称',
    dataIndex: 'belongCompany',
  },
  {
    title: '操作',
    fixed: 'right',
    render: ({ record }) => {
      const inEffect = record.status === 1;
      let btnText1 = inEffect && record.applicationType === '尽调协议' ? '审核' : '查看'
      return h('div', {}, [
        h(TButton, {
          onClick: () => {
            goDetail(record)
          }
        }, btnText1),
        h(TButton, {
          style: {
            color: inEffect ? '#F5603F' : '#cdcdcd',
            cursor: inEffect ? 'pointer' : 'not-allowed'
          },
          onClick: () => {
            if (inEffect) {
              close(record)
            }
          }
        }, '关闭'),
      ])
    }
  },
])
const query = ref(null);
const data = ref([
  {
    id: 1,
    targetCompanyName: '盛宝金科',
    username: '小铭',
    userId: 18381284,
    status: 1,
    applicationType: '尽调协议',
    effectTime: '2022-11-07 14:16:12',
    applicationTime: '2022-11-07 14:16:12',
    belongCompany: '盛宝金科',
  },
  {
    id: 2,
    targetCompanyName: '平安健康',
    username: '小铭',
    userId: 123423,
    status: 2,
    applicationType: '投资协议',
    effectTime: '2022-11-07 14:16:12',
    applicationTime: '2022-11-07 14:16:12',
    belongCompany: '平安',
  },
  {
    id: 3,
    targetCompanyName: '盛宝金科',
    username: '小铭',
    userId: 134321543,
    status: 0,
    applicationType: '贷款协议',
    effectTime: '2022-11-07 14:16:12',
    applicationTime: '2022-11-07 14:16:12',
    belongCompany: '盛宝金科',
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
    targetCompanyName: '',
    status: '',
    userId: '',
    username: '',
    belongCompany: '',
    applicationTime: []
  }
  setQuery();
}
const goDetail = (row) => {
  console.log(row);
  router.push('/auth/application/detail');
}

const close = (row) => {
  console.log(row, 'row');
  Modal.info({
    title: '是否关闭授权？',
    content: '',
    maskClosable: false,
    hideCancel: false,
    onOk: (e) => {
      console.log(e, 'e')
    }
  })
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