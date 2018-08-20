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

        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
        </el-form-item>
        <!--<el-form-item>-->
          <!--<el-button type="primary" @click="dialogFormVisible = true">新增税收账号</el-button>-->
        <!--</el-form-item>-->
      </el-form>
      <el-row style="margin-bottom: 20px">
        <el-col :span="6">
          总交易税收：
          <span style="color: #F00">{{other.tax_total}}</span>
        </el-col>
        <el-col :span="6">
          总接收次数：
          <span style="color: #F00">{{other.on_times}}</span>
        </el-col>
      </el-row>
      <div style="float: right;">
      </div>
      <el-table
        :data="list"
        element-loading-text="Loading"
        border
        highlight-current-row
        style="width: 100%;">
        <el-table-column label="账号ID" prop="UserID" align="center"></el-table-column>
        <el-table-column label="昵称" prop="NickName" align="center"></el-table-column>
        <el-table-column label="至尊VIP数量" prop="vip_total" align="center"></el-table-column>
        <el-table-column label="总交易税收" prop="tax_total" align="center"></el-table-column>
        <el-table-column label="交易总次数" prop="deal_times" align="center"></el-table-column>
        <!--<el-table-column label="下属至尊VIP" prop="author" align="center"></el-table-column>-->
        <!--<el-table-column-->
          <!--label="操作">-->
          <!--<template scope="scope">-->
            <!--<el-button-->
            <!--@click.native.prevent="edit(scope.$index)"-->
              <!--type="text"-->
              <!--size="small">-->
              <!--编辑-->
            <!--</el-button>-->
            <!--<el-button-->
              <!--@click.native.prevent="handleClick(scope.row.UserID)"-->
              <!--type="text"-->
              <!--size="small">-->
              <!--删除-->
            <!--</el-button>-->
          <!--</template>-->
        <!--</el-table-column>-->
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

    <!--<el-dialog title="新增税收账号" center :visible.sync="dialogFormVisible">-->
      <!--<el-dialog-->
        <!--width="30%"-->
        <!--title="增加下属至尊 VIP"-->
        <!--:visible.sync="innerVisible"-->
        <!--append-to-body>-->
        <!--<el-form :model="form">-->
          <!--&lt;!&ndash;<el-form-item label="至尊VIP ID" :label-width="formLabelWidth2">&ndash;&gt;-->
            <!--&lt;!&ndash;<el-input v-model="form.name" auto-complete="off"></el-input>&ndash;&gt;-->
          <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
          <!--<el-form-item label="至尊VIP 昵称" :label-width="formLabelWidth2">-->
            <!--<el-input v-model="form.name" auto-complete="off"></el-input>-->
          <!--</el-form-item>-->
        <!--</el-form>-->
        <!--<div slot="footer" class="dialog-footer">-->
          <!--<el-button @click="innerVisible = false">取 消</el-button>-->
          <!--<el-button type="primary" @click="innerVisible = false">确 定</el-button>-->
        <!--</div>-->
      <!--</el-dialog>-->

      <!--<el-form :model="form">-->
        <!--<el-form-item label="至尊VIP税收汇集账户" :label-width="formLabelWidth">-->
          <!--<el-input v-model="form.name" auto-complete="off"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="增加下属至尊VIP" :label-width="formLabelWidth">-->
          <!--&lt;!&ndash;<el-input v-model="form.name" auto-complete="off"></el-input>&ndash;&gt;-->
          <!--<el-table-->
            <!--:data="list"-->
            <!--border-->
            <!--height="300"-->
            <!--style="width: 100%">-->
            <!--<el-table-column-->
              <!--prop="author"-->
              <!--label="至尊VIP ID"-->
              <!--&gt;-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--prop="author"-->
              <!--label="至尊VIP 昵称"-->
              <!--&gt;-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--label="操作"-->
              <!--width="100">-->
              <!--<template scope="scope">-->
                <!--<el-button-->
                  <!--@click.native.prevent="handleClick(scope.row.id)"-->
                  <!--type="text"-->
                  <!--size="small">-->
                  <!--删除-->
                <!--</el-button>-->
              <!--</template>-->
            <!--</el-table-column>-->
          <!--</el-table>-->
          <!--&lt;!&ndash;<el-button type="primary" style="width:100%">增加</el-button>&ndash;&gt;-->
          <!--<el-button type="primary" style="width:100%" @click="innerVisible = true">增加</el-button>-->
        <!--</el-form-item>-->
      <!--</el-form>-->
      <!--<div slot="footer" class="dialog-footer">-->
        <!--<el-button @click="dialogFormVisible = false">取 消</el-button>-->
        <!--<el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>-->
      <!--</div>-->
    <!--</el-dialog>-->

    <el-card>
      <div slot="header" class="clearfix">
        <h2>交易税收明细</h2>
      </div>
      <el-form :inline="true" :model="form2" class="demo-form-inline">
        <el-form-item>
          <el-col :span="8">
            <el-select v-model="form2.type" filterable placeholder="">
              <el-option
                v-for="item in form2.infoType"
                :lable="item.type"
                :key="item.id"
                :value="item.type">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="16">
            <el-input v-model="form2.info"></el-input>
          </el-col>
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
      <el-row style="margin-bottom: 20px">
        <el-col :span="6">
          总交易税收：
          <span style="color: #F00">{{other2.tax_total}}</span>
        </el-col>
        <el-col :span="6">
          总接收次数：
          <span style="color: #F00">{{other2.on_times}}</span>
        </el-col>
        <el-col :span="6">
          总接收金币：
          <span style="color: #F00">{{other2.gold_total}}</span>
        </el-col>
      </el-row>
      <el-table
        :data="detailList"
        element-loading-text="Loading"
        border
        highlight-current-row
        style="width: 100%;">
        <el-table-column label="转出推广号" prop="OtherUser_Id" align="center"></el-table-column>
        <el-table-column label="转出昵称" prop="otheruser_nickname" align="center"></el-table-column>
        <el-table-column label="接收推广号" prop="User_Id" align="center"></el-table-column>
        <el-table-column label="接收昵称" prop="user_nickname" align="center"></el-table-column>
        <el-table-column label="转出金币" prop="PresentGold" align="center"></el-table-column>
        <el-table-column label="接收礼物时间" prop="PresentTime" align="center"></el-table-column>
        <el-table-column label="赠送税收" prop="tax" align="center"></el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          @current-change="handleChange2"
          :current-page="page2.curr"
          :page-size="page2.size"
          :total="page2.total"
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
        page2: {curr: 1, size: 15, total: 0},
        innerVisible: false,
        list: [],
        detailList: [],
        listLoading: true,
        dialogFormVisible: false,
        form: {
          infoType: [{type: '玩家ID', id: 'uid'},{type: '玩家昵称', id: 'user_nick'}],
          info: '',
        },
        form2: {
          infoType: [{type: '玩家ID', id: 'uid'},{type: '玩家昵称', id: 'user_nick'}],
          info: '',
          time_begin: '',
          time_end: ''
        },
        other: {
          on_times: '',
          tax_total: '',
        },
        other2: {
          on_times: '',
          tax_total: '',
          gold_total: ''
        },
        formLabelWidth: '160px',
        formLabelWidth2: '100px'
      }
    },
    filters: {

    },
    created() {
      this.fetchData()
    },
    methods: {
      handleSearch(){
        let query = utils.buildGetParams({
          page: this.page,
          uid: this.form.type === '玩家ID' ? this.form.info : '',
          user_nick: this.form.type === '玩家昵称' ? this.form.info : '',
        })
        console.log(query)
        getList('/vips/tax?' + query).then(response => {
          this.list = response.data.data
          this.page.total = response.data.total
          this.listLoading = false
        })
      },
      handleChange(p){
        this.page.curr = p
        this.fetchData()
      },
      handleChange2(p){
        this.page2.curr = p
        // this.fetchData()
      },
      fetchData() {
        let params = utils.buildGetParams({
          "page": this.page,
        })
        getList('/vips/tax?' + params).then(response => {
          // console.log(response.data)
          this.list = response.data.data
          this.other = response.data.other
          this.page.total = response.data.total
          this.listLoading = false
        })
      },
      // edit(i){
      //   console.log(i)
      // },
      // handleClick (id) {
      //   console.log(id)
      //   this.$confirm('即将删除，是否继续', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then( () => {
      //     this.axios.delete('/delete/'+id).then((data) => {
      //       this.$message({
      //         type: 'success',
      //         message: '删除成功'
      //       })
      //       this.fetchData()
      //     })
      //   })
      // },

      handleSearch2(){
        let query = utils.buildGetParams({
          page: this.page,
          uid: this.form2.type === '玩家ID' ? this.form2.info : '',
          user_nick: this.form2.type === '玩家昵称' ? this.form2.info : '',
          time_begin: this.form2.time_begin,
          time_end: this.form2.time_end
        })
        console.log(query)
        getList('/vips/tax_log?' + query).then(response => {
          this.detailList = response.data.data
          this.page2.total = response.data.total
          this.other2 = response.data.other
          this.listLoading = false
        })
      },
    }
  }
</script>
