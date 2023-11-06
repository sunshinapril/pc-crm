// 申请管理-申请状态
export const applicationStatusConfig = {
  0: {
    label: '待审核',
    value: 0,
    color: '#2284F6',
  },
  1: {
    label: '审核通过',
    value: 1,
    color: '#066E48',
  },
  2: {
    label: '已驳回',
    value: 2,
    color: '#F5603F',
  },
}

// 订单类型
export const orderTypeConfig = {
  0: {
    label: '试用',
    value: 0,
  },
  1: {
    label: '正式',
    value: 1,
  },
}

// 非上市公司数据展示模式
export const displayModeConfig = {
  0: {
    label: '区间数据',
    value: 0,
  },
  1: {
    label: '脱敏数据（*精准结果，隐藏过程）',
    value: 1,
  },
}

// 授权申请-申请状态
export const authApplicationStatusConfig = {
  0: {
    label: '申请中',
    value: 0,
  },
  1: {
    label: '生效中',
    value: 1,
  },
  2: {
    label: '已拒绝',
    value: 2,
  },
}
