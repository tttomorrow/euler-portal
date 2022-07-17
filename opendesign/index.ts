import type { App } from 'vue';

import { Button } from './button';
import { Radio, RadioGroup } from './radio';
import { Select } from './select';

import { Icon } from './icon';
import { Card } from './card';
import { Tag } from './tag';
import { Tabs, TabPane } from './tabs';
import { Input } from './input';
import { Pagination } from './pagination';
import { Table, TableColumn } from './table';

const components = [
  Button,
  Radio,
  RadioGroup,
  Select,
  Icon,
  Card,
  Input,
  Pagination,
  Table,
  TableColumn,
  Tag,
  Input,
  Tabs,
  TabPane,
];

export default {
  install(app: App): void {
    components.forEach((component) => {
      app.use(component as any);
    });
  },
};
