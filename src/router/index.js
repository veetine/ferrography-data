import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/update',
    component: () => import('@/views/update'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    hidden: true,
    redirect: '/update',
    children: [{
      path: '',
      component: () => import('@/views/index'),
      meta: {
        title: '首页',
        icon: 'index'
      }
    }]
  },
  {
    path: '/motor',
    component: Layout,
    redirect: '/motor/index',
    children: [{
      path: 'index',
      component: () => import('@/views/motor/index'),
      meta: {
        title: '发动机注册',
      }
    }]
  },
  {
    path: '/grease',
    component: Layout,
    redirect: '/grease/index',
    children: [{
      path: 'index',
      component: () => import('@/views/grease/index'),
      meta: {
        title: '滑油信息库',
      }
    }]
  },
  {
    path: '/sample',
    component: Layout,
    redirect: '/sample/index',
    children: [{
      path: 'index',
      component: () => import('@/views/sample/index'),
      meta: {
        title: '采样部位信息库',
      }
    }]
  }, {
    path: '/oil',
    component: Layout,
    redirect: '/oil/index',
    children: [{
      path: 'index',
      component: () => import('@/views/oil/index'),
      meta: {
        title: '制谱用油样量',
      }
    }]
  }, {
    path: '/dilution',
    component: Layout,
    redirect: '/dilution/index',
    children: [{
      path: 'index',
      component: () => import('@/views/dilution/index'),
      meta: {
        title: '稀释比设置',
      }
    }]
  }, {
    path: '/analyse',
    component: Layout,
    redirect: '/analyse/index',
    children: [{
      path: 'index',
      name: '铁谱磨粒分析库',
      component: () => import('@/views/analyse/index'),
      meta: {
        title: '铁谱磨粒分析库',
      }
    }, {
      path: 'detail',
      component: () => import('@/views/analyse/detail'),
      meta: {
        title: '详情 - 铁谱磨粒分析库',
      }
    }]
  }, {
    path: '/images',
    component: Layout,
    redirect: '/images/index',
    children: [{
      path: 'index',
      component: () => import('@/views/images/index'),
      meta: {
        title: '铁谱磨粒图片库',
      }
    }, {
      path: 'add',
      component: () => import('@/views/images/add'),
      meta: {
        title: '添加图片 - 铁谱磨粒图片库',
      }
    }, {
      path: 'detail',
      component: () => import('@/views/images/detail'),
      meta: {
        title: '查看图片 - 铁谱磨粒图片库',
      }
    }]
  }, {
    path: '/setting',
    component: Layout,
    children: [{
      path: 'user',
      component: () => import('@/views/setting/user'),
      meta: {
        title: '账号管理 - 系统设置',
      }
    }, {
      path: 'pwd',
      component: () => import('@/views/setting/pwd'),
      meta: {
        title: '修改密码 - 系统设置',
      }
    }, {
      path: 'dump',
      component: () => import('@/views/setting/dump'),
      meta: {
        title: '数据库备份 - 系统设置',
      }
    }]
  },{
    path: '/statement',
    component: Layout,
    redirect: '/statement/index',
    children: [{
      path: 'index',
      component: () => import('@/views/statement/index'),
      meta: {
        title: '铁谱分析报告',
      }
    }]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [{
  path: '*',
  redirect: '/404',
  hidden: true
}]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
