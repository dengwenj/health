<template>
  <div>
    <div class="details">查询用户详情</div>
    <el-form ref="user_form" :rules="rules" :model="form">
      <el-form-item prop="userId">
        <el-input
          v-model.number="form.userId"
          placeholder="输入用户Id（下拉，全部健康分析处可看见用户Id）"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="isLoading">{{
          text
        }}</el-button>
      </el-form-item>
    </el-form>
    <el-table
      class="table"
      :data="tableData"
      style="width: 100%"
      v-if="tableData.length"
    >
      <el-table-column
        prop="role"
        label="角色"
        width="180"
        :formatter="roleFormat"
      >
      </el-table-column>
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
        userId: null,
      },
      rules: {
        userId: [
          { required: true, message: '请输入用户Id' },
          { type: 'number', message: '用户Id必须为数字值' },
        ],
      },
      isLoading: false,
      text: '立即查询',
      tableData: [],
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

      this.$refs['user_form'].validate((valid) => {
        console.log(valid)
        if (valid) {
          // 发送请求
          this._getUserInfo()
        }

        this.isLoading = false
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
        // 关闭loading
        this.isLoading = false
        return
      }
      this.$message({
        message: '抱歉，还没人用到这个Id',
        type: 'warning',
      })
      // 关闭loading
      this.isLoading = false
    },

    // 这个可以获取 table prop 里面的值
    roleFormat(row, column) {
      // console.log(row)
      // console.log(column)
      if (row.role === 1) {
        return '普通用户'
      } else {
        return '管理员'
      }
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
</style>
