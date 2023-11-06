import { createApp, reactive } from 'vue';
import LoadingConstructor from './index.vue';

const msg = reactive({
  show: false,
  title: '加载中...',
});

const $loading = createApp(LoadingConstructor, { msg }).mount(
  document.createElement('div')
);

const loading = {
  show(title: any = msg.title) {
    msg.show = true;
    msg.title = title;
    document.body.appendChild($loading.$el);
  },
  hide() {
    msg.show = false;
  },
};

export default loading;
