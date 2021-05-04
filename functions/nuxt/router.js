import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _1c111cfe = () => interopDefault(import('../../src/pages/inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _63bf0650 = () => interopDefault(import('../../src/pages/login.vue' /* webpackChunkName: "pages/login" */))
const _5110b08c = () => interopDefault(import('../../src/pages/register.vue' /* webpackChunkName: "pages/register" */))
const _cbd1398e = () => interopDefault(import('../../src/pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/inspire",
    component: _1c111cfe,
    name: "inspire"
  }, {
    path: "/login",
    component: _63bf0650,
    name: "login"
  }, {
    path: "/register",
    component: _5110b08c,
    name: "register"
  }, {
    path: "/",
    component: _cbd1398e,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
