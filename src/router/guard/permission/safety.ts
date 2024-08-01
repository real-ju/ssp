import type { Router, RouteLocationNormalized } from 'vue-router';

import { useUserStore } from '/@/store/modules/user';
import { usePermissionStoreWithOut } from '/@/store/modules/permission';
import { BasicPageEnum, ExceptionPageEnum } from '/@/enums/pageEnum';
import { getPermissionData } from '/@/api/auth';
import { getMenuFirstLeafNode } from '/@/logics/helper/layout';
import { useLayoutStore } from '/@/store/modules/layout';

const permissionStore = usePermissionStoreWithOut();

function checkRoutePermission(to: RouteLocationNormalized) {
  return permissionStore.routePermissions.indexOf(String(to.name)) !== -1;
}

const routeWhiteList: string[] = [
  ExceptionPageEnum.EXCEPTION_403,
  ExceptionPageEnum.EXCEPTION_404,
  BasicPageEnum.REFRESH
];

export function createSafetyPermissionGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    const isMatched = to.matched.length !== 0;
    if (!isMatched) {
      next(ExceptionPageEnum.EXCEPTION_404);
      return;
    }

    if (routeWhiteList.indexOf(to.path) !== -1) {
      next();
      return;
    }

    const userStore = useUserStore();
    // const isLogin = userStore.isLogin;
    const isLogin = true;
    if (isLogin) {
      if (!permissionStore.hasFetchedPermissionData) {
        permissionStore.routePermissions = ['xxx'];
        permissionStore.hasFetchedPermissionData = true;

        next(to);
        // getPermissionData()
        //   .then((res) => {
        //     permissionStore.routePermissions = ['xxx'];
        //     permissionStore.hasFetchedPermissionData = true;

        //     next(to);
        //   })
        //   .catch(() => {
        //     const error = new Error('获取权限失败');
        //     next(error);
        //   });
      } else {
        if (to.path === '/') {
          const layoutStore = useLayoutStore();
          const menuNode = getMenuFirstLeafNode(layoutStore.menuTree);
          if (menuNode) {
            next({
              name: menuNode.key
            });
          } else {
            next(ExceptionPageEnum.EXCEPTION_404);
          }
        } else if (to.path === BasicPageEnum.LOGIN) {
          next('/');
        } else {
          // if (!checkRoutePermission(to)) {
          if (false) {
            const error = new Error('没有访问权限');
            next(error);
          } else {
            next();
          }
        }
      }
    } else {
      if (!to.meta.public) {
        next({
          path: BasicPageEnum.LOGIN,
          query: {
            back_url: encodeURIComponent(to.fullPath)
          }
        });
      } else {
        next();
      }
    }
  });

  router.onError((error) => {
    router.push(ExceptionPageEnum.EXCEPTION_403);
  });
}
