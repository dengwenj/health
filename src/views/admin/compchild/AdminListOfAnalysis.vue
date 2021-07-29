<template>
  <div class="list" v-if="pagination">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="color:#409eff">
          全部健康分析共{{ pagination.total }}条</span
        >
      </div>
      <el-table
        class="table"
        :data="tableData"
        style="width: 100%"
        v-loading="isloading"
      >
        <el-table-column prop="createTime" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="userId" label="用户Id" width="180">
        </el-table-column>
        <el-table-column prop="bloodOxygen" label="血氧（%）" width="180">
        </el-table-column>
        <el-table-column prop="heartRate" label="心率（/分钟）" width="180">
        </el-table-column>
        <el-table-column prop="temperature" label="体温（℃）" width="180">
        </el-table-column>
        <el-table-column prop="proposal" label="建议"> </el-table-column>
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
    </el-card>
  </div>
</template>

<script>
// 网络请求
import { getHealthAnalysis, getUserInfo } from 'api/admin'

export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      tableData: [],
      pageNum: 1, //页码
      pageSize: 5, // 每页展示多少
      pagination: null,
      currentPage4: null,
      disabled: false,
      isloading: false,
    }
  },
  computed: {},
  watch: {},
  async created() {
    this._getHealthAnalysis()
  },
  mounted() {},
  methods: {
    async _getHealthAnalysis() {
      const res = await getHealthAnalysis({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      })
      // 表格展示数据
      this.tableData = res.data.data.records
      // 做分页
      this.pagination = res.data.data
    },

    async handleSizeChange(size) {
      // console.log('handleSizeChange', size)
      // 发送请求 更新页面
      this.disabled = true
      this.isloading = true

      this.pageSize = size
      const res2 = await getHealthAnalysis({
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
      const res1 = await getHealthAnalysis({
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
.list {
  margin-top: 20px;
}
.table {
  margin-bottom: 20px;
}
</style>
