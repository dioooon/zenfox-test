export const getTodoByUserId = ({ commit, state, rootState: { $api } }, { userId }) => {
  return new Promise((resolve, reject) => {
    commit('SET_USER_TODO_LOADING', true)

    return $api.get(`/todos`, { userId }).then((response) => {
      let { data } = response

      commit('SET_USER_TODO_DATA', { data })
      commit('SET_USER_TODO_LOADING', false)
      commit('SET_USER_TODO_ERROR', false)
      resolve && resolve()
    }, (error) => {
      commit('SET_USER_TODO_LOADING', false)
      commit('SET_USER_TODO_ERROR', true)
      reject && reject(error)
    })
  })
}

export default {
  getTodoByUserId
}
