import type { App } from 'vue';

import { Button } from './button';
import { Radio, RadioGroup } from './radio';
import { Select } from './select';

import { Icon } from './icon';
import { Card } from './card';
import { Input } from './input';

const components = [Button, Radio, RadioGroup, Select, Icon, Card, Input];

export default {
  install(app: App): void {
    components.forEach((component) => {
      app.use(component as any);
    });
  },
};
