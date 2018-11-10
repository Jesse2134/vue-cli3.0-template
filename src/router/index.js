import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '@/store'
import routes from './routes'
import Utils from '@/utils';
Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'hash',
  // base: '/pcs/',
  routes: routes
});
/* eslint-disable */
// 路由拦截器
router.beforeEach((to, from, next) => {
  const token = Utils.getCookies('__token__') || localStorage.getItem('__token__');
  const user = localStorage.getItem('__token__');
  if (to.path === '/login') {
    Utils.removeCookies('__token__');
    localStorage.removeItem('__token__');
    // store.commit('SET_MENUS', null);
    // store.commit('SET_USER', null);
    // store.commit('SET_ROLE', null);
    next()
  } // 判断是否需要登录才能访问
  else if (!token || !user) {
    console.log('token', token);
    console.log('user', user);
    // 无 token 即未登录，跳转到登录页面
    next({
      path: '/login',
      query: {
        redirect: to.fullPath
      }
    })
  } // 验证当前登录用户是否有权限访问该路由
  else {
    next();
    // // store中无菜单项重新获取菜单信息
    // console.log('GetMenus', store.getters.menus);
    // if (!store.getters.menus) {
    //   store.dispatch('GetMenus').then((res) => {
    //     if (res.result.code === 0) {
    //       let routerData = Utils.copyData(store.getters.menus); // 拷贝菜单数据
    //       // 最后才能添加 * 匹配找不到的路径
    //       routerData.push({
    //         path: '*',
    //         redirect: '/404',
    //         meta: {
    //           hidden: true
    //         }
    //       });
    //       router.addRoutes(routerData); // 动态路由
    //       next({...to, replace: true});
    //     } else if (res.result.code === 300) {
    //       console.log('GetMenus-Res', res);
    //       Message({
    //         type: "warning",
    //         message: "获取菜单列表失败, 请重新登录",
    //         duration: 3000
    //       });
    //       next({
    //         path: '/login',
    //         query: {
    //           redirect: to.fullPath
    //         }
    //       })
    //     }
    //   }).catch(() => { // 获取
    //     next({path: '/login'})
    //   });
    // } else {
    // next();
    // }
  }
});

export default router;
