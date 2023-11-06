<template>
  <detail-title>新建用户</detail-title>
  <div class="detail-body">
    <div class="step-progress-container">
      <a-steps :current="currentStep" class="step-box" changeable @change="setCurrent">
        <a-step>基本信息设置</a-step>
        <a-step>权限设置</a-step>
        <a-step>确认</a-step>
      </a-steps>
    </div>

    <div class="content">
      <a-form :model="form" auto-label-width v-if="currentStep != 2">
        <a-form-item field="userName" label="用户名" required>
          <a-input
            v-model="form.userName"
            style="width: 366px"
            :disabled="currentStep === 3"
            placeholder="仅支持英文、数字和符号“_”，不超过18个字符"
          />
        </a-form-item>
        <a-form-item field="nickName" label="显示名" required>
          <a-input
            v-model="form.nickName"
            style="width: 366px"
            placeholder="请输入显示名"
            :disabled="currentStep === 3"
          />
        </a-form-item>
        <a-form-item field="desc" label="备注" required>
          <a-input
            v-model="form.desc"
            style="width: 366px"
            placeholder="请输入备注"
            :disabled="currentStep === 3"
          />
        </a-form-item>
      </a-form>

      <div v-if="currentStep === 3" style="height: 50px"></div>

      <a-table
        v-if="currentStep != 1"
        row-key="id"
        :columns="roleColumns"
        :data="roleList"
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

  const currentStep = ref(1);

  const getCheckContent = () => {
    if (!form.value.userName || !form.value.nickName || !form.value.desc) {
      Message.error('请填写用户信息');
      return false;
    }
    return true;
  };
  const setCurrent = (current) => {
    if (!getCheckContent()) {
      return;
    }
    console.log('kaka=step=current=', current);

    currentStep.value = current;
    btnTxtChange();
    console.log('kaka==setCurrent=步骤变化 change');
  };
  const nextBtnTxt = ref('下一步');

  const form = ref({
    userName: '',
    nickName: '',
    desc: '',
  });
  const roleColumns = reactive<TableColumnData[]>([
    {
      title: '角色名',
      dataIndex: 'roleName',
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

  const roleList = ref([
    {
      id: 1,
      roleName: '销售',
      desc: '管理账户内所有用户及其权限、财务相关的信息、服务资产的权限',
      disabled: false,
    },
    {
      id: 2,
      roleName: '财务',
      desc: 'xxx服务访问权限',
      disabled: false,
    },
  ]);
  const selectedKeys = ref([]);

  const btnTxtChange = () => {
    if (currentStep.value === 1) {
      nextBtnTxt.value = '下一步';
    } else if (currentStep.value === 2) {
      roleList.value.forEach((item) => {
        item.disabled = false;
      });
      nextBtnTxt.value = '下一步';
    } else {
      roleList.value.forEach((item) => {
        item.disabled = true;
      });

      nextBtnTxt.value = '提交';
    }
  };
  const next = () => {
    if (!getCheckContent()) {
      return;
    }
    if (currentStep.value === 3) {
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
