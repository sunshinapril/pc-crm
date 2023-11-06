import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { setPageTitle } from '@/utils';
import { getToken } from '@/utils/auth';
import { useUser } from '@/store/modules/user';
import usePermission, { filterAsyncRouter } from '@/store/modules/permission';
import { getUserInfo, buildMenus } from '@/apis/user';
import menus from '@/router/menus';

export const constantRouterMap: Array<RouteRecordRaw> = [
  {
    path: '/forbidden',
    name: 'forbidden',
    component: () => import('@/views/feature/Forbidden.vue'),
    meta: {
      title: 'forbidden',
      isMenu: false,
    },
  },
  {
    path: '/404',
    component: () => import('@/views/feature/404.vue'),
    meta: {
      title: '404',
      isMenu: false,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
      isMenu: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: constantRouterMap as RouteRecordRaw[],
  scrollBehavior: () => ({
    left: 0,
    top: 0,
  }),
});

const whiteList = ['/login']; // no redirect whitelist
router.beforeEach(async (to, from, next) => {
  if (to.meta.title) {
    setPageTitle(to.meta.title);
  }
  if (getToken()) {
    if (!useUser().getUserInfo) {
      try {
        const { data } = await getUserInfo();
        useUser().setUserInfo(data);
        const p = await loadMenus(to);
        addPathMatch();
        next(p);
      } catch (e) {
        next('/login');
      }
    } else {
      next();
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next();
    } else {
      next(`/login?redirect=${to.fullPath}`); // 否则全部重定向到登录页
    }
  }
});

function addPathMatch() {
  if (!router.hasRoute('pathMatch')) {
    router.addRoute({
      path: '/:pathMatch(.*)',
      name: 'pathMatch',
      redirect: '/404',
    });
  }
}

// 映射权限和菜单
const mapPermRouter = (perms, menus) => {
  return menus.filter(item => {
    if (item.children && item.children.length) {
      item.children = mapPermRouter(perms, item.children);
    }
    return perms.includes(item.meta.isPerm)
  })
}

export const loadMenus = (to) => {
  return buildMenus()
    .then((res) => {
      const data = res.data;
      const routerData = mapPermRouter(data, menus);
      console.log(routerData, 'routerData')
      const asyncRouter = filterAsyncRouter(routerData);
      console.log('kaka=asyncRouter=', asyncRouter);

      // 处理输入/路由的情况
      if (asyncRouter && asyncRouter.length) {
        asyncRouter.push({
          path: '/',
          redirect: `${asyncRouter[0].path}`,
          meta: {
            title: '',
          },
        });
      }
      // console.log(asyncRouter, 'asyncRouter[0].path')

      return usePermission()
        .setRouters(asyncRouter)
        .then(() => {
          const rots = [...constantRouterMap, ...asyncRouter];
          rots.map((v) => {
            if (router.options.routes?.findIndex((value) => value.path === v.path) !== -1) {
              return;
            } else {
              // 切记将路由push到routes后还需要使用addRoute，这样路由才能正常跳转
              if (!router.hasRoute(v?.path)) router.addRoute(v);
            }
          });
          router.options.routes = rots;
          // 判断是否从登陆页面过来
          if (to.redirectedFrom === '/') {
            return { path: asyncRouter[0].path };
          } else {
            return { ...to, replace: true };
          }
        });
    })
    .catch((e) => {
      console.log(e, 'e');
    });
};

export default router;
