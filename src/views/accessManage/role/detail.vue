<template>
  <div
    id="parentNode"
    style="position: relative; height: 100%; display: flex; flex-direction: column"
  >
    <detail-title>角色详情</detail-title>

    <div class="detail-body">
      <sub-title>角色信息</sub-title>

      <div class="detail-content">
        <div>
          <div class="title">角色名</div>
          <div class="edit">
            <div class="content">{{ data.roleName }}</div>
            <img src="@/assets/imgs/access/icon-profile-edit.png" @click="showDialog(1)" />
          </div>
        </div>
        <div class="line"></div>

        <div>
          <div class="title">备注</div>
          <div class="edit">
            <div class="content">{{ data.desc }}</div>
            <img src="@/assets/imgs/access/icon-profile-edit.png" @click="showDialog(2)" />
          </div>
        </div>
        <div class="line"></div>

        <div>
          <div class="title">创建时间</div>
          <div class="content">{{ data.createTime }}</div>
        </div>
      </div>
    </div>
    <div class="detail-body2">
      <sub-title>权限</sub-title>
      <a-button type="primary" style="margin-left: 20px" @click="showRole">添加权限</a-button>

      <a-table
        :columns="authColumns"
        :data="authList"
        :bordered="false"
        :pagination="false"
        class="table"
      >
        <template #operator="{ record }">
          <t-button @click="delAuth(record)" class="red-btn">删除</t-button>
        </template>
        <template #empty>
          <table-empty></table-empty>
        </template>
      </a-table>
    </div>

    <a-modal
      v-model:visible="dialogVisible"
      :closable="false"
      width="430px"
      modal-class="gloabal-modal-style-reset-none-line"
      :title="dialogData.title"
      :on-before-ok="handleConfirm"
    >
      <a-input :placeholder="dialogData.placeholder" v-model="dialogData.inputValue" />
    </a-modal>
  </div>
  <a-drawer
    popup-container="#parentNode"
    width="53%"
    :visible="drawerVisible"
    :closable="false"
    @cancel="drawerVisible = false"
    @ok="handleDrawerOk"
    ok-text="确认"
  >
    <template #title><span class="drawer-title">添加权限</span></template>
    <div class="drawer-data">
      <a-table
        row-key="id"
        :columns="authColumns"
        :data="allAuthList"
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
  import {
    Message,
    Modal,
    type TableColumnData,
    type TableRowSelection,
  } from '@arco-design/web-vue';
  import { reactive, ref } from 'vue';

  const authColumns = reactive<TableColumnData[]>([
    {
      title: '权限模块',
      width: 300,
      dataIndex: 'authName',
    },
    {
      title: '备注',
      dataIndex: 'desc',
    },
    {
      title: '操作',
      slotName: 'operator',
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

  const allAuthList = ref([
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
    {
      id: 4,
      authName: 'API权限配置',
      desc: 'xxxAPI服务只读访问权限',
    },
  ]);
  const selectedKeys = ref([]);

  const data = ref({
    id: 1,
    roleName: '销售',
    desc: '销售部员工',
    createTime: '2023-04-24 16:25',
  });

  const drawerVisible = ref(false);

  const handleDrawerOk = () => {
    console.log('kaka,rowkeys=', selectedKeys.value);
    if (!selectedKeys.value || selectedKeys.value.length === 0) {
      Message.error('必须选择一个权限');
      return;
    }
    authList.value = allAuthList.value.filter((item) => selectedKeys.value.includes(item.id));

    drawerVisible.value = false;
  };

  const showRole = () => {
    selectedKeys.value = authList.value.map((item) => item.id);
    drawerVisible.value = true;
  };

  const dialogData = ref({
    title: '',
    placeholder: '',
    inputValue: '',
  });

  const dialogVisible = ref(false);
  const dialogType = ref(1); //1 修改角色名， 2 修改备注
  const showDialog = (type) => {
    dialogType.value = type;
    if (type === 1) {
      dialogData.value.title = '修改角色名';
      dialogData.value.placeholder = '请输入角色名';
      dialogData.value.inputValue = data.value.roleName;
    } else {
      dialogData.value.title = '修改备注';
      dialogData.value.placeholder = '请输入备注';
      dialogData.value.inputValue = data.value.desc;
    }
    dialogVisible.value = true;
  };

  const handleConfirm = () => {
    if (!dialogData.value.inputValue) {
      Message.error({
        content: '内容不能为空' || 'Error',
        duration: 3 * 1000,
      });

      return false;
    }

    if (dialogType.value === 1) {
      data.value.roleName = dialogData.value.inputValue;
    } else {
      data.value.desc = dialogData.value.inputValue;
    }
    dialogVisible.value = false;
    return true;
  };

  const delAuth = (row) => {
    Modal.info({
      title: '是否删除权限？',
      content: '',
      maskClosable: false,
      hideCancel: false,
      onBeforeOk: () => {
        deletItem(row);
        return true;
      },
    });
  };

  const deletItem = (row) => {
    const indexToDelete = authList.value.findIndex((obj) => obj.id === row.id);
    if (indexToDelete !== -1) {
      authList.value.splice(indexToDelete, 1);
    }
  };
</script>

<style scoped lang="less">
  .detail-body {
    height: auto;
    background: #fff;
    padding-bottom: 20px;
    position: relative;
  }

  .detail-body2 {
    flex: 1;
    margin-top: 16px;
    background: #fff;
    padding-bottom: 20px;
    .table {
      padding: 20px 20px;
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
