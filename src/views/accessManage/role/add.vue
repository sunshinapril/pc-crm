<template>
  <detail-title>新建角色</detail-title>
  <div class="detail-body">
    <div class="step-progress-container">
      <a-steps :current="currentStep" class="step-box" changeable @change="setCurrent">
        <a-step>配置角色信息</a-step>
        <a-step>添加权限</a-step>
      </a-steps>
    </div>

    <div class="content">
      <a-form :model="form" auto-label-width v-if="currentStep != 2">
        <a-form-item field="roleName" label="角色名" required>
          <a-input v-model="form.roleName" style="width: 366px" placeholder="不超过64个字符" />
        </a-form-item>
        <a-form-item field="desc" label="描述" required>
          <a-input v-model="form.desc" style="width: 366px" placeholder="请输入描述" />
        </a-form-item>
      </a-form>

      <a-table
        v-if="currentStep != 1"
        row-key="id"
        :columns="authColumns"
        :data="authList"
        :bordered="false"
        :pagination="false"
        :row-selection="rowSelection"
        v-model:selectedKeys="selectedKeys"
      >
        <template #empty>
          <table-empty></table-empty>
        </template>
      </a-table>
    </div>

    <a-button class="mgR10">取消</a-button>
    <a-button type="primary" @click="next">{{ nextBtnTxt }}</a-button>
  </div>
</template>

<script setup lang="ts">
  import { Message, type TableColumnData, type TableRowSelection } from '@arco-design/web-vue';
  import { reactive, ref } from 'vue';

  const getCheckContent = () => {
    if (!form.value.roleName || !form.value.desc) {
      Message.error('请填写用户信息');
      return false;
    }
    return true;
  };

  const currentStep = ref(1);
  const setCurrent = (current) => {
    console.log('kaka==setCurrent=步骤变化 change', current);
    if (!getCheckContent()) {
      return;
    }
    currentStep.value = current;
    btnTxtChange();
  };
  const nextBtnTxt = ref('下一步');

  const form = ref({
    roleName: '',
    desc: '',
  });
  const authColumns = reactive<TableColumnData[]>([
    {
      title: '权限模块',
      dataIndex: 'authName',
    },
    {
      title: '备注',
      dataIndex: 'desc',
    },
  ]);
  const rowSelection = ref<TableRowSelection>({
    type: 'checkbox',
    showCheckedAll: true,
    onlyCurrent: false,
  });

  const authList = ref([
    {
      id: 1,
      authName: '账单中心',
      desc: '管理账户内所有用户及其权限、财务相关的信息、服务资产的权限',
    },
    {
      id: 2,
      authName: '数据包拉取',
      desc: 'xxx服务访问权限',
    },
    {
      id: 3,
      authName: '权限配置',
      desc: 'xxx服务只读访问权限',
    },
  ]);
  const selectedKeys = ref([]);

  const btnTxtChange = () => {
    if (currentStep.value === 1) {
      nextBtnTxt.value = '下一步';
    } else {
      nextBtnTxt.value = '提交';
    }
  };
  const next = () => {
    if (!getCheckContent()) {
      return;
    }
    if (currentStep.value === 2) {
      console.log('kaka=提交数据了');
      return;
    }

    currentStep.value += 1;
    btnTxtChange();
  };
</script>

<style scoped lang="less">
  .detail-body {
    flex: 1;
    background: #fff;
    padding: 40px 40px;
  }
  .content {
    margin-bottom: 70px;
  }
  .step-progress-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 50px;
    .step-box {
      width: 50%;
    }
    :deep(
        .arco-steps-label-horizontal .arco-steps-item:not(:last-child) .arco-steps-item-title::after
      ) {
      height: 3px;
    }
  }
</style>
