import { store } from '/@/store';
import { defineStore } from 'pinia';

import type { PermissionState } from '/#/store';

export const usePermissionStore = defineStore({
  id: 'permission',
  state: (): PermissionState => ({
    hasFetchedPermissionData: false,
    routePermissions: [],
    actionPermissions: []
  }),
  getters: {},
  actions: {
    // generatePermissions() {}
    clearPermissions() {
      this.routePermissions = [];
      this.actionPermissions = [];
      this.hasFetchedPermissionData = false;
    }
  }
});

// Need to be used outside the setup
export function usePermissionStoreWithOut() {
  return usePermissionStore(store);
}
