<template>
  <div id="app" data-server-rendered="true">
    <noscript>Please, enable JavaScript in your browser</noscript>

    <main>
      <router-view class="wrapper"></router-view>
    </main>
    <footer><a href="tg://resolve?domain=dioon" class="d-link">Denis Plekhov</a></footer>
  </div>
</template>

<script>
  export default {
    metaInfo: {
      title: 'test',
      titleTemplate: '%s | Zenfox',
      meta: [
        { name: 'og:type', content: 'website' }
      ]
    }
  }
</script>
