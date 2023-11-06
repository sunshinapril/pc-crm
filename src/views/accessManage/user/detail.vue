<template>
  <div id="parentNode" style="position: relative; height: 100%">
    <detail-title>用户详情</detail-title>
    <div class="detail-body">
      <sub-title>用户信息</sub-title>

      <div class="detail-content">
        <div>
          <div class="title">用户名</div>
          <div class="edit">
            <div class="content">{{ data.userName }}</div>
            <img src="@/assets/imgs/access/icon-profile-edit.png" @click="showDialog(1)" />
          </div>
        </div>
        <div class="line"></div>

        <div>
          <div class="title">显示名</div>
          <div class="edit">
            <div class="content">{{ data.nickName }}</div>
            <img src="@/assets/imgs/access/icon-profile-edit.png" @click="showDialog(2)" />
          </div>
        </div>
        <div class="line"></div>

        <div>
          <div class="title">角色</div>
          <div class="edit">
            <div class="content">{{ data.roleName }}</div>
            <img src="@/assets/imgs/access/ic-down_arrow.png" @click="showRole" />
          </div>
        </div>
        <div class="line"></div>

        <div>
          <div class="title">备注</div>
          <div class="edit">
            <div class="content">{{ data.desc }}</div>
            <img src="@/assets/imgs/access/icon-profile-edit.png" @click="showDialog(3)" />
          </div>
        </div>
        <div class="line"></div>

        <div>
          <div class="title">创建时间</div>
          <div class="content">{{ data.createTime }}</div>
        </div>
      </div>

      <sub-title>安全设置</sub-title>
      <a-button type="primary" style="margin-left: 20px" @click="reset">重置密码</a-button>

      <a-modal
        v-model:visible="dialogVisible"
        :closable="false"
        width="430px"
        modal-class="gloabal-modal-style-reset-none-line"
        :title="dialogData.tiitle"
        :on-before-ok="handleConfirm"
      >
        <a-input :placeholder="dialogData.placeholder" v-model="dialogData.inputValue" />
      </a-modal>
    </div>
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
    <template #title><span class="drawer-title">选择角色</span></template>
    <div class="drawer-data">
      <a-table
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
  </a-drawer>
</template>

<script setup lang="ts">
  import {
    InputPassword,
    Message,
    Modal,
    type TableColumnData,
    type TableRowSelection,
  } from '@arco-design/web-vue';
  import { h, reactive, ref } from 'vue';

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
    },
    {
      id: 2,
      roleName: '财务',
      desc: 'xxx服务访问权限',
    },
  ]);
  const selectedKeys = ref([]);

  const data = ref({
    id: 1,
    userName: 'Sale-1',
    nickName: '李华',
    roleName: '销售',
    roleIds: [1],
    desc: '销售部员工',
    createTime: '2023-04-24 16:25',
  });

  const drawerVisible = ref(false);

  const handleDrawerOk = () => {
    console.log('kaka,rowkeys=', selectedKeys.value);
    if (!selectedKeys.value || selectedKeys.value.length === 0) {
      return Message.error('请选择角色信息');
    }

    // let arr1 = [
    //   { id: 1, name: 'obj1' },
    //   { id: 2, name: 'obj2' },
    //   { id: 3, name: 'obj3' },
    // ];
    // let arr2 = [1, 3];

    const result = roleList.value
      .filter((obj) => selectedKeys.value.includes(obj.id))
      .map((item) => {
        return item.roleName;
      })
      .join(',');

    console.log('kaka=result=', result);

    data.value.roleName = result;
    data.value.roleIds = selectedKeys.value;
    console.log('kaka=role:', data.value);

    drawerVisible.value = false;
  };

  const showRole = () => {
    selectedKeys.value = data.value.roleIds;
    drawerVisible.value = true;
  };

  const dialogData = ref({
    tiitle: '',
    placeholder: '',
    inputValue: '',
  });

  const dialogVisible = ref(false);
  const dialogType = ref(1); //1 修改用户名，2修改显示名，3，修改备注
  const showDialog = (type) => {
    dialogType.value = type;
    if (type === 1) {
      dialogData.value.tiitle = '修改用户名';
      dialogData.value.placeholder = '请输入用户名';
      dialogData.value.inputValue = data.value.userName;
    } else if (type === 2) {
      dialogData.value.tiitle = '修改显示名';
      dialogData.value.placeholder = '请输入显示名';
      dialogData.value.inputValue = data.value.nickName;
    } else {
      dialogData.value.tiitle = '修改备注';
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
      data.value.userName = dialogData.value.inputValue;
    } else if (dialogType.value === 2) {
      data.value.nickName = dialogData.value.inputValue;
    } else {
      data.value.desc = dialogData.value.inputValue;
    }

    dialogVisible.value = false;
    return true;
  };

  const inputPasswordModel = ref('');
  const isCheckPassword = ref(false);
  const ModalContent = {
    setup() {
      return () =>
        h('div', { class: 'info-modal-content' }, [
          h(InputPassword, {
            placeholder: '请输入新密码',
            modelValue: inputPasswordModel.value,
            'onUpdate:modelValue': (val) => {
              inputPasswordModel.value = val;
            },
            error: isCheckPassword.value,
            onChange: (val) => {
              isCheckPassword.value = !val;
            },
          }),
          h(
            'div',
            {
              style: `font-size: 12px;color:rgb(var(--danger-6));display: ${
                isCheckPassword.value ? 'block' : 'none'
              }`,
            },
            '新密码不能为空',
          ),
        ]);
    },
  };
  const reset = () => {
    inputPasswordModel.value = '';
    isCheckPassword.value = false;
    Modal.confirm({
      title: '重置密码',
      content: () => h(ModalContent),
      maskClosable: false,
      onBeforeOk: () => {
        isCheckPassword.value = !inputPasswordModel.value;
        return !!inputPasswordModel.value;
      },
    });
  };
</script>

<style scoped lang="less">
  .detail-body {
    height: auto;
    background: #fff;
    padding-bottom: 20px;
    position: relative;
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
</style>

<style lang="less">
  .arco-modal {
    border-radius: 8px;
  }
</style>
