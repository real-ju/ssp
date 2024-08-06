<template>
  <UseFullscreen class="fullscreen-wrapper" v-slot="{ isFullscreen, toggle: toggleFullscreen }">
    <div
      class="container admin-layout"
      :class="{
        'mix-menu-mode': menuMode === MenuModeEnum.MIX,
        'side-menu-mode': menuMode === MenuModeEnum.SIDE
      }"
      ref="adminLayoutRef"
    >
      <aside
        class="admin-layout-aside"
        :class="{ collapsed: siderCollapsed }"
        v-show="menuMode !== MenuModeEnum.TOP && showSider"
      >
        <div class="logo-area" v-if="menuMode === MenuModeEnum.SIDE" @click="onLogoAreaClick">
          <img class="logo" src="/src/assets/images/layout/logo.png" alt="logo" />
          <div class="title-area" v-show="!siderCollapsed">
            <h1 class="title">{{ layoutTitle }}</h1>
            <h2 class="sub-title">{{ layoutSubTitle }}</h2>
          </div>
        </div>
        <nav class="side-menu-area">
          <div class="side-menu-scroll-area">
            <SiderMenu :collapsed="siderCollapsed" @switch-sider="switchSider" />
          </div>
          <div class="action-area" @click="switchCollapsed">
            <Icon type="ant" :name="siderCollapsed ? 'MenuUnfoldOutlined' : 'MenuFoldOutlined'" />
          </div>
        </nav>
      </aside>
      <main class="admin-layout-main">
        <header class="admin-layout-header">
          <div class="logo-area" v-show="menuMode !== MenuModeEnum.SIDE" @click="onLogoAreaClick">
            <img class="logo" src="/src/assets/images/layout/logo.png" alt="logo" />
            <h1 class="title">{{ layoutTitle }}</h1>
          </div>
          <nav class="top-menu-area" v-show="menuMode !== MenuModeEnum.SIDE">
            <TopMenu></TopMenu>
          </nav>
          <nav class="breadcrumb" v-show="menuMode === MenuModeEnum.SIDE">
            <a-breadcrumb separator=">">
              <a-breadcrumb-item v-for="item in menuNodePath" :key="item.key">
                {{ item.title }}
              </a-breadcrumb-item>
            </a-breadcrumb>
          </nav>
          <div class="global-action-area">
            <div class="action-item custom">
              <div class="toolbar">
                <div class="item" @click="toggleFullscreen">
                  <Icon :name="isFullscreen ? 'compress' : 'expand'" form="light"></Icon>
                </div>
                <a-dropdown :getPopupContainer="() => adminLayoutEl">
                  <div class="item">
                    <Icon name="arrow-right-arrow-left" form="light"></Icon>
                  </div>
                  <template #overlay>
                    <a-menu @click="onSwitchSystemClick">
                      <a-menu-item v-for="item in systemMenu" :key="item.key">
                        <template #icon>
                          <Icon :name="item.icon.name" :form="item.icon.form" />
                        </template>
                        <span>{{ item.title }}</span>
                      </a-menu-item>
                    </a-menu>
                  </template>
                </a-dropdown>
                <div class="item">
                  <Icon name="upload" form="light"></Icon>
                </div>
              </div>
            </div>
            <div class="action-item" style="padding: 0px">
              <a-dropdown :getPopupContainer="() => adminLayoutEl">
                <div class="user-action-box">
                  <img class="user-avatar" :src="avatarImg" alt="user-avatar" />
                  <div class="username">用户1</div>
                </div>
                <template #overlay>
                  <a-menu class="user-action-menu" @click="onUserActionMenuClick">
                    <a-menu-item v-for="item in userActionMenu" :key="item.key">
                      <template #icon>
                        <Icon :name="item.icon.name" :form="item.icon.form" />
                      </template>
                      <span>{{ item.title }}</span>
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </div>
          </div>
        </header>
        <section class="admin-layout-tabs">
          <div class="tabs-area">
            <a-tabs
              :active-key="tabsActiveKey"
              @change="onTabsChange"
              @edit="onTabsEdit"
              type="editable-card"
              hide-add
              tab-position="top"
              :tab-bar-gutter="0"
            >
              <a-tab-pane
                v-for="item in pageTabs"
                :key="item.route"
                :tab="item.title"
                :closable="pageTabs.length > 1"
              >
              </a-tab-pane>
              <template #rightExtra>
                <a-dropdown :getPopupContainer="() => adminLayoutEl">
                  <a-button>
                    <template #icon>
                      <Icon type="ant" name="DownOutlined" />
                    </template>
                  </a-button>
                  <template #overlay>
                    <a-menu @click="onTabsActionMenuClick">
                      <a-menu-item key="all">
                        <span>关闭全部选项卡</span>
                      </a-menu-item>
                      <a-menu-item key="other">
                        <span>关闭其他选项卡</span>
                      </a-menu-item>
                    </a-menu>
                  </template>
                </a-dropdown>
              </template>
            </a-tabs>
          </div>
        </section>
        <section class="admin-layout-content">
          <AliveRouterView></AliveRouterView>
        </section>
      </main>
    </div>
  </UseFullscreen>
</template>

<script setup lang="ts" name="LAdmin">
import SiderMenu from './menu/SiderMenu/index.vue';
import TopMenu from './menu/TopMenu/index.vue';
import { useLayoutStore } from '/@/store/modules/layout';
import { useUserStore } from '/@/store/modules/user';
import { MenuModeEnum } from '/@/enums/layoutEnum';
import { getEnv } from '/@/utils/env';
import { goMenuFirstLeafNode, generateMenuPath } from '/@/logics/helper/layout';
import AliveRouterView from '../aliveRouterView/index.vue';
import { Modal } from 'ant-design-vue/es';
import { BasicPageEnum } from '/@/enums/pageEnum';
import avatarImg from '/@/assets/images/layout/avatar.svg';
import { UseFullscreen } from '@vueuse/components';

const router = useRouter();

const siderCollapsed = ref(false);

const switchCollapsed = () => {
  siderCollapsed.value = !siderCollapsed.value;
};

const showSider = ref(true);

const switchSider = (show: boolean) => {
  showSider.value = show;
};

const layoutStore = useLayoutStore();

const { menuMode, pageTabs, menuTree, selectedMenuKey, adminLayoutEl } = storeToRefs(layoutStore);

const { VITE_APP_TITLE: layoutTitle, VITE_APP_TITLE_EN: layoutSubTitle } = getEnv();

const tabsActiveKey = computed(() =>
  layoutStore.currentPageTab ? layoutStore.currentPageTab.route : ''
);

const onTabsChange = (key: string) => {
  router.push(key);
};

const onTabsEdit = (key: string, action: string) => {
  if (action === 'remove') {
    layoutStore.closePageTab(key);
  }
};

const userActionMenu = ref<Recordable[]>([
  {
    title: '账户设置',
    key: 'account',
    icon: {
      name: 'user-gear',
      form: 'light'
    }
  },
  {
    title: '退出',
    key: 'logout',
    icon: {
      name: 'arrow-right-from-bracket',
      form: 'light'
    }
  }
]);
const onUserActionMenuClick = ({ item, key, keyPath }: any) => {
  if (key === 'logout') {
    handleLogout();
  }
};

const systemMenu = ref<Recordable[]>([
  {
    title: '工作台',
    key: 'dashboard',
    icon: {
      name: 'briefcase',
      form: 'light'
    }
  },
  {
    title: '资产子系统',
    key: 'assets',
    icon: {
      name: 'server',
      form: 'light'
    }
  },
  {
    title: '漏洞子系统',
    key: 'bug',
    icon: {
      name: 'bug',
      form: 'light'
    }
  },
  {
    title: '威胁子系统',
    key: 'threaten',
    icon: {
      name: 'radiation',
      form: 'light'
    }
  }
]);
const onSwitchSystemClick = ({ item, key, keyPath }: any) => {
  // if (key === 'xxx') {}
};

const userStore = useUserStore();

const handleLogout = () => {
  Modal.confirm({
    title: '提示',
    content: '您确定要注销吗？',
    onOk: () => {
      userStore.logout();
      router.push(BasicPageEnum.LOGIN);
    }
  });
};

const onTabsActionMenuClick = ({ item, key, keyPath }: any) => {
  if (key === 'all') {
    layoutStore.closeAllPageTabs();
  } else if (key === 'other') {
    layoutStore.closeOtherPageTabs();
  }
};

const onLogoAreaClick = () => {
  goMenuFirstLeafNode(menuTree.value);
};

const menuNodePath = computed(() => {
  const { menuNodePath } = generateMenuPath(menuTree.value, selectedMenuKey.value);
  return menuNodePath;
});

const adminLayoutRef = ref();
onMounted(() => {
  layoutStore.setAdminLayoutEl(adminLayoutRef.value);
});
</script>

<style lang="less" scoped>
@aside-width: 250px;
@aside-bg: #151529;

.fullscreen-wrapper {
  width: 100%;
  height: 100%;
}

.admin-layout {
  display: flex;
  background-color: #ffffff;

  .logo-area {
    width: 100%;
    height: 96px;
    flex: none;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    .logo {
      width: 28px;
      height: auto;
    }

    .title-area {
      margin-left: 12px;
      .title {
        font-size: 20px;
        color: #ffffff;
      }
      .sub-title {
        font-size: 10px;
        color: #ffffff;
      }
    }
  }

  &.side-menu-mode {
    .admin-layout-main {
      .admin-layout-header {
        justify-content: space-between;
      }
    }
  }

  &.mix-menu-mode {
    .admin-layout-aside {
      .side-menu-area {
        margin-top: 48px;
      }
    }

    .admin-layout-main {
      z-index: 3;
      padding-top: 48px;

      .admin-layout-header {
        position: fixed;
        top: 0px;
        left: 0px;
        background-color: #001529;

        .logo-area {
          .title {
            color: #eeeeee;
          }
        }

        .global-action-area {
          .action-item {
            color: #eeeeee;

            &:hover {
              background-color: #252a3d;
            }
          }
        }
      }
    }
  }

  .admin-layout-aside {
    width: @aside-width;
    height: 100%;
    flex: none;
    display: flex;
    flex-direction: column;
    background-color: @aside-bg;
    box-shadow: 2px 0px 8px rgba(29, 35, 41, 0.05);
    position: relative;
    z-index: 2;

    &.collapsed {
      width: 80px;

      .action-area {
        justify-content: center;
      }
    }

    .side-menu-area {
      width: 100%;
      height: 0px;
      flex: 1;
      display: flex;
      flex-direction: column;

      .side-menu-scroll-area {
        width: 100%;
        height: 0px;
        flex: 1;
        overflow-y: auto;
      }

      .action-area {
        width: 100%;
        height: 48px;
        flex: none;
        padding: 16px;
        display: flex;
        align-items: center;
        cursor: pointer;
        // border-top: 1px solid rgba(0, 0, 0, 0.06);
        font-size: 16px;
        color: #ffffff;
      }
    }
  }

  .admin-layout-main {
    width: 0px;
    flex: 1;
    height: 100%;
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;

    .admin-layout-header {
      width: 100%;
      height: 64px;
      flex: none;
      display: flex;
      box-shadow: 0px 1px 4px rgba(0, 21, 41, 0.12);
      padding-right: 16px;
      position: relative;
      z-index: 2;

      .logo-area {
        width: @aside-width;
        height: 100%;
      }

      .top-menu-area {
        width: 0px;
        flex: 1;
        height: 100%;
      }

      .breadcrumb {
        height: 100%;
        display: flex;
        align-items: center;
        margin-left: 16px;
      }

      .global-action-area {
        flex: none;
        height: 100%;
        display: flex;

        .action-item {
          height: 100%;
          padding: 0px 12px;
          display: flex;
          align-items: center;
          cursor: pointer;
          transition: all 0.3s;

          &:hover {
            background-color: #f3f6f9;
          }

          &.custom {
            padding: 0px;
            cursor: unset;
            &:hover {
              background-color: unset;
            }
          }

          & + .action-item {
            margin-left: 8px;
          }

          .toolbar {
            display: flex;
            align-items: center;
            .item {
              width: 40px;
              height: 40px;
              border-radius: 50%;
              cursor: pointer;
              display: flex;
              justify-content: center;
              align-items: center;
              transition: all 0.3s;
              font-size: 14px;
              color: #878a99;
              &:hover {
                background-color: #f3f6f9;
              }
            }
          }

          .user-action-box {
            height: 100%;
            padding: 0px 12px;
            display: flex;
            justify-content: center;
            align-items: center;

            .user-avatar {
              width: 32px;
              height: 32px;
              margin-right: 8px;
            }

            .username {
              color: #878a99;
            }
          }
        }
      }
    }

    .admin-layout-tabs {
      width: 100%;
      height: 32px;
      flex: none;
      display: flex;
      position: relative;
      z-index: 1;

      .tabs-area {
        width: 0px;
        flex: 1;
        height: 100%;

        :deep {
          .ant-tabs {
            height: 100%;

            .ant-tabs-nav,
            .ant-tabs-nav-wrap,
            .ant-tabs-nav-list {
              height: 100%;
            }

            .ant-tabs-nav {
              margin: 0px;

              &::before {
                border-bottom: none;
              }

              .ant-tabs-nav-operations {
                .ant-tabs-nav-more {
                  cursor: pointer;
                  padding: 0px 15px; // 与按钮一致
                  display: flex;
                  align-items: center;
                  background-color: #ffffff;
                  border-left: 1px solid #dddddd;
                  transition: all 0.3s;
                  font-size: 18px;

                  &:hover {
                    color: #40a9ff;
                  }
                }
              }

              .ant-tabs-extra-content {
                .ant-btn {
                  border: none;
                  border-left: 1px solid #dddddd;
                  border-radius: 0px;
                  width: 49px;

                  .anticon {
                    font-size: 14px;
                  }

                  &:focus {
                    color: unset;
                  }

                  &:hover {
                    color: @primary-color;
                  }
                }
              }
            }

            .ant-tabs-content-holder {
              display: none;
            }

            .ant-tabs-tab {
              height: 100%;
              padding: 0px 12px;
              border: none;
              background-color: #ffffff;
              color: unset;

              .ant-tabs-tab-btn {
                color: unset;
              }

              .ant-tabs-tab-remove {
                width: 15px;
                height: 15px;
                line-height: 15px;
                border-radius: 50%;

                &:hover {
                  background-color: darken(@page-bg-color, 10%);
                }

                &:focus {
                  color: rgba(0, 0, 0, 0.45);
                }
              }

              &:hover {
                background-color: darken(@page-bg-color, 5%);
              }
            }

            .ant-tabs-tab-active {
              background-color: @page-bg-color;
              color: @primary-color;

              &:hover {
                background-color: @page-bg-color;
              }
            }
          }
        }
      }
    }

    .admin-layout-content {
      width: 100%;
      height: 0px;
      flex: 1;
      overflow: auto;
      position: relative;
    }
  }
}

:global(.user-action-menu .ant-dropdown-menu-item) {
  min-width: 120px;
}
</style>
