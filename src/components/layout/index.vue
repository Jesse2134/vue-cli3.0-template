<template>
  <el-container class="layout-container">
    <el-header class="header">
      <router-link to="/index" tag="div">
        <a class="logo" :title="title">
          <!--<img src="@/assets/images/logo.svg" alt="上海美数信息科技"/>-->
          <small>{{title}}</small>
        </a>
      </router-link>
      <el-dropdown class="user-info">
        <span class="el-dropdown-link">
          {{user && user.username}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <div @click="openUpdatePassDialog()">
              重置密码
            </div>
          </el-dropdown-item>
          <el-dropdown-item>
            <div @click="logout">
              退出登录
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-container>
      <Sidebar
        :isCollapse="isCollapse"
        v-if="asideShow"
        ref="AsideMenu"
        :defaultAsideMenu="defaultAsideMenu"
        :asideRoutes="asideRoutes"
        collapse-transition>
      </Sidebar>
      <el-container>
        <el-main>
          <!--面包屑-->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    <FooterView></FooterView>
  </el-container>
</template>
<script>
  import '@/assets/css/layout.css'
  import Sidebar from "@/components/layout/sidebar";
  import FooterView from "@/components/layout/footer";
  import Routers from "@/router/module";

  export default {
    components: {
      Sidebar, FooterView
    },
    data() {
      return {
        title: 'Template',
        user: {
          username: 'admin'
        },
        defaultAsideMenu: '',
        asideShow: true,
        isCollapse: false,
        asideRoutes: ''
      }
    },
    methods: {
      logout() {
        this.$router.push({path: '/login'});
      },
      openUpdatePassDialog() {

      }
    },
    created(){
      this.asideRoutes = Routers;
      this.defaultAsideMenu = this.$route.path;
    }
  }
</script>
