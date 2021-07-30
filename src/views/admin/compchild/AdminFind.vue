<template>
  <div class="adminfind" v-if="pagination">
    <div class="all_user" v-loading="isloading">
      全部用户共{{ pagination.total }}名
    </div>
    <el-table class="table" :data="tableData" style="width: 100%">
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

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage4"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total"
      background
      :disabled="disabled"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getUserList } from 'api/admin'

export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      tableData: [],
      pageNum: 1, // 页码
      pageSize: 5, // 每页多少
      currentPage4: null,
      pagination: null,
      disabled: false,
      isloading: false,
    }
  },
  computed: {},
  watch: {},
  created() {
    //  获取用户列表
    this._getUserList()
  },
  mounted() {},
  methods: {
    async _getUserList() {
      const res = await getUserList({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      })
      // 分页
      this.pagination = res.data.data
      console.log(res.data.data.records)
      this.tableData = res.data.data.records
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

    async handleSizeChange(size) {
      // console.log('handleSizeChange', size)
      // 发送请求 更新页面
      this.disabled = true
      this.isloading = true

      this.pageSize = size
      const res2 = await getUserList({
        pageNum: this.pageNum,
        pageSize: size,
      })
      this.tableData = res2.data.data.records

      this.disabled = false
      this.isloading = false

      this.currentPage4 = 1
    },

    async handleCurrentChange(index) {
      // console.log('handleCurrentChange', index)
      // 发送请求 更新页面
      this.disabled = true
      this.isloading = true
      const res1 = await getUserList({
        pageNum: index,
        pageSize: this.pageSize,
      })
      this.tableData = res1.data.data.records

      this.disabled = false
      this.isloading = false
    },
  },
}
</script>

<style scoped lang="less">
.all_user {
  color: #409eff;
  margin-bottom: 10px;
}
.table {
  margin-bottom: 20px;
}
</style>
