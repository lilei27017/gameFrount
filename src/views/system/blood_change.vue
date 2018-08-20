<template>
  <div class="app-container">
    <el-card>
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="房间ServerID:">
          <el-input v-model="form.room_id" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="时间">
          <el-col :span="11">
            <el-date-picker type="datetime" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择开始日期" v-model="form.time_begin" style="width: 100%;"></el-date-picker>
          </el-col>
          <span style="display: block; float: left"> - </span>
          <el-col :span="11">
            <el-date-picker type="datetime" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择结束日期" v-model="form.time_end" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
        </el-form-item>
      </el-form>

      <div id="myChart" :style="{width: '100%', height: '400px'}"></div>

      <el-table
        :data="list"
        element-loading-text="Loading"
        border
        highlight-current-row
        style="width: 100%; margin-top: 20px;">
        <el-table-column label="时间" prop="time" align="center"></el-table-column>
        <el-table-column label="剩余血池" prop="blood" align="center"></el-table-column>
        <!--<el-table-column label="血池平衡值" prop="author" align="center"></el-table-column>-->
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
        page: {curr: 1, size: 15, total: 10},
        active: 'first',
        innerVisible: false,
        list: [],
        listLoading: true,
        dialogFormVisible: false,
        form: {
          room_id: '',
          time_begin: '',
          time_end: ''
        },
        formLabelWidth: '160px',
        formLabelWidth2: '100px',
        dataTime: [],
        dataInfo: []
      }
    },
    mounted(){
      this.fetchData()

    },
    created() {

    },
    methods: {
      handleSearch(){
        let query = utils.buildGetParams({
          room_id : this.form.room_id,
          time_begin: this.form.time_begin ? this.form.time_begin : '',
          time_end: this.form.time_end ? this.form.time_end : '',
        })
        getList('/admins/rooms/blood_log?' + query).then(response => {
          // this.list = response.data.items
          this.dataTime = response.data.data.times
          this.dataInfo = response.data.data.info
          this.list = response.data.data.info
          this.drawLine();
        })
      },
      handleChange(p){
        this.page.curr = p
        this.fetchData()
      },
      fetchData() {
        var w = new Date()
        var y = w.getFullYear()
        var m = w.getMonth() + 1
        var d = w.getDate()
        var h = w.getHours()
        var min = w.getMinutes()
        var s =  w.getSeconds()
        var time_end = y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d) + ' ' + (h < 10 ? '0' + h : h) + ':' + (min < 10 ? '0' + min : min) + ':' +(s < 10 ? '0' + s : s)

        var lw = new Date(w - 1000 * 60 * 60 * 24)
        var lY = lw.getFullYear()
        var lM = lw.getMonth() + 1
        var lD = lw.getDate()
        var time_begin = lY + '-' + (lM < 10 ? '0' + lM : lM) + '-' + (lD < 10 ? '0' + lD : lD) + ' ' + (h < 10 ? '0' + h : h) + ':' + (min < 10 ? '0' + min : min) + ':' +(s < 10 ? '0' + s : s)

        var room_id = this.$route.query.room_id
        let query = utils.buildGetParams({
          room_id : room_id,
          time_begin: time_begin,
          time_end: time_end,
        })
        getList('/admins/rooms/blood_log?' + query).then(response => {
          // this.list = response.data.items
          this.dataTime = response.data.data.times
          this.dataInfo = response.data.data.info
          this.list = response.data.data.all
          console.log(this.list)
          this.drawLine();
        })
      },
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
          // option = {
            title: {
              text: '房间血池变化'
            },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['血池']
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
            data: this.dataTime
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: '血池',
              type: 'line',
              stack: '总量',
              data: this.dataInfo
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
