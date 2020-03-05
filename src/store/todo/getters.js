/* USER SHOW */
export function getUserTodoLoading (state) {
  return state.user.loading
}

export function getUserTodoData (state) {
  return state.user.data
}

export function getUserTodoError (state) {
  return state.user.error
}

/* END USER SHOW */

export default {
  getUserTodoData,
  getUserTodoError,
  getUserTodoLoading
}
