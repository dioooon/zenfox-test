<template>
  <div class="u-lists">
    <loader v-if="(loading === true)"></loader>

    <template v-else-if="(loading === false)">
      <user-card v-for="user in users" :user="user" :key="user.id"></user-card>
      <paginate :total="total" :currentPage="page" :limit="limit" @changePage="_handleChangePage"></paginate>
    </template>

    <template v-if="isEmpty">Empty users list.</template>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import Loader from '@components/UI/Loader.vue'
  import UserCard from '@components/User/Card.vue'
  import Paginate from '@components/UI/Paginate.vue'

  export default {
    components: { UserCard, Paginate, Loader },
    metaInfo: {
      title: 'Users list'
    },
    async asyncData ({ store, route }) {
      const { query: { page = 1 } } = route

      const limit = store.getters['user/getUsersLimit']

      await store.dispatch('user/fetchUsers', { page, limit }).catch((error) => {
        const { response: { status = 500, url = null } } = error
        throw ({ code: status, message: 'Error fetch users', url })
      })
    },
    computed: {
      ...mapGetters({
        users: 'user/getUsersData',
        total: 'user/getUsersTotal',
        error: 'user/getUsersError',
        loading: 'user/getUsersLoading',
        limit: 'user/getUsersLimit',
      }),
      isEmpty () {
        return (this.loading === false && this.total === 0 && this.users.length)
      },
      page () {
        const { query: { page = 1 } } = this.$route
        return Number(page)
      }
    },
    methods: {
      ...mapActions({
        _clearUsers: 'user/clearUsers'
      }),
      _handleChangePage (page) {
        this._clearUsers().then(() => {
          this.$router.push({ name: 'users.index', query: { page } })
        }).catch(() => console.log('Error clear users.'))
      }
    }
  }
</script>

<style scoped>

</style>
