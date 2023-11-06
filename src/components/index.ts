import svgIcon from '@/components/SvgIcon/index.vue';
import TableEmpty from '@/components/TableEmpty/index.vue';
import TTable from '@/components/TTable/index.vue';
import TButton from '@/components/TButton/index.vue';
import DetailTitle from '@/components/DetailTitle/index.vue';
import SubTitle from '@/components/SubTitle/index.vue';
import TDivider from '@/components/TDivider/index.vue';
import 'virtual:svg-icons-register';
import type { App } from 'vue';
export function setupComponents(app: App<Element>) {
  app.component('svg-icon', svgIcon);
  app.component('table-empty', TableEmpty);
  app.component('t-table', TTable);
  app.component('t-button', TButton);
  app.component('detail-title', DetailTitle);
  app.component('sub-title', SubTitle);
  app.component('t-divider', TDivider);
}
