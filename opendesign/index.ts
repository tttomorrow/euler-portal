import type { App } from 'vue';

import { Button } from './button';
import { Radio, RadioGroup } from './radio';
import { Select, Option } from './select';

import { Icon } from './icon';
import { Card } from './card';
import { Tag } from './tag';
import { Tabs, TabPane } from './tabs';
import { Input } from './input';
import { Tree } from './tree';
import { Pagination } from './pagination';
import { Table, TableColumn } from './table';
import { Timeline } from './timeline';
import { Search } from './search';
import { Drawer } from './drawer';
import { Collapse, CollapseItem } from './collapse';

const components = [
  Button,
  Radio,
  RadioGroup,
  Select,
  Option,
  Icon,
  Card,
  Pagination,
  Table,
  TableColumn,
  Tag,
  Timeline,
  Input,
  Tabs,
  TabPane,
  Tree,
  Search,
  Drawer,
  Collapse,
  CollapseItem,
];
export default {
  install(app: App): void {
    components.forEach((component) => {
      app.use(component as any);
    });
  },
};
