<template>
  <div class="app-container">
    <el-card>
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="游戏平台">
          <el-select v-model="form.plat_id" placeholder="请选择">
            <el-option label="PC" value="1"></el-option>
            <el-option label="IOS" value="2"></el-option>
            <el-option label="安卓" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间">
          <el-col :span="11">
            <el-date-picker
              type="date"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              placeholder="选择开始日期"
              v-model="form.time_begin"
              style="width: 100%;"></el-date-picker>
          </el-col>
          <span style="display: block; float: left"> - </span>
          <el-col :span="11">
            <el-date-picker
              type="date" f
              ormat="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              placeholder="选择结束日期"
              v-model="form.time_end"
              style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
        </el-form-item>
      </el-form>
      <el-row style="background: #eee; height: 40px; line-height: 40px">
        <el-col align="center" :span="3">
          平均
        </el-col>
        <el-col :span="3" align="center">
          -
        </el-col>
        <el-col :span="3" align="center">
          {{other.day1Aver}}
        </el-col>
        <el-col :span="3" align="center">
          {{other.day2Aver}}
        </el-col>
        <el-col :span="3" align="center">
          {{other.day3Aver}}
        </el-col>
        <el-col :span="3" align="center">
          {{other.day7Aver}}
        </el-col>
        <el-col :span="3" align="center">
          {{other.day15Aver}}
        </el-col>
        <el-col :span="3" align="center">
          {{other.day30Aver}}
        </el-col>
      </el-row>
      <el-table
        :data="list"
        element-loading-text="Loading"
        border
        highlight-current-row
        style="width: 100%;">
        <!--show-summary-->
        <!--:summary-method="getSummaries"-->
        <el-table-column label="日期" prop="date" align="center"></el-table-column>
        <el-table-column label="注册" prop="day0" align="center"></el-table-column>
        <el-table-column label="1日" prop="day1" align="center"></el-table-column>
        <el-table-column label="2日" prop="day2" align="center"></el-table-column>
        <el-table-column label="3日" prop="day3" align="center"></el-table-column>
        <el-table-column label="7日" prop="day7" align="center"></el-table-column>
        <el-table-column label="15日" prop="day15" align="center"></el-table-column>
        <el-table-column label="30日" prop="day30" align="center"></el-table-column>
      </el-table>

    </el-card>
  </div>
</template>

<script>
  import { getList } from '@/api/table'
  import utils from '../../utils/index'

  export default {
    data() {
      return {
        list: [],
        listLoading: true,
        form: {
          plat_id: '',
          time_begin: '',
          time_end: '',
        },
        other: {
          day1Aver: '',
          day2Aver: '',
          day3Aver: '',
          day7Aver: '',
          day15Aver: '',
          day30Aver: '',
        }
      }
    },
    created() {
      this.fetchData()
    },
    mounted(){
      this.initTimes()
    },
    methods: {
      disabledDate(time){
        return time.getTime() > Date.now()
      },
      initTimes(){
        var date = new Date()
        var lw = new Date(date - 1000 * 60 * 60 * 24 * 29)
        var lY = lw.getFullYear()
        var lM = lw.getMonth() + 1
        var lD = lw.getDate()
        var time_begin = lY + '-' + (lM < 10 ? '0' + lM : lM) + '-' + (lD < 10 ? '0' + lD : lD)
        this.form.time_begin = time_begin
        var w = new Date()
        var y = w.getFullYear()
        var m = w.getMonth() + 1
        var d = w.getDate()
        var time_end = y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d)
        this.form.time_end = time_end
      },
      handleSearch(){
        let query = utils.buildGetParams({
          plat_id: this.form.plat_id,
          time_begin: this.form.time_begin,
          time_end: this.form.time_end,
        })
        getList('/totals/remain?' + query).then(response => {
          this.list = response.data.data
          this.listLoading = false
        })
      },
      fetchData() {
        var w = new Date()
        var y = w.getFullYear()
        var m = w.getMonth() + 1
        var d = w.getDate()
        var time_end = y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d)

        var lw = new Date(w - 1000 * 60 * 60 * 24 * 29)
        var lY = lw.getFullYear()
        var lM = lw.getMonth() + 1
        var lD = lw.getDate()
        var time_begin = lY + '-' + (lM < 10 ? '0' + lM : lM) + '-' + (lD < 10 ? '0' + lD : lD)

        let query = utils.buildGetParams({
          time_begin: time_begin,
          time_end: time_end,
        })
        getList('/totals/remain?' + query).then(response => {
          this.list = response.data.data
          this.other = response.data.other
          console.log(this.other)
          this.listLoading = false
        })
      },

      //合计
      // getSummaries(param) {
      //   const { columns, data } = param;
      //   const sums = [];
      //   columns.forEach((column, index) => {
      //     if (index === 0) {
      //       sums[index] = '合计';
      //       return;
      //     }
      //     const values = data.map(item => Number(item[column.property]));
      //     if (!values.every(value => isNaN(value))) {
      //       sums[index] = values.reduce((prev, curr) => {
      //         const value = Number(curr);
      //         if (!isNaN(value)) {
      //           return prev + curr;
      //         } else {
      //           return prev;
      //         }
      //       }, 0);
      //     } else {
      //     }
      //   });
      //   return sums;
      // }
    }
  }
</script>
<style rel="stylesheet/sass">
  .pagination {
    margin: 15px -5px 0 -5px;
    display: inline-block;
  }
</style>
