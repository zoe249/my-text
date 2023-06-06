interface ItableConfig {
  label: string
  prop: string
  width?: string | number
  align?: string
  fixed?: string
}

const tableConfig: Array<ItableConfig> = [
  {
    label: '单据来源',
    prop: 'docSource'
  },
  {
    label: '业务单据号',
    prop: 'billNum'
  },
  {
    label: '操作方向',
    prop: 'direction'
  },
  {
    label: '批次号',
    prop: 'batchNum'
  },
  {
    label: '生产批次',
    prop: 'productionLot'
  },
  {
    label: '门店名称',
    prop: 'organizationName'
  },
  {
    label: '库区名称',
    prop: 'storageAreaName'
  },
  {
    label: '商品名称',
    prop: 'productName'
  },
  {
    label: '生产日期',
    prop: 'productionDate'
  },
  {
    label: '本次操作数量',
    prop: 'operationNum'
  },
  {
    label: '本次含税进价',
    prop: 'taxPrice'
  },
  {
    label: '本次未税进价',
    prop: 'unTaxedPrice'
  },
  {
    label: '本次含税金额',
    prop: 'taxAmount'
  },
  {
    label: '本次未税金额',
    prop: 'unTaxedAmount'
  },
  {
    label: '本次税额',
    prop: 'amountOfTax'
  },
  {
    label: '税种',
    prop: 'taxes'
  },
  {
    label: '进税项',
    prop: 'inputTax'
  },
  {
    label: '销税额',
    prop: 'outputTax'
  },
  {
    label: '操作前库存数量',
    prop: 'preOperationNum'
  },
  {
    label: '操作后库存数量',
    prop: 'afterOperationNum'
  },
  {
    label: '操作前含税进价',
    prop: 'preOperationTaxPrice'
  },
  {
    label: '操作后含税进价',
    prop: 'afterOperationTaxPrice'
  },
  {
    label: '操作前未税进价',
    prop: 'preOperationUnTaxedPrice'
  },
  {
    label: '操作后未税进价',
    prop: 'afterOperationUnTaxedPrice'
  },
  {
    label: '操作前含税金额',
    prop: 'preOperationTaxAmount'
  },
  {
    label: '操作后含税金额',
    prop: 'afterOperationTaxAmount'
  },
  {
    label: '操作前未税金额',
    prop: 'preOperationUnTaxedAmount'
  },
  {
    label: '操作后未税金额',
    prop: 'afterOperationUnTaxedAmount'
  },
  {
    label: '操作前税额',
    prop: 'preOperationAmountOfTax'
  },
  {
    label: '操作后税额',
    prop: 'afterOperationAmountOfTax'
  },
  {
    label: '操作人',
    prop: 'createBy'
  },
  {
    label: '创建日期',
    prop: 'createTime'
  }
]

export { tableConfig }
