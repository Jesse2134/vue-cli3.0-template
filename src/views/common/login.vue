<template>
  <div class="login">
    <!-- slogin -->
    <div class="slogin">
      <h1>安全、便捷、高效</h1>
      <h2>一次登录，进入多种系统</h2>
      <h2>统一权限管理</h2>
    </div>
    <!-- /slogin -->
    <!-- login-box -->
    <div class="login-box">
      <h2 class="login-title">用户登录</h2>
      <el-form class="clearfix" ref="Login" :model="form" :rules="rules">
        <el-form-item prop="username">
            <el-input v-model="form.username" class="form-control" type="text" id="inputUser" placeholder="请输入用户名">
              <template slot="prepend"><i class="fa fa-user"></i> </template>
            </el-input>
          </el-form-item>
           <el-form-item prop="password">
            <el-input v-model="form.password" class="form-control" type="password" id="inputPassword" placeholder="请输入密码">
              <template slot="prepend"><i class="fa fa-lock"></i> </template>
            </el-input>
           </el-form-item>
        <el-button type="primary" class="login-btn" @click="login">登录</el-button>
      </el-form>
    </div>
    <!-- /login-box -->
    <!-- footer -->
    <footer class="footer">©2018 上海美数信息技术
      <small>建议使用Chrome40+/Firefox40+/IE9+浏览器</small>
    </footer>
    <!-- /footer -->
  </div>

</template>
<script>
import "@/assets/css/login.css";
import { _post } from "@/axios/api";

export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "用户名长度在 2 到 20 个字符",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 4,
            max: 20,
            message: "密码长度在 4 到 20 个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    login() {
      this.$refs["Login"].validate(valid => {
        if (valid) {
          let arg = {
            url: `http://ddflow.doordu.com/f_l/login/v1?name=${this.form.username}&pwd=${this.form.password}&nd=0`,
            // params: {
            //   name: this.form.username,
            //   pwd: this.form.password,
            //   nd: 0
            // },
            contentType: 'application/x-www-form-urlencoded; charset=utf-8'
          };
          this.Utils.setCookies("__token__", "eeeee", 1);
          localStorage.setItem("__token__", "eeeee");
          localStorage.setItem("__username__", this.form.username);
          this.$router.push({ path: "/" });
          // _post(arg)
          //   .then((res) => {
          //     if(res.result.code == 200){
          //       this.$notify.success({
          //         title: "系统提示",
          //         message: "登录成功"
          //       });
          //       localStorage.setItem("policeSessionId", res.result.data.sessionId);
          //       localStorage.setItem("__logininfo__", JSON.stringify(res.result.data));
          //       this.$router.push({ path: "/" });
          //     }
          //   })
          //   .catch(err => {
          //     this.$notify.error({
          //       title: "系统提示",
          //       message: "用户名或密码错误"
          //     });
          //   });
        } else {
          this.$message.warning({
            title: "错误",
            message: "请检查您的输入"
          });
        }
      });
    }
  },
  mounted() {}
};
</script>
<style>
</style>

