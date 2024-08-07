<template>
  <div class="table-query-form">
    <a-form
      :model="model"
      ref="formRef"
      :label-col="formLabelCol"
      :wrapper-col="formWrapperCol"
      labelWrap
    >
      <a-row :gutter="20">
        <FormItemCols :isCollapsed="isCollapsed" :maxColNum="maxColNum">
          <slot></slot>
        </FormItemCols>
        <a-col :span="12" :lg="8" :xl="6" :xxl="4">
          <a-button class="query-form-action-btn" type="primary" @click="search">查询</a-button>
          <a-button class="query-form-action-btn" @click="reset">重置</a-button>
          <a-button
            v-if="needCollapsed"
            class="query-form-action-btn"
            type="link"
            @click="switchCollapsed"
          >
            <template #icon>
              <Icon type="ant" :name="isCollapsed ? 'DownOutlined' : 'UpOutlined'" />
            </template>
          </a-button>
        </a-col>
      </a-row>
      <!-- <a-row v-if="needCollapsed && !isCollapsed">
        <a-col :lg="8" :xl="6">
          <a-button class="query-form-action-btn" type="primary" @click="search">查询</a-button>
          <a-button class="query-form-action-btn" @click="reset">重置</a-button>
          <a-button class="query-form-action-btn" type="link" @click="switchCollapsed">
            <template #icon>
              <Icon name="UpOutlined" />
            </template>
          </a-button>
        </a-col>
      </a-row> -->
    </a-form>
  </div>
</template>

<script setup lang="ts" name="TableQueryForm">
import type { PropType } from 'vue';
import type { FormInstance } from 'ant-design-vue';

import { useWindowSize } from '@vueuse/core';
import FormItemCols from './FormItemCols.vue';

const props = defineProps({
  model: {
    type: Object as PropType<Recordable>,
    default() {
      return {};
    }
  },
  labelFixWidth: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(['search', 'reset', 'collapse']);

const needCollapsed = ref(false);
const slots = useSlots();
let formItemNum = 0;
if (slots.default) {
  let defaultSlots = slots.default();
  defaultSlots = defaultSlots.filter((item) => {
    return (item.type as any).name === 'AFormItem';
  });
  formItemNum = defaultSlots.length;
}

const { width: windowWidth } = useWindowSize();
const maxColNum = ref(3);

const handleResize = (value: number) => {
  if (windowWidth.value < 992) {
    // span
    maxColNum.value = 1;
  } else if (windowWidth.value < 1200) {
    // lg
    maxColNum.value = 2;
  } else if (windowWidth.value < 1600) {
    // xl
    maxColNum.value = 3;
  } else {
    // xxl
    maxColNum.value = 5;
  }
  needCollapsed.value = formItemNum > maxColNum.value;
};

handleResize(windowWidth.value);

watch(windowWidth, handleResize);

const isCollapsed = ref(true);

const formRef = ref<FormInstance>();

const switchCollapsed = () => {
  isCollapsed.value = !isCollapsed.value;
  emit('collapse');
};

const search = () => {
  emit('search');
};

const reset = () => {
  formRef.value!.resetFields();
  emit('reset');
};

const formLabelCol = computed(() => {
  return props.labelFixWidth ? { span: 8 } : undefined;
});

const formWrapperCol = computed(() => {
  return props.labelFixWidth ? { span: 16 } : undefined;
});
</script>

<style lang="less" scoped>
.table-query-form {
  width: 100%;

  .query-form-action-btn + .query-form-action-btn {
    margin-left: 10px;
  }

  :deep {
    .ant-form-item {
      margin-bottom: 12px;
    }
    .ant-form-item-explain {
      min-height: 12px;
      font-size: 12px;
      line-height: 1;
    }
  }
}
</style>
