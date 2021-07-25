<template>
  <div class="detect">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>检测发布</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <detect-form></detect-form>
    </el-card>
  </div>
</template>

<script>
import DetectForm from './compchild/DetectForm'

export default {
  name: 'Detect',
  components: {
    DetectForm,
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