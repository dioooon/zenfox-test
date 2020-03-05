<template>
  <div class="u-page">
    <h1 class="u-page__name">{{ user.name }}</h1>

    <ul class="u-page__todo">
      <li :class="['todo__item', { 'todo__item--completed': todo.completed }]" v-for="todo in todos" :key="todo.id">{{ todo.title }}</li>
    </ul>

    <a href="javascript:void(0)" @click="_handleClickPreviousPage">Back</a>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    metaInfo () {
      return {
        title: this.user.name
      }
    },
    async asyncData ({ store, route }) {
      const { params: { id } } = route

      await store.dispatch('user/getUserById', { id }).catch((error) => {
        const { response: { status = 500, url = null } } = error
        throw ({ code: status, message: 'Error show user', url })
      })

      await store.dispatch('todo/getTodoByUserId', { userId: id }).catch((error) => {
        const { response: { status = 500, url = null } } = error
        throw ({ code: status, message: 'Error get user todo', url })
      })
    },
    computed: {
      ...mapGetters({
        user: 'user/getShowUserData',
        todos: 'todo/getUserTodoData',
        userError: 'user/getShowUserError',
        todoError: 'todo/getUserTodoError',
        userLoading: 'user/getShowUserLoading',
        todoLoading: 'user/getUserTodoLoading',
      }),
    },
    methods: {
      _handleClickPreviousPage () {
        if (window.history.length > 2) {
          this.$router.go(-1)
        } else this.$router.push({ name: 'users.index' })
      }
    }
  }
</script>

<style scoped>

</style>
