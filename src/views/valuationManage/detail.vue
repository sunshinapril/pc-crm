<template>
  <detail-title>估值申请详情</detail-title>
  <div class="detail-body">
    <sub-title>估值详情</sub-title>

    <a-form :model="form" class="div-content" auto-label-width>
      <a-form-item field="name" label="公司名称">
        <span class="form-item-text">{{ data.companyName }}</span>
      </a-form-item>

      <a-form-item field="idCode" label="统一社会信用代码">
        <span class="form-item-text">{{ data.idCode }}</span>
      </a-form-item>

      <a-form-item field="applyTime" label="申请时间">
        <span class="form-item-text">{{ data.applyTime }}</span>
      </a-form-item>

      <a-form-item v-if="!data.valuationUrl" field="name" label="关联估值">
        <a-input
          v-model="form.valuationUrl"
          style="width: 180px"
          placeholder="请粘贴对应估值链接至此"
        />
      </a-form-item>

      <a-form-item v-if="data.valuationUrl" field="name" label="关联估值">
        <span class="form-item-text">{{ data.valuationName }}</span>
        <t-button @click="updateValuation" style="margin-left: 20px">修改</t-button>
        <template #extra>
          <span class="form-item-text">{{ data.valuationUrl }}</span>
        </template>
      </a-form-item>

      <div class="btn-group">
        <a-button class="mgR10">取消</a-button>
        <a-button class="mgR10" type="primary">保存</a-button>
        <a-button type="primary" status="danger">关闭</a-button>
      </div>
    </a-form>

    <a-modal
      :closable="false"
      :mask-closable="false"
      width="auto"
      v-model:visible="dialogVisible"
      modal-class="gloabal-modal-style-reset-none-line"
      title="修改关联估值"
      @cancel="handleCancel"
      @before-ok="handleBeforeOk"
    >
      <a-form :model="form" layout="inline">
        <a-form-item field="valuationUrl">
          <a-input
            v-model="form.valuationUrl"
            style="width: 366px"
            placeholder="请粘贴对应估值链接至此"
            allow-clear
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();

  const dialogVisible = ref(false);
  const form = ref({
    valuationName: '',
    valuationUrl: '',
  });

  const data = ref({
    companyName: '正泰安能浙江能源有限公司',
    idCode: '91330108328185838J',
    applyTime: '2023-04-24 16:53',
    valuationName: '正泰安能估值V1',
    valuationUrl: 'http://evaluation.oakdata.com.cn/dashboard/evaluation?id=5',
  });

  onMounted(() => {
    const itemData = route.query.itemData;

    console.log('kakak=detail=onMounted', itemData);
  });

  const updateValuation = () => {
    console.log('修改url');
    dialogVisible.value = true;
  };

  const handleBeforeOk = (done) => {
    console.log(form);
    window.setTimeout(() => {
      done();
    }, 3000);
  };
  const handleCancel = () => {
    dialogVisible.value = false;
  };
</script>

<style scoped lang="less">
  .detail-body {
    flex: 1;
    background: #fff;
  }
  .div-content {
    padding-left: 20px;
    display: flex;
  }
  .form-item-text {
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: #89919a;
  }

  .btn-group {
    margin-top: 20px;
  }

  :deep(.arco-form-item-layout-inline) {
    margin-right: 20px;
  }
</style>
