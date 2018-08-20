<template>
  <div class="app-container">
    <div>
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="房间信息:">
          <el-input v-model="form.name" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="状态:">
          <el-select v-model="form.status" clearable placeholder="请选择">
          <el-option label="吐分" value="out"></el-option>
          <el-option label="吃分" value="in"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房间当日输赢">
          <el-select v-model="form.win_status" clearable placeholder="请选择">
            <el-option label="赢" value="win"></el-option>
            <el-option label="输" value="fail"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-row style="margin-bottom: 20px">
      <el-col :span="6">
        总输赢：
        <span style="color: #F00">{{other.win_total}}</span>
      </el-col>
      <el-col :span="6">
        系统当前血池：
        <span style="color: #F00">{{other.all_blood}}</span>
      </el-col>
      <el-col :span="6">
        当日输赢：
        <span style="color: #F00">{{other.today_win}}</span>
      </el-col>
      <el-col :span="6">
        当日吐分：
      <span style="color: #F00">{{other.today_out}}</span>
      </el-col>
      <el-col :span="6">
        当日吃分：
        <span style="color: #F00">{{other.today_eat}}</span>
      </el-col>
      <el-col :span="6">
        当日吞吐率：
        <span style="color: #F00">{{other.today_throughput}}</span>
      </el-col>
      <el-col :span="6">
        当如总税收：
        <span style="color: #F00">{{other.today_tax}}</span>
      </el-col>
      <el-col :span="6">
        当日总控制血池：
        <span style="color: #F00">{{other.today_blood}}</span>
      </el-col>
    </el-row>
    <el-table
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      style="width: 100%">
      <!--v-loading.body="listLoading"-->
      <el-table-column align="center" label='ID'>
        <template slot-scope="scope">
          {{scope.row.ServerID}}
        </template>
      </el-table-column>
      <el-table-column label="房间" align="center" prop="RoomName">
      </el-table-column>
      <el-table-column label="总输赢" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.win_total < 0" style="color: red">{{scope.row.win_total}}</span>
          <span v-else>{{scope.row.win_total}}</span>
        </template>
      </el-table-column>
      <el-table-column label="当日输赢" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.today_win_total < 0" style="color: red">{{scope.row.today_win_total}}</span>
          <span v-else>{{scope.row.today_win_total}}</span>
        </template>
      </el-table-column>
      <el-table-column label="点控血池" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.point_blood < 0" style="color: red">{{scope.row.point_blood}}</span>
          <span v-else>{{scope.row.point_blood}}</span>
        </template>
      </el-table-column>
      <el-table-column label="总税收" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.Revenue}}</span>
        </template>
      </el-table-column>
      <el-table-column label="血池平衡值" align="center" prop="blood_balance"></el-table-column>
      <el-table-column label="当前剩余血池" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.BloodScore < 0" style="color: red">{{scope.row.BloodScore}}</span>
          <span v-else>{{scope.row.BloodScore}}</span>
        </template>
      </el-table-column>
      <el-table-column
        class-name="status-col"
        label="状态"
        align="center">
        <template slot-scope="scope">
          <span style="color: red;" v-if="scope.row.CheatRate > 0">系统吃分</span>
          <span style="color: #4e9650;" v-else>系统吐分</span>
        </template>
      </el-table-column>
      <el-table-column label="吐分率" align="center" prop="out_percent"></el-table-column>
      <el-table-column label="当日税收" align="center" prop="today_tax"></el-table-column>
      <el-table-column label="作弊率" align="center" prop="CheatRate"></el-table-column>
      <el-table-column label="作弊限额" align="center" prop="MaxEatScore"></el-table-column>
      <el-table-column
        label="操作"
        align="center"
      width="140px">
        <template scope="scope">
          <el-button
            @click.native.prevent="editCheat(scope.$index)"
            type="text"
            size="small">
            修改房间作弊率
          </el-button>
          <el-button
            @click.native.prevent="addBoold(scope.$index)"
            type="text"
            size="small">
            添加血池控制
          </el-button>
          <el-button
            @click.native.prevent="bloodList(scope.row.ServerID)"
            type="text"
            size="small">
            血池控制列表
          </el-button>
          <el-button
            @click.native.prevent="log(scope.row.ServerID)"
            type="text"
            size="small">
            历史吞吐率
          </el-button>
          <el-button
            @click.native.prevent="bloodChange(scope.row.ServerID)"
            type="text"
            size="small">
            房间血池变化
          </el-button>
          <el-button
            @click.native.prevent="editBlood(scope.$index)"
            type="text"
            size="small">
            剩余血池修改
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

    <el-dialog title="修改房间作弊率" :visible.sync="dialogFormVisible">
      <el-form :model="editForm" label-width="120px">
        <el-form-item label="房间信息" auto-complate="off">
          <template>
          <el-select v-model="editForm.room_id" filterable placeholder="请选择">
            <el-option
              v-for="item in editForm.room"
              :label="item.room_name"
              :key="item.room_id"
              :value="item.room_id"
            ></el-option>
          </el-select>
          </template>
        </el-form-item>
        <el-form-item label="房间作弊率">
          <el-input type="number" v-model="editForm.cheat" auto-complete="off" placeholder=""></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEdit(editForm)">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加血池控制" :visible.sync="dialogFormVisible2">
      <el-form :model="addForm" label-width="120px">
        <el-form-item label="房间信息" auto-complate="off">
          <template>
            <el-select v-model="addForm.room_id">
              <el-option
                v-for="item in addForm.room"
                :label="item.room_name"
                :key="item.room_id"
                :value="item.room_id"
              ></el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="执行时间">
          <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择开始日期" v-model="addForm.run_time" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="血池控制目标值">
          <el-input type="number" v-model="addForm.blood" auto-complete="off" placeholder="< 0表示房间吃分"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd(addForm)">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="血池配置列表" :visible.sync="dialogTableVisible">
      <el-table :data="bloodPlan"
                highlight-current-row
                style="width: 100%;"
                height="500"
                border>
        <el-table-column prop="ServerID" align="center" label="房间id"></el-table-column>
        <el-table-column prop="BloodChange" align="center" label="血池控制分值"></el-table-column>
        <el-table-column prop="RunTime" align="center" label="执行时间"></el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog title="修改房间剩余血池" :visible.sync="dialogFormVisible3">
      <el-form :model="editBloodForm" label-width="120px">
        <el-form-item label="房间信息：" auto-complate="off">
          <template>
            <el-select v-model="editBloodForm.room_id">
              <el-option
                v-for="item in editBloodForm.room"
                :label="item.room_name"
                :key="item.room_id"
                :value="item.room_id"
              ></el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="当前剩余血池：">
          <el-input type="number" :disabled="true" v-model="editBloodForm.oldBlood" auto-complete="off" placeholder=""></el-input>
        </el-form-item>

        <el-form-item label="修改增减额度：">
          <el-input type="number" v-model="editBloodForm.blood" auto-complete="off" placeholder="正数增加，负数减少"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="saveBlood(editBloodForm)">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { getList, putList, postList } from '@/api/table'
import utils from '../../utils/index'

export default {
  data() {
    return {
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      dialogTableVisible: false,
      formLabelWidth: '130px',
      page: {curr: 1, size: 15, total: 0},
      list: [],
      today_win_total: '',
      ServerID: '',
      Revenue: '',
      BloodScore: '',
      blood_balance:'',
      // listLoading: '',
      form: {
        name: '',
        status: '',
        win_status:''
      },
      editForm: {
        room_id: '',
        cheat: '',
      },
      editBloodForm: {
        room_id: '',
        blood: '',
        oldBlood: ''
      },
      addForm: {
        room_id: '',
        run_time:'',
        blood:'',
      },
      bloodPlan: [],
      room: [],
      other: {
        all_blood: '',
        today_blood: '',
        today_eat: '',
        today_out: '',
        today_tax: '',
        today_throughput: '',
        today_win: '',
        win_total: '',
      }
    }
  },
  filters: {

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
      getList('/admins/rooms?'+ params).then(response => {
        this.other = response.data.other
        this.list = response.data.data
        // console.log(this.list)
        this.page.total = response.data.total
        this.listLoading = false
      })
    },
    handleSearch(){
      let query = utils.buildGetParams({
        page: this.page,
        room_name: this.form.name,
        status: this.form.status,
        win_status: this.form.win_status
      })
      // console.log(query)
      getList('/admins/rooms?' + query).then(response => {
        this.list = response.data.data
        this.page.total = response.data.total
        this.listLoading = false
      })
    },
    //修改作弊率
    editCheat(index){
      let i = this.list[index]
      console.log(i)
      let roomid = []
      getList('/admins/rooms/all').then((response) => {
        this.editForm.room = response.data
        for (let j in response.data){
          roomid[j] = response.data[j].room_id
        }
        if (roomid.indexOf(i.ServerID) === -1) {
          i.ServerID = ''
        }
        i.room = response.data
        this.editForm = i
      })
      this.dialogFormVisible = true
    },
    handleEdit(){
      let data = {
        "room_id" : this.editForm.room_id,
        "cheat" : this.editForm.cheat,
      }
      console.log(data)
      putList('/admins/rooms/cheat' , data).then(response => {
        this.dialogFormVisible = false
        this.$message({
          type: 'success',
          message: '修改成功'
        })
        this.fetchData()
      })
    },
    //血池控制列表
    bloodList(id){
      getList('/admins/rooms/plan?room_id=' + id).then(response => {
        this.bloodPlan = response.data
      })
      this.dialogTableVisible = true
    },
    //添加血池控制
    addBoold(index){
      let i = this.list[index]
      let roomid = []
      getList('/admins/rooms/all').then((response) => {
        this.addForm.room = response.data
        for (let j in response.data){
          roomid[j] = response.data[j].room_id
        }
        if (roomid.indexOf(i.ServerID) == -1) {
          i.ServerID == ''
        }
        i.room = response.data
        this.addForm = i
      })
      this.dialogFormVisible2 = true
    },
    handleAdd(){
      let data = {
        "room_id" : this.addForm.room_id,
        "run_time" : this.addForm.run_time,
        "blood" : this.addForm.blood,
      }
      console.log(data)
      postList('/admins/rooms/plan' , data).then(response => {
        this.dialogFormVisible2 = false
        this.$message({
          type: 'success',
          message: '添加成功'
        })
        this.fetchData()
      })
    },
    //历史吞吐率
    log(id){
      this.$router.push({path: './log', query:{ room_id: id}})
    },
    //房间血池变化
    bloodChange(id){
      this.$router.push({path: './bloodChange', query:{ room_id: id}})
    },
    //修改房间剩余血池
    editBlood(index){
      let i = this.list[index]
      this.editBloodForm.oldBlood = this.list[index].BloodScore
      let roomid = []

      getList('/admins/rooms/all').then((response) => {
        this.editBloodForm.room = response.data
        for (let j in response.data){
          roomid[j] = response.data[j].room_id
        }
        if (roomid.indexOf(i.ServerID) == -1) {
          i.ServerID == ''
        }
        i.room = response.data
        this.editBloodForm = i
      })
      this.dialogFormVisible3 = true
    },
    saveBlood(){
      let data = {
        "room_id" : this.editBloodForm.room_id,
        "blood" : this.editBloodForm.blood,
      }
      putList('/admins/rooms/blood' , data).then(response => {
        this.dialogFormVisible3 = false
        this.$message({
          type: 'success',
          message: '修改成功'
        })
        this.fetchData()
      })
    },

  }
}
</script>
