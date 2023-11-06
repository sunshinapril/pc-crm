<template>
  <div
    id="parentNode"
    style="position: relative; height: 100%; display: flex; flex-direction: column"
  >
    <div class="detail-body2">
      <sub-title>接口配置</sub-title>

      <span class="subtitle">*已选项为计费接口</span>

      <a-table
        row-key="id"
        :columns="authColumns"
        :data="getAuthList()"
        :bordered="false"
        :pagination="false"
        :row-selection="rowSelection"
        v-model:selectedKeys="selectedKeys"
        class="table"
      >
        <template #operator="{ record }">
          <t-button @click="delAuth(record)" class="red-btn">删除</t-button>
        </template>
        <template #empty>
          <table-empty></table-empty>
        </template>
      </a-table>

      <a-button type="primary" style="margin-left: 20px" @click="showRole">修改</a-button>
    </div>
  </div>

  <a-drawer
    popup-container="#parentNode"
    width="53%"
    :visible="drawerVisible"
    :closable="false"
    @cancel="drawerCancle"
    @ok="handleDrawerOk"
    ok-text="确认"
  >
    <template #title><span class="drawer-title">修改接口配置</span></template>
    <div class="drawer-data">
      <a-table
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
  </a-drawer>
</template>

<script setup lang="ts">
  import { Modal, type TableColumnData, type TableRowSelection } from '@arco-design/web-vue';
  import { reactive, ref } from 'vue';
  import { clone } from 'lodash';

  const authColumns = reactive<TableColumnData[]>([
    {
      title: '接口名称',
      dataIndex: 'apiName',
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
      apiName: '财务数据',
      selected: false,
    },
    {
      id: 2,
      apiName: '企业工商模糊查询',
      selected: false,
    },
    {
      id: 3,
      apiName: '企业工商基本信息查询',
      selected: false,
    },
    {
      id: 4,
      apiName: '企业融资信息查询',
      selected: true,
    },
    {
      id: 5,
      apiName: '企业关键指标信息查询（万）',
      selected: true,
    },
  ]);

  const selectedKeys = ref([]);
  const defSelectedKeys = ref([]);

  const getDefaultSelectKeys = () => {
    authList.value.forEach((item) => {
      if (item.selected) {
        defSelectedKeys.value.push(item.id);
      }
    });
    selectedKeys.value = defSelectedKeys.value;
  };

  getDefaultSelectKeys();

  const drawerVisible = ref(false);

  const getAuthList = () => {
    const myList = clone(authList.value || []);
    const endList = myList.map((item) => {
      return {
        ...item,
        disabled: true,
      };
    });
    console.log('kaka=endlist=', endList);
    return endList;
  };
  const drawerCancle = () => {
    drawerVisible.value = false;
    selectedKeys.value = defSelectedKeys.value || [];
  };
  const handleDrawerOk = () => {
    console.log('kaka,rowkeys=', selectedKeys.value);
    drawerVisible.value = false;
  };

  const showRole = () => {
    drawerVisible.value = true;
  };

  const delAuth = (row) => {
    Modal.info({
      title: '是否删除权限？',
      content: '',
      maskClosable: false,
      hideCancel: false,
      onBeforeOk: () => {
        return true;
      },
    });
  };
</script>

<style scoped lang="less">
  .detail-body2 {
    flex: 1;
    background: #fff;
    padding-bottom: 20px;
    .table {
      padding: 20px 20px;
    }
    .subtitle {
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      color: #414650;
      margin-left: 20px;
    }
  }
  .detail-content {
    padding: 16px;
    display: flex;
    background: #fbfbfb;
    margin-left: 20px;
    margin-right: 20px;
    align-items: center;
    .title {
      color: #89919a;
    }

    .edit {
      display: flex;
      align-items: center;
      cursor: pointer;

      img {
        width: 16px;
        height: 16px;
        margin-top: 8px;
        margin-left: 6px;
      }
    }

    .content {
      color: #161616;
      font-size: 16px;
      font-weight: 500;
      margin-top: 10px;
    }

    .line {
      height: 52px;
      width: 1px;
      background-color: #e9ebef;
      margin-left: 80px;
      margin-right: 20px;
    }
  }

  :deep(.arco-modal-body) {
    padding: 0, 20px;
  }

  .drawer-title {
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #161616;
  }

  .red-btn {
    color: #f5603f;
  }
</style>

<style lang="less">
  .arco-modal {
    border-radius: 8px;
  }
</style>
