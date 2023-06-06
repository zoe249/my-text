interface ItableConfig {
  label: string
  prop: string
  width?: string | number
  align?: string
  fixed?: string
}

const tableConfig: Array<ItableConfig> = [
  {
    label: '批次号',
    prop: 'batchNum'
  },
  {
    label: '生产批次',
    prop: 'productionLot'
  },
  {
    label: '库区名称',
    prop: 'storageAreaName'
  },
  {
    label: '门店名称',
    prop: 'organizationName'
  },
  {
    label: '商品名称',
    prop: 'productName'
  },
  {
    label: '商品追溯码',
    prop: 'tracingCode'
  },
  {
    label: '库存数量',
    prop: 'stockQuantity'
  },
  {
    label: '预出数量',
    prop: 'advanceQuantity'
  },
  {
    label: '出入库时间',
    prop: 'entryDate'
  },
  {
    label: '生产日期',
    prop: 'productionDate'
  },
  {
    label: '预警日期',
    prop: 'earlyWarnDate'
  },
  {
    label: '失效日期',
    prop: 'expiryDate'
  },
  {
    label: '可退货日期',
    prop: 'returnDate'
  },
  {
    label: '含税金额',
    prop: 'taxAmount'
  },
  {
    label: '未税金额',
    prop: 'unTaxedAmount'
  },
  {
    label: '税额',
    prop: 'amountOfTax'
  },
  {
    label: '创建日期',
    prop: 'creatTime'
  },
]
