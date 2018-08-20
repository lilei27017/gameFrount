<template>
  <div class="app-container">
    <el-card>
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="用户推广号:">
          <el-input v-model="form.user_id" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="时间">
          <el-col :span="11">
            <el-date-picker type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择开始日期" v-model="form.time_begin" style="width: 100%;"></el-date-picker>
          </el-col>
          <span style="display: block; float: left"> - </span>
          <el-col :span="11">
            <el-date-picker type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择结束日期" v-model="form.time_end" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
        </el-form-item>
      </el-form>
      <el-row style="margin: 20px 0">
        <el-col :span="6">
          推广号：
          <span style="color: #5e88be">{{other.user_id}}</span>
        </el-col>
        <el-col :span="6">
          昵称：
          <span style="color: #5e88be">{{other.user_name}}</span>
        </el-col>
        <el-col :span="6">
          金币总变动：
          <span style="color: #F00">{{other.total_amount}}</span>
        </el-col>
      </el-row>
      <el-table
        :data="list"
        element-loading-text="Loading"
        border
        highlight-current-row
        style="width: 100%">
        <el-table-column label="时间" prop="LogTime" align="center"></el-table-column>
        <el-table-column label="描述" prop="remark" align="center"></el-table-column>
        <el-table-column label="奖券变化" prop="Amount" align="center"></el-table-column>
        <el-table-column label="变动前奖券" prop="PreAmount" align="center"></el-table-column>
        <el-table-column label="变动后奖券" prop="AftAmount" align="center"></el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          @current-change="handleChange"
          :current-page="page.curr"
          :page-size="page.size"
          :total="page.total"
          layout="prev, pager, next, jumper">
        </el-pagination>
      </div>
    </el-card>

  </div>
</template>

<script>
  import { getList } from '@/api/table'
  import utils from '../../utils/index'

  export default {
    data() {
      return {
        page: {curr: 1, size: 15, total: 0},
        list: null,
        listLoading: true,
        dialogFormVisible: false,
        form: {
          user_id: '',
          time_begin: '',
          time_end: ''
        },
        other: {
          total_amount: '',
          user_name: '',
          user_id: ''
        },
        formLabelWidth: '120px'
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      handleSearch(){
        if (this.form.user_id === undefined){
          this.$message({
            type: "warning",
            message: '用户推广号必填'
          })
          return false
        }else {
          let query = utils.buildGetParams({
            page: this.page,
            user_id: this.form.user_id,
            time_begin: this.form.time_begin,
            time_end: this.form.time_end,
          })
          getList('/users/ticket_change?' + query).then(response => {
            if (response.data.total == 0) {
              this.$message({
                type: "error",
                message: "无匹配用户"
              })
            } else {
              this.list = response.data.data
              this.page.total = response.data.total
              this.other = response.data.other
              this.listLoading = false
            }
          })
        }

      },
      handleChange(p){
        this.page.curr = p
      },
      fetchData() {
        var user_id = this.$route.query.user_id
        this.form.user_id = user_id
        console.log("user_id:" +user_id)
        if (user_id == undefined){
          this.$message({
            type: "warning",
            message: "用户推广号必填"
          })
        }else (
          getList('/users/ticket_change?user_id=' + user_id).then(response => {
            if (response.data.total == 0) {
              this.$message({
                type: "error",
                message: "无匹配用户"
              })
            } else {
              this.list = response.data.data
              this.page.total = response.data.total
              this.listLoading = false
            }
          })
        )

      }
    }
  }
</script>
<style rel="stylesheet/sass">
  .pagination {
    margin: 15px -5px 0 -5px;
    display: inline-block;
  }
</style>
