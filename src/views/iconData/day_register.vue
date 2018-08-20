<template>
  <div class="app-container">
    <el-card>
      <!--<el-tabs v-model="active" @tab-click="">-->
        <!--<el-tab-pane label="日注册量统计" name="first">-->
          <el-form :inline="true" :model="form" class="demo-form-inline">
            <!--<el-form-item label="游戏平台">-->
              <!--<el-select v-model="form.plat_id" placeholder="请选择">-->
                <!--<el-option label="PC" value="1"></el-option>-->
                <!--<el-option label="IOS" value="2"></el-option>-->
                <!--<el-option label="安卓" value="3"></el-option>-->
              <!--</el-select>-->
            <!--</el-form-item>-->
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

          <div id="myChart" :style="{width: '100%', height: '400px'}"></div>

          <el-row style="margin-top: 20px;">
            <el-col :span="6">
              当日总注册：
              <span style="color: #F00">{{other.total}}</span>
            </el-col>
            <el-col :span="6">
              安卓：
              <span style="color: #F00">{{other.android}}</span>
            </el-col>
            <el-col :span="6">
              AppStore：
              <span style="color: #F00">{{other.ios}}</span>
            </el-col>
          </el-row>
          <el-table
            :data="list"
            element-loading-text="Loading"
            border
            highlight-current-row
            style="width: 100%; margin-top: 20px;">
            <el-table-column label="日期" prop="time" align="center"></el-table-column>
            <el-table-column label="总注册" prop="total" align="center"></el-table-column>
            <el-table-column label="IOS" prop="ios" align="center"></el-table-column>
            <el-table-column label="安卓" prop="android" align="center"></el-table-column>
            <!--<el-table-column label="绑定" prop="author" align="center"></el-table-column>-->
            <!--<el-table-column label="未进房间" prop="author" align="center"></el-table-column>-->
            <!--<el-table-column label="所占比例" prop="author" align="center"></el-table-column>-->
          </el-table>
        <!--</el-tab-pane>-->
        <!--<el-tab-pane label="当日注册" name="second">-->
          <!--<el-form :inline="true" :model="form" class="demo-form-inline">-->
            <!--<el-form-item label="用户类型">-->
              <!--<el-select v-model="form.date2" placeholder="请选择">-->
                <!--<el-option label="赢" value="赢"></el-option>-->
                <!--<el-option label="输" value="输"></el-option>-->
              <!--</el-select>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="时间">-->
              <!--<el-col :span="11">-->
                <!--<el-date-picker type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择开始日期" v-model="form.start_time" style="width: 100%;"></el-date-picker>-->
              <!--</el-col>-->
              <!--<span style="display: block; float: left"> - </span>-->
              <!--<el-col :span="11">-->
                <!--<el-date-picker type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择结束日期" v-model="form.end_time" style="width: 100%;"></el-date-picker>-->
              <!--</el-col>-->
            <!--</el-form-item>-->
            <!--<el-form-item>-->
              <!--<el-button type="primary" @click="">查询</el-button>-->
            <!--</el-form-item>-->
          <!--</el-form>-->
          <!--<el-table-->
            <!--:data="list"-->
            <!--element-loading-text="Loading"-->
            <!--border-->
            <!--highlight-current-row-->
            <!--style="width: 100%; margin-top: 60px">-->
            <!--<el-table-column label="游戏主包" prop="author" align="center"></el-table-column>-->
            <!--<el-table-column label="总注册" prop="author" align="center"></el-table-column>-->
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
        <!--</el-tab-pane>-->
      <!--</el-tabs>-->


    </el-card>

  </div>
</template>

<script>
  import { getList } from '@/api/table'
  import utils from '../../utils/index'

  export default {
    data() {
      return {
        page: {curr: 1, size: 15, total: 10},
        active: 'first',
        innerVisible: false,
        list: null,
        listLoading: true,
        dialogFormVisible: false,
        form: {
          plat_id: '',
          time_begin: '',
          time_end: ''
        },
        other: {
          total: '',
          android: '',
          ios: ''
        },
        formLabelWidth: '160px',
        formLabelWidth2: '100px'
      }
    },
    mounted(){
    },
    created() {
      this.fetchData()
    },
    methods: {
      handleSearch(){
        this.fetchData()
      },
      handleChange(p){
        this.page.curr = p
        this.fetchData()
      },
      fetchData() {
        let query = utils.buildGetParams({
          // plat_id: this.form.plat_id,
          time_begin: this.form.time_begin,
          time_end: this.form.time_end,
        })
        getList('/totals/reg?' + query).then(response => {
          this.times = response.data.data.times
          this.pc = response.data.data.pc.info
          this.ios = response.data.data.ios.info
          this.android = response.data.data.android.info
          this.list = response.data.data.all
          this.other = response.data.other
          this.drawLine();
        })
      },
      drawLine() {
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
          // option = {
          //   title: {
          //     text: '折线图堆叠'
          //   },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['PC', 'IOS', '安卓']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.times
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: 'PC',
              type: 'line',
              stack: '总量',
              data: this.pc
            },
            {
              name: 'IOS',
              type: 'line',
              stack: '总量',
              data: this.ios
            },
            {
              name: '安卓',
              type: 'line',
              stack: '总量',
              data: this.android
            },
          ]
        });
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
