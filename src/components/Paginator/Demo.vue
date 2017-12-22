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
        <tr v-for="(user, index) in users" :key="index">
          <td>{{user.id}}</td>
          <td>{{user.name}}</td>
          <td>{{user.nick}}</td>
          <td>{{user.sign}}</td>
          <td>{{user.platform}}</td>
          <td>{{user.role}}</td>
          <td>{{user.from}}</td>
          <td>{{user.status === '1' ? 'active' : 'disabled'}}</td>
          <td>{{user.date}}</td>
        </tr>
      </tbody>
    </table>
    <div class="paginator-demo__paginator">
      <paginator
        :page-index="pageIndex"
        :page-size="pageSize"
        :total="total"
        :pager-length="pagerLength"
        :page-sizes="pageSizes"
        :layout="'pager'"
        :background="false"
        @page-changed="handlePageChanged"
      />
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
      const params = {
        _start: (this.pageIndex - 1) * this.pageSize,
        _limit: this.pageSize
      };
      Axios({
        method: 'GET',
        url: '/users',
        params
      }).then(res => {
        this.users = res.data;
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
