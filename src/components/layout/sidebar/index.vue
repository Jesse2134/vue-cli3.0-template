<template>
  <el-aside class="aside">
    <div class="collapse-bar"
         :class="{retract:collapsed}"
         @click="change">
      <i class="fa fa-cog fa-bars"></i>
    </div>

    <el-menu
      router
      :unique-opened="true"
      class="sub-menu"
      :default-active="defaultActive"
      :collapse="collapsed"
      active-text-color="#409eff"
      text-color="#999"
      ref="AsideElMenu">
      <!-- 菜单项 -->
      <sidebar-item :routes="asideRoutes"></sidebar-item>
    </el-menu>
  </el-aside>
</template>

<script>
import SidebarItem from './SidebarItem'

export default {
  name: 'Sidebar',
  components: { SidebarItem },
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    },
    defaultAsideMenu: {
      type: String,
      required: true
    },
    asideRoutes: {
      type: Array,
      required: true
    }
  },
  watch: {
    asideRoutes: {
      handler (val) {
        this.$nextTick(() => {
          this.$refs.AsideElMenu.activeIndex = this.defaultActive = this.$route.path
        })
      },
      deep: true,
      immediate: true
    },
    defaultAsideMenu: {
      handler (val) {
        this.defaultActive = val
      }
    }
  },
  computed: {},
  data () {
    return {
      collapsed: false,
      defaultActive: ''
    }
  },
  methods: {
    change () {
      this.collapsed = !this.collapsed
      this.$refs.AsideElMenu.activeIndex = this.defaultActive = this.$route.path
    }
  },
  mounted () {
    this.collapsed = this.isCollapse
  }
}
</script>
