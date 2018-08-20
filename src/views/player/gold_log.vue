<template>
  <div class="app-container">
    <el-row style="margin: 20px 0">
      <el-col :span="6">
        推广号：
        <span style="color: #5e88be">{{user_id}}</span>
      </el-col>
      <el-col :span="6">
        昵称：
        <span style="color: #5e88be">{{other.nick_name}}</span>
      </el-col>
      <el-col :span="6">
        金币总变动：
        <span style="color: #F00">{{other.total}}</span>
      </el-col>
    </el-row>
    <el-table
      :data="list"
      v-loading.body="listLoading"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      style="width: 100%;">
      <el-table-column
        align="center"
        label="时间"
        prop="LogTime">
      </el-table-column>
      <el-table-column
        align="center"
        prop="Remark"
        label="描述">
      </el-table-column>
      <el-table-column
        align="center"
        prop="Amount"
        label="金币变化">
      </el-table-column>
      <el-table-column
        align="center"
        prop="AftAmount"
        label="变动前金币">
      </el-table-column>
      <el-table-column
        align="center"
        prop="PreAmount"
        label="变动后金币">
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        background
        @current-change="handleChange"
        :current-page="page.curr"
        :page-size="page.size"
        :total= "page.total"
        layout="prev, pager, next, jumper">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { getList } from '@/api/table'
  import utils from '../../utils/index'

  export default {
    data() {
      return {
        user_id: '',
        page: {curr: 1, size: 15, total: 0},
        list: [],
        listLoading: false,
        other:{
          total: '',
          nick_name: ''
        },
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      handleChange(p){
        this.page.curr = p
        this.fetchData()
      },
      fetchData() {
        this.user_id = this.$route.query.user_id
        let params = utils.buildGetParams({
          "user_id" : this.$route.query.user_id,
          "server_id": this.$route.query.server_id,
          "page": this.page,
        })
        getList('/users/gold_log?'+ params).then(response => {
          this.list = response.data.data
          this.page.total = response.data.total
          this.other = response.data.other
          this.listLoading = false
        })
      },
    }
  }
</script>
