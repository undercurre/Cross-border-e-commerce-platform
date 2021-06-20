import { uniqueId } from 'lodash'
import customer from './modules/Customer'
import orders from '@/menu/modules/Orders'
import good from '@/menu/modules/Goods'
import message from '@/menu/modules/Message'
import store from '@/menu/modules/Store'
import rate from '@/menu/modules/Rate'
import support from '@/menu/modules/Support'
import factory from '@/menu/modules/Factory'
import system from '@/menu/modules/System'

/**
 * @description 给菜单数据补充上 path 字段
 * @description https://github.com/d2-projects/d2-admin/issues/209
 * @param {Array} menu 原始的菜单数据
 */
function supplementPath (menu) {
  return menu.map(e => ({
    ...e,
    path: e.path || uniqueId('d2-menu-empty-'),
    ...e.children ? {
      children: supplementPath(e.children)
    } : {}
  }))
}

export const menuHeader = supplementPath([
  { path: '/index', title: '首页', icon: 'home' },
  customer,
  orders,
  good,
  support,
  store,
  message,
  rate,
  factory,
  system
])

export const menuAside = supplementPath([

])
