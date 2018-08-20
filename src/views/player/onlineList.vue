<template>
  <div class="app-container">
    <el-card>
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="房间名称:">
          <el-input v-model="form.room_name" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="注册时间">
          <el-col :span="11">
            <el-date-picker type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择开始日期" v-model="form.register_time_begin" style="width: 100%;"></el-date-picker>
          </el-col>
          <span style="display: block; float: left"> - </span>
          <el-col :span="11">
            <el-date-picker type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择结束日期" v-model="form.register_time_end" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <!--<el-form-item label="控制状态:">-->
          <!--<el-select v-model="form.status" clearable placeholder="请选择">-->
            <!--<el-option label="吐分" value="吐分"></el-option>-->
            <!--<el-option label="吃分" value="吃分"></el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="游戏平台:">-->
          <!--<el-select v-model="form.platform_id" clearable placeholder="请选择">-->
            <!--<el-option label="赢" value="赢"></el-option>-->
            <!--<el-option label="输" value="输"></el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
        </el-form-item>
      </el-form>
      <el-row style="margin-bottom: 20px">
        <el-col :span="6">
          金币数：
          <span style="color: #F00">{{other.goldTotal}}</span>
        </el-col>
        <el-col :span="6">
          奖券：
          <span style="color: #F00">{{other.ticketTotal}}</span>
        </el-col>
        <el-col :span="6">
          充值：
          <span style="color: #F00">{{other.rechargeTotal}}</span>
        </el-col>
        <el-col :span="6">
          总输赢：
          <span style="color: #F00">{{other.realScore}}</span>
        </el-col>
      </el-row>
      <el-table
        :data="list"
        element-loading-text="Loading"
        border
        highlight-current-row
        style="width: 100%; max-height: 800px">
        <el-table-column sortable label="房间名称" prop="RoomName" align="center"></el-table-column>
        <el-table-column label="推广号" prop="UserID" align="center"></el-table-column>
        <el-table-column label="昵称" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.NickName}}</span>
            <span style="color: red">{{scope.row.memo}}</span>
          </template>
        </el-table-column>
        <el-table-column sortable label="资产" prop="goldTotal" align="center"></el-table-column>
        <el-table-column label="奖券" prop="ticketTotal" align="center"></el-table-column>
        <el-table-column label="充值" prop="rechargeTotal" align="center"></el-table-column>
        <el-table-column label="转账" prop="offScore" align="center"></el-table-column>
        <el-table-column sortable label="注册时间" prop="RegisterDate" align="center"></el-table-column>
        <el-table-column sortable label="最后登陆时间" prop="LastLogonDate" align="center"></el-table-column>
        <el-table-column sortable label="总输赢" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.realScore > 0" style="color: red">{{scope.row.realScore}}</span>
            <span v-else>{{scope.row.realScore}}</span>
          </template>
        </el-table-column>
        <el-table-column sortable label="当日输赢" prop="author" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.todayScore > 0" style="color: red">{{scope.row.todayScore}}</span>
            <span v-else>{{scope.row.todayScore}}</span>
          </template></el-table-column>
        <el-table-column label="作弊率" prop="CheatRate" align="center"></el-table-column>
        <el-table-column label="作弊限额" prop="LimitScore" align="center"></el-table-column>
        <el-table-column label="最后作弊完成时间" prop="EndCheatDate" align="center"></el-table-column>
        <el-table-column label="游戏平台" prop="Platform_Id" align="center"></el-table-column>
        <el-table-column label="类型" prop="MemberOrder" align="center"></el-table-column>
        <el-table-column
          label="操作">
          <template scope="scope">
            <el-button
              @click.native.prevent="handleClick(scope.row.UserID)"
              type="text"
              size="small">
              详情
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

  </div>
</template>

<script>
  import { getList } from '@/api/table'
  import utils from '../../utils/index'

  export default {
    data() {
      return {
        page: {curr: 1, size: 100, total: 0},
        list: [],
        listLoading: true,
        dialogFormVisible: false,
        form: {
          room_name: '',
          register_time_begin: '',
          register_time_end: '',
          // status: '',
          platform_id: '',
        },
        other: {
          goldTotal: '',
          ticketTotal: '',
          rechargeTotal: '',
          realScore: '',
        },
        formLabelWidth: '120px'
      }
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'gray',
          deleted: 'danger'
        }
        return statusMap[status]
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      handleClick (id) {
        this.$router.push({path: '/player/userInfo', query:{UserID: id}})
      },
      handleSearch(){
        let query = utils.buildGetParams({
          page: this.page,
          rome_name: this.form.room_name,
          register_time_begin: this.form.register_time_begin,
          register_time_end: this.form.register_time_end,
          // status: this.form.status,
          // platform_id: this.form.platform_id,
        })
        getList('/users/online?' + query).then(response => {
          this.list = response.data.data
          this.page.total = response.data.total
          this.listLoading = false
        })
      },
      handleChange(p) {
        this.page.curr = p
        this.fetchData()
      },
      fetchData() {
        let params = utils.buildGetParams({
          "page": this.page,
        })
        getList('/users/online?' + params).then(response => {
          this.other = response.data.other
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
