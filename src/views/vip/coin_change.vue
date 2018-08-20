<template>
  <div class="app-container">
    <el-card>
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
        <!--<el-form-item label="时间">-->
          <!--<el-col :span="11">-->
            <!--<el-date-picker type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择开始日期" v-model="form.time_begin" style="width: 100%;"></el-date-picker>-->
          <!--</el-col>-->
          <!--<span style="display: block; float: left"> - </span>-->
          <!--<el-col :span="11">-->
            <!--<el-date-picker type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择结束日期" v-model="form.time_end" style="width: 100%;"></el-date-picker>-->
          <!--</el-col>-->
        <!--</el-form-item>-->

        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
        </el-form-item>
      </el-form>
      <el-row style="margin-bottom: 20px">
        <el-col :span="6">
          赠送总金币：
          <span style="color: #F00">{{other.off_total}}</span>
        </el-col>
        <el-col :span="6">
          赠送笔数：
          <span style="color: #F00">{{other.off_times}}</span>
        </el-col>
        <el-col :span="6">
          赠送顺差：
          <span style="color: #F00">{{other.off_sub}}</span>
        </el-col>
        <el-col :span="6">
          交易人数：
          <span style="color: #F00">{{other.on_times}}</span>
        </el-col>
      </el-row>
      <el-table
        :data="list"
        element-loading-text="Loading"
        border
        highlight-current-row
        style="width: 100%;">
        <el-table-column label="推广号" prop="UserID" align="center"></el-table-column>
        <el-table-column label="昵称" prop="NickName" align="center"></el-table-column>
        <el-table-column label="赠送金币(A)" prop="off_total" align="center"></el-table-column>
        <el-table-column label="接收金币(B)" prop="on_total" align="center"></el-table-column>
        <el-table-column label="笔数" prop="deal_time" align="center"></el-table-column>
        <!--<el-table-column label="人数" prop="author" align="center"></el-table-column>-->
        <el-table-column label="赠送顺差(A-B)" prop="sub_total" align="center"></el-table-column>
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
          infoType: [{type: '玩家ID', id: 'uid'},{type: '玩家昵称', id: 'user_nick'}],
          info: '',
          // time_begin: '',
          // time_end: '',
        },
        other: {
          off_sub: '',
          off_total: '',
          off_times: '',
          on_times: '',
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
        getList('/vips/gold?' + query).then(response => {
          this.list = response.data.data
          this.page.total = response.data.total
          this.listLoading = false
        })
      },
      fetchData() {
        let params = utils.buildGetParams({
          "page": this.page,
        })
        getList('/vips/gold?' + params).then(response => {
          this.list = response.data.data
          this.other = response.data.other
          this.page.total = response.data.total
          this.listLoading = false
        })
      }
    }
  }
</script>
<style rel="stylesheet/sass" scoped>
  .pagination {
    margin: 15px -5px 0 -5px;
    display: inline-block;
  }
</style>
