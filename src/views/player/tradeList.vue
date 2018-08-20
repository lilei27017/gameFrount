<template>
  <div class="app-container">
    <el-card>
      <!--<el-form :inline="true" :model="form" class="demo-form-inline">-->
        <!--<el-form-item label="用户推广号:">-->
          <!--<el-input v-model="form.name" placeholder=""></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="时间">-->
          <!--<el-col :span="11">-->
            <!--<el-date-picker type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择开始日期" v-model="form.time_begin" style="width: 100%;"></el-date-picker>-->
          <!--</el-col>-->
          <!--<span style="display: block; float: left"> - </span>-->
          <!--<el-col :span="11">-->
            <!--<el-date-picker type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择结束日期" v-model="form.time_end" style="width: 100%;"></el-date-picker>-->
          <!--</el-col>-->
        <!--</el-form-item>-->
        <!--<el-form-item>-->
          <!--<el-button type="primary" @click="handleSearch">查询</el-button>-->
        <!--</el-form-item>-->
      <!--</el-form>-->
      <el-row style="margin-bottom: 20px">
        <el-col :span="6">
          玩家金币总数：
          <span style="color: #F00">{{other.goldTotal}}</span>
        </el-col>
        <el-col :span="6">
          总输赢：
          <span style="color: #F00">{{other.goldTotal}}</span>
        </el-col>
        <el-col :span="6">
          总买分：
          <span style="color: #F00">{{other.goldTotal}}</span>
        </el-col>
      </el-row>
      <el-table
        :data="list"
        element-loading-text="Loading"
        border
        highlight-current-row
        style="width: 100%">
        <el-table-column label="推广号" prop="OtherUser_Id" align="center"></el-table-column>
        <el-table-column label="昵称" prop="NickName" align="center"></el-table-column>
        <el-table-column sortable label="注册时间" prop="RegisterDate" align="center"></el-table-column>
        <el-table-column sortable label="金币" prop="goldTotal" align="center"></el-table-column>
        <el-table-column sortable label="总输赢" prop="realScore" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.realScore > 0" style="color: red">{{scope.row.realScore}}</span>
            <span v-else>{{scope.row.realScore}}</span>
          </template>
        </el-table-column>
        <el-table-column sortable label="当日输赢" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.todayAllChange > 0" style="color: red">{{scope.row.todayAllChange}}</span>
            <span v-else>{{scope.row.todayAllChange}}</span>
          </template>
        </el-table-column>
        <el-table-column sortable label="礼物接收(A)" prop="onTotal" align="center"></el-table-column>
        <el-table-column sortable label="礼物赠送(B)" prop="offTotal" align="center"></el-table-column>
        <el-table-column sortable label="A-B" prop="" align="center"></el-table-column>
        <el-table-column sortable label="接收笔数" prop="deal_number" align="center"></el-table-column>
        <el-table-column sortable label="最后作弊完成时间" prop="lastRecordDate" align="center"></el-table-column>
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
          name: '',
          time_begin: '',
          time_end: '',
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
      // handleSearch(){
      //   let query = utils.buildGetParams({
      //     page: this.page,
      //     rome_name: this.form.room_name,
      //     register_time_begin: this.form.time_begin,
      //     register_time_end: this.form.time_end,
      //   })
      //   console.log(query)
      //   getList('/users/deal_record?' + query).then(response => {
      //     this.list = response.data.data
      //     this.page.total = response.data.total
      //     this.listLoading = false
      //   })
      // },
      handleChange(p){
        this.page.curr = p
        this.fetchData()
      },
      fetchData() {
        let params = utils.buildGetParams({
          "page": this.page,
        })
        console.log(params)
        getList('/users/deal_record?'+ params).then(response => {
          // console.log(response.data)
          this.list = response.data.data
          this.other = response.data.other
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
