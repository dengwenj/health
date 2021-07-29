<template>
  <div class="detect">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>健康分析</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <detect-form></detect-form>
    </el-card>
    <!-- 健康建议 -->
    <health-analysis></health-analysis>
    <!-- 健康建议 -->
    <!-- 健康分析列表 -->
    <health-analysis-list></health-analysis-list>
  </div>
</template>

<script>
import DetectForm from './compchild/DetectForm'
import HealthAnalysis from './compchild/HealthAnalysis'
import HealthAnalysisList from './compchild/HealthAnalysisList'

export default {
  name: 'Detect',
  components: {
    DetectForm,
    HealthAnalysis,
    HealthAnalysisList,
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
