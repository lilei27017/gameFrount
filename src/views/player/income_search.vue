<template>
  <div class="app-container">
    <el-card>
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="时间">
          <el-col :span="9">
            <el-date-picker type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择开始日期" v-model="form.time_begin" style="width: 100%;"></el-date-picker>
          </el-col>
          <span style="display: block; float: left"> - </span>
          <el-col :span="9">
            <el-date-picker type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择结束日期" v-model="form.time_end" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <!--<el-form-item label="输赢:">-->
          <!--<el-col :span="11">-->
            <!--<el-input v-model="form.coin1"></el-input>-->
          <!--</el-col>-->
          <!--<el-col style="text-align: center" class="line" :span="1">-</el-col>-->
          <!--<el-col :span="11">-->
            <!--<el-input v-model="form.coin2"></el-input>-->
          <!--</el-col>-->
        <!--</el-form-item>-->
        <el-form-item label="结果集条数:">
          <el-input v-model="page.size" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="游戏ServerID:">
          <el-input v-model="form.user_id" placeholder=""></el-input>
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
        style="width: 100%">
        <el-table-column label="推广号" prop="User_Id" align="center"></el-table-column>
        <el-table-column label="昵称" prop="NickName" align="center"></el-table-column>
        <el-table-column label="总输赢" prop="total" align="center"></el-table-column>
        <el-table-column label="当日输赢" prop="realScore" align="center"></el-table-column>
        <el-table-column label="接收金币" prop="userGoldTotal" align="center"></el-table-column>
        <el-table-column label="作弊率" prop="CheatRate" align="center"></el-table-column>
        <el-table-column label="作弊限额" prop="LimitScore" align="center"></el-table-column>
        <el-table-column
          label="当前作弊状态"
          align="center"
          prop="cheat_status">
          <template slot-scope="scope">
            <span v-if="scope.row.cheat_status === 0">正常</span>
            <span v-else>锁定</span>
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
          time_begin: '',
          time_end: '',
          user_id: '',
        },
        formLabelWidth: '120px'
      }
    },
    filters: {

    },
    created() {
      // this.fetchData()
    },
    methods: {
      handleSearch(){
        let query = utils.buildGetParams({
          page: this.page,
          user_id: this.form.user_id,
          time_begin: this.form.time_begin,
          time_end: this.form.time_end,
        })
        console.log(query)
        getList('/users/search_win?' + query).then(response => {
          this.list = response.data.data
          this.page.total = response.data.total
          this.listLoading = false
        })
      },
      handleChange(p){
        this.page.curr = p
        this.fetchData()
      },
      fetchData() {
        let params = utils.buildGetParams({
          "page": this.page,
        })
        getList('/users/search_win?'+ params).then(response => {
          this.list = response.data.data
          this.page.total = response.data.total
          this.listLoading = false
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
