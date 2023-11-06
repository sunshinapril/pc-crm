<template>
  <div ref="elRef" class="t__popup__layer" :id="props.id" v-show="opened">
    <div class="t__popup_box" :style="props.style">
      <div class="t__popup_box__header">
        <div class="title" v-if="props.title">{{ props.title }}</div>
        <svg-icon v-if="!props.hideClose" class="close" name="close" @click="close"></svg-icon>
      </div>
      <div class="t__popup_box__content">
        <div class="content" v-html="props.content"></div>
      </div>
      <div class="t__popup_box__footer" v-if="props.btns && props.btns.length">
        <div class="dialog-footer">
          <div
            class="btn"
            v-for="(btn, index) in props.btns"
            :style="btn.style"
            :class="btn.className"
            v-html="btn.text"
            :key="btn"
            @click="btnClicked($event, index)"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref, defineExpose, watch, onMounted } from 'vue';
  import svgIcon from '@/components/SvgIcon/index.vue';
  interface Props {
    title?: string;
    id: string;
    modelValue: boolean;
    content?: string;
    width?: string;
    btns?: Array<any>;
    // eslint-disable-next-line @typescript-eslint/ban-types
    onSuccess?: Function;
    // eslint-disable-next-line @typescript-eslint/ban-types
    onEnd?: Function;
    hideClose?: boolean;
    style?: any;
    // eslint-disable-next-line @typescript-eslint/ban-types
    remove: Function;
  }
  const props = defineProps<Props>();
  const emits = defineEmits(['update:modelValue']);
  const opened = ref<boolean>(false);
  const onCancel = (e) => {
    console.log(e);
  };
  const onSave = (e) => {
    console.log(e, 'onSave');
  };
  const elRef = ref(null);
  const open = () => {
    if (opened.value) return;
    opened.value = true;
    typeof props.onSuccess === 'function' && props.onSuccess();
  };
  const close = () => {
    if (!opened.value) return;
    opened.value = false;
    typeof props.onEnd === 'function' && props.onEnd();
    emits('update:modelValue', false);
    props.remove();
  };

  watch(
    () => props.modelValue,
    (val) => {
      if (val) {
        open();
      } else {
        close();
      }
    },
  );

  onMounted(() => {
    if (props.modelValue) {
      open();
    }
  });
  // 按钮事件
  const btnClicked = (e, index) => {
    const btn = props.btns[index];
    if (!btn.disabled) {
      typeof btn.click === 'function' && btn.click(close, e);
    }
  };

  defineExpose({
    elRef,
    close,
    onCancel,
    onSave,
    btnClicked,
  });
</script>
<style lang="less" scoped>
  .t__popup__layer {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
    .t__popup_box {
      width: 312px;
      text-align: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #ffffff;
      border-radius: 8px;
      .t__popup_box__header {
        position: relative;
        padding-top: 36px;
        padding-bottom: 12px;
        text-align: center;
        .title {
          font-style: normal;
          font-weight: 600;
          font-size: 17px;
          line-height: 23px;
          color: #3d434d;
        }
        .close {
          width: 16px;
          height: 16px;
          position: absolute;
          top: 20px;
          right: 20px;
          cursor: pointer;
        }
      }
      .t__popup_box__content {
        padding: 0 35px 40px;
        font-size: 14px;
        line-height: 20px;
        color: #242a32;
      }
      .t__popup_box__footer {
        border-top: 1px solid #e7eaed;
        .dialog-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .btn {
            flex: 1;
            padding: 13px 0;
            color: #c4c9cd;
            font-size: 15px;
            line-height: 21px;
            cursor: pointer;
            text-align: center;
          }
          .active {
            border-left: 1px solid #e7eaed;
            color: #5439ff;
          }
        }
      }
    }
  }
</style>
