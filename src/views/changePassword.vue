<template>
  <div class="app-container">
    <el-card class="form">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="旧密码">
          <el-input type="password" v-model="form.old_password" placeholder="请输入6~15位密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input type="password" v-model="form.new_password" placeholder="请输入6~15位密码"></el-input>
        </el-form-item>
        <!--<el-form-item label="再次确认密码">-->
          <!--<el-input v-model="form.confirm_password" placeholder="请输入6~15位密码"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item>
          <el-button @click="cancle">取消</el-button>
          <el-button type="primary" @click="handleChange">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import { postList } from '@/api/table'
  import axios from 'axios'
  export default {
    data() {
      return {
        form: {
          old_password: '',
          new_password: '',
          confirm_password: '',
        },
      }
    },
    created() {
    },
    methods: {
      cancle(){
        this.$router.push('/')
      },
      getCookie: function (id) {
        var id = id + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') c = c.substring(1);
          if (c.indexOf(id) != -1) return c.substring(id.length, c.length);
        }
        return "";
      },
      handleChange(){
        let data = {
          "old_password" : this.form.old_password,
          "new_password" : this.form.new_password,
          "user_id" : parseInt(this.getCookie("id")),
        }
        console.log(data)
        postList('/admins/reset' , data).then(response => {
          if(response.success == true) {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            this.$router.push('/')
          }
        })
      }

    }
  }
</script>
<style rel="stylesheet/sass">
  .form{
    width: 50%;
    margin: 0 auto;
  }

</style>
