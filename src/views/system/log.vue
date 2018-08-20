<template>
  <div class="app-container">
    <el-form :inline="true" :model="form" class="demo-form-inline">
      <el-form-item label="房间信息" auto-complate="off">
      <template>
        <el-select v-model="form.room_id">
          <el-option
            v-for="item in form.room"
            :label="item.room_name"
            :key="item.room_id"
            :value="item.room_id"
          ></el-option>
        </el-select>
      </template>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="list"
      v-loading.body="listLoading"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      style="width: 100%;">
      <el-table-column
        align="center"
        label="时间"
        prop="LogDate">
      </el-table-column>
      <el-table-column
        align="center"
        prop="roomName"
        label="房间">
      </el-table-column>
      <el-table-column
        align="center"
        prop="ServerID"
        label="ServerID">
      </el-table-column>
      <el-table-column
        align="center"
        prop="TodayScore"
        label="当日输赢">
      </el-table-column>
      <el-table-column
        align="center"
        prop="EatScore"
        label="吃分总量">
      </el-table-column>
      <el-table-column
        align="center"
        prop="OutScore"
        label="吐分总量">
      </el-table-column>
      <el-table-column
        align="center"
        prop="percent"
        label="吞吐率">
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        background
        @current-change="handleChange"
        :current-page="page.curr"
        :page-size="page.size"
        :total= "page.total"
        layout="prev, pager, next, jumper">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { getList } from '@/api/table'
  import utils from '../../utils/index'

  export default {
    data() {
      return {
        page: {curr: 1, size: 15, total: 0},
        list: [],
        listLoading: false,
        dialogFormVisible: false,
        formLabelWidth: '120px',
        form:{
          room_id: '',
          room_name: ''
        }
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      handleChange(p){
        this.form.room_id = room_id
        this.page.curr = p
        this.fetchData()
      },
      fetchData() {
        getList('/admins/rooms/all').then((response) => {
          this.form.room = response.data
        })

        var room_id = this.$route.query.room_id
        let params = utils.buildGetParams({
          "page": this.page,
        })
        getList('/admins/rooms/log?room_id='+ room_id + '&' + params).then(response => {
          // console.log(response.data)
          this.list = response.data.data
          this.page.total = response.data.total
          this.listLoading = false
        })
      },
      handleSearch(){
        let query = utils.buildGetParams({
          page : this.page
        })
        let room_id = this.form.room_id
        query = room_id + '&' + query;
        console.log(query)
        getList('/admins/rooms/log?room_id=' + query).then(response => {
          this.list = response.data.data
          this.page.total = response.data.total
          this.listLoading = false
        })
      },
    }
  }
</script>
