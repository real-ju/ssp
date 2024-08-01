import type { RouteRecordRaw } from 'vue-router';

import { asyncLayoutImport, asyncViewImport } from '/@/router/helper/asyncComponentImport';

const admin: RouteRecordRaw = {
  path: '/',
  name: 'admin',
  meta: {
    title: 'Admin',
    public: false
  },
  component: asyncLayoutImport('admin/index.vue'),
  children: [
    {
      path: '/system',
      name: 'system',
      redirect: '/system/org',
      meta: {
        title: '系统管理'
      },
      children: [
        {
          path: '/system/org',
          name: 'system-org',
          meta: {
            title: '组织管理'
          },
          component: asyncViewImport('system/org/index.vue')
        },
        {
          path: '/system/role',
          name: 'system-role',
          meta: {
            title: '角色管理'
          },
          component: asyncViewImport('system/org/index.vue')
        }
      ]
    }
  ]
};

export default admin;
