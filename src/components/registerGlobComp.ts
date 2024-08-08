import type { App } from 'vue';

import {
  ConfigProvider,
  Button,
  Menu,
  Dropdown,
  Tabs,
  Form,
  Input,
  Spin,
  Result,
  Breadcrumb,
  Modal,
  Row,
  Col,
  Divider,
  Table,
  Pagination,
  Select,
  Checkbox,
  Badge
} from 'ant-design-vue/es';

import Icon from './Icon';

export function registerGlobComp(app: App) {
  // antd components register
  app.component(ConfigProvider.name!, ConfigProvider);
  app.component(Button.name!, Button);
  app.component(Menu.name!, Menu);
  app.component(Menu.Item.name!, Menu.Item);
  app.component(Menu.SubMenu.name!, Menu.SubMenu);
  app.component(Dropdown.name!, Dropdown);
  app.component(Tabs.name!, Tabs);
  app.component(Tabs.TabPane.name!, Tabs.TabPane);
  app.component(Form.name!, Form);
  app.component(Form.Item.name!, Form.Item);
  app.component(Input.name!, Input);
  app.component(Input.Password.name!, Input.Password);
  app.component(Spin.name!, Spin);
  app.component(Result.name!, Result);
  app.component(Breadcrumb.name!, Breadcrumb);
  app.component(Breadcrumb.Item.name!, Breadcrumb.Item);
  app.component(Modal.name!, Modal);
  app.component(Row.name!, Row);
  app.component(Col.name!, Col);
  app.component(Divider.name!, Divider);
  app.component(Table.name!, Table);
  app.component(Pagination.name!, Pagination);
  app.component(Select.name!, Select);
  app.component(Checkbox.name!, Checkbox);
  app.component(Badge.name!, Badge);

  // common components register
  app.component('Icon', Icon);
}
