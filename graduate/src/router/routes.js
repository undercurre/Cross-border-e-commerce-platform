import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: '/',
    redirect: { name: 'index' },
    component: layoutHeaderAside,
    children: [
      // 首页
      {
        path: 'index',
        name: 'index',
        meta: {
          auth: true
        },
        component: _import('system/index')
      },
      // 演示页面
      {
        path: 'OrderManager/main',
        name: 'orderMain',
        meta: {
          title: '订单管理主页',
          auth: true
        },
        component: _import('OrderManager/main/index')
      },
      {
        path: 'OrderManager/map',
        name: 'orderMap',
        meta: {
          title: '全球视图',
          auth: true
        },
        component: _import('OrderManager/main/map')
      },
      {
        path: 'CustomerManager/main',
        name: 'customerMain',
        meta: {
          title: '客户管理主页',
          auth: true
        },
        component: _import('CustomerManager/main/index')
      },
      {
        path: 'CustomerManager/map',
        name: 'customerMap',
        meta: {
          title: '全球视图',
          auth: true
        },
        component: _import('CustomerManager/main/map')
      },
      {
        path: 'GoodsManager/main',
        name: 'goodsMain',
        meta: {
          title: '货物管理主页',
          auth: true
        },
        component: _import('GoodsManager/main/index')
      },
      {
        path: 'GoodsManager/map',
        name: 'goodsMap',
        meta: {
          title: '全球视图',
          auth: true
        },
        component: _import('GoodsManager/main/map')
      },
      {
        path: 'FactoryManager/main',
        name: 'factoryMain',
        meta: {
          title: '工厂管理主页',
          auth: true
        },
        component: _import('FactoryManager/main/index')
      },
      {
        path: 'FactoryManager/map',
        name: 'factoryMap',
        meta: {
          title: '全球视图',
          auth: true
        },
        component: _import('FactoryManager/main/map')
      },
      {
        path: 'MessageManager/main',
        name: 'messageMain',
        meta: {
          title: '公告管理主页',
          auth: true
        },
        component: _import('MessageManager/main/index')
      },
      {
        path: 'Rate/main',
        name: 'rateMain',
        meta: {
          title: '汇率主页',
          auth: true
        },
        component: _import('Rate/main/index')
      },
      {
        path: 'StoreManager/main',
        name: 'storeMain',
        meta: {
          title: '仓库管理主页',
          auth: true
        },
        component: _import('StoreManager/main/index')
      },
      {
        path: 'StoreManager/map',
        name: 'storeMap',
        meta: {
          title: '全球视图',
          auth: true
        },
        component: _import('StoreManager/main/map')
      },
      {
        path: 'SupportManager/main',
        name: 'supportMain',
        meta: {
          title: '供应商管理主页',
          auth: true
        },
        component: _import('SupportManager/main/index')
      },
      {
        path: 'SupportManager/map',
        name: 'supportMap',
        meta: {
          title: '全球视图',
          auth: true
        },
        component: _import('SupportManager/main/map')
      },
      {
        path: 'UserManager/main',
        name: 'userMain',
        meta: {
          title: '用户管理主页',
          auth: true
        },
        component: _import('UserManager/main/index')
      },
      {
        path: 'UserManager/map',
        name: 'userMap',
        meta: {
          title: '全球视图',
          auth: true
        },
        component: _import('UserManager/main/map')
      },
      {
        path: 'MessageDetail/index',
        name: 'messageDetail',
        meta: {
          title: '通知详情',
          auth: true
        },
        component: _import('MessageDetail/index.vue')
      },
      {
        path: 'customModule',
        name: 'customModule',
        meta: {
          title: '自定义模块',
          auth: true
        },
        component: _import('CustomModule/index.vue')
      },
      // 系统 前端日志
      {
        path: 'log',
        name: 'log',
        meta: {
          title: '前端日志',
          auth: true
        },
        component: _import('system/log')
      },
      // 刷新页面 必须保留
      {
        path: 'refresh',
        name: 'refresh',
        hidden: true,
        component: _import('system/function/refresh')
      },
      // 页面重定向 必须保留
      {
        path: 'redirect/:route*',
        name: 'redirect',
        hidden: true,
        component: _import('system/function/redirect')
      }
    ]
  }
]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: _import('system/login')
  }
]

/**
 * 错误页面
 */
const errorPage = [
  {
    path: '*',
    name: '404',
    component: _import('system/error/404')
  }
]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut,
  ...errorPage
]
