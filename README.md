# vue-pagitable

> pagination & datatable component for Vue.js

# Requirements

- [Vue.js](https://github.com/yyx990803/vue) `^1.0.0`

# Usage

``` html
<template>
  <pagitable :total="total" @change-page="changePage"></pagitable>
  <pagitable :size="size" :total="total" :index="index" @change-page="changePage"></pagitable>
  <pagitable :size="size" :total="total" :index="index" :options="options" :length="length" @change-page="changePage"></pagitable>
</template>

<script>
import Pagitable from 'path/to/pagitable.vue'

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
    }
  }
}
</script>
```

# Run

1. Open your terminal.

2. Clone this repo:

  git clone https://github.com/AidenChen/vue-pagitable.git

3. Once finished, change directory to vue-pagitable:

  cd vue-pagitable

4. Install all dependencies:

  npm install

5. Run the demo:

  npm run dev

# License

[The MIT License](http://opensource.org/licenses/MIT)
