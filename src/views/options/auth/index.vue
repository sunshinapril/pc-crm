<template>
  <div class="detail-body">
    <sub-title>配置选项</sub-title>

    <a-form :model="form" class="div-content" auto-label-width>
      <a-form-item field="name" label="授权申请有效期">
        <a-input
          v-model="form.day1"
          style="width: 120px"
          placeholder="请输入天数"
          :disabled="dataDisabled.day1"
        />
        <sapn style="margin-left: 16px">天</sapn>
      </a-form-item>

      <a-form-item field="idCode" label="线上申请自动过期时间">
        <a-input
          v-model="form.day2"
          style="width: 120px"
          placeholder="请输入天数"
          :disabled="dataDisabled.day2"
        />
        <sapn style="margin-left: 16px">天</sapn>
      </a-form-item>

      <a-form-item field="applyTime" label="单日请求短信上线">
        <a-input
          v-model="form.number"
          style="width: 120px"
          placeholder="请输入条数"
          :disabled="dataDisabled.number"
        />
        <sapn style="margin-left: 16px">天</sapn>
      </a-form-item>

      <a-form-item field="name" label="数据单次申请可用">
        <a-input
          v-model="form.day3"
          style="width: 120px"
          placeholder="请输入天数"
          :disabled="dataDisabled.day3"
        />
        <sapn style="margin-left: 16px">天</sapn>
      </a-form-item>

      <a-form-item field="name" label="被拒后再发起">
        <a-input
          v-model="form.day4"
          style="width: 120px"
          placeholder="请输入天数"
          :disabled="dataDisabled.day4"
        />
        <sapn style="margin-left: 16px">天</sapn>
      </a-form-item>

      <div class="btn-group" v-if="!updateStatus">
        <a-button class="mgR10" type="primary" @click="update">修改</a-button>
      </div>
      <div class="btn-group" v-if="updateStatus">
        <a-button class="mgR10" @click="cancle">取消</a-button>
        <a-button class="mgR10" type="primary" @click="submit">确定</a-button>
      </div>
    </a-form>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();

  const updateStatus = ref(false);
  const form = ref({
    day1: '365',
    day2: '7',
    number: '5',
    day3: '7',
    day4: '7',
  });
  const dataDisabled = ref({
    day1: true,
    day2: true,
    number: true,
    day3: true,
    day4: true,
  });

  onMounted(() => {
    const itemData = route.query.itemData;

    console.log('kakak=detail=onMounted', itemData);
  });

  const upateData = (val) => {
    updateStatus.value = val;
    dataDisabled.value.day1 = !val;
    dataDisabled.value.day2 = !val;
    dataDisabled.value.day3 = !val;
    dataDisabled.value.day4 = !val;
    dataDisabled.value.number = !val;
  };

  const update = () => {
    upateData(true);
  };
  const submit = () => {
    upateData(false);
  };
  const cancle = () => {
    upateData(false);
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
