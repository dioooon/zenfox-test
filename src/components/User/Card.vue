<template>
  <div class="u-card">
    <router-link :to="{ name: 'users.show', params: { id: user.id } }" class="u-card__name">
      {{ user.name }}
    </router-link>
    <div class="u-card__email"><a :href="`mailto:${user.email}`" class="d-link">{{ user.email }}</a></div>
    <div class="u-card__phone"><a :href="`tel:${user.phone}`" class="d-link">{{ user.phone }}</a></div>
  </div>
</template>

<script>
  export default {
    props: {
      user: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style scoped>

</style>
