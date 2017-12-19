# vue-paginator

> A Vue.js project

# screenshot

![screenshot](screenshot.png)

# Requirements

- [Vue.js](https://github.com/yyx990803/vue) `^2.0.0`

# Usage

``` html
<template>
  <paginator :total="total" @change-page="changePage"/>
  <paginator :index="index" :size="size" :total="total" @change-page="changePage"/>
  <paginator :index="index" :size="size" :total="total" :length="length" :options="options" @change-page="changePage"/>
</template>

<script>
  import Paginator from 'path/to/Paginator.vue';

  export default {
    data() {
      return {
        index: 1,
        size: 5,
        total: 0,
        length: 5,
        options: [10, 20, 30],
        tableData: []
      };
    },
    components: {
      Paginator
    },
    created() {
      this.indexUser();
    },
    methods: {
      changePage(index, size) {
        this.index = index;
        this.size = size;
        this.indexUser();
      },
      indexUser() {
        // Fetch data with this.index and this.size
        // Don't forget to update this.total
      }
    }
  }
</script>
```

# Run

1. Open your terminal.

2. Clone this repo:

  git clone https://github.com/AidenChen/vue-paginator.git

3. Once finished, change directory to vue-paginator:

  cd vue-paginator

4. Install all dependencies:

  npm install

5. Run the demo:

  npm run dev

# License

[The MIT License](http://opensource.org/licenses/MIT)
