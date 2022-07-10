import type { App } from 'vue';
import Select from './src/select';

Select.install = function (app: App) {
  app.component(Select.name, Select);
};

export { Select };
