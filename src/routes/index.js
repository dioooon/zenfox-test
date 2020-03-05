import Vue from 'vue'
import VueMeta from 'vue-meta'
import VueRouter from 'vue-router'
import { createRoutes } from './routes.js'

Vue.use(VueMeta)
Vue.use(VueRouter)

const routes = createRoutes()

export function createRouter () {
  const router = new VueRouter({
    routes,
    mode: 'history',
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        let position = { x: 0, y: 0 }

        if (from && to.name === from.name) {
          return false
        }

        return new Promise((resolve) => {
          resolve(position)
        })
      }
    },
  })

  return router
}
