<template>
  <div class="global-main-style valuation-container">
    <sub-title>角色列表</sub-title>
    <a-button type="primary" class="m-l-20" @click="handleAdd">新建角色</a-button>
    <div class="table-container">
      <t-table :columns="columns" :query="query">
        <template #operator="{ record }">
          <t-button @click="goDetail(record)">管理</t-button>
          <t-button @click="delRole(record)" class="red-btn">删除</t-button>
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
      title: '角色名',
      dataIndex: 'roleName',
    },
    {
      title: '描述',
      dataIndex: 'desc',
    },
    {
      title: '创建时间',
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
      roleName: '销售',
      desc: '销售XXXXXXXXXXXXXXXXXXXXXX',
      createTime: '2023-04-24 16:25',
    },
    {
      id: 2,
      roleName: '主管',
      desc: '主管XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
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
    router.push('/access/role/detail');
  };
  const delRole = (row) => {
    Modal.info({
      title: '是否删除角色？',
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
    const indexToDelete = data.value.findIndex((obj) => obj.id === row.id);
    if (indexToDelete !== -1) {
      data.value.splice(indexToDelete, 1);
    }
  };

  const handleAdd = () => {
    router.push('/access/role/add');
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
