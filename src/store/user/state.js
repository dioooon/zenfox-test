const state = () => ({
  users: {
    data: [],
    total: 0,
    limit: 5,
    error: false,
    loading: false
  },
  show: {
    data: null,
    error: false,
    loading: false
  }
})

export default state
