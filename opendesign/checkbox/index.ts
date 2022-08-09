import type { App } from 'vue';
import Checkbox from './src/checkbox';
// import RadioGroup from './src/radio-group';

Checkbox.install = function (app: App) {
  app.component(Checkbox.name, Checkbox);
};

// RadioGroup.install = function (app: App) {
//   app.component(RadioGroup.name, RadioGroup);
// };

export { Checkbox };
