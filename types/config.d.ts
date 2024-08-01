import type { MenuTree } from '/#/store';

import { RoutePermissionModeEnum } from '/@/enums/appEnum';
import { MenuModeEnum } from '/@/enums/layoutEnum';

export interface ProjectSetting {
  routePermissionMode: RoutePermissionModeEnum;
  showPageTitleSuffix: boolean;
  iconfontUrl: string;
}

export interface LayoutSetting {
  menuMode: MenuModeEnum;
  menuTree: MenuTree;
  hiddenMixTopMenuKeys: string[];
  flatDirKeys: string[];
}
