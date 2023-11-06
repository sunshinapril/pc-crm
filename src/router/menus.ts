export default [
  {
    path: '/user',
    name: 'UserManagement',
    component: 'Layout',
    meta: {
      title: '客户管理',
      icon: 'icon-1',
      hidden: false,
      isPerm: 'UserManagement',
    },
    children: [
      {
        path: '/user/index',
        name: 'userManagementIndex',
        component: '/userManage/index',
        meta: {
          title: '客户管理',
          icon: 'icon-1',
          hidden: false,
          isPerm: 'UserManagement',
        },
      },
      {
        path: '/user/detail',
        name: 'userManagementDetail',
        component: '/userManage/detail',
        meta: {
          title: '客户管理详情',
          icon: 'icon-1',
          hidden: true,
          isPerm: 'UserManagement',
        },
      },
    ],
  },
  {
    path: '/application',
    name: 'ApplicationManagement',
    component: 'Layout',
    meta: {
      title: '申请管理',
      icon: 'icon-2',
      hidden: false,
      isPerm: 'ApplicationManagement',
    },
    children: [
      {
        path: '/application/index',
        name: 'ApplicationManagementIndex',
        component: '/applicationManage/index',
        meta: {
          title: '申请管理',
          icon: 'icon-2',
          hidden: false,
          isPerm: 'ApplicationManagement',
        },
      },
      {
        path: '/application/detail',
        name: 'applicationManagementDetail',
        component: '/applicationManage/detail',
        meta: {
          title: '申请管理详情',
          icon: 'icon-2',
          hidden: true,
          isPerm: 'ApplicationManagement',
        },
      },
    ],
  },
  {
    path: '/order',
    name: 'OrderManagement',
    component: 'Layout',
    meta: {
      title: '订单管理',
      icon: 'icon-3',
      hidden: false,
      isPerm: 'OrderManagement',
    },
    children: [
      {
        path: '/order/index',
        name: 'OrderManagementIndex',
        component: '/orderManage/index',
        meta: {
          title: '订单管理',
          icon: 'icon-3',
          hidden: false,
          isPerm: 'OrderManagement',
        },
      },
      {
        path: "/order/detail",
        name: "OrderManagementDetail",
        component: "/orderManage/detail",
        meta: {
          title: "订单管理详情",
          icon: "icon-3",
          hidden: true,
          isPerm: "OrderManagement"
        },
      }
    ]
  },
  {
    path: '/auth',
    name: 'AuthManagement',
    component: 'Layout',
    meta: {
      title: '授权管理',
      icon: 'icon-4',
      hidden: false,
      isPerm: 'AuthManagement',
    },
    children: [
      {
        path: '/auth/application/index',
        name: 'AuthManagementApplication',
        component: '/authManage/application/index',
        meta: {
          title: '授权申请',
          hidden: false,
          isPerm: 'AuthManagement',
        },
      },
      {
        path: '/auth/application/detail',
        name: 'AuthManagementApplicationDetail',
        component: '/authManage/application/detail',
        meta: {
          title: '授权申请详情',
          hidden: true,
          isPerm: 'AuthManagement',
        },
      },
      {
        path: '/auth/forbidden/index',
        name: 'AuthManagementForbidden',
        component: '/authManage/forbidden/index',
        meta: {
          title: '禁用公司',
          hidden: false,
          isPerm: 'AuthManagement',
        },
      },
    ],
  },
  {
    path: '/billing',
    name: 'BillingManagement',
    component: 'Layout',
    meta: {
      title: '账单中心',
      icon: 'icon-5',
      hidden: false,
      isPerm: 'BillingManagement',
    },
    children: [
      {
        path: '/billing/tenant/index',
        name: 'BillingManagementTenant',
        component: '/billingManage/tenant/index',
        meta: {
          title: '租户方对账单',
          hidden: false,
          isPerm: 'BillingManagement',
        },
      },
      {
        path: '/billing/upstream/index',
        name: 'BillingManagementTenantUpstream',
        component: '/billingManage/upstream/index',
        meta: {
          title: '上游方对账单',
          hidden: false,
          isPerm: 'BillingManagement',
        },
      },
    ],
  },
  {
    path: '/access',
    name: 'AccessManagement',
    component: 'Layout',
    meta: {
      title: '权限管理',
      icon: 'icon-6',
      hidden: false,
      isPerm: 'AccessManagement',
    },
    children: [
      {
        path: '/access/role/index',
        name: 'AccessManagementRole',
        component: '/accessManage/role/index',
        meta: {
          title: '角色',
          hidden: false,
          isPerm: 'AccessManagement',
        },
      },
      {
        path: '/access/role/detail',
        name: 'AccessManagementRoleDetail',
        component: '/accessManage/role/detail',
        meta: {
          title: '角色详情',
          hidden: true,
          isPerm: 'AccessManagement',
        },
      },
      {
        path: '/access/role/add',
        name: 'AccessManagementRoleAdd',
        component: '/accessManage/role/add',
        meta: {
          title: '新建角色',
          hidden: true,
          isPerm: 'AccessManagement',
        },
      },
      {
        path: '/access/user/index',
        name: 'AccessManagementUser',
        component: '/accessManage/user/index',
        meta: {
          title: '用户',
          hidden: false,
          isPerm: 'AccessManagement',
        },
      },
      {
        path: '/access/user/detail',
        name: 'AccessManagementUserDetail',
        component: '/accessManage/user/detail',
        meta: {
          title: '用户详情',
          hidden: true,
          isPerm: 'AccessManagement',
        },
      },
      {
        path: '/access/user/add',
        name: 'AccessManagementUserAdd',
        component: '/accessManage/user/add',
        meta: {
          title: '新建用户',
          hidden: true,
          isPerm: 'AccessManagement',
        },
      },
    ],
  },
  {
    path: '/valuation',
    name: 'ValuationManagement',
    component: 'Layout',
    meta: {
      title: '估值API',
      icon: 'icon-7',
      hidden: false,
      isPerm: 'ValuationManagement',
    },
    children: [
      {
        path: '/valuation/index',
        name: 'ValuationManagementIndex',
        component: '/valuationManage/index',
        meta: {
          title: '估值API',
          icon: 'icon-7',
          hidden: false,
          isPerm: 'ValuationManagement',
        },
      },
      {
        path: '/valuation/detail',
        name: 'valuationDetail',
        component: '/valuationManage/detail',
        meta: {
          title: '估值申请详情',
          icon: 'icon-1',
          hidden: true,
          isPerm: 'ValuationManagement',
        },
      },
    ],
  },
  {
    path: '/options',
    name: 'OptionsManagement',
    component: 'Layout',
    meta: {
      title: '配置选项',
      icon: 'icon-9',
      hidden: false,
      isPerm: 'OptionsManagement',
    },
    children: [
      {
        path: '/options/auth/index',
        name: 'OptionsManagementAuth',
        component: '/options/auth/index',
        meta: {
          title: '授权配置',
          hidden: false,
          isPerm: 'OptionsManagement',
        },
      },
      {
        path: '/options/api/index',
        name: 'OptionsManagementApi',
        component: '/options/api/index',
        meta: {
          title: '接口配置',
          hidden: false,
          isPerm: 'OptionsManagement',
        },
      },
    ],
  },
  {
    path: '/log',
    name: 'LogManagement',
    component: 'Layout',
    meta: {
      title: '操作记录',
      icon: 'icon-8',
      hidden: false,
      isPerm: 'LogManagement',
    },
    children: [
      {
        path: '/log/index',
        name: 'LogManagementIndex',
        component: '/logManage/index',
        meta: {
          title: '操作记录',
          icon: 'icon-8',
          hidden: false,
          isPerm: 'LogManagement',
        },
      },
    ],
  },
];
