<template>
  <div>
    <el-card>
      <div slot="header" style="text-align: center;" class="clearfix">
        <h3 class="">玩家【<span style="color: #4f7da2;">{{info.NickName}}</span>】的详细信息</h3>
      </div>
      <!--<el-card>-->
        <!--<div slot="header" class="clearfix">-->
          <!--<h3 style="color: #4f7da2;">基本信息</h3>-->
        <!--</div>-->
        <el-row>
          <el-col :span="12"><div class="grid-content bg-purple fir">
            游戏推广号:&emsp;<span>{{info.GameID}}</span>
          </div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple-light sec">
            游戏昵称: &emsp;<span>{{info.NickName}}</span>
          </div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple">
            游戏UserID:&emsp; <span>{{info.UserID}}</span>
          </div></el-col>
          <!--<el-col :span="12"><div class="grid-content bg-purple-light">-->
            <!--游戏登录名: &emsp;<span>{{info.Accounts}}</span>-->
          <!--</div></el-col>-->
          <el-col :span="12"><div class="grid-content bg-purple">
            注册时间: &emsp;<span>{{info.RegisterDate}}</span>
          </div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple-light">
            注册IP: &emsp;<span>{{info.RegisterIP}}</span>
          </div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple">
            最后登陆时间:&emsp;<span>{{info.LastLogonDate}}</span>
          </div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple-light">
            最后登陆IP:&emsp;<span>{{info.LastLogonIP}}</span>
            <el-button
              @click.native.prevent="IPSearch(info.LastLogonIP)"
              type="text"
            >
              【关联查询】
            </el-button>
          </div></el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              绑定手机:&emsp;
              <span>{{info.Accounts}}</span>
              <el-button
                @click.native.prevent="MobileSearch(info.Accounts)"
                type="text"
                >
                【关联查询】
              </el-button>
            </div>
          </el-col>
          <el-col :span="12"><div class="grid-content bg-purple-light">
            在线时长:&emsp;<span>{{info.TotalOnlineTime}}</span>
          </div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple">
            金币:&emsp;<span>{{info.goldTotal}}</span>
          </div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple-light">
            奖券:&emsp;<span>{{info.ticketTotal}}</span>
          </div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple">
            充值金额:&emsp;<span>{{info.rmbTotal}}</span>
          </div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple-light">
            充值次数:&emsp;<span>{{info.rechargeNumber}}</span>
          </div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple">
            总输赢:&emsp;
              <span>{{info.realScore}}</span>
            ，<span>接收:{{info.onScoreTotal}}</span>
            ，<span>赠送:{{info.offScoreTotal}}</span>
          </div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple-light">
            当日输赢:&emsp;<span>{{info.todayAllChange}}</span>
          </div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple">
            账号类型:&emsp;<span>{{info.MemberOrder}}</span>
          </div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple-light">
            首选游戏:&emsp;<span>{{info.FirstServerId}}</span>
          </div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple">
            是否在线:&emsp;
            <span v-if="info.isOnline == 0">否</span>
            <span v-else>是</span>

          </div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple-light">
            账号状态:&emsp;
            <span v-if="info.Nullity == 0">正常</span>
            <span v-else>封禁</span>
            <span v-if="info.isBanDeal == true">(禁止交易)</span>
            <span v-else>(允许交易)</span>
          </div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple">
            周卡:&emsp;<span>{{info.weekInfo}}</span>
          </div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple-light">
            月卡:&emsp;<span>{{info.monthInfo}}</span>
          </div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple">
            机器码:&emsp;<span>{{info.MachineSerial}}</span>
            <el-button
              @click.native.prevent="MachineSearch(info.MachineSerial)"
              type="text"
            >
              【关联查询】
            </el-button>
          </div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple-light">
            游戏控制: &emsp;<span>上次作弊完成时间：{{info.EndCheatDate}}</span>
          </div></el-col>
        </el-row>
    </el-card>
    <el-card style=" margin-top: 20px">
    <div slot="header" class="clearfix">
      <h3 style="color: #4f7da2;">数据查询操作</h3>
    </div>
    <el-row class="manage">
      <el-col :span="6">
        <el-button @click="skip1" type="primary">登陆记录</el-button>
      </el-col>
      <el-col :span="6">
        <el-button @click="skip2" type="primary">金币变动记录</el-button>
      </el-col>
      <!--<el-col :span="6">-->
        <!--<el-button @click="skip3" type="primary">充值记录</el-button>-->
      <!--</el-col>-->
      <!--<el-col :span="6">-->
        <!--<el-button @click="skip4" type="primary">礼物赠送记录</el-button>-->
      <!--</el-col>-->
      <el-col :span="6">
        <el-button @click="skip5" type="primary">锁定记录</el-button>
      </el-col>
      <el-col :span="6">
        <el-button @click="skip6" type="primary">奖券变动记录</el-button>
      </el-col>
      <!--<el-col :span="6">-->
        <!--<el-button @click="skip7" type="primary">兑换记录</el-button>-->
      <!--</el-col>-->
      <!--<el-col :span="6">-->
        <!--<el-button @click="skip8" type="primary">点控记录</el-button>-->
      <!--</el-col>-->
    </el-row>
  </el-card>
  <el-card>
    <div slot="header" class="clearfix">
      <h3 style="color: #4f7da2;">数据操作管理</h3>
    </div>
    <el-row class="manage">
      <el-col :span="6">
        <el-button @click="handle1" type="primary">增加／扣除金币</el-button>
      </el-col>
      <el-col :span="6">
        <el-button @click="handle2" type="primary">增加／扣除奖券</el-button>
      </el-col>
      <el-col :span="6">
        <el-button @click="handle3" type="primary">锁定该账号</el-button>
      </el-col>
      <el-col :span="6">
        <el-button @click="handle4" type="primary">修改玩家作弊率</el-button>
      </el-col>
      <!--<el-col :span="6">-->
        <!--<el-button @click="handle5" type="primary">修改密码</el-button>-->
      <!--</el-col>-->
      <!--<el-col :span="6">-->
        <!--<el-button @click="handle6" type="primary">活动奖励发放</el-button>-->
      <!--</el-col>-->
      <!--<el-col :span="6">-->
        <!--<el-button @click="handle7" type="primary">禁止上榜</el-button>-->
      <!--</el-col>-->
      <el-col :span="6">
        <el-button @click="handle8" type="primary">禁止交易</el-button>
      </el-col>
      <el-col :span="6">
        <el-button @click="handle9" type="primary">修改玩家类型</el-button>
      </el-col>
    </el-row>
  </el-card>
    <el-dialog title="手机关联查询" :visible.sync="dialogTableVisible">
      <el-table :data="accounts"
                highlight-current-row
                style="width: 100%;"
                border>
        <el-table-column prop="UserID" align="center" label="UserID"></el-table-column>
        <el-table-column prop="NickName" align="center" label="昵称"></el-table-column>
        <el-table-column prop="Accounts" align="center" label="手机号"></el-table-column>
        <el-table-column prop="goldTotal" align="center" label="金币"></el-table-column>
        <el-table-column prop="LimitLogin" align="center" label="是否锁定"></el-table-column>
        <el-table-column align="center" label="是否禁止交易">
          <template slot-scope="scope">
            <span v-if="scope.row.isBanDeal = true" style="color: red">是</span>
            <span v-else>否</span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog title="机器码关联查询" :visible.sync="dialogTableVisible2">
      <el-table :data="MachineSerial"
                highlight-current-row
                style="width: 100%;"
                border>
        <el-table-column prop="UserID" align="center" label="UserID"></el-table-column>
        <el-table-column prop="NickName" align="center" label="昵称"></el-table-column>
        <el-table-column prop="Accounts" align="center" label="手机号"></el-table-column>
        <el-table-column prop="goldTotal" align="center" label="金币"></el-table-column>
        <el-table-column prop="LimitLogin" align="center" label="是否锁定"></el-table-column>
        <el-table-column align="center" label="是否禁止交易">
          <template slot-scope="scope">
            <span v-if="scope.row.isBanDeal = true" style="color: red">是</span>
            <span v-else>否</span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog title="IP关联查询" :visible.sync="dialogTableVisible3">
      <el-table :data="LastLogonIP"
                highlight-current-row
                style="width: 100%;"
                border>
        <el-table-column prop="UserID" align="center" label="UserID"></el-table-column>
        <el-table-column prop="NickName" align="center" label="昵称"></el-table-column>
        <el-table-column prop="Accounts" align="center" label="手机号"></el-table-column>
        <el-table-column prop="goldTotal" align="center" label="金币"></el-table-column>
        <el-table-column prop="LimitLogin" align="center" label="是否锁定"></el-table-column>
        <el-table-column align="center" label="是否禁止交易">
          <template slot-scope="scope">
            <span v-if="scope.row.isBanDeal = true" style="color: red">是</span>
            <span v-else>否</span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog title="登陆记录" :visible.sync="dialogTableVisible4">
      <el-table
        :data="loginLog"
        highlight-current-row
        border
      >
        <el-table-column property="UserID" label="UserID" align="center"></el-table-column>
        <el-table-column property="nickname" label="昵称" align="center"></el-table-column>
        <el-table-column property="EnterTime" label="登陆时间" align="center"></el-table-column>
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
    </el-dialog>

    <el-dialog :title="type == 1 ? '扣除玩家的金币' : '扣除玩家的奖券' " :visible.sync="dialogFormVisible">
      <el-form :model="addForm" label-width="120px">
        <el-form-item label="游戏推广号:">
          <span>{{info.UserID}}</span>
        </el-form-item>
        <el-form-item :label="type ==1 ? '当前拥有金币:' : '当前拥有奖券:'">
          <span v-if="type === 1">{{info.goldTotal}}</span>
          <span v-if="type === 2">{{info.ticketTotal}}</span>
        </el-form-item>
        <el-form-item :label="type == 1 ? '扣除金币数:' : '扣除奖券数:'">
          <el-input type="number" v-model="addForm.number" auto-complete="off" placeholder="> 0表示增加，< 0表示扣除"></el-input>
        </el-form-item>
        <el-form-item label="操作类型:">
          <span>web管理员添加</span>
        </el-form-item>
        <el-form-item label="操作理由">
          <el-input type="textarea" v-model="addForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd(addForm)">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改玩家作弊率" :visible.sync="dialogFormVisible2">
      <el-form :model="editCheat" label-width="120px">
        <el-form-item label="游戏推广号:">
          <span>{{info.UserID}}</span>
        </el-form-item>
        <el-form-item label="修改作弊率">
          <el-input type="number" v-model="editCheat.cheat" auto-complete="off" placeholder="0-100"></el-input>
        </el-form-item>
        <el-form-item label="操作理由">
          <el-input type="textarea" v-model="editCheat.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="handleEdit(editCheat)">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改玩家类型" :visible.sync="dialogFormVisible3">
    <el-form :model="editType" label-width="120px">
      <el-form-item label="游戏推广号:">
        <span>{{info.UserID}}</span>
      </el-form-item>
      <el-form-item label="当前类型:">
        <span>{{info.MemberOrder}}</span>
      </el-form-item>
      <el-form-item label="指定新类型">
        <el-select v-model="editType.type" placeholder="">
          <el-option label="普通用户" value="0"></el-option>
          <el-option label="内部员工" value="1"></el-option>
          <el-option label="银商" value="2"></el-option>
          <el-option label="大R" value="3"></el-option>
          <el-option label="小R" value="4"></el-option>
          <el-option label="异常" value="5"></el-option>
          <el-option label="至尊VIP" value="6"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible3 = false">取 消</el-button>
      <el-button type="primary" @click="handleEditType(editType)">确 定</el-button>
    </div>
    </el-dialog>
  </div>
</template>
<script>

  import { getList, putList } from '@/api/table'
  import utils from '../../utils/index'

  export default {
    data() {
      return {
        type: 1,
        page: {curr: 1, size: 10, total: 0},
        dialogFormVisible: false,
        dialogFormVisible2: false,
        dialogFormVisible3: false,
        dialogTableVisible: false,
        dialogTableVisible2: false,
        dialogTableVisible3: false,
        dialogTableVisible4: false,
        formLabelWidth: '120px',
        info: {
          Accounts: '',
          EndCheatDate: '',
          FirstServerId: '',
          GameID: '',
          LastLogonDate: '',
          LastLogonIP: '',
          PhoneNum: '',
          MachineSerial: '',
          MemberOrder: '',
          NickName: '',
          rechargeNumber: '',
          Nullity: '',
          RegisterDate: '',
          RegisterIP: '',
          TotalOnlineTime: '',
          UserID: '',
          goldTotal: '',
          isBanDeal: '',
          isOnline: '',
          monthInfo: '',
          offScoreTotal: '',
          onScoreTotal: '',
          realscore: '',
          rmbTotal: '',
          roomName: '',
          ticketTotal: '',
          todayAllChange: '',
          weekInfo: [],
        },
        form: {
          username: '',
          password: '',
        },
        accounts: [],
        MachineSerial: [],
        LastLogonIP: [],
        loginLog: [],
        addForm: {
          user_id: '',
          number: '',
          remark: '',
        },
        editCheat: {
          remark: '',
          cheat: ''
        },
        editType: {
          type: ''
        }
      }
    },
    filters: {

    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        var user_id = this.$route.query.UserID
        getList('/users/detail?user_id=' + user_id).then(response => {
            this.info = response.data.data
        })
      },
      //数据查询操作
      skip1(){
        this.dialogTableVisible4 = true
        let params = utils.buildGetParams({
          "page": this.page,
          "user_id": this.info.UserID
        })
        getList('/users/log?' + params).then(response => {
          this.loginLog = response.data.data
          this.page.total = response.data.total
        })
      },
      handleChange(p){
        this.page.curr = p
        this.skip1()
      },
      skip2(){
        var user_id = this.$route.query.UserID
        console.log(user_id)
        this.$router.push({path: './coinChange', query:{ user_id: user_id}})
      },
      skip3(){

      },
      skip4(){

      },
      skip5(){

      },
      skip6(){
        var user_id = this.$route.query.UserID
        this.$router.push({path: './ticketChange', query:{ user_id: user_id}})
      },
      skip7(){

      },
      skip8(){

      },
      //数据操作管理
      handle1(){
        this.dialogFormVisible = true
        this.type = 1
        this.addForm.number = ''
        this.addForm.remark= ''
      },
      handleAdd(){
        let data = {
          'type': this.type == 1 ? 1 : 2,
          'user_id': this.info.UserID,
          'number': this.addForm.number,
          'remark': this.addForm.remark
        }
        putList('users/gold', data).then(response => {
          this.$message({
            type: "success",
            message: "修改成功"
          })
          this.dialogFormVisible = false
          this.fetchData()
        })
      },
      handle2(){
        this.dialogFormVisible = true
        this.type = 2
        this.addForm.number = ''
        this.addForm.remark= ''
      },
      handle3(){
        putList('users/lock', {user_id: this.info.UserID}).then(response => {
          this.$message({
            type: "success",
            message: "锁定成功"
          })
        })
      },
      handle4(){
        this.dialogFormVisible2 = true
        this.editCheat.cheat = ''
        this.editCheat.remark= ''
      },
      handleEdit(){
        let data = {
          'user_id': this.info.UserID,
          'cheat': this.editCheat.cheat,
          'remark': this.editCheat.remark
        }
        putList('users/cheat', data).then(response => {
          this.$message({
            type: "success",
            message: "修改成功"
          })
          this.dialogFormVisible2 = false
          this.fetchData()
        })
      },
      // handle5(){
      //
      // },
      // handle6(){
      //
      // },
      // handle7(){
      //
      // },
      handle8(){
        putList('users/ban_del', {user_id: this.info.UserID}).then(response => {
          this.$message({
            type: "success",
            message: "已禁止交易"
          })
        })
      },
      handle9(){
        this.dialogFormVisible3 = true
      },
      handleEditType(){
        // var user_id = this.$route.query.UserID
        let data = {
          'user_id': this.info.UserID,
          'type': this.editType.type,
        }
        putList('users/type', data).then(response => {
          this.$message({
            type: "success",
            message: "修改成功"
          })
          this.dialogFormVisible3 = false
          this.fetchData()
        })
      },
      MobileSearch(Accounts){
        this.dialogTableVisible = true
        getList('/users/mobile?mobile='+ Accounts).then(response => {
          this.accounts = response.data.data
          this.listLoading = false
        })
      },
      MachineSearch(MachineSerial){
        this.dialogTableVisible2 = true
        getList('/users/machine_serial?serial='+ MachineSerial).then(response => {
          this.MachineSerial = response.data.data
          this.listLoading = false
        })
      },
      IPSearch(LastLogonIP){
        this.dialogTableVisible3 = true
        getList('/users/ip?ip='+ LastLogonIP).then(response => {
          this.LastLogonIP = response.data.data
          this.listLoading = false
        })
      },
    }
  }
</script>
<style lang="scss">
  #detail span{
    color: #4f7da2;
  }
  /*.msg{*/
    /*line-height: 40px;*/
    /*border-bottom: solid 1px #eee;*/
  /*}*/
  .el-row {
    /*margin-bottom: 20px;*/
    &:last-child {
     margin-bottom: 0;
   }
  }
  .el-col {
    /*border-radius: 4px;*/
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    /*background: #d3dce6;*/
    border: solid 1px #d3dce6;
    border-top: none;
    border-right: none;

  }
  .bg-purple-light {
    /*background: #e5e9f2;*/
    border: solid 1px #d3dce6;
    border-top: none;
  }
  .grid-content {
    text-indent: 10px;
    /*min-height: 36px;*/
    line-height: 46px;
    color: #001528;
    font-weight: bold;
    span{
      /*color: #4f7da2;*/
      font-weight: normal;
    }
  }
  .fir{
    border-top: solid 1px #d3dce6;
  }
  .sec{
    border-top: solid 1px #d3dce6;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .manage .el-col{
    margin-bottom: 20px;
  }
  .manage .el-col .el-button{
    width: 25vh;

  }
</style>
