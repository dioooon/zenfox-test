import { api } from '~api'
import { createApp } from './app'

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp(context)
    const meta = app.$meta()

    router.push(context.url)

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()


      if (!matchedComponents.length) return reject({ code: 404 })

      store.$api = store.state.$api = api(context)

      Promise.all(matchedComponents.map(component => {
        return (component.asyncData && component.asyncData({
          store,
          route: router.currentRoute
        }))
      })).then(() => {
        context.state = store.state
        context.meta = meta
        resolve(app)
      }).catch((err) => {
        try {
          const { code, message, url } = err
          reject && reject({ code, message, url })
        } catch (e) {
          reject && reject({ code: 500, message: 'Internal Server Error' })
        }
      })
    }, reject)
  })
}
