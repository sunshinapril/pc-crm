<template>
  <div class="forbidden-manage-container global-main-style">
    <sub-title>禁用公司</sub-title>
    <div class="forbidden-manage-body">
      <div class="form-container">
        <a-form :model="form" layout="inline">
          <a-form-item field="targetCompanyName" label="项目公司名称">
            <a-input v-model="form.targetCompanyName" placeholder="请输入项目公司名称" style="width: 200px;" />
          </a-form-item>
          <a-form-item field="username" label="操作人用户名">
            <a-input v-model="form.username" placeholder="请输入用户名" style="width: 200px;" />
          </a-form-item>
          <a-form-item field="displayName" label="显示名">
            <a-input v-model="form.displayName" placeholder="请输入显示名" style="width: 200px;" />
          </a-form-item>
          <a-form-item field="forbiddenTime" label="禁用时间">
            <a-range-picker v-model="form.forbiddenTime" style="width: 256px;" />
          </a-form-item>
          <a-button type="primary" class="mgR10" @click="search">搜索</a-button>
          <a-button @click="reset">重置</a-button>
        </a-form>
      </div>
      <a-button type="primary" class="mgR10" @click="addCompany">添加公司</a-button>
      <a-button type="primary" @click="batchUpload">批量上传</a-button>
      <div class="table-container">
        <t-table :columns="columns" :query="query">
        </t-table>
      </div>
    </div>
    <a-modal v-model:visible="showAddCompany" :simple="true" :mask-closable="false" :on-before-ok="onBeforeOk">
      <template #title>添加禁用公司</template>
      <a-form ref="companyFormRef" :model="companyModel" :rules="companyRules">
        <a-form-item field="company" :hide-asterisk="true" :hide-label="true" validate-trigger="change">
          <a-auto-complete v-model="companyModel.company" :data="searchData" :style="{ width: '300px;' }" :allow-clear="true"
          placeholder="请输入公司名称" :filter-option="() => true" @search="handleSearch" @select="handleSelect"
          @clear="handleClear">
        </a-auto-complete>
        </a-form-item>
        <t-button v-if="companyModel.code" style="cursor: inherit;">统一社会信用代码：{{ companyModel.code }}</t-button>
      </a-form>
    </a-modal>
    <upload-file v-model="showUpload" @submit="setQuery"></upload-file>
  </div>
</template>
<script setup lang="ts">
import type { TableColumnData } from '@arco-design/web-vue';
import { debounce } from 'lodash';
import { ref, reactive, onMounted, h } from 'vue';
import TButton from '@/components/TButton/index.vue';
import UploadFile from './components/UploadFile.vue'
const form = ref({
  targetCompanyName: '',
  username: '',
  displayName: '',
  forbiddenTime: []
})
const columns = reactive<TableColumnData[]>([
  {
    title: '序号',
    dataIndex: 'id',
  },
  {
    title: '项目公司名称',
    dataIndex: 'targetCompanyName',
  },
  {
    title: '状态',
    dataIndex: 'status'
  },
  {
    title: '禁用时间',
    dataIndex: 'forbiddenTime',
  },
  {
    title: '操作人用户名',
    dataIndex: 'username',
  },
  {
    title: '显示名',
    dataIndex: 'displayName',
  },
  {
    title: '操作',
    fixed: 'right',
    render: ({ record }) => {

      return h(TButton, {
        onClick: () => {
          disactivate(record)
        }
      }, '解禁')
    }
  },
])
const query = ref(null);
const data = ref([
  {
    id: 1,
    targetCompanyName: '盛宝金科',
    username: '小铭',
    status: '禁用',
    forbiddenTime: '2022-11-07 14:16:12',
    displayName: '盛宝金科',
  },
  {
    id: 2,
    targetCompanyName: '平安健康',
    username: '小铭',
    status: '禁用',
    forbiddenTime: '2022-11-07 14:16:12',
    displayName: '平安',
  },
  {
    id: 3,
    targetCompanyName: '盛宝金科',
    username: '小铭',
    status: '禁用',
    forbiddenTime: '2022-11-07 14:16:12',
    displayName: '盛宝金科',
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
    username: '',
    displayName: '',
    forbiddenTime: []
  }
  setQuery();
}

// 解禁
const disactivate = (row) => {
  console.log(row);

}


const companyModel = ref({
  code: '',
  company: '',
});
const companyRules = {
  company: [{ required: true, message: '必填' }],
}
const showAddCompany = ref(false);
const companyFormRef = ref();

const addCompany = () => {
  showAddCompany.value = true;
  companyModel.value = {
    code: '',
    company: '',
  }
  companyFormRef.value.clearValidate();
}
const getSuggestCompanies = (value) => {
  return Promise.resolve({
    data: [
      {
        company: '香港圣宝',
        code: '9123802101111002',
      },
      {
        company: '33香港圣宝2223',
        code: '9123802101111088',
      },
    ]
  });
}

const searchData = ref<any[]>([]);

const handleSearch = debounce(async (value: any) => {
  companyModel.value = {
    ...companyModel.value,
    company: value,
    code: '',
  };
  if (value) {
    const res = await getSuggestCompanies(value);
    const { data }: { data: any } = res;
    searchData.value = data.map((item: any) => ({
      ...item,
      label: item.company,
      value: item.company,
    }));
  } else {
    searchData.value = [];
  }
}, 200);
const handleSelect = (value: string) => {
  const d = searchData.value.find((item) => item.company === value);
  if (d) {
    companyModel.value = {
      company: d.company,
      code: d.code,
    };
  }
};
const handleClear = () => {
  companyModel.value = {
    ...companyModel.value,
    company: '',
    code: '',
  };
  searchData.value = [];
};

const onBeforeOk = async() => {
  const flag = await companyFormRef.value.validate();
  return !flag;
}

const showUpload = ref(false);
const batchUpload = () => {
  showUpload.value = true;
}

</script>

<style lang="less" scoped>
.forbidden-manage-body {
  padding: 0 20px;

  .table-container {
    margin-top: 20px;
  }
}
</style>