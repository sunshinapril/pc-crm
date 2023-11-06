import { createApp } from 'vue';
import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import type { Directive } from 'vue';
import App from './App.vue';
import router from './router';

import '@arco-design/web-vue/dist/arco.less';
import './styles/global.less';
import './styles/reset.less';
import { setupStore } from '@/store';
import { setupComponents } from '@/components';
import Popup from '@/components/Popup/index';

const app = createApp(App);
app.use(ArcoVue, {});
app.use(ArcoVueIcon);
// 自定义指令
import * as directives from './directives';
Object.keys(directives).forEach((key) => {
  app.directive(key, (directives as { [key: string]: Directive })[key]);
});

setupStore(app);
setupComponents(app);
app.use(Popup);
app.use(router);
app.mount('#app');
