import type { MenuTree } from '/#/store';

export const menuTree: MenuTree = [
  {
    title: '系统管理',
    key: 'system',
    children: [
      {
        title: '组织管理',
        key: 'system-org'
      },
      {
        title: '角色管理',
        key: 'system-role'
      }
    ]
  }
];
