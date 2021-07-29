<template>
  <div class="analysis">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="color:#409eff">健康建议</span>
      </div>
      <div :class="proposal ? '' : 'content'">
        {{ proposal ? proposal : '健康是每个人最基本的责任哦~' }}
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      proposal: '',
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    // 事件总线
    this.$bus.$on('analysis', (data) => {
      const { proposal } = data

      this.proposal = proposal
    })
  },
  methods: {},
}
</script>

<style scoped lang="less">
.analysis {
  margin-top: 20px;
}
.content {
  color: #ccc;
  font-size: 13px;
}
</style>
