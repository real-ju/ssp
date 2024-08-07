<template>
  <div class="system-org-page basic-page">
    <TBLayout>
      <template #top>
        <div class="basic-page-card">1</div>
      </template>
      <template #bottom>
        <div class="basic-page-card">
          <BasicTable
            ref="basicTableRef"
            :paginationData="paginationData"
            @getTableData="getTableData"
          >
            <template #query>
              <TableQueryForm
                :model="queryFormModel"
                :label-fix-width="false"
                @search="getTableData"
                @reset="getTableData"
                @collapse="onQueryFormCollapse"
              >
                <a-form-item name="name">
                  <a-input v-model:value="queryFormModel.name" placeholder="姓名/电话/邮箱" />
                </a-form-item>
                <a-form-item name="name">
                  <a-input v-model:value="queryFormModel.name" placeholder="姓名/电话/邮箱" />
                </a-form-item>
                <a-form-item name="name">
                  <a-input v-model:value="queryFormModel.name" placeholder="姓名/电话/邮箱" />
                </a-form-item>
              </TableQueryForm>
            </template>
            <template #topAction>
              <div class="basic-table-action">
                <a-button type="primary">新增</a-button>
                <a-divider type="vertical" />
                <a-button type="primary" ghost>导出</a-button>
              </div>
            </template>
            <template #table="{ tableHeight }">
              <a-table
                :columns="tableCols"
                :data-source="tableData"
                :pagination="false"
                rowKey="id"
                :loading="tableLoading"
                :scroll="{ y: tableHeight }"
                :row-selection="tableRowSelection"
              >
                <template #bodyCell="{ column, record, index }">
                  <template v-if="column.key === 'index'">
                    {{ index + 1 }}
                  </template>
                  <template v-else-if="column.key === 'name'">
                    {{ record.name }}
                  </template>
                  <template v-else-if="column.key === 'action'">
                    <TableOperateGroup>
                      <TableOperateButton>编辑</TableOperateButton>
                      <TableOperateButton>删除</TableOperateButton>
                    </TableOperateGroup>
                  </template>
                </template>
              </a-table>
            </template>
          </BasicTable>
        </div>
      </template>
    </TBLayout>
  </div>
</template>

<script setup lang="ts" name="VSystemOrg">
import TBLayout from '/@/views/common/TBLayout/index.vue';
import BasicTable from '/@/components/BasicTable/index.vue';
import TableQueryForm from '/@/components/TableQueryForm/index.vue';
import { TableOperateGroup, TableOperateButton } from '/@/components/TableOperateButton';
import { useBasicTable } from '/@/hooks/component/useBasicTable';

const { tableData, tableLoading, fetchTableData, paginationData, selectedRows, tableRowSelection } =
  useBasicTable({
    service: false,
    // 对返回数据进行处理
    handleTableData(res: any) {
      const list = res.data.list;
      return list.map((item: Recordable) => {
        return {
          id: item.id,
          name: item.customerName
        };
      });
    },
    pagination: {
      pageSize: 10
    }
  });

const basicTableRef = ref();
const onQueryFormCollapse = () => {
  basicTableRef.value.updateTableHeight();
};

const queryFormModel = reactive({
  name: ''
});

// 获取查询参数
const getQueryData = () => {
  const data: Recordable = {
    customerName: queryFormModel.name || undefined
  };
  return data;
};

// 获取列表数据
const getTableData = () => {
  fetchTableData(getQueryData());
};

const tableCols = [
  {
    title: '序号',
    key: 'index',
    width: 60,
    fixed: 'left'
  },
  {
    title: '客户名称',
    key: 'name'
  },
  {
    title: '操作',
    key: 'action',
    width: 200,
    fixed: 'right'
  }
];

tableData.value = [
  {
    id: 1,
    name: '周杰伦'
  },
  {
    id: 2,
    name: '周杰伦'
  },
  {
    id: 3,
    name: '周杰伦'
  },
  {
    id: 4,
    name: '周杰伦'
  },
  {
    id: 5,
    name: '周杰伦'
  },
  {
    id: 6,
    name: '周杰伦'
  },
  {
    id: 7,
    name: '周杰伦'
  },
  {
    id: 8,
    name: '周杰伦'
  },
  {
    id: 9,
    name: '周杰伦'
  },
  {
    id: 10,
    name: '周杰伦'
  }
];
</script>

<style lang="less" scoped></style>
