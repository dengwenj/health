<template>
  <div class="">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>管理员</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <admin-find></admin-find>
    </el-card>
  </div>
</template>

<script>
import AdminFind from './compchild/AdminFind'

export default {
  name: '',
  components: {
    AdminFind,
  },
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
}
</script>

<style scoped lang="less"></style>