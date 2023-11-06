<template>
  <detail-title>订单详情</detail-title>
  <div class="detail-body">
    <sub-title>创建订单</sub-title>
    <a-form ref="formRef" class="padding-lr" :model="form" :rules="rules" :auto-label-width="true">
      <a-form-item field="name" label="用户ID/用户名">
        <a-auto-complete v-model="form.name" :data="searchData" :style="{ width: '366px' }" :allow-clear="true"
          placeholder="请输入用户ID/用户名" :filter-option="() => true" @search="handleSearch" @select="handleSelect"
          :disabled="id" @clear="handleClear">
        </a-auto-complete>
      </a-form-item>
      <a-form-item field="company" label="公司/机构">
        <a-input v-model="form.company" placeholder="请输入公司/机构" style="width: 366px;" disabled />
      </a-form-item>
      <a-form-item field="phone" label="手机号">
        <a-input v-model="form.phone" placeholder="请输入手机号" style="width: 366px;" disabled />
      </a-form-item>
      <a-form-item field="type" label="类型">
        <a-radio-group v-model="form.type" :disabled="id">
          <a-radio v-for="item in orderTypeConfig" :key="item.value" :value="item.value">{{ item.label }} </a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item field="usageTime" label="使用时间">
        <a-range-picker showTime v-model="form.usageTime" style="width: 366px;" :disabled="[!!id, !!id]" />
      </a-form-item>
      <a-form-item field="packageTotal" label="数据包总量">
        <a-input v-model="form.packageTotal" placeholder="请输入" style="width: 366px;" :disabled="id" />
      </a-form-item>
      <a-form-item field="displayMode" label="非上市公司数据展示模式">
        <a-radio-group v-model="form.displayMode" :disabled="id">
          <a-radio v-for="item in displayModeConfig" :key="item.value" :value="item.value">{{ item.label }} </a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>

    <div class="padding-lr button-container">
      <template v-if="id">
        <a-button class="mgR10" @click="cancel">关闭</a-button>
      </template>
      <template v-else>
        <a-button class="mgR10" @click="cancel">取消</a-button>
        <a-button class="mgR10" type="primary" @click="confirm">确定</a-button>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import { orderTypeConfig, displayModeConfig } from '@/config/config';
import { ref, computed } from 'vue';
import { debounce } from 'lodash';
import { useRoute } from 'vue-router';
import { Modal } from '@arco-design/web-vue';
import { h } from 'vue';

const route = useRoute();
const id = computed(() => route.query.id);

const formRef = ref();
const form = ref({
  name: '',
  phone: '136****7323',
  company: '2334',
  type: '',
  packageTotal: '',
  usageTime: '',
  displayMode: '',
})
const rules = ref({
  name: [{ required: true, message: '必填' }],
  company: [{ required: true, message: '必填' }],
  phone: [{ required: true, message: '必填' }],
  type: [{ required: true, message: '必选' }],
  usageTime: [{ required: true, message: '必选' }],
  packageTotal: [{ required: true, message: '必填' }],
  displayMode: [{ required: true, message: '必选' }],
})
const cancel = () => {
  console.log('关闭');
}

const getSuggestCompanies = (value) => {
  return Promise.resolve({
    data: [
      {
        title: '香港圣宝'
      },
      {
        title: '33香港圣宝2223'
      },
    ]
  });
}

const searchData = ref<any[]>([]);

const handleSearch = debounce(async (value: any) => {
  form.value = {
    ...form.value,
    company: '',
    phone: '',
  };
  if (value) {
    const res = await getSuggestCompanies(value);
    const { data }: { data: any } = res;
    searchData.value = data.map((item: any) => ({
      ...item,
      label: item.title,
      value: item.title,
    }));
  } else {
    searchData.value = [];
  }
}, 200);
const handleSelect = (value: string) => {
  const d = searchData.value.find((item) => item.title === value);
  if (d) {
    form.value = {
      ...form.value,
      name: d.title,
      company: d.title,
      phone: d.title,
    };
  }
};
const handleClear = () => {
  form.value = {
    ...form.value,
    name: '',
    company: '',
    phone: '',
  };
  searchData.value = [];
};

const checkModal = () => {
  Modal.info({
    title: () => h('span', {
      innerHTML: '该用户在所选时间段内已有订单，<br />是否继续创建？'
    }),
    content: '',
    hideCancel: false,
    maskClosable: false,
    onOk: () => {
      console.log('点击确定');
    }
  })
}

const confirm = () => {
  formRef.value.validate().then((res) => {
    if (!res) {
      console.log(res, '校验成功');
      checkModal();
    }
  })
}


</script>
<style lang="less" scoped>
.detail-body {
  flex: 1;
  background: #fff;
  padding-bottom: 20px;
  overflow: hidden;
  overflow-y: auto;

}

.padding-lr {
  padding: 0 20px;
}

.button-container {
  padding-top: 50px;
}
</style>