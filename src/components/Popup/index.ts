import { uuid } from '@/utils';
import { createApp } from 'vue';
import PopupConstructor from './index.vue';

let $inst;
// 创建挂载实例
const createMount = (opts) => {
  const mountNode = document.createElement('div');
  document.body.appendChild(mountNode);

  const app = createApp(PopupConstructor, {
    ...opts,
    modelValue: true,
    remove() {
      app.unmount(mountNode);
      document.body.removeChild(mountNode);
    },
  });
  return app.mount(mountNode);
};

function V3Popup(options = {}) {
  options.id = options.id || 'v3popup_' + uuid();
  $inst = createMount(options);

  return $inst;
}

V3Popup.install = (app) => {
  app.provide('v3popup', V3Popup);
};

export default V3Popup;
