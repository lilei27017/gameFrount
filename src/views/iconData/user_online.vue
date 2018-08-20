<template>
  <div class="app-container">
    <el-card>
      <el-tabs v-model="active" @tab-click="">
        <!--    -->
        <el-tab-pane label="在线数据" name="first">
          <el-form :inline="true" :model="form" class="demo-form-inline">
            <el-form-item label="用户类型">
              <el-select v-model="form.user_type" placeholder="请选择">
                <el-option label="普通用户" value="0"></el-option>
                <el-option label="内部用户" value="1"></el-option>
                <el-option label="银商" value="2"></el-option>
                <el-option label="大R" value="3"></el-option>
                <el-option label="小R" value="4"></el-option>
                <el-option label="异常" value="5"></el-option>
                <el-option label="至尊VIP" value="6"></el-option>
              </el-select>
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
          <div id="myChart" :style="{width: '100%', height: '500px'}"></div>
          <!--<el-row style="margin-top: 20px;">-->
            <!--<el-col :span="12"> </el-col>-->
            <!--<el-col :span="24" style="background: #eee; height: 40px; line-height: 40px; text-align: center">-->
              <!--游戏平台当前在线-->
              <!--<span style="color: #F00;">{{123123}}</span>-->
              <!--人(即时数据)-->
            <!--</el-col>-->
          <!--</el-row>-->
          <!--<el-table-->
            <!--:data="list"-->
            <!--element-loading-text="Loading"-->
            <!--border-->
            <!--highlight-current-row-->
            <!--style="width: 100%;">-->
            <!--<el-table-column label="房间" prop="author" align="center"></el-table-column>-->
            <!--<el-table-column label="当前在线人数" prop="author" align="center">-->
              <!--<template scope="scope">-->
                <!--<span>{{scope.row.pageviews}}</span>-->
                <!--<el-button-->
                  <!--@click.native.prevent="edit(scope.$index)"-->
                  <!--type="text"-->
                  <!--size="small">-->
                  <!--【详细】-->
                <!--</el-button>-->
              <!--</template>-->
            <!--</el-table-column>-->
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
        </el-tab-pane>
        <!--    -->
        <el-tab-pane label="日平均在线" name="second">
          <el-form :inline="true" :model="form3" class="demo-form-inline">
            <el-form-item label="用户类型">
              <el-select v-model="form3.user_type" placeholder="请选择">
                <el-option label="普通用户" value="0"></el-option>
                <el-option label="内部用户" value="1"></el-option>
                <el-option label="银商" value="2"></el-option>
                <el-option label="大R" value="3"></el-option>
                <el-option label="小R" value="4"></el-option>
                <el-option label="异常" value="5"></el-option>
                <el-option label="至尊VIP" value="6"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="时间">
              <el-col :span="11">
                <el-date-picker type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择开始日期" v-model="form3.time_begin" style="width: 100%;"></el-date-picker>
              </el-col>
              <span style="display: block; float: left"> - </span>
              <el-col :span="11">
                <el-date-picker type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择结束日期" v-model="form3.time_end" style="width: 100%;"></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSearch3">查询</el-button>
            </el-form-item>
          </el-form>
          <div id="myChart3" :style="{width: '1000px', height: '400px'}"></div>
        </el-tab-pane>
        <!--    -->
        <el-tab-pane label="日最高在线" name="third">
          <el-form :inline="true" :model="form2" class="demo-form-inline">
            <el-form-item label="用户类型">
              <el-select v-model="form2.user_type" placeholder="请选择">
                <el-option label="普通用户" value="0"></el-option>
                <el-option label="内部用户" value="1"></el-option>
                <el-option label="银商" value="2"></el-option>
                <el-option label="大R" value="3"></el-option>
                <el-option label="小R" value="4"></el-option>
                <el-option label="异常" value="5"></el-option>
                <el-option label="至尊VIP" value="6"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="时间">
              <el-col :span="11">
                <el-date-picker type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择开始日期" v-model="form2.time_begin" style="width: 100%;"></el-date-picker>
              </el-col>
              <span style="display: block; float: left"> - </span>
              <el-col :span="11">
                <el-date-picker type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择结束日期" v-model="form2.time_end" style="width: 100%;"></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSearch2">查询</el-button>
            </el-form-item>
          </el-form>

          <div id="myChart2" :style="{width: '1000px', height: '400px'}"></div>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <el-dialog title="" width="40%" :visible.sync="dialogTableVisible">
      <el-table style="width: 100%" :data="list" :height="300">
        <el-table-column property="author" label="房间" align="center"></el-table-column>
        <el-table-column property="pageviews" label="人数" align="center"></el-table-column>
      </el-table>
    </el-dialog>

  </div>
</template>

<script>
  import { getList } from '@/api/table'
  import utils from '../../utils/index'

  export default {
    data() {
      return {
        page: {curr: 1, size: 15, total: 0},
        active: 'first',
        innerVisible: false,
        list: null,
        listLoading: true,
        dialogTableVisible: false,
        form:{
          user_type: '',
          time_begin: '',
          time_end: ''
        },
        form2:{
          user_type: '',
          time_begin: '',
          time_end: ''
        },
        form3:{
          user_type: '',
          time_begin: '',
          time_end: ''
        },
        times: [],
        times2: [],
        times3: [],
        info: [],
        info2: [],
        info3: [],
      }
    },
    filters: {
    },
    created() {
    },
    mounted(){
      this.fetchData1()
      this.fetchData2()
      this.fetchData3()
    },
    methods: {
      handleChange(p){
        this.page.curr = p
        this.fetchData()
      },
      handleSearch(){
        this.fetchData1()
      },
      handleSearch2(){
        this.fetchData2()
      },
      handleSearch3(){
        this.fetchData3()
      },
      fetchData1(){
        let query = utils.buildGetParams({
          user_type: this.form.user_type,
          time_begin: this.form.time_begin,
          time_end: this.form.time_end,
        })
        getList('/totals/online?' + query).then(response => {
          this.times = response.data.data.times
          this.info = response.data.data.info
          this.drawLine1()
        })
      },
      fetchData2(){
        let query2 = utils.buildGetParams({
          user_type: this.form2.user_type,
          time_begin: this.form2.time_begin ? this.form2.time_begin : '',
          time_end: this.form2.time_end ? this.form2.time_end : '',
        })
        getList('/totals/online_high?' + query2).then(response => {
          this.times2 = response.data.data.times
          this.info2 = response.data.data.info
          this.drawLine2()
        })
      },
      fetchData3() {
        var w = new Date()
        var y = w.getFullYear()
        var m = w.getMonth() + 1
        var d = w.getDate()
        var time_end = y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d)
        var lw = new Date(w - 1000 * 60 * 60 * 24*29)
        var lY = lw.getFullYear()
        var lM = lw.getMonth() + 1
        var lD = lw.getDate()
        var time_begin = lY + '-' + (lM < 10 ? '0' + lM : lM) + '-' + (lD < 10 ? '0' + lD : lD)
        this.form3.time_begin
        this.form3.time_end
        let query3 = utils.buildGetParams({
          user_type: this.form3.user_type,
          time_begin: this.form3.time_begin ? this.form3.time_begin : time_begin,
          time_end: this.form3.time_end ? this.form3.time_end : time_end
        })
        getList('/totals/online_aver?' + query3).then(response => {
          this.times3 = response.data.data.times
          this.info3 = response.data.data.info
          this.drawLine3()
        })

      },
      edit() {
        this.dialogTableVisible = true
      },

      drawLine1(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        myChart.setOption({
          // option = {
          //   title: {
          //     text: '折线图堆叠'
          //   },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: this.times
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
              data: ['0:00','0:30','01:00','01:30','02:00','02:30','03:00','03:30','04:00','04:30','05:00','05:30','06:00','06:30','07:00','07:30','08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30','22:00','22:30','23:00','23:30']
              // data: this.times
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                name: this.times[0],
                type:'line',
                stack: '总量',
                data: this.info[0]
              },
              {
                name: this.times.length >1 ? this.times[1] : '',
                type:'line',
                stack: '总量',
                data: this.info.length >1 ? this.info[1] : '',
              },
              {
                name: this.times.length >2 ? this.times[2] : '',
                type:'line',
                stack: '总量',
                data: this.info.length >2 ? this.info[2] : '',
              },
              {
                name: this.times.length >3 ? this.times[3] : '',
                type:'line',
                stack: '总量',
                data: this.info.length >3 ? this.info[3] : '',
              },
              {
                name: this.times.length >4 ? this.times[4] : '',
                type:'line',
                stack: '总量',
                data: this.info.length >4 ? this.info[4] : '',
              },
              {
                name: this.times.length >5 ? this.times[5] : '',
                type:'line',
                stack: '总量',
                data: this.info.length >5 ? this.info[5] : '',
              },
              {
                name: this.times.length >6 ? this.times[6] : '',
                type:'line',
                stack: '总量',
                data: this.info.length >6 ? this.info[6] : '',
              },
              {
                name: this.times.length >7 ? this.times[7] : '',
                type:'line',
                stack: '总量',
                data: this.info.length >7 ? this.info[7] : '',
              },
              {
                name: this.times.length >8 ? this.times[8] : '',
                type:'line',
                stack: '总量',
                data: this.info.length >8 ? this.info[8] : '',
              },
              {
                name: this.times.length >9 ? this.times[9] : '',
                type:'line',
                stack: '总量',
                data: this.info.length >9 ? this.info[9] : '',
              },
              {
                name: this.times.length >10 ? this.times[10] : '',
                type:'line',
                stack: '总量',
                data: this.info.length >10 ? this.info[10] : '',
              },
              {
                name: this.times.length >11 ? this.times[11] : '',
                type:'line',
                stack: '总量',
                data: this.info.length >11 ? this.info[11] : '',
              },
              {
                name: this.times.length >12 ? this.times[12] : '',
                type:'line',
                stack: '总量',
                data: this.info.length >12 ? this.info[12] : '',
              },
              {
                name: this.times.length >13 ? this.times[13] : '',
                type:'line',
                stack: '总量',
                data: this.info.length >13 ? this.info[13] : '',
              },
              {
                name: this.times.length >14 ?  this.times[14] : '',
                type:'line',
                stack: '总量',
                data: this.info.length >14 ? this.info[14] : '',
              },
              {
                name: this.times.length >15 ? this.times[15] : '',
                type:'line',
                stack: '总量',
                data: this.info.length >15 ? this.info[15] : '',
              },
            ]
        });
      },
      drawLine2(){
        let myChart2 = this.$echarts.init(document.getElementById('myChart2'))
        myChart2.setOption({
          xAxis: {
            type: 'category',
            data: this.times2
          },
          tooltip: {
            trigger: 'axis'
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: this.info2,
            type: 'line'
          }]
        });
      },
      drawLine3(){
        let myChart3 = this.$echarts.init(document.getElementById('myChart3'))
        myChart3.setOption({
          xAxis: {
            type: 'category',
            data: this.times3
          },
          tooltip: {
            trigger: 'axis'
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: this.info3,
            type: 'line'
          }]
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
