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
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {
        title: 'Dashboard',
        icon: 'dashboard'
      }
    }]
  },

  {
    path: '/register',
    component: Layout,
    redirect: '/register/engine',
    name: 'Register',
    meta: {
      title: '数据注册',
      icon: 'el-icon-s-help'
    },
    children: [{
      path: 'engine',
      name: 'Engine',
      component: () => import('@/views/register/engine'),
      meta: {
        title: '发动机注册',
        icon: 'table'
      }
    }, {
      path: 'oil',
      name: 'Oil',
      component: () => import('@/views/register/oil'),
      meta: {
        title: '油液机注册',
        icon: 'table'
      }
    }]
  },
  {
    path: '/identify',
    component: Layout,
    hidden: true,
    redirect: '/identify/index',
    children: [{
      path: 'index',
      name: '磨粒识别',
      component: () => import('@/views/identify/index'),
      meta: {
        title: '磨粒识别',
        icon: 'identify'
      }
    }]
  },
  {
    path: '/diagnosis',
    component: Layout,
    hidden: true,
    redirect: '/diagnosis/index',
    children: [{
      path: 'index',
      name: '磨粒识别',
      component: () => import('@/views/diagnosis/index'),
      meta: {
        title: '自动诊断',
        icon: 'diagnosis'
      }
    }]
  }, {
    path: '/stat',
    component: Layout,
    hidden: true,
    redirect: '/stat/index',
    children: [{
      path: 'index',
      name: '趋势分析',
      component: () => import('@/views/stat/index'),
      meta: {
        title: '趋势分析',
        icon: 'stat'
      }
    }]
  }, {
    path: '/index',
    component: Layout,
    hidden: true,
    redirect: '/index',
    children: [{
      path: '',
      name: '磨粒识别',
      component: () => import('@/views/index'),
      meta: {
        title: '首页',
        icon: 'index'
      }
    }]
  }, {
    path: '/analysis',
    component: Layout,
    hidden: true,
    redirect: '/analysis/index',
    children: [{
      path: 'index',
      name: '趋势分析',
      component: () => import('@/views/analysis/index'),
      meta: {
        title: '趋势分析',
        icon: 'Analysis'
      }
    }]
  },
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

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
