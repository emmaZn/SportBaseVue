import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _1dd31544 = () => interopDefault(import('../../src/pages/accountParameters.vue' /* webpackChunkName: "pages/accountParameters" */))
const _3694440c = () => interopDefault(import('../../src/pages/newsFeed.vue' /* webpackChunkName: "pages/newsFeed" */))
const _5493dd51 = () => interopDefault(import('../../src/pages/search.vue' /* webpackChunkName: "pages/search" */))
const _154a466b = () => interopDefault(import('../../src/pages/signIn.vue' /* webpackChunkName: "pages/signIn" */))
const _29e09ce1 = () => interopDefault(import('../../src/pages/signUp.vue' /* webpackChunkName: "pages/signUp" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/accountParameters",
    component: _1dd31544,
    name: "accountParameters"
  }, {
    path: "/newsFeed",
    component: _3694440c,
    name: "newsFeed"
  }, {
    path: "/search",
    component: _5493dd51,
    name: "search"
  }, {
    path: "/signIn",
    component: _154a466b,
    name: "signIn"
  }, {
    path: "/signUp",
    component: _29e09ce1,
    name: "signUp"
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
