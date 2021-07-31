<template>
  <div>
    <div class="details">查询用户详情</div>
    <!-- 输入框 -->
    <el-form ref="user_form" :rules="rules" :model="form">
      <el-form-item prop="username">
        <el-input
          v-model.trim="form.username"
          placeholder="输入用户名"
          @input="handleInput"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="isLoading">{{
          text
        }}</el-button>
      </el-form-item>
    </el-form>
    <!-- 输入框 -->

    <!-- 展示的表格 -->
    <el-table
      class="table"
      :data="tableData"
      style="width: 100%"
      v-if="tableData.length"
    >
      <el-table-column
        prop="username"
        label="用户名"
        width="180"
      ></el-table-column>
      <el-table-column prop="nickname" label="昵称" width="180">
      </el-table-column>
      <el-table-column prop="age" label="年龄（岁）" width="180">
      </el-table-column>
      <el-table-column prop="gender" label="性别" width="180">
      </el-table-column>
      <el-table-column prop="height" label="身高（cm）" width="180">
      </el-table-column>
      <el-table-column prop="weight" label="体重（kg）"> </el-table-column>
    </el-table>
    <!-- 展示的表格 -->

    <!-- 展示 analysisVOList 分析的列表 -->
    <div v-if="analysisVOList.length">
      <div class="userlist">
        {{
          tableData.length
            ? `${tableData[0].username} 的全部健康分析如下（共${analysisVOList.length}条）：`
            : ''
        }}
      </div>
      <el-table :data="analysisVOList" style="width: 100%">
        <el-table-column prop="createTime" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="bloodOxygen" label="血氧（%）" width="180">
        </el-table-column>
        <el-table-column prop="heartRate" label="心率（/分钟）" width="180">
        </el-table-column>
        <el-table-column prop="temperature" label="体温（℃）" width="180">
        </el-table-column>
        <el-table-column prop="proposal" label="建议"> </el-table-column>
      </el-table>
    </div>
    <!-- 展示 analysisVOList 分析的列表 -->
  </div>
</template>

<script>
// 网络请求
import { getUserInfo } from 'api/admin'

export default {
  name: 'Userdetails',
  components: {},
  props: {},
  data() {
    return {
      form: {
        username: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
      },
      isLoading: false,
      text: '立即查询',
      tableData: [],
      analysisVOList: [],
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onSubmit() {
      // loading
      this.isLoading = true
      this.text = '查询中'
      this.$refs['user_form'].validate((valid) => {
        // console.log(valid)
        if (valid) {
          // 发送请求
          this._getUserInfo()
          return
        }

        this.isLoading = false
        this.text = '立即查询'
      })
    },

    async _getUserInfo() {
      const res = await getUserInfo(this.form)
      // console.log(res)

      if (res.data.data) {
        const arr = [] // 这里始终没有长度
        arr.push(res.data.data)
        // 这里是替换
        this.tableData = arr

        // 分析列表
        this.analysisVOList = res.data.data.analysisVOList

        // 关闭loading
        this.isLoading = false
        this.text = '立即查询'
        return
      }
      this.$message({
        message: '抱歉，用户名还没有被注册过',
        type: 'warning',
      })
      // 关闭loading
      this.isLoading = false
      this.text = '立即查询'
    },

    handleInput(event) {
      // console.log(event)
      // 只有输入框里面的值变了 就把 tableData 和 analysisVOList 变为空
      this.tableData = []
      this.analysisVOList = []
    },
  },
}
</script>

<style scoped lang="less">
.details {
  margin-bottom: 20px;
  color: #409eff;
}
.box-card {
  margin-bottom: 20px;
}
.userlist {
  color: #409eff;
  margin-top: 20px;
}
</style>
