<template>
  <a-modal
    v-model:visible="visible"
    title-align="center"
    :closable="false"
    modal-class="header-white-bg"
    :mask-closable="false"
    @cancel="handleCancel"
  >
    <template #title>
      <div class="header-title"> {{ upLoadTitle }} </div>
    </template>
    <a-upload
      v-if="uploadStatus == 1"
      ref="uploadRef"
      draggable
      action="/"
      class="upload-file-excel"
      :auto-upload="true"
      :show-file-list="false"
      :limit="1"
      tip="文件大小不超过2MB"
      accept=".xlsx,.csv,.xls"
      :disabled="uploadStatus != 1"
      :custom-request="customRequest"
      @before-upload="beforeUpload"
    />

    <div
      v-else-if="uploadStatus == 2"
      id="uploading"
      style="margin-top: 20px; text-align: center"
    >
      <a-spin />
      <div class="header-title" style="color: #066e48">上传中...</div>
    </div>

    <div v-else id="upload" style="text-align: center">
      <div class="header-title" style="color: #414650">{{ fileAllName }}</div>
      <div class="header-title" style="color: #89919a">{{ fileAllSize }}</div>
    </div>

    <template #footer>
      <a-space>
        <a-button @click="handleCancel">取消</a-button>
        <a-button type="outline" style="background: #f2fffa" @click="onDownload"
          >下载模版</a-button
        >
        <a-button type="primary" @click="upLoadBtn">{{
          upLoadBtnTxt
        }}</a-button>
      </a-space>
    </template>
  </a-modal>
</template>

<script lang="ts" setup>
  import { nextTick, ref, watch, h, computed } from 'vue';
  import { Modal } from '@arco-design/web-vue';
  import { debounce } from 'lodash';

  const fileClass = ['.xlsx', '.csv', '.xls'];

  const upLoadTitle = ref('拖拽文件到这里');
  const upLoadBtnTxt = ref('上传Excel');

  const fileAllName = ref('');
  const fileAllSize = ref('');

  // 1 ：初始化；2,上传中，3：上传完成。
  const uploadStatus = ref(1);

  // 手动上传
  const uploadRef = ref();

  const uploadList = ref([]);

  const visible = ref(false);
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false,
    },
  });

  const emits = defineEmits(['update:modelValue', 'submit']);

  watch(
    () => props.modelValue,
    (val) => {
      visible.value = val;
    }
  );
  watch(
    () => visible.value,
    (val) => {
      if (val) {
        showStyle();
      }
      emits('update:modelValue', val);
    }
  );
  watch(
    () => uploadStatus.value,
    (val) => {
      if (val === 1 || val === 2) {
        upLoadTitle.value = '拖拽文件到这里';
        upLoadBtnTxt.value = '上传Excel';
      } else {
        upLoadTitle.value = '上传完成';
        upLoadBtnTxt.value = '确定导入';
      }
    }
  );

  const handleCancel = () => {
    visible.value = false;
    uploadStatus.value = 1;
  };

  const showStyle = () => {
    nextTick(() => {
      console.log(uploadRef.value.$el, 'uploadRef');
      const $p = uploadRef.value.$el;
      const $t = $p.querySelector('.arco-upload-drag-text');
      $t.innerHTML = '请上传数据文件 xlsx/csv/xls文件';
    });
  };

  const onDownload = () => {
    // getDownLoad().then((res: any) => {
    //   const blob = new Blob([res]);
    //   const link: HTMLAnchorElement = document.createElement('a');
    //   // link.style.display = 'none';
    //   const href = window.URL.createObjectURL(blob);
    //   link.href = href;
    //   link.download = '投资组合信息模版.xlsx';
    //   document.body.appendChild(link);
    //   link.click();
    //   window.URL.revokeObjectURL(href);
    //   document.body.removeChild(link);
    // });
  };

const uploadFile = (val) => Promise.resolve({
  code: 0,
  data: []
})
  // 自定义上传
  const customRequest: any = async (option: any) => {
    uploadFile(option.fileItem.file)
      .then((res: any) => {
        if (res.code === 0) {
          uploadStatus.value = 3;
          uploadList.value = res.data;
        } else {
          uploadStatus.value = 1;
          Modal.error({
            title: '上传失败！',
            content: '',
            okText: '确定',
          });
        }
      })
      .catch((error) => {
        console.log(error, 'customRequest=catch=error:');
        uploadStatus.value = 1;
      });
  };

  const beforeUpload = (file: File): any => {
    const maxFileSize = 2 * 1024 * 1024;

    return new Promise((resolve, reject) => {
      const fileName = file.name;
      const nameEnd = fileName.substring(fileName.lastIndexOf('.'));
      if (fileClass.includes(nameEnd) && file.size <= maxFileSize) {
        fileAllName.value = file.name;
        if (file.size >= 1024 * 1024) {
          fileAllSize.value = `${parseFloat(
            String(file.size / 1024 / 1024)
          ).toFixed(2)}MB`;
        } else {
          fileAllSize.value = `${parseFloat(String(file.size / 1024)).toFixed(
            2
          )}KB`;
        }
        uploadStatus.value = 2;
        resolve(true);
      } else {
        reject(new Error('文件格式或大小错误'));
      }
    });
  };
  const MAX_TABLE_SIZE = 50;
  // 上传按钮的点击，
  const upLoadBtn = () => {
    if (uploadStatus.value === 3) {
      // 确定导入就是  抛出数据
      const count =  uploadList.value.length;
      const hContent = () => {
        return h(
          'div',
          { style: 'color: #F5603F; text-align: center;' },
          `最多可输入${MAX_TABLE_SIZE}条数据`
        );
      };

      if (count > MAX_TABLE_SIZE) {
        Modal.info({
          title: `已为您插入 ${MAX_TABLE_SIZE }条新的数据`,
          content: () => hContent(),
          okText: '知道了',
          onOk: debounce(() => {
            uploadStatus.value = 1;
            visible.value = false;
            const sliceList: any = uploadList.value.slice(
              0,
            );
          }, 50),
        });
      } else {
        Modal.info({
          title: `已为您插入 ${uploadList.value.length}条新的数据`,
          content: '',
          okText: '知道了',
          onOk: debounce(() => {
            uploadStatus.value = 1;
            visible.value = false;
            emits('submit', uploadList.value);
          }, 50),
        });
      }
    } else {
      // 没有上传 调用 上传组件的 点击事件
      uploadRef.value.$el.click();
    }
  };
</script>

<style lang="less" scoped>
  .header-title {
    color: #161616;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    user-select: none;
  }

  .content-error {
    color: #f5603f;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    user-select: none;
  }

  .upload {
    background-color: #f7f8fa;
    border-radius: 4px;
    border: 1px dashed #f8f8f8;
    width: 100%;
    height: auto;
    padding: 12px;
    text-align: center;
  }
  .img-style {
    width: 16px;
    height: 16px;
    padding: 2px;
  }
  .upload-file-excel {
    :deep(.arco-upload-drag .arco-icon-plus) {
      color: #000;
      font-size: 16px;
      font-weight: 600;
    }

    :deep(.arco-upload-drag) {
      padding: 20px;
      border: none;
      border-radius: 4px;
    }
    :deep(.arco-upload-drag .arco-icon-plus) {
      margin-bottom: 4px;
    }
    :deep(.arco-upload-tip) {
      font-size: 14px;
      color: #89919a;
    }
  }
</style>

