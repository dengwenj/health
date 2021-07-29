<template>
  <!--
      el-form 表单组件
      每个表单项都必须使用 el-form-item 组件包裹
     -->
  <!--
       表单验证
       1 必须给 el-from 组价绑定 model 为表单数据对象
       2 给需要验证的表单项 el-from-item 绑定 prop属性
         注意:prop 属性需要指定表单对象中的数据名称
       3 通过 el-from 组件的 rules 属性配置验证规则
       手动触发表单验证:
       1 给 el-form 设置 ref 起个名字
       2 通过 ref 获取 el-form 组件，调用组件的 validate 进行验证
      -->
  <div class="analysis">
    <el-form
      ref="analysis_form"
      :rules="rules"
      :model="analysis"
      label-width="90px"
    >
      <el-form-item label="血氧%" prop="bloodOxygen">
        <el-input v-model="analysis.bloodOxygen"></el-input>
      </el-form-item>
      <el-form-item label="心率 /分钟" prop="heartRate">
        <el-input v-model="analysis.heartRate"></el-input>
      </el-form-item>
      <el-form-item label="体温℃" prop="temperature">
        <el-input v-model="analysis.temperature"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="analysisLoading"
          >健康分析</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 网络请求
import { healthAnalysis, healthAnalysisList } from 'api/analysis'

export default {
  name: 'Analysis',
  components: {},
  props: {},
  data() {
    return {
      analysis: {
        bloodOxygen: null,
        heartRate: null,
        temperature: null,
      },
      rules: {
        bloodOxygen: [
          { required: true, message: '请填写血氧' },
          {
            pattern: /^[0-9]+([.]{1}[0-9]+){0,1}$/,
            message: '血氧必须为数字值',
            trigger: 'blur',
          },
        ],
        heartRate: [
          { required: true, message: '请填写心率' },
          {
            pattern: /^[0-9]+([.]{1}[0-9]+){0,1}$/,
            message: '心率必须为数字值',
            trigger: 'blur',
          },
        ],
        temperature: [
          { required: true, message: '请填写体温' },
          {
            pattern: /^[0-9]+([.]{1}[0-9]+){0,1}$/,
            message: '体温必须为数字值',
            trigger: 'blur',
          },
        ],
      },
      analysisLoading: false,
      pageNum: 1, // 页码
      pageSize: 5,
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onSubmit() {
      // loading
      this.analysisLoading = true

      this.$refs['analysis_form'].validate((valid) => {
        // 为 true 发送请求
        console.log(valid)
        if (valid) {
          this._healthAnalysis()
        }

        this.analysisLoading = false
      })
    },

    // 点击了发送请求
    async _healthAnalysis() {
      const res = await healthAnalysis(this.analysis)
      const { data } = res.data
      // 事件总线
      this.$bus.$emit('analysis', data)

      this.analysisLoading = false

      // 点击了发送请求了 就把列表数据更新出来
      // 我这里可以不传参数 ，也可以传参数
      const res1 = await healthAnalysisList({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      })

      // 事件总线
      this.$bus.$emit('items', res1.data.data)
    },
  },
}
</script>

<style scoped lang="less"></style>
