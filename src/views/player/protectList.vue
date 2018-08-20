<template>
  <div class="app-container">
    <el-card>
      <!--<div style="float: right;">-->
        <!--<el-button type="primary" @click="dialogFormVisible = true">添加充值配置</el-button>-->
      <!--</div>-->
      <el-table
        :data="list"
        element-loading-text="Loading"
        border
        highlight-current-row
        style="width: 100%">
        <el-table-column label="类型" prop="author" align="center"></el-table-column>
        <el-table-column label="推广号" prop="pageviews" align="center"></el-table-column>
        <el-table-column label="昵称" prop="author" align="center"></el-table-column>
        <el-table-column label="金币" prop="author" align="center"></el-table-column>
        <el-table-column label="总输赢" prop="author" align="center"></el-table-column>
        <el-table-column label="最后登陆时间" prop="display_time" align="center"></el-table-column>
        <el-table-column label="卖分总和" prop="author" align="center"></el-table-column>
        <el-table-column label="买分总和" prop="author" align="center"></el-table-column>
        <el-table-column label="作弊率" prop="author" align="center"></el-table-column>
        <el-table-column label="作弊限额" prop="pageviews" align="center"></el-table-column>
        <el-table-column label="房间" prop="author" align="center"></el-table-column>
        <el-table-column label="最后作弊完成时间" prop="display_time" align="center"></el-table-column>
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
          :current-page="1"
          :page-size="10"
          :total="100"
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

  export default {
    data() {
      return {
        // page: {curr: 1, size: 15, total: 10},
        list: null,
        listLoading: true,
        dialogFormVisible: false,
        form: {
          name: '',
          region: ''
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
      fetchData() {
        this.listLoading = true
        getList(this.listQuery).then(response => {
          this.list = response.data.items
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
