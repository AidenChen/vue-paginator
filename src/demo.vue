<template>
  <div class="demo-wrapper">
    <pagitable :size="size" :total="total" :index="index" :options="options" :length="length" @change-page="changePage"></pagitable>
  </div>
</template>

<script type="text/ecmascript-6">
  import Pagitable from './pagitable'

  export default {
    data() {
      return {
        size: 10,
        total: 70,
        index: 1,
        length: 5,
        options: [10, 20, 30]
      }
    },
    components: {
      Pagitable
    },
    methods: {
      changePage(index) {
        this.index = index
        console.log(index)
      }
    }
  }
</script>

<style>
</style>
