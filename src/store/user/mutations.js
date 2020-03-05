/** START USERS */
export function SET_USERS_LOADING (state, value) {
  state.users.loading = value
}

export function SET_USERS_ERROR (state, value) {
  state.users.error = value
}

export function SET_USERS_DATA (state, { data, total }) {
  Object.assign(state.users, {
    data,
    total
  })
}

export function CLEAR_USERS (state) {
  Object.assign(state.users, {
    data: [],
    total: 0,
    limit: 5,
    error: false,
    loading: false
  })
}
/** END USERS */

/** START USER SHOW */
export function SET_SHOW_USER_LOADING (state, value) {
  state.show.loading = value
}

export function SET_SHOW_USER_ERROR (state, value) {
  state.show.error = value
}

export function SET_SHOW_USER_DATA (state, { data }) {
  state.show.data = data
}
/** END USER SHOW */

export default {
  CLEAR_USERS,
  SET_USERS_ERROR,
  SET_USERS_DATA,
  SET_USERS_LOADING,
  SET_SHOW_USER_DATA,
  SET_SHOW_USER_ERROR,
  SET_SHOW_USER_LOADING
}
