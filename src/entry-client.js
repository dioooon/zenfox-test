import Vue from 'vue'
import { api } from '~api'
import { createApp } from './app'
import ProgressBar from './components/UI/ProgressBar.vue'

const bar = Vue.prototype.$bar = new Vue(ProgressBar).$mount()
document.body.appendChild(bar.$el)

Vue.mixin({
  beforeRouteUpdate (to, from, next) {
    const asyncData = this.$options.asyncData

    if (asyncData) {
      asyncData({ store: this.$store, route: to })
        .then(next)
        .catch(next)
    } else {
      next()
    }
  }
})

const { app, router, store } = createApp()

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)

  store.$api = store.state.$api = api()
}

router.onReady(() => {
  router.beforeResolve((to, from, next) => {
    const matchedComponents = router.getMatchedComponents(to)
    const prevMatchedComponents = router.getMatchedComponents(from)

    let diffed = false

    const activated = matchedComponents.filter((component, i) => {
      return diffed || (diffed = prevMatchedComponents[i] !== component)
    })

    if (!activated.length) return next()

    bar.start()

    Promise.all(activated.map(component => {
      if (component.asyncData) {
        return component.asyncData({ store, route: to })
      }
    })).then(() => {
      bar.finish()
      next()
    }).catch(next)
  })
  app.$mount('#app')
})

