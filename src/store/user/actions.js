export const fetchUsers = ({ commit, state, rootState: { $api } }, { page, limit }) => {
  return new Promise((resolve, reject) => {
    commit('SET_USERS_LOADING', true)

    return $api.get(`/users`, { '_page': page, '_limit': limit }).then((response) => {
      let { data, headers: { 'x-total-count': total } } = response

      commit('SET_USERS_DATA', { data, total, page })
      commit('SET_USERS_LOADING', false)
      commit('SET_USERS_ERROR', false)

      resolve && resolve(total)
    }, (error) => {
      commit('SET_USERS_LOADING', false)
      commit('SET_USERS_ERROR', true)

      reject && reject(error)
    })
  })
}

export const clearUsers = ({ commit }) => {
  return new Promise((resolve, reject) => {
    try {
      commit('CLEAR_USERS')
      resolve && resolve()
    } catch (e) {
      console.log(e)
      reject && reject()
    }
  })
}

export const getUserById = ({ commit, state, rootState: { $api } }, { id }) => {
  return new Promise((resolve, reject) => {
    commit('SET_SHOW_USER_LOADING', true)

    return $api.get(`users/${id}`).then((response) => {
      let { data } = response

      commit('SET_SHOW_USER_DATA', { data })
      commit('SET_SHOW_USER_LOADING', false)
      commit('SET_SHOW_USER_ERROR', false)
      resolve && resolve()
    }, (error) => {
      commit('SET_SHOW_USER_LOADING', false)
      commit('SET_SHOW_USER_ERROR', true)
      reject && reject(error)
    })
  })
}

export default {
  fetchUsers,
  clearUsers,
  getUserById
}
