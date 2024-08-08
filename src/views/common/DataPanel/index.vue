<template>
  <div class="data-panel">
    <a-tabs :activeKey="dataLevel" @update:activeKey="onUpdateActiveKey">
      <a-tab-pane key="my">
        <template #tab>
          <span>我管理的（{{ dataCount.my }}）</span>
        </template>
      </a-tab-pane>
      <a-tab-pane key="all">
        <template #tab>
          <span>全部（{{ dataCount.all }}）</span>
        </template>
      </a-tab-pane>
    </a-tabs>
    <a-row class="panel-content">
      <a-col class="main-data-section data-section" :span="8" :xxl="3">
        <div class="icon-box">
          <Icon :name="mainData.icon?.name" :form="mainData.icon?.name"></Icon>
        </div>
        <div class="data-item">
          <div class="value">{{ mainData.value }}</div>
          <div class="title">{{ mainData.title }}</div>
        </div>
      </a-col>
      <a-col v-if="!hideStatusSection" class="status-data-section data-section" :span="16" :xxl="5">
        <div class="data-item" v-for="item in statusData" :key="item.title">
          <div class="value">{{ item.value }}</div>
          <div class="title" :class="item.type">
            <a-badge :status="item.type" />{{ item.title }}
          </div>
        </div>
      </a-col>
      <template v-if="!hideExtraSection">
        <ExtraDataBusinessSystem v-if="extraType === 'businessSystem'"></ExtraDataBusinessSystem>
        <ExtraDataCommon v-else :extraData="extraData"></ExtraDataCommon>
      </template>
    </a-row>
  </div>
</template>

<script setup lang="ts" name="VDataPanel">
import ExtraDataBusinessSystem from './ExtraDataBusinessSystem.vue';
import ExtraDataCommon from './ExtraDataCommon.vue';

interface StatusDataItem {
  title: string;
  value: number;
  type: 'success' | 'warning' | 'error' | 'default';
}

const props = defineProps({
  dataLevel: {
    type: String,
    default: 'my' // my：我管理的 all：全部
  },
  dataCount: {
    type: Object,
    default() {
      return {
        my: 0,
        all: 0
      };
    }
  },
  mainData: {
    type: Object,
    default() {
      return {
        title: '-',
        value: 0,
        icon: {
          name: '',
          form: ''
        }
      };
    }
  },
  statusData: {
    type: Object as PropType<StatusDataItem[]>,
    default() {
      return [];
    }
  },
  extraType: {
    type: String,
    default: 'common' // businessSystem：业务系统 common：通用
  },
  extraData: {
    type: Object,
    default() {
      return [];
    }
  },
  hideStatusSection: {
    type: Boolean,
    default: false
  },
  hideExtraSection: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:dataLevel']);

const onUpdateActiveKey = (value: string) => {
  emit('update:dataLevel', value);
};
</script>

<style lang="less" scoped>
.data-panel {
  width: 100%;
  :deep {
    .ant-tabs-nav {
      padding-left: 20px;
      margin: 0px;
    }
  }
  .panel-content {
    width: 100%;
    padding: 12px;
    .data-section {
      padding: 6px 12px;
      & + .data-section {
        border-left: 1px solid #cccccc;
      }
    }
    .main-data-section {
      display: flex;
      align-items: center;
      .icon-box {
        width: 40px;
        height: 40px;
        flex: none;
        background-color: #edebf8;
        border-radius: 3px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        color: @primary-color;
      }
      .data-item {
        width: 0px;
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 20px;
        .value {
          font-size: 20px;
          font-weight: bold;
        }
        .title {
          font-size: 14px;
          color: #aaaaaa;
        }
      }
    }
    .status-data-section {
      display: flex;
      align-items: center;
      .data-item {
        width: 0px;
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        .value {
          font-size: 20px;
          font-weight: bold;
        }
        .title {
          font-size: 13px;
          color: #aaaaaa;
          &.success {
            color: @success-color;
          }
          &.warning {
            color: @warning-color;
          }
          &.error {
            color: @error-color;
          }
          &.default {
            color: @disabled-color;
          }
        }
        :deep {
          .ant-badge-status-text {
            margin-left: 2px;
          }
        }
      }
    }
  }
}
</style>
