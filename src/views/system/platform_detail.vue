<template>
  <div class="app-container">
    <el-card>
      <el-form :inline="true" :model="form" class="demo-form-inline">
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
      <el-row style="margin-bottom: 20px">
        <el-col :span="6">
          总充值金币：
          <span style="color: #F00">{{other.gold}}</span>
        </el-col>
        <el-col :span="6">
          总充值：
          <span style="color: #F00">{{other.gold}}</span>
        </el-col>
        <el-col :span="6">
          系统总输赢：
          <span style="color: #F00">{{other.gold}}</span>
        </el-col>
        <el-col :span="6">
          总赠送金币：
          <span style="color: #F00">{{other.gold}}</span>
        </el-col>
        <el-col :span="6">
          总赠送奖券：
          <span style="color: #F00">{{other.gold}}</span>
        </el-col>
        <el-col :span="6">
          VIP总赠送：
          <span style="color: #F00">{{other.gold}}</span>
        </el-col>
        <el-col :span="6">
          总税收：
          <span style="color: #F00">{{other.gold}}</span>
        </el-col>
        <el-col :span="6">
          总顺差：
          <span style="color: #F00">{{other.gold}}</span>
        </el-col>
        <el-col :span="6">
          总赠送比：
          <span style="color: #F00">{{other.gold}}</span>
        </el-col>
      </el-row>
      <el-table
        :data="list"
        element-loading-text="Loading"
        border
        highlight-current-row
        style="width: 100%;">
        <el-table-column label="时间" align="center" prop="display_time"></el-table-column>
        <el-table-column label="新增注册" align="center" prop="pageviews"></el-table-column>
        <el-table-column label="付费登陆" align="center" prop="pageviews"></el-table-column>
        <el-table-column label="充值额度" align="center" prop="pageviews"></el-table-column>
        <el-table-column label="最高在线" align="center" prop="pageviews"></el-table-column>
        <el-table-column label="系统金币" align="center" prop="pageviews"></el-table-column>
        <el-table-column label="VIP金币" align="center" prop="pageviews"></el-table-column>
        <el-table-column label="玩家金币" align="center" prop="pageviews"></el-table-column>
        <el-table-column label="赠送金币" align="center" prop="pageviews"></el-table-column>
        <el-table-column label="充值金币" align="center" prop="pageviews"></el-table-column>
        <el-table-column label="系统奖券" align="center" prop="pageviews"></el-table-column>
        <el-table-column label="系统输赢" align="center" prop="pageviews"></el-table-column>
        <el-table-column label="VIP赠送" align="center" prop="pageviews"></el-table-column>
        <el-table-column label="剩余血池" align="center" prop="pageviews"></el-table-column>
        <el-table-column label="顺差" align="center" prop="pageviews"></el-table-column>
        <el-table-column label="赠送比" align="center" prop="pageviews"></el-table-column>
        <el-table-column label="交易笔数" align="center" prop="pageviews"></el-table-column>
        <el-table-column label="交易人数" align="center" prop="pageviews"></el-table-column>
        <el-table-column label="税收" align="center" prop="pageviews"></el-table-column>
        <el-table-column label="吞吐率" align="center" prop="pageviews"></el-table-column>
        <el-table-column label="当日血池银行" align="center" prop="pageviews"></el-table-column>
        <!--<el-table-column label="金币" align="center">-->
          <!--<template slot-scope="scope">-->
            <!--<span>{{scope.row.subtitle}}</span>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column
          label="操作">
          <template scope="scope">
            <el-button

              type="text"
              size="small">
              删除
            </el-button>
            <!--@click.native.prevent="edit(scope.$index)"-->
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

    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="充值金额" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="对应金币数" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="额外赠送金币" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="大额充值">
            <el-option label="大额充值" value="shanghai"></el-option>
            <el-option label="小额充值" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
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
        list: null,
        listLoading: true,
        dialogFormVisible: false,
        form: {
          time_begin: '',
          time_end: ''
        },
        other: {
          gold: '',
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
      fetchData() {
        let params = utils.buildGetParams({
         "page": this.page,
        })
        getList('/admins/platforms?'+ params).then(response => {
          this.list = response.data.data
          this.other = response.data.other
          this.page.total = response.data.total
          this.listLoading = false
        })
      },
      handleSearch(){
        let query = utils.buildGetParams({
          page: this.page,
          time_begin: this.form.time_begin,
          time_end: this.form.time_end
        })
        console.log(this.query)
        getList('/admins/platforms?' + query).then(response => {
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
