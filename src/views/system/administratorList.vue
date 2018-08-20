<template>
  <div class="app-container">
    <div>
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="登录名">
          <el-input v-model="form.name" placeholder=""></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
        </el-form-item>
        <el-button type="primary" @click="showForm">添加管理员</el-button>
      </el-form>
    </div>
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
        label="登陆名"
        prop="account">
      </el-table-column>
      <el-table-column
        align="center"
        prop="createTime"
        label="创建时间"
        >
      </el-table-column>
      <el-table-column
        align="center"
        prop="lastLoginTime"
        label="最后登陆时间">
      </el-table-column>
      <el-table-column label="最后登陆IP" width="110" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.ip}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="账号状态"
        align="center"
        >
        <template slot-scope="scope">
          <span v-if="scope.row.is_lock === '0' ">正常</span>
          <span v-else>锁定</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template scope="scope">
          <el-button
            @click="handleDelete(scope.row.id)"
            type="text"
            size="small">
            删除
          </el-button>
          <el-button
            v-if="scope.row.is_lock === '0'"
            @click="handleLock(scope.row.id)"
            type="text"
            size="small">
             锁定
          </el-button>
          <el-button
            v-if="scope.row.is_lock === '1'"
            @click="handleLockOff(scope.row.id)"
            type="text"
            size="small">
            取消锁定
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
        :total= "page.total"
        layout="prev, pager, next, jumper">
      </el-pagination>
    </div>

    <el-dialog title="添加管理员" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="登陆名" :label-width="formLabelWidth">
          <el-input v-model="form.username" auto-complete="off" placeholder="不能超过16个字符"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input type="password" v-model="form.password" auto-complete="off" placeholder="不能超过16个字符"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth">
          <el-input type="password" v-model="form.re_password" auto-complete="off" placeholder="不能超过16个字符"></el-input>
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
  import { getList, deleteList, postList } from '@/api/table'
  import utils from '../../utils/index'

  export default {
    data() {
      return {
        page: {curr: 1, size: 15, total: 0},
        list: [],
        listLoading: false,
        form:{
          username: '',
          password: '',
          re_password: '',
        },
        dialogFormVisible: false,
        formLabelWidth: '120px'
      }
    },
    filters: {

    },
    created() {
      this.fetchData()
    },
    methods: {
      showForm(){
        this.dialogFormVisible = true
        this.form={
          username: '',
          password: '',
          re_password: ''
        }
      },
      handleChange(p){
        this.page.curr = p
        this.fetchData()
      },
      fetchData() {
        let params = utils.buildGetParams({
          "page": this.page,
        })
        getList('/admins/list?'+ params).then(response => {
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
        let account = this.form.name
        query = account + '&' + query;
        console.log(query)
          getList('/admins/list?account=' + query).then(response => {
            this.list = response.data.data
            this.page.total = response.data.total
            this.listLoading = false
          })
      },
      handleDelete (id) {
        console.log(id)
        this.$confirm('即将删除，是否继续', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( () => {
          deleteList('/admins?user_id='+id).then((data) => {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.fetchData()
          })
        })
      },
      handleLock (id) {
        console.log(id)
        this.$confirm('即将锁定，是否继续', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( () => {
          postList('/admins/lock?user_id='+id + '&' + 'is_lock=1').then((data) => {
            this.$message({
              type: 'success',
              message: '锁定成功'
            })
            this.fetchData()
          })
        })
      },
      handleLockOff (id) {
        console.log(id)
        this.$confirm('取消锁定，是否继续', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( () => {
          postList('/admins/lock?user_id='+id+ '&' + 'is_lock=0').then((data) => {
            this.$message({
              type: 'success',
              message: '取消锁定成功'
            })
            this.fetchData()
          })
        })
      },
      handleAdd(){
        let data = {
          "username" : this.form.username,
          "password" : this.form.password,
          "re_password" : this.form.re_password,
        }
        postList('/admins/add' , data).then(response => {
          if(response.success == false) {
            return false
          }else {
            this.dialogFormVisible = false
            this.$message({
              type: 'success',
              message: '添加成功'
            })
            this.fetchData()
          }
        })
      }
    }
  }
</script>
