import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  // { path: '/changePassword', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/system',
    component: Layout,
    // redirect: '/example/table',
    name: 'Example1',
    meta: { title: '系统管理', icon: 'iconfont-ji' },
    children: [
      {
        path: 'administratorList',
        name: 'administratorList',
        component: () => import('@/views/system/administratorList'),
        meta: { title: '管理员列表', icon: 'account-filling' }
      },
      {
        path: 'room',
        name: 'room',
        component: () => import('@/views/system/room'),
        meta: { title: '房间配置', icon: 'house' }
      },
      {
        path: 'rechargeDeploy',
        name: 'rechargeDeploy',
        component: () => import('@/views/system/recharge_deploy'),
        meta: { title: '充值配置列表', icon: 'compare' }
      },
      // {
      //   path: 'platformDetail',
      //   name: 'platformDetail',
      //   component: () => import('@/views/system/platform_detail'),
      //   meta: { title: '平台明细记录', icon: 'tree' }
      // },
      {
        path: 'platformTotal',
        name: 'platformTotal',
        component: () => import('@/views/system/platform_total'),
        meta: { title: '平台汇总明细', icon: 'form' }
      },
      {
        path: 'changePassword',
        name: 'changePassword',
        hidden: true,
        component: () => import('@/views/changePassword'),
        meta: { title: '修改密码', icon: 'tree' }
      },
      {
        path: 'log',
        name: 'log',
        hidden: true,
        component: () => import('@/views/system/log'),
        meta: { title: '历史吞吐率', icon: 'tree' }
      },
      {
        path: 'bloodChange',
        name: 'bloodChange',
        hidden: true,
        component: () => import('@/views/system/blood_change'),
        meta: { title: '房间血池变化', icon: 'tree' }
      },
    ]
  },
  {
    path: '/player',
    component: Layout,
    // redirect: '/example/table',
    name: 'Example2',
    meta: { title: '玩家管理', icon: 'supplier-features' },
    children: [
      {
        path: 'search',
        name: 'search',
        component: () => import('@/views/player/search'),
        meta: { title: '搜索玩家', icon: 'original-image' }
      },
      {
        path: 'onlineList',
        name: 'onlineList',
        component: () => import('@/views/player/onlineList'),
        meta: { title: '玩家在线列表', icon: 'account' }
      },
      // {
      //   path: 'protectList',
      //   name: 'protectList',
      //   component: () => import('@/views/player/protectList'),
      //   meta: { title: '玩家保护列表', icon: 'example' }
      // },
      {
        path: 'dayTradingList',
        name: 'dayTradingList',
        component: () => import('@/views/player/tradeList'),
        meta: { title: '当日交易列表', icon: '3column' }
      },
      {
        path: 'incomeSearch',
        name: 'incomeSearch',
        component: () => import('@/views/player/income_search'),
        meta: { title: '用户输赢搜索', icon: 'dollar' }
      },
      {
        path: 'coinChange',
        name: 'coinChange',
        component: () => import('@/views/player/coin_change'),
        meta: { title: '金币变动记录', icon: 'tree' }
      },
      {
        path: 'ticketChange',
        name: 'ticketChange',
        component: () => import('@/views/player/ticket_change'),
        meta: { title: '奖券变动记录', icon: 'trade-assurance' }
      },
      {
        path: 'userInfo',
        name: 'userInfo',
        hidden: true,
        component: () => import('@/views/player/user_detail'),
        meta: { title: '用户详细信息', icon: 'tree' }
      },
      {
        path: 'goldLog',
        name: 'goldLog',
        hidden: true,
        component: () => import('@/views/player/gold_log'),
        meta: { title: '玩家金币变动详情', icon: 'tree' }
      }
    ]
  },
  {
    path: '/iconData',
    component: Layout,
    // redirect: '/example/table',
    name: 'Example3',
    meta: { title: '图表数据', icon: 'list' },
    children: [
      {
        path: 'userOnline',
        name: 'userOnline',
        component: () => import('@/views/iconData/user_online'),
        meta: { title: '用户在线统计', icon: 'iconfont-xiangjiaosuliao' }
      },
      {
        path: 'dayRegister',
        name: 'dayRegister',
        component: () => import('@/views/iconData/day_register'),
        meta: { title: '日注册统计', icon: 'eye' }
      },
      {
        path: 'surviveRate',
        name: 'surviveRate',
        component: () => import('@/views/iconData/survive_rate'),
        meta: { title: '留存率统计', icon: 'table' }
      }
    ]
  },
  {
    path: '/vip',
    component: Layout,
    // redirect: '/example/table',
    name: 'Example4',
    meta: { title: '至尊VIP', icon: 'vip' },
    children: [
      {
        path: 'vipList',
        name: '至尊VIP列表',
        component: () => import('@/views/vip/vipList'),
        meta: { title: '至尊VIP列表', icon: 'tree' }
      },
      {
        path: 'coinGive',
        name: '',
        component: () => import('@/views/vip/coin_change'),
        meta: { title: '金币赠送接收', icon: 'trade-assurance' }
      },
      {
        path: 'bill',
        name: '交易税收账单',
        component: () => import('@/views/vip/give_revenue_bill'),
        meta: { title: '交易税收账单', icon: 'Calculator' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

