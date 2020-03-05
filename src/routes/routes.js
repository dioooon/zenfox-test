import Route from 'vue-routisan'

export function createRoutes () {
  Route.setViewResolver(path => () => System.import(`./../views/${path}.vue`))

  Route.view('/', 'home').name('index')

  Route.group({ prefix: 'users' }, () => {
    Route.view('/', 'Users/Index').name('users.index')
    Route.view(':id', 'Users/Show').name('users.show')
  })

  return Route.all()
}
