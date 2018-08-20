<template>
  <div class="app-container">
    <el-card>
      <!--<el-form :inline="true" :model="form" class="demo-form-inline">-->
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
        <el-col :span="24">
          <h3>金币总量</h3>
        </el-col>
        <el-col :span="12">
          平台总金币：
          <span style="color: #F00">{{other.platform_total}}</span>
        </el-col>
        <el-col :span="12">
          平台当日输赢：
          <span style="color: #F00">{{other.platform_today_win_score}}</span>
        </el-col>
        <el-col :span="12">
          当日赠送金币：
          <span style="color: #F00">{{other.platform_today_off}}</span>
        </el-col>
        <el-col :span="12">
          当日充值获得金币：
          <span style="color: #F00">{{other.platform_today_on}}</span>
        </el-col>

        <el-col :span="24">
          <h3>奖券总量</h3>
        </el-col>
        <el-col :span="12">
          平台总奖券：
          <span style="color: #F00">{{other.ticket_total}}</span>
        </el-col>
        <el-col :span="12">
          当日赠送奖券：
          <span style="color: #F00">{{other.ticket_today_off}}</span>
        </el-col>
        <el-col :span="12">
          当日兑换礼物消耗奖券：
          <span style="color: #F00">{{other.ticket_today_gift_off}}</span>
        </el-col>

        <el-col :span="24">
          <h3>用户注册</h3>
        </el-col>
        <el-col :span="12">
          总注册：
          <span style="color: #F00">{{other.register_all}}</span>
        </el-col>
        <el-col :span="12">
          安卓：
          <span style="color: #F00">{{other.register_android}}</span>
        </el-col>
        <el-col :span="12">
          IOS：
          <span style="color: #F00">{{other.register_ios}}</span>
        </el-col>
        <el-col :span="12">
          今日总注册：
          <span style="color: #F00">{{other.register_today_all}}</span>
        </el-col>
        <el-col :span="12">
          今日安卓注册：
          <span style="color: #F00">{{other.register_today_android}}</span>
        </el-col>
        <el-col :span="12">
          今日IOS注册：
          <span style="color: #F00">{{other.register_today_ios}}</span>
        </el-col>

        <el-col :span="24">
          <h3>充值情况</h3>
        </el-col>
        <el-col :span="12">
          总充值金额：
          <span style="color: #F00">{{other.recharge_total}}</span>
        </el-col>
        <el-col :span="12">
          总充值人次：
          <span style="color: #F00">{{other.recharge_number}}</span>
        </el-col>
        <el-col :span="12">
          当日充值金额：
          <span style="color: #F00">{{other.recharge_today_total}}</span>
        </el-col>
        <el-col :span="12">
          今日充值人次：
          <span style="color: #F00">{{other.recharge_today_number}}</span>
        </el-col>

        <el-col :span="24">
          <h3>  登陆情况</h3>
        </el-col>
        <el-col :span="12">
          总登陆人数：
          <span style="color: #F00">{{other.login_total}}</span>
        </el-col>
        <el-col :span="12">
          今日登陆人数：
          <span style="color: #F00">{{other.login_today_online}}</span>
        </el-col>
        <el-col :span="12">
          当日最高在线：
          <span style="color: #F00">{{other.login_today_total}}</span>
        </el-col>
        <el-col :span="12">
          当前在线：
          <span style="color: #F00">{{other.login_now_online}}</span>
        </el-col>
      </el-row>
      <!--<el-table-->
        <!--:data="list"-->
        <!--element-loading-text="Loading"-->
        <!--border-->
        <!--highlight-current-row-->
        <!--style="width: 100%;">-->
        <!--<el-table-column label="平台当日输赢" align="center" prop="display_time"></el-table-column>-->
        <!--<el-table-column label="当日赠送金币" align="center" prop="pageviews"></el-table-column>-->
        <!--<el-table-column label="当日充值获得金币" align="center" prop="pageviews"></el-table-column>-->
        <!--<el-table-column label="当日赠送奖券" align="center" prop="pageviews"></el-table-column>-->
        <!--<el-table-column label="当日兑换礼物消耗奖券" align="center" prop="pageviews"></el-table-column>-->
        <!--<el-table-column label="安卓" align="center" prop="pageviews"></el-table-column>-->
        <!--<el-table-column label="IOS" align="center" prop="pageviews"></el-table-column>-->
        <!--<el-table-column label="今日充值金额" align="center" prop="pageviews"></el-table-column>-->
        <!--<el-table-column label="今日充值人数" align="center" prop="pageviews"></el-table-column>-->
        <!--<el-table-column label="今日登陆人数" align="center" prop="pageviews"></el-table-column>-->
        <!--<el-table-column label="在线情况" align="center" prop="pageviews"></el-table-column>-->
        <!--<el-table-column label="当日最高在线" align="center" prop="pageviews"></el-table-column>-->
        <!--<el-table-column label="当前在线" align="center" prop="pageviews"></el-table-column>-->
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
    </el-card>


  </div>
</template>

<script>
  import { getList } from '@/api/table'
  import utils from '../../utils/index'

  export default {
    data() {
      return {
        // page: {curr: 1, size: 15, total: 0},
        list: null,
        listLoading: true,
        dialogFormVisible: false,
        form: {
          time_begin: '',
          time_end: ''
        },
        other: {
          platform_total: '',
          platform_today_on: '',
          platform_today_off: '',
          platform_today_win_score: '',
          ticket_total: '',
          ticket_today_off: '',
          ticket_today_gift_off: '',
          register_all: '',
          register_android: '',
          register_ios: '',
          register_today_all: '',
          register_today_android: '',
          register_today_ios: '',
          recharge_total: '',
          recharge_number: '',
          recharge_today_total: '',
          recharge_today_number: '',
          login_total: '',
          login_today_online: '',
          login_today_total: '',
          login_now_online: '',
        },
        formLabelWidth: '120px'
      }
    },
    filters: {

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
        getList('/platforms/details').then(response => {
          this.other = response.data.data
          console.log(this.other)
        })
      },
    }
  }
</script>
<style rel="stylesheet/sass">
  .pagination {
    margin: 15px -5px 0 -5px;
    display: inline-block;
  }
</style>
