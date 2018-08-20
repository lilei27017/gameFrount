<template>
  <div class="app-container">
    <el-card>
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="用户推广号:">
          <el-input v-model="form.user_id" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="时间">
          <el-col :span="11">
            <el-date-picker type="datetime" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择开始日期" v-model="form.time_begin" style="width: 100%;"></el-date-picker>
          </el-col>
          <span style="display: block; float: left"> - </span>
          <el-col :span="11">
            <el-date-picker type="datetime" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择结束日期" v-model="form.time_end" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="游戏房间:">
          <el-input v-model="form.server_id" placeholder=""></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="list"
        element-loading-text="Loading"
        border
        highlight-current-row
        style="width: 100%" >
        <el-table-column label="房间" prop="roomName" align="center"></el-table-column>
        <el-table-column label="总输赢" prop="total" align="center"></el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="140px">
          <template scope="scope">
            <el-button
              @click.native.prevent="details(scope.row.ServerId)"
              type="text"
              size="small">
              金币变动详情
            </el-button>
          </template>
        </el-table-column>
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
    <!--<el-card style="margin-top: 20px;">-->
      <!--<el-row>-->
        <!--<el-col :span="12"> </el-col>-->
        <!--<el-col :span="24" style="background: #eee; height: 40px; line-height: 40px; text-align: center">-->
          <!--玩家金币变动记录-->
        <!--</el-col>-->
        <!--</el-row>-->
      <!--<el-row style="margin: 20px 0">-->
        <!--<el-col :span="4">-->
          <!--推广号：-->
          <!--<span>{{123123}}</span>-->
        <!--</el-col>-->
        <!--<el-col :span="4">-->
          <!--昵称：-->
          <!--<span>123</span>-->
        <!--</el-col>-->
        <!--<el-col :span="4">-->
          <!--userID：-->
          <!--<span>123</span>-->
        <!--</el-col>-->
        <!--<el-col :span="4">-->
          <!--金币总变动：-->
          <!--<span style="color: #F00">123</span>-->
        <!--</el-col>-->
      <!--</el-row>-->
      <!--<el-table-->
          <!--:data="list"-->
          <!--element-loading-text="Loading"-->
          <!--border-->
          <!--highlight-current-row-->
          <!--style="width: 100%">-->
          <!--<el-table-column label="时间" prop="display_time" align="center"></el-table-column>-->
          <!--<el-table-column label="描述" prop="pageviews" align="center"></el-table-column>-->
          <!--<el-table-column label="金币变化" prop="pageviews" align="center"></el-table-column>-->
          <!--<el-table-column label="变动前金币" prop="pageviews" align="center"></el-table-column>-->
        <!--</el-table>-->
      <!--<div class="pagination">-->
          <!--<el-pagination-->
            <!--background-->
    <!--@current-change="handleChange"-->
    <!--:current-page="page.curr"-->
            <!--:page-size="page.size"-->
            <!--:total="page.total"-->
            <!--layout="prev, pager, next, jumper">-->
          <!--</el-pagination>-->
        <!--</div>-->
    <!--</el-card>-->

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
          server_id: '',
          time_begin: '',
          time_end: '',
        },
        formLabelWidth: '120px'
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      handleChange(p){
        this.page.curr = p
        this.form.user_id = user_id
        this.fetchData()
      },
      handleSearch(){
        if (this.form.user_id == undefined){
          this.$message({
            type: "warning",
            message: '用户推广号必填'
          })
          return false
        }else {
          let query = utils.buildGetParams({
            page: this.page,
            user_id: this.form.user_id,
            server_id: this.form.server_id,
            time_begin: this.form.time_begin,
            time_end: this.form.time_end,
          })
          getList('/users/gold_change?' + query).then(response => {
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
        }

      },
      fetchData() {
        var user_id = this.$route.query.user_id
        this.form.user_id = user_id
        if (user_id == undefined){
          this.$message({
            type: "warning",
            message: "用户推广号必填"
          })
        }else (
          getList('/users/gold_change?user_id=' + user_id).then(response => {
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
      },
      details(ServerId){
        var user_id = this.$route.query.UserID ? this.$route.query.UserID : this.form.user_id
        this.$router.push({path: './goldLog', query:{
            user_id: user_id,
            server_id: ServerId,
            }
        })

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
