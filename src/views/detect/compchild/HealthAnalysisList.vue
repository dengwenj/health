<template>
  <div class="lsit">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="color:#409eff">
          共{{ pagination.total }}条全部健康分析
        </span>
      </div>
      <el-table class="table" :data="tableData" style="width: 100%">
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
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage4"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
        :disabled="disabled"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
// 网络请求
import { healthAnalysisList } from 'api/analysis'

export default {
  name: 'HealthAnalysisList',
  components: {},
  props: {},
  data() {
    return {
      tableData: [],
      pageNum: 1, // 页码
      pageSize: 5, // 页面展示多少
      currentPage4: null, // 当前页数
      pagination: {}, // 分页
      disabled: false,
    }
  },
  computed: {},
  watch: {},
  created() {
    // 发送请求
    this._healthAnalysisList()
  },
  mounted() {
    // 事件总线
    this.$bus.$on('items', (data) => {
      // 传过来的
      this.tableData = data.items
      this.pagination = data
    })
  },
  methods: {
    async _healthAnalysisList() {
      const res = await healthAnalysisList({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      })
      this.tableData = res.data.data.items
      const { data } = res.data
      this.pagination = data
    },

    async handleSizeChange(size) {
      // 禁止点击
      this.disabled = true

      // 点击发送请求
      this.pageSize = size
      const res2 = await healthAnalysisList({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      })
      this.tableData = res2.data.data.items

      // 取消禁止点击
      this.disabled = false
    },

    async handleCurrentChange(currentPage) {
      // 禁止点击
      this.disabled = true
      // 点击这个发送请求
      this.pageNum = currentPage
      const res1 = await healthAnalysisList({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      })

      this.tableData = res1.data.data.items

      // 取消禁止点击
      this.disabled = false
    },
  },
}
</script>

<style scoped lang="less">
.lsit {
  margin-top: 20px;
}
.table {
  margin-bottom: 20px;
}
</style>
