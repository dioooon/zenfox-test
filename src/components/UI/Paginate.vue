<template>
  <nav class="text-xs-right">
    <ul class="pagination">
      <li class="page-item" v-if="currentPage > 1">
        <a href="javascript:void(0)" class="page-link" aria-label="Предыдущая"
           @click.prevent="changePage(currentPage - 1)">
          <span aria-hidden="true">«</span>
        </a>
      </li>

      <li class="page-item" v-for="page in pagesNumber" v-bind:class="[ page === isActived ? 'active' : '']">
        <a href="javascript:void(0)" class="page-link" @click.prevent="changePage(page)">{{ page }}</a>
      </li>

      <li class="page-item" v-if="currentPage < lastPage">
        <a href="javascript:void(0)" class="page-link" aria-label="Следующая"
           @click.prevent="changePage(currentPage + 1)">
          <span aria-hidden="true">»</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
  export default {
    props: {
      currentPage: {
        type: Number,
        required: true
      },
      total: {
        type: Number,
        required: true
      },
      limit: {
        type: Number,
        required: true
      }
    },
    computed: {
      isActived () {
        return this.currentPage;
      },
      pagesNumber () {
        let from = this.currentPage - this.limit
        if (from < 1) {
          from = 1
        }

        let to = from + (this.limit * 2)
        if (to >= this.lastPage) {
          to = this.lastPage
        }

        let pagesArray = []
        while (from <= to) {
          pagesArray.push(from)
          from++
        }
        return pagesArray
      },
      lastPage () {
        return Math.ceil(this.total / this.limit)
      }
    },
    methods: {
      changePage (page) {
        if (page === this.isActived) return false
        this.$emit('changePage', page)
      }
    }
  }
</script>

<style scoped>

</style>
