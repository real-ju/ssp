interface PaginationConfig {
  pageSize: number;
  pageSizeOptions?: string[];
}

interface HandleTableDataFunction {
  (res: any): Recordable[];
}

interface HandleDataTotalFunction {
  (res: any): number;
}

interface BasicTableConfig {
  service: false | Function; // /@/api导出的函数
  handleTableData?: HandleTableDataFunction;
  handleDataTotal?: HandleDataTotalFunction;
  pagination: false | PaginationConfig;
}

export const useBasicTable = (config: BasicTableConfig) => {
  if (!config.handleTableData) {
    config.handleTableData = (res: any) => {
      return res.data.list;
    };
  }

  if (!config.handleDataTotal) {
    config.handleDataTotal = (res: any) => {
      return res.data.paging.total;
    };
  }

  const tableData = ref<Recordable[]>([]);
  const tableLoading = ref(false);

  const paginationData = reactive({
    total: 0,
    page: 1,
    pageSize: 10,
    pageSizeOptions: ['10', '20', '30', '40']
  });

  if (config.pagination) {
    paginationData.pageSize = config.pagination.pageSize;
    if (config.pagination.pageSizeOptions) {
      paginationData.pageSizeOptions = config.pagination.pageSizeOptions;
    }
  }

  const fetchTableData = (queryData: Recordable = {}) => {
    if (config.service === false) {
      return;
    }

    tableLoading.value = true;
    let reqParams: Recordable = {
      ...queryData
    };
    if (config.pagination) {
      reqParams.current = paginationData.page;
      reqParams.pageSize = paginationData.pageSize;
    }
    return config
      .service(reqParams)
      .then((res: any) => {
        tableData.value = config.handleTableData!(res);
        if (config.pagination) {
          paginationData.total = config.handleDataTotal!(res);
        }
      })
      .finally(() => {
        tableLoading.value = false;
      });
  };

  const selectedRows = ref<Recordable[]>();

  const tableRowSelection = {
    selectedRowKeys: computed(() => {
      return selectedRows.value?.map((item) => item.id);
    }),
    onChange: (selectedRowKeys: string[], _selectedRows: Recordable[]) => {
      selectedRows.value = _selectedRows;
    }
  };

  return {
    tableData,
    tableLoading,
    fetchTableData,
    paginationData,
    selectedRows,
    tableRowSelection
  };
};
