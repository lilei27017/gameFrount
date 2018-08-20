<template>
  <div class="app-container">
    <el-card class="form">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="用户信息">
          <el-col :span="6">
            <el-select v-model="form.type" filterable placeholder="">
              <el-option
                v-for="item in form.infoType"
                :lable="item.type"
                :key="item.id"
                :value="item.type">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="18">
            <el-input v-model="form.info"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="注册时间">
          <el-col :span="11">
            <el-date-picker type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="" v-model="form.register_time_begin" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col style="text-align: center" class="line" :span="2">——</el-col>
          <el-col :span="11">
            <el-date-picker type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="" v-model="form.register_time_end" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="最后登陆时间">
          <el-col :span="11">
            <el-date-picker type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="" v-model="form.last_login_begin" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col style="text-align: center" class="line" :span="2">——</el-col>
          <el-col :span="11">
            <el-date-picker type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="" v-model="form.last_login_end" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="用户金币">
          <el-col :span="11">
            <el-input v-model="form.gold_begin"></el-input>
          </el-col>
          <el-col style="text-align: center" class="line" :span="2">——</el-col>
          <el-col :span="11">
            <el-input v-model="form.gold_end"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="金币赠送差">
          <el-col :span="11">
            <el-input v-model="form.gold_minus_begin"></el-input>
          </el-col>
          <el-col style="text-align: center" class="line" :span="2">——</el-col>
          <el-col :span="11">
            <el-input v-model="form.gold_minus_end"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="充值金额">
          <el-col :span="11">
            <el-input v-model="form.amount_begin"></el-input>
          </el-col>
          <el-col style="text-align: center" class="line" :span="2">——</el-col>
          <el-col :span="11">
            <el-input v-model="form.amount_end"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="奖券">
          <el-col :span="11">
            <el-input v-model="form.ticket_begin"></el-input>
          </el-col>
          <el-col style="text-align: center" class="line" :span="2">——</el-col>
          <el-col :span="11">
            <el-input v-model="form.ticket_end"></el-input>
          </el-col>
        </el-form-item>
        <!--<el-form-item label="总输赢">-->
          <!--<el-col :span="11">-->
            <!--<el-input v-model="form.name"></el-input>-->
          <!--</el-col>-->
          <!--<el-col style="text-align: center" class="line" :span="2">——</el-col>-->
          <!--<el-col :span="11">-->
            <!--<el-input v-model="form.code"></el-input>-->
          <!--</el-col>-->
        <!--</el-form-item>-->
        <el-form-item label="密保手机">
          <el-input v-model="form.mobile"></el-input>
        </el-form-item>
        <el-form-item label="登陆IP或注册IP">
          <el-input v-model="form.ip"></el-input>
        </el-form-item>
        <el-form-item label="登陆机器码">
          <el-input v-model="form.machine_serial"></el-input>
        </el-form-item>
        <!--<el-form-item label="账号状态">-->
          <!--<el-select v-model="form.region1" placeholder="请选择">-->
            <!--<el-option label="正常状态" value="1"></el-option>-->
            <!--<el-option label="锁定状态" value="2"></el-option>-->
            <!--<el-option label="禁止交易" value="3"></el-option>-->
            <!--<el-option label="异常状态" value="4"></el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <el-form-item label="账号类型">
          <el-select v-model="form.account_type" placeholder="请选择">
            <el-option label="普通用户" value="0"></el-option>
            <el-option label="内部员工" value="1"></el-option>
            <el-option label="银商" value="2"></el-option>
            <el-option label="大R" value="3"></el-option>
            <el-option label="小R" value="4"></el-option>
            <el-option label="异常状态" value="5"></el-option>
            <el-option label="至尊VIP" value="6"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="游戏平台">
          <el-select v-model="form.platform_id" placeholder="请选择">
            <el-option label="PC" value="1"></el-option>
            <el-option label="IOS" value="2"></el-option>
            <el-option label="android" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top: 20px">
      <el-table
        :data="list"
        element-loading-text="Loading"
        border
        highlight-current-row
        style="width: 100%;">
        <el-table-column label="昵称" prop="NickName" align="center"></el-table-column>
        <el-table-column label="玩家ID" prop="UserID" align="center"></el-table-column>
        <el-table-column label="最后登陆时间" prop="LastLoginTime" align="center"></el-table-column>
        <el-table-column label="注册时间" prop="RegisterDate" align="center"></el-table-column>
        <el-table-column label="当日输赢" prop="todayScore" align="center"></el-table-column>
        <el-table-column label="金币" prop="goldTotal" align="center"></el-table-column>
        <el-table-column label="接收金币" prop="onScore" align="center"></el-table-column>
        <el-table-column label="赠送金币" prop="offScore" align="center"></el-table-column>
        <el-table-column label="充值金额" prop="rechargeTotal" align="center"></el-table-column>
        <el-table-column label="充值次数" prop="dealTimes" align="center"></el-table-column>
        <el-table-column label="奖券" prop="ticketTotal" align="center"></el-table-column>
        <el-table-column label="首选游戏" prop="roomName" align="center"></el-table-column>
        <el-table-column label="类型" prop="MemberOrder" align="center"></el-table-column>
        <el-table-column
        label="操作">
        <template scope="scope">
          <el-button
          @click.native.prevent="handleClick(scope.row.UserID)"
          type="text"
          size="small">
          详情
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
  </div>
</template>

<script>
  import { getList } from '@/api/table'
  import utils from '../../utils/index'

  export default {
    data() {
      return {
        page: {curr: 1, size: 15, total: 0,},
        form: {
          uid: '',
          user_nick: '',
          infoType: [{type: '玩家ID', id: 'uid'},{type: '玩家昵称', id: 'user_nick'}],
          info: '',
          register_time_begin:'',
          register_time_end: '',
          last_login_begin: '',
          last_login_end: '',
          gold_begin: '',
          gold_end: '',
          gold_minus_begin: '',
          gold_minus_end: '',
          amount_begin: '',
          amount_end: '',
          ticket_begin: '',
          ticket_end: '',
          mobile: '',
          ip: '',
          machine_serial: '',
          platform_id: '',
          account_type: '',
        },list: [],
      }
    },
    filters: {

    },
    created() {
    },
    methods: {
      handleChange(p){
        this.page.curr = p
        this.fetchData()
      },
      handleSearch(){
        let query = utils.buildGetParams({
          uid: this.form.type === '玩家ID' ? this.form.info : '',
          user_nick: this.form.type === '玩家昵称' ? this.form.info : '',
          register_time_begin: this.form.register_time_begin,
          register_time_end: this.form.register_time_end,
          last_login_begin: this.form.last_login_end,
          gold_begin: this.form.gold_begin,
          gold_end: this.form.gold_end,
          gold_minus_begin: this.form.gold_minus_begin,
          gold_minus_end: this.form.gold_minus_end,
          amount_begin: this.form.amount_begin,
          amount_end: this.form.amount_end,
          ticket_begin: this.form.ticket_begin,
          ticket_end: this.form.ticket_end,
          mobile: this.form.mobile,
          ip: this.form.ip,
          machine_serial: this.form.machine_serial,
          platform_id: this.form.platform_id,
          account_type: this.form.account_type,
        })
        getList('/users/search?' + query).then(response => {
          if (response.data.length === 0) {
            Message({
              message: "未找到匹配的玩家",
              type: 'error',
              duration: 5 * 1000
            })
          }else {
            this.list = response.data.data
            this.other = response.data.other
            this.page.total = response.data.total
          }
          console.log(response)
        })
      },
      handleClick (id) {
        console.log(id)
        this.$router.push({path: '/player/userInfo', query:{UserID: id}})
      },
    }
  }
</script>
<style rel="stylesheet/sass">
  .form{
    width: 60%;
    margin: 0 auto;
  }

</style>
