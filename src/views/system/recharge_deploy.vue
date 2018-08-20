<template>
  <div class="app-container">
    <el-card>
      <div style="float: right; margin-bottom: 20px">
        <el-button type="primary" @click="showForm">添加充值配置</el-button>
      </div>
    <el-table
      :data="list"
      element-loading-text="Loading"
      border
      highlight-current-row
      style="width: 100%;">
      <el-table-column label="金额" align="center" prop="PayRMB"></el-table-column>
      <el-table-column label="金币" align="center" prop="Gold"></el-table-column>
      <!--<el-table-column label="苹果名称" align="center" prop="apple_name"></el-table-column>-->
      <el-table-column
        align="center"
        label="操作">
        <template scope="scope">
          <el-button
          @click.native.prevent="handleDelete(scope.row.id)"
          type="text"
          size="small">
          删除
          </el-button>
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
          <el-input type="number" v-model="form.rmb" auto-complete="off">元</el-input>
        </el-form-item>
        <el-form-item label="对应金币数" :label-width="formLabelWidth">
          <el-input type="number" v-model="form.gold" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="苹果名称" :label-width="formLabelWidth">
          <el-input v-model="form.apple_name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import { getList, postList, deleteList } from '@/api/table'
  import utils from '../../utils/index'


  export default {
    data() {
      return {
        page: {curr: 1, size: 15, total: 0},
        list: null,
        listLoading: true,
        dialogFormVisible: false,
        formLabelWidth: '120px',
        form: {
          rmb: '',
          gold: '',
          apply_name: ''
        }
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      showForm(){
        this.dialogFormVisible = true
        this.form={
          rmb: '',
          gold: '',
          apple_name: ''
        }
      },
      handleSearch(){
        this.fetchData()
      },
      handleChange(p){
        this.page.curr = p
        this.fetchData()
      },
      fetchData() {
        let params = utils.buildGetParams({
          "page": this.page,
        })
        getList('/admins/recharges?'+ params).then(response => {
          this.list = response.data.data
          this.page.total = response.data.total
          this.listLoading = false
        })
      },
      handleAdd(){
        let data = {
          "rmb" : this.form.rmb,
          "gold" : this.form.gold,
          "apple_name" : this.form.apple_name,
        }
        postList('/admins/recharges' , data).then(response => {
          if(response.success == false) {
            return false
            this.dialogFormVisible = false
          }else {
            this.dialogFormVisible = false
            this.$message({
              type: 'success',
              message: '添加成功'
            })
            this.fetchData()
          }
        })
      },
      handleDelete (id) {
        console.log(id)
        this.$confirm('即将删除，是否继续', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( () => {
          deleteList('/admins/recharges?id='+id).then((data) => {
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
<style rel="stylesheet/sass">
  .pagination {
    margin: 15px -5px 0 -5px;
    display: inline-block;
  }
</style>
