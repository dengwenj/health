<template>
  <div class="admin">
    <el-card class="box-card" v-if="user.role === 2">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>管理员</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 用户详情 -->
      <user-details></user-details>
      <!-- 用户详情 -->
    </el-card>

    <!-- 用户列表 -->
    <el-card class="box-card" v-if="user.role === 2">
      <admin-find></admin-find>
    </el-card>
    <!-- 用户列表 -->

    <!-- 健康分析列表 -->
    <admin-list-of-analysis v-if="user.role === 2"></admin-list-of-analysis>
    <!-- 健康分析列表 -->

    <!-- 这里是显示普通用户的 -->
    <div class="disabled" v-else>
      仅管理员账号有权查看
      <div class="text">赶紧去登录管理员账号吧，在登录页面的左下角哦~</div>
    </div>
    <!-- 这里是显示普通用户的 -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AdminFind from './compchild/AdminFind'
import AdminListOfAnalysis from './compchild/AdminListOfAnalysis'
import UserDetails from './compchild/UserDetails'

export default {
  name: '',
  components: {
    AdminFind,
    AdminListOfAnalysis,
    UserDetails,
  },
  props: {},
  data() {
    return {}
  },
  computed: {
    ...mapState(['user']),
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {},
}
</script>

<style scoped lang="less">
.disabled {
  color: #ffd04b;
  font-size: 28px;
  text-align: center;
  margin-top: 10px;
  .text {
    margin-top: 10px;
    font-size: 12px;
    color: #888;
  }
}
.box-card {
  margin-bottom: 20px;
}
</style>
