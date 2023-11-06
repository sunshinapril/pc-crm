<template>
  <detail-title>申请信息</detail-title>
  <div class="detail-body">
    <sub-title>用户信息</sub-title>
    <a-form class="padding-lr" :model="form" :auto-label-width="true">
      <a-form-item field="name" label="客户姓名">
        <a-input v-model="form.name" placeholder="请输入客户姓名" disabled style="width: 366px;" />
      </a-form-item>
      <a-form-item field="phone" label="手机号">
        <a-input v-model="form.phone" placeholder="请输入手机号" disabled style="width: 366px;" />
      </a-form-item>
      <a-form-item field="email" label="邮箱">
        <a-input v-model="form.email" placeholder="请输入邮箱" disabled style="width: 366px;" />
      </a-form-item>
      <a-form-item field="position" label="职位">
        <a-input v-model="form.position" placeholder="请输入职位" disabled style="width: 366px;" />
      </a-form-item>
      <a-form-item field="company" label="公司/机构">
        <a-input v-model="form.company" placeholder="请输入公司/机构" disabled style="width: 366px;" />
        <t-button class="mgL20" @click="checkCompany">校验公司/机构</t-button>
      </a-form-item>
      <t-divider />
    </a-form>
    <sub-title>影像资料</sub-title>
    <div class="padding-lr">
      <a-button type="outline" @click="previewCard">名片</a-button>
      <t-divider />
      <a-button class="mgR10" @click="close">关闭</a-button>
      <a-button class="mgR10" type="primary">同意</a-button>
      <a-button type="primary" status="danger" @click="reject">驳回</a-button>

    </div>
    <a-image-preview
      src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
      v-model:visible="previewVisible" />
  </div>
  <div class="loading-container" v-show="showMask"></div>
  <a-modal v-model:visible="showRelatedCompany" :simple="true" :mask-closable="false" :hide-cancel="true">
    <template #title>
      <div class="related-title">
        <icon-info-circle-fill />
        <span>校验不成功</span>
      </div>
    </template>
    <div class="related-body">
      <p>无法匹配“盛宝xxx公司”，找到相关公司，如下：</p>
      <a-table row-key="company" :columns="columns" :data="companeyList" :row-selection="rowSelection" :bordered="false"
        :pagination="false" :selected-keys="selectedKeys" @selection-change="onSelectChange"></a-table>
    </div>
  </a-modal>
</template>
<script setup lang="ts">
import { Modal, Message } from '@arco-design/web-vue';
import { ref, reactive } from 'vue';

const form = ref({
  name: '',
  phone: '',
  email: '',
  position: '',
  company: ''
})
const previewVisible = ref(false);
const close = () => {
  console.log('关闭');
}

const previewCard = () => {
  previewVisible.value = true;
}

const reject = () => {
  Modal.info({
    title: '是否确认驳回？',
    content: '',
    maskClosable: false,
    hideCancel: false,
    onOk: (e) => {
      console.log(e, 'e')
    }
  })
}

const showMask = ref(false);
const showRelatedCompany = ref(false);
const selectedKeys = ref([])
const rowSelection = {
  type: 'radio'
};
const companeyList = ref([
  {
    company: '盛宝xxx公司',
  },
  {
    company: '盛宝xxx有限公司',
  },
]);
const columns = reactive([
  {
    title: '相关公司',
    dataIndex: 'company',
  },
])

const checkCompany = () => {
  showMask.value = true;
  Message.loading({
    content: '校验中',
    duration: 10000,
  });
  setTimeout(() => {
    Message.clear();
    // Message.success({
    //   content: '校验成功',
    //   duration: 1000,
    //   onClose: () => {
    //     showMask.value = false;
    //   }
    // });
    // Message.error({
    //   content: '校验不成功，搜索无结果',
    //   duration: 1000,
    //   onClose: () => {
    //     showMask.value = false;
    //   }
    // });
    showRelatedCompany.value = true;
    showMask.value = false;
    selectedKeys.value = ['盛宝xxx公司'];
  }, 2000)
}

const onSelectChange = (val) => {
  selectedKeys.value = val;
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


.loading-container {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.5);
}

.related-title {
  color: #066E48;

  span {
    color: #161616;
    font-size: 14px;
    margin-left: 8px;
    font-weight: 400;
  }
}

.related-body {
  p {
    color: #161616;
    font-size: 14px;
    line-height: 22px;
    margin-bottom: 24px;
  }
}
</style>