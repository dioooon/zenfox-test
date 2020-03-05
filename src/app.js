import Vue from 'vue'

import App from './App.vue'

import { createStore } from './store'
import { createRouter } from './routes'
import { sync } from 'vuex-router-sync'

export function createApp (context) {
  const store = createStore()
  const router = createRouter()

  sync(store, router)

  const app = new Vue({
    store,
    router,
    context,
    render: h => h(App)
  })

  global.application = app

  return { app, router, store }
}
