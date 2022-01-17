<template>
  <div class="login">
    <div class="slogan">
      <h1>Dynamic Chart</h1>
      <h2>便捷、高效、灵活的图表工具</h2>
    </div>
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
    <FooterView></FooterView>
  </div>

</template>
<script>
import '@/assets/css/login.css'
import FooterView from '@/components/layout/footer'

export default {
  components: {
    FooterView
  },
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 2,
            max: 20,
            message: '用户名长度在 2 到 20 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 4,
            max: 20,
            message: '密码长度在 4 到 20 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.Login.validate(valid => {
        if (valid) {
          this.Utils.setCookies('__token__', '123', 1)
          localStorage.setItem('__token__', '123')
          localStorage.setItem('__username__', this.form.username)
          this.$notify.success({
            title: '系统提示',
            message: '登录成功'
          })
          this.$router.push({ path: '/' })
        } else {
          this.$message.warning({
            title: '错误',
            message: '请检查您的输入'
          })
        }
      })
    }
  },
  mounted () {}
}
</script>
<style>
</style>
