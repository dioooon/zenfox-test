import Vue from 'vue'
import Vuex from 'vuex'

import user from './user'
import todo from './todo'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    modules: {
      user,
      todo
    }
  })
}
