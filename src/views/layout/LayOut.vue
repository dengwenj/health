<template>
  <el-container class="layout-container">
    <el-aside class="aside" width="auto">
      <!-- 侧边栏组件 -->
      <app-aside class="aside-menu" :istubiao="istubiao">
        <div class="health" v-if="!istubiao">Health</div>
      </app-aside>
    </el-aside>
    <el-container>
      <el-header class="header">
        <!-- 头部组件 -->
        <app-header @handleIcon="handleIcon"></app-header>
      </el-header>
      <el-main class="main">
        <!-- 子路由出口 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppAside from './compschild/Aside'
import AppHeader from './compschild/Header'

export default {
  name: '',
  components: {
    AppAside,
    AppHeader,
  },
  props: {},
  data() {
    return {
      istubiao: false,
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 接过来的
    handleIcon(istubiao) {
      this.istubiao = istubiao
    },
  },
}
</script>

<style scoped lang="less">
.layout-container {
  // 这样就可以撑开整个页面
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.aside {
  width: 200px;
  // background-color: #d3dce6;
  .aside-menu {
    height: 100%;
    .health {
      margin: 15px 0;
      text-align: center;
      color: #409eff;
      font-size: 22px;
    }
  }
}
.header {
  // background-color: #b3c0d1;
  border-bottom: 1px solid #ccc;
}
.main {
  background-color: #e9eef3;
}
</style>