<template>
  <div class="demo">
    <table class="demo__table">
      <thead class="demo__table-head">
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
      <tbody class="demo__table-body">
        <tr v-for="item in tableData.items">
          <td>{{item.id}}</td>
          <td>{{item.name}}</td>
          <td>{{item.nick}}</td>
          <td>{{item.sign}}</td>
          <td>{{item.platform}}</td>
          <td>{{item.role}}</td>
          <td>{{item.from}}</td>
          <td>{{item.status === '1'? 'active': 'disabled'}}</td>
          <td>{{item.date}}</td>
        </tr>
      </tbody>
    </table>
    <div class="paginator-wrapper">
      <pagitable :index="index" :size="size" :total="total" :length="length" :options="options" @change-page="changePage"></pagitable>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Pagitable from './pagitable'

  export default {
    data() {
      return {
        index: 1,
        size: 5,
        total: 0,
        length: 5,
        options: [10, 20, 30],
        tableData: []
      }
    },
    components: {
      Pagitable
    },
    ready() {
      this.getUsers()
    },
    methods: {
      changePage(index, size) {
        this.index = index
        this.size = size
        this.getUsers()
      },
      getUsers() {
        const getUsersUrl = '/api/users'
        let params = {
          index: this.index,
          size: this.size
        }
        this.$http.get(getUsersUrl, {params: params}).then((response) => {
          let json = response.data
          let data = json.data
          if (json.code === 0) {
            this.tableData = data
            this.total = data.total
          }
        }, (response) => {
          console.log(response)
        })
      }
    }
  }
</script>

<style>
  .demo__table {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
    font-size: 13px;
  }

  .demo__table-head {
    background: #F5F6FA;
  }

  .demo__table tr {
    height: 40px;
    border-bottom: 1px solid #ccc;
  }

  .demo__table th {
    text-align: center;
    font-weight: normal;
    height: 39px;
    line-height: 39px;
  }

  .demo__table td {
    word-wrap: break-word;
    text-align: center;
    height: 39px;
    line-height: 39px;
  }

  .paginator-wrapper {
    display: table;
    margin: 20px auto;
  }
</style>
