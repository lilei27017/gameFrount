<template>
  <div class="app-container">
    <el-form :inline="true" :model="form" class="demo-form-inline">
      <el-form-item>
        <el-col :span="8">
          <el-select v-model="form.type" filterable placeholder="">
            <el-option
              v-for="item in form.infoType"
              :lable="item.type"
              :key="item.id"
              :value="item.type">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="16">
          <el-input v-model="form.info"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <el-row style="margin-bottom: 20px">
      <el-col :span="6">
        总金币：
        <span style="color: #F00">{{other.total_gold}}</span>
      </el-col>
      <el-col :span="6">
        当日赠送：
        <span style="color: #F00">{{other.off_total}}</span>
      </el-col>
      <el-col :span="6">
        当日赠送笔数：
        <span style="color: #F00">{{other.off_times}}</span>
      </el-col>
    </el-row>
    <el-table
      :data="list"
      v-loading.body="listLoading"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      style="width: 100%;">
      <el-table-column label="推广号" align="center" prop="UserID"></el-table-column>
      <el-table-column label="昵称" align="center" prop="NickName"></el-table-column>
      <el-table-column label="资产" align="center" prop="gold"></el-table-column>
      <el-table-column label="礼物笔数" align="center" prop="deal_time"></el-table-column>
      <el-table-column label="近一周总额" align="center" prop="week_total"></el-table-column>
      <el-table-column
        label="操作">
        <template scope="scope">
          <el-button
          @click.native.prevent="handleClick(scope.row.UserID)"
            type="text"
            size="small">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        style="margin: 40px 0"
        @current-change="handleChange"
        background
        :current-page="page.curr"
        :page-size="page.size"
        :total="page.total"
        layout="prev, pager, next, jumper">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { getList, deleteList } from '@/api/table'
  import utils from '../../utils/index'

  export default {
    data() {
      return {
        page: {curr: 1, size: 15, total: 0},
        form: {
          infoType: [{type: '玩家ID', id: 'uid'},{type: '玩家昵称', id: 'user_nick'}],
          info: '',
        },
        list: [],
        listLoading: false,
        other: {
          total_gold: '',
          off_total: '',
          off_times: '',
        },
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
      handleChange(p){
        this.page.curr = p
        this.fetchData()
      },
      handleSearch(){
        let query = utils.buildGetParams({
          page: this.page,
          uid: this.form.type === '玩家ID' ? this.form.info : '',
          user_nick: this.form.type === '玩家昵称' ? this.form.info : '',
        })
        console.log(query)
        getList('/vips?' + query).then(response => {
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
        getList('/vips?' + params).then(response => {
          // console.log(response.data)
          this.list = response.data.data
          this.other = response.data.other
          this.page.total = response.data.total
          this.listLoading = false
        })
      },
      handleClick (id) {
        console.log(id)
        this.$confirm('即将删除，是否继续', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( () => {
          deleteList('/vips/user?uid=' + id).then((data) => {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.fetchData()
          })
        })
      },
    }
  }
</script>
