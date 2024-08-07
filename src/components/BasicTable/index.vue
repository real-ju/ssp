<template>
  <div class="basic-table">
    <div v-if="$slots.query" class="query-area">
      <slot name="query"></slot>
    </div>
    <div class="top-action-area" v-if="$slots.topAction">
      <slot name="topAction"></slot>
    </div>
    <div class="table-area inner-ant-table-striped" ref="tableAreaRef">
      <slot name="table" :tableHeight="tableHeight" :stripedRowClassName="tableStripedRowClassName">
      </slot>
    </div>
    <div class="bottom-action-area">
      <slot name="bottomAction">
        <div class="basic-table-pagination">
          <div class="tip">
            当前选择 <i>0</i> 项，共 <i>{{ paginationData.total }}</i> 项
          </div>
          <a-pagination
            size="small"
            :total="paginationData.total"
            v-model:current="paginationData.page"
            v-model:pageSize="paginationData.pageSize"
            :pageSizeOptions="paginationData.pageSizeOptions"
            show-size-changer
            show-quick-jumper
            @change="getTableData"
            @showSizeChange="getTableData"
          />
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts" name="BasicTable">
import { useWindowSize } from '@vueuse/core';

const props = defineProps({
  paginationData: {
    type: Object as PropType<Recordable>,
    default() {
      return {};
    }
  }
});

const emit = defineEmits(['getTableData']);

const { height: windowheight } = useWindowSize();

const tableAreaRef = ref();
const tableHeight = ref(0);

const updateTableHeight = () => {
  nextTick(() => {
    tableHeight.value = tableAreaRef.value.clientHeight - 54; // 减去表头高度
  });
};

onMounted(() => {
  updateTableHeight();
});

watch(windowheight, updateTableHeight);

const tableStripedRowClassName = (record: Recordable, index: number) =>
  index % 2 === 1 ? 'striped-row' : null;

const getTableData = () => {
  emit('getTableData');
};

defineExpose({ updateTableHeight });
</script>

<style lang="less" scoped>
.basic-table {
  height: 100%;
  display: flex;
  flex-direction: column;

  .query-area {
    width: 100%;
    flex: none;
  }

  .top-action-area {
    width: 100%;
    flex: none;
    margin-top: 16px;
    margin-bottom: 10px;
  }

  .table-area {
    width: 100%;
    height: 0px;
    flex: 1;
  }

  .bottom-action-area {
    width: 100%;
    flex: none;
    margin-top: 20px;
  }
}
</style>

<style lang="less">
.inner-ant-table-striped {
  .striped-row {
    td {
      background-color: #f6f6f6;
    }
  }
}
</style>
