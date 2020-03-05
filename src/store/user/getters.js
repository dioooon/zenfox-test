/** START USERS */
export function getUsersData (state) {
  return state.users.data
}

export function getUsersTotal (state) {
  return Number(state.users.total)
}

export function getUsersLimit (state) {
  return Number(state.users.limit)
}

export function getUsersLoading (state) {
  return state.users.loading
}

export function getUsersError (state) {
  return state.users.error
}
/** END USERS */

/* USER SHOW */
export function getShowUserLoading (state) {
  return state.show.loading
}

export function getShowUserData (state) {
  return state.show.data
}

export function getShowUserError (state) {
  return state.show.error
}

/* END USER SHOW */

export default {
  getUsersData,
  getUsersTotal,
  getUsersError,
  getUsersLimit,
  getUsersLoading,
  getShowUserData,
  getShowUserError,
  getShowUserLoading
}
