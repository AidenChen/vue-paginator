<template>
  <div class="demo-wrapper">
    <table>
      <thead>
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
      <tbody>
        <tr v-for="item in tableData.items">
          <td>{{item.id}}</td>
          <td>{{item.name}}</td>
          <td>{{item.nick}}</td>
          <td>{{item.sign}}</td>
          <td>{{item.type}}</td>
          <td>{{item.role}}</td>
          <td>{{item.belong}}</td>
          <td>{{item.status}}</td>
          <td>{{item.date}}</td>
        </tr>
      </tbody>
    </table>
    <pagitable :index="index" :size="size" :total="total" :length="length" :options="options" @change-page="changePage"></pagitable>
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
</style>
