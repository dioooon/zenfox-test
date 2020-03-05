<template>
    <div class="page">
      <router-link :to="{ name: 'users.index' }"><h1>Open users catalog</h1></router-link>
    </div>
</template>

<script>
  export default {
    metaInfo: {
      title: 'Home page'
    }
  }
</script>

<style scoped>

</style>
