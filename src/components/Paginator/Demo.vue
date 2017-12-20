<template>
  <div class="paginator-demo">
    <table class="paginator-demo__table">
      <thead class="paginator-demo__table-head">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Nick</th>
          <th>Sign</th>
          <th>Platform</th>
          <th>Role</th>
          <th>From</th>
          <th>Status</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody class="paginator-demo__table-body">
        <tr v-for="(item, index) in tableData" :key="index">
          <td>{{item.id}}</td>
          <td>{{item.name}}</td>
          <td>{{item.nick}}</td>
          <td>{{item.sign}}</td>
          <td>{{item.platform}}</td>
          <td>{{item.role}}</td>
          <td>{{item.from}}</td>
          <td>{{item.status === '1' ? 'active' : 'disabled'}}</td>
          <td>{{item.date}}</td>
        </tr>
      </tbody>
    </table>
    <div class="paginator-demo__paginator">
      <paginator :index="index" :size="size" :total="total" :length="length" :options="options" @change-page="changePage"/>
    </div>
  </div>
</template>

<script>
import Axios from 'axios';
import Paginator from './Paginator';

export default {
  name: 'PaginatorDemo',
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
      const params = {
        _start: (this.index - 1) * this.size,
        _limit: this.size
      };
      Axios({
        method: 'GET',
        url: '/users',
        params
      }).then(res => {
        this.tableData = res.data;
        this.total = 50;
      });
    }
  }
};
</script>

<style>
.paginator-demo__table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  font-size: 13px;
}

.paginator-demo__table-head {
  background: #f5f6fa;
}

.paginator-demo__table tr {
  height: 40px;
  border-bottom: 1px solid #ccc;
}

.paginator-demo__table th {
  text-align: center;
  font-weight: normal;
  height: 39px;
  line-height: 39px;
}

.paginator-demo__table td {
  word-wrap: break-word;
  text-align: center;
  height: 39px;
  line-height: 39px;
}

.paginator-demo__paginator {
  display: table;
  margin: 20px auto;
}
</style>
