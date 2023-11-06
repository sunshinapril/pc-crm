<template>
  <detail-title>授权申请详情</detail-title>
  <div class="detail-body">
    <sub-title>申请授权</sub-title>
    <a-form ref="formRef" class="padding-lr" :auto-label-width="true">
      <a-form-item field="targetCompanyName" label="公司名称" class="form-item">
        <div class="value">{{ form.targetCompanyName }}</div>
      </a-form-item>
      <a-form-item field="code" label="统一社会信用代码" class="form-item">
        <div class="value">{{ form.code }}</div>
      </a-form-item>
      <a-form-item field="authType" label="选择授权方式" class="form-item">
        <div class="value">{{ form.authType }}</div>
      </a-form-item>
      <a-form-item field="fileDetail" label="文件详情" class="form-item">
        <t-button>{{ form.fileDetail }}</t-button>
      </a-form-item>
      <a-form-item v-if="isReject" field="status" label="授权状态" class="form-item">
        <t-button style="color: #F5603F;">{{ authApplicationStatusConfig[form.status].label }}</t-button>
      </a-form-item>
      <a-form-item v-if="isReject" label="" class="form-item">
        <p class="value">{{ form.errorMsg }}</p>
      </a-form-item>
      <a-form-item field="applicationTime" label="申请时间" class="form-item">
        <div class="value">{{ form.applicationTime }}</div>
      </a-form-item>
      <a-form-item v-if="isReject" field="rejectTime" label="拒绝时间" class="form-item">
        <div class="value">{{ form.rejectTime }}</div>
      </a-form-item>
      <a-form-item label="数据隐私协议" class="form-item">
        <t-button>查看协议</t-button>
      </a-form-item>
    </a-form>

    <div class="padding-lr button-container">
      <template v-if="isReject">
        <a-button @click="close">关闭</a-button>
      </template>
      <template v-else>
        <a-button class="mgR10" type="primary" @click="confirm">确定</a-button>
        <a-button class="mgR10" type="primary" status="danger" @click="cancel">拒绝</a-button>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import { authApplicationStatusConfig } from '@/config/config';
import { Modal, Textarea } from '@arco-design/web-vue';
import { h, ref, computed } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute();

const form = ref({
  targetCompanyName: '正泰安能浙江能源有限公司',
  code: '91330108328185838J',
  authType: '上传授权协议',
  fileDetail: '文件名称.pdf',
  applicationTime: '20223-05-30 12:12:00',
  rejectTime: '20223-06-30 12:12:00',
  status: 2,
  errorMsg: '您上传的材料和目标公司不匹配，请修改尽调协议后再上传'
})

const isReject = computed(() => form.value.status === authApplicationStatusConfig[2].value)

const confirm = () => {
  console.log('确定');
}


const errorModel = ref('');
const isError = ref(false);
const ModalContent = {
  setup() {
    return () => h('div', { class: 'info-modal-content' }, [
      h(Textarea,
        {
          placeholder: '请输入拒绝理由',
          modelValue: errorModel.value,
          'onUpdate:modelValue': (val) => {
            errorModel.value = val;
          },
          autoSize: { minRows: 3, maxRows: 6 },
          error: isError.value,
          onChange: (val) => {
            isError.value = !val;
          }
        }
      ),
      h('div',
        {
          style: `font-size: 12px;color:rgb(var(--danger-6));display: ${isError.value ? 'block' : 'none'};`
        },
        '必填'
      )
    ])
  }
}

const cancel = () => {
  isError.value = false;
  errorModel.value = '';
  Modal.info({
    title: '请输入拒绝理由',
    content: () => h(ModalContent),
    maskClosable: false,
    hideCancel: false,
    onBeforeOk: () => {
      isError.value = !errorModel.value;
      return !!errorModel.value;
    },
    onOk: () => {
      console.log('确定');
    }
  })
}

const close = () =>{
  console.log('关闭');
  
}

</script>
<style lang="less" scoped>
.detail-body {
  flex: 1;
  background: #fff;
  padding-bottom: 20px;
  overflow: hidden;
  overflow-y: auto;
  .value {
    color:  #76808E;
  }
  .form-item {
    :deep(.arco-form-item-label) {
      color: #414650;
    }
  }
  
}

.padding-lr {
  padding: 0 20px;
}

.button-container {
  padding-top: 50px;
}
</style>