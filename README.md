# vue-paginator

> A Vue.js project

# screenshot

![screenshot](screenshot.png)

# Requirements

- [Vue.js](https://github.com/yyx990803/vue) `^2.0.0`

# Usage

``` html
<template>
  <paginator :total="total" @page-changed="handlePageChanged"/>
  <paginator :page-index="pageIndex" :page-size="pageSize" :total="total" @page-changed="handlePageChanged"/>
  <paginator
    :page-index="pageIndex"
    :page-size="pageSize"
    :total="total"
    :pager-length="pagerLength"
    :page-sizes="pageSizes"
    :layout="'total, sizer, pager, jumper'"
    :background="false"
    @page-changed="handlePageChanged"
  />
</template>

<script>
  import Paginator from 'path/to/Paginator.vue';

  export default {
    data() {
      return {
        pageIndex: 1,
        pageSize: 5,
        total: 0,
        pagerLength: 3,
        pageSizes: [10, 20, 30],
        users: []
      };
    },
    components: {
      Paginator
    },
    created() {
      this.indexUser();
    },
    methods: {
      handlePageChanged(index, size) {
        this.pageIndex = index;
        this.pageSize = size;
        this.indexUser();
      },
      indexUser() {
        ...
        this.users = res.data.data.items;
        this.total = res.data.data.total;
      }
    }
  }
</script>
```

# Run

1. 打开终端

2. 克隆本仓库

``` 
git clone https://github.com/AidenChen/vue-paginator.git
```

3. 进入目录

``` 
cd vue-paginator
```

4. 安装依赖

``` 
npm install
```

5. 运行

``` 
npm run serve
npm run dev
```

# License

[The MIT License](http://opensource.org/licenses/MIT)
