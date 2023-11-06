<template>
  <div class="global-main-style valuation-container">
    <sub-title>用户列表</sub-title>
    <a-button type="primary" class="m-l-20" @click="handleAdd">新建用户</a-button>
    <div class="table-container">
      <t-table :columns="columns" :query="query">
        <template #operator="{ record }">
          <t-button @click="goDetail(record)">管理</t-button>
          <t-button @click="handleClickDel(record)" class="red-btn">注销</t-button>
        </template>
      </t-table>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { Modal, type TableColumnData } from '@arco-design/web-vue';
  import { ref, reactive, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  const router = useRouter();

  const columns = reactive<TableColumnData[]>([
    {
      title: '序号',
      dataIndex: 'id',
    },
    {
      title: '用户名',
      dataIndex: 'userName',
    },
    {
      title: '显示名',
      dataIndex: 'nickName',
    },
    {
      title: '角色名',
      dataIndex: 'roleName',
    },
    {
      title: '备注',
      dataIndex: 'desc',
    },
    {
      title: '时间',
      dataIndex: 'createTime',
    },
    {
      title: '操作',
      slotName: 'operator',
      fixed: 'right',
    },
  ]);
  const query = ref(null);
  const data = ref([
    {
      id: 1,
      userName: 'Sale-1',
      nickName: '李华',
      roleName: '销售',
      desc: '销售部员工',
      createTime: '2023-04-24 16:25',
    },
    {
      id: 2,
      userName: 'Sale-2',
      nickName: '王莽',
      roleName: '财务',
      desc: '财务部员工',
      createTime: '2023-04-24 16:25',
    },
  ]);

  const setQuery = () => {
    query.value = (page, size) => {
      const params = {
        pageIndex: page,
        pageSize: size,
      };
      return Promise.resolve({
        data: data.value,
        total: 100,
      });
    };
  };
  onMounted(() => {
    setQuery();
  });
  const goDetail = (row) => {
    console.log(row);
    router.push('/access/user/detail');
  };
  const handleClickDel = (row) => {
    Modal.info({
      title: '是否注销用户？',
      content: '',
      okText: '确认',
      cancelText: '取消',
      maskClosable: false,
      hideCancel: false,
      modalClass: 'modal-my-style',
      onOk: () => {
        console.log('kaka=点了ok=', row);
        deletItem(row);
      },
    });
  };
  const deletItem = (row) => {
    const indexToDelete = data.value.findIndex((obj) => obj.id === row.id);
    if (indexToDelete !== -1) {
      data.value.splice(indexToDelete, 1);
    }
  };

  const handleAdd = () => {
    router.push('/access/user/add');
  };
</script>
<style lang="less" scoped>
  .table-container {
    margin-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
  }
  .m-l-20 {
    margin-left: 20px;
  }
  .valuation-container {
    padding-left: 0;
    padding-top: 0;
  }
  .red-btn {
    color: #f5603f;
  }
</style>

<style>
  .modal-my-style {
    border-radius: 8px !important;
  }
</style>
