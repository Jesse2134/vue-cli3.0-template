<template>
  <el-footer class="footer" height="40px">&nbsp;&nbsp;
    {{copyRight}}
    <small><a href="https://pc.qq.com/detail/1/detail_2661.html" target="_blank" title="下载Chrome安装包">{{download}}</a></small>
  </el-footer>
</template>
<script>
import '@/assets/css/footer.css'

export default {
  data () {
    return {
      copyRight: '©2022',
      download: '建议使用 Chrome90+ (点击下载)'
    }
  }
}
</script>
