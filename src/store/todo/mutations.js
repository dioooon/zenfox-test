/** START USER SHOW */
export function SET_USER_TODO_LOADING (state, value) {
  state.user.loading = value
}

export function SET_USER_TODO_ERROR (state, value) {
  state.user.error = value
}

export function SET_USER_TODO_DATA (state, { data }) {
  state.user.data = data
}
/** END USER SHOW */

export default {
  SET_USER_TODO_DATA,
  SET_USER_TODO_ERROR,
  SET_USER_TODO_LOADING
}
