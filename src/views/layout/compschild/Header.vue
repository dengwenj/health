<template>
  <div class="nav-header">
    <div @click="handleIconClick">
      <i :class="isIcon ? 'el-icon-s-unfold' : 'el-icon-s-fold'" class="l"></i>
    </div>
    <div class="left">
      你有一万种功能，你可以征服世界，甚至改变人种，你没有健康，只能是空谈。
    </div>
    <div class="right">
      <!-- 头像 -->
      <div class="avatar">
        <el-avatar
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        ></el-avatar>
      </div>
      <!-- /头像 -->
      <!-- 姓名 -->
      <div class="name">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            {{ user.username === 'halo' ? '管理员' : user.nickname }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="settings">个人设置</el-dropdown-item>
            <el-dropdown-item command="quitLogin">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <!-- /姓名 -->
    </div>
  </div>
</template>

<script>
// vuex
import { mapState } from 'vuex'
import { quitLogin } from 'api/user'
import { removeItem } from 'utils/storage'

export default {
  name: 'Header',
  components: {},
  props: {},
  data() {
    return {
      dialogVisible: true,
      isIcon: false,
    }
  },
  computed: {
    ...mapState(['user']),
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 点击退出登录或个人设置
    handleCommand(command) {
      if (command === 'settings') {
        if (this.$route.path !== '/my') {
          this.$router.push('/my')
        }
        return
      }

      //走到这里来的话就是点击了退出登录
      this._quitLogin()
    },

    // 是否退出登录
    async _quitLogin() {
      try {
        await this.$confirm('是否退出登录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })

        // 退出登录
        await quitLogin()
        // 退出了就删除本地存储的数据
        removeItem('user')
        this.$router.replace('/login')

        this.$message({
          type: 'success',
          message: '退出成功',
        })
      } catch (error) {
        this.$message({
          type: 'info',
          message: '已取消退出',
        })
      }
    },

    // 点击图标
    handleIconClick() {
      this.isIcon = !this.isIcon
      // 传给父组件
      this.$emit('handleIcon', this.isIcon)
    },
  },
}
</script>

<style scoped lang="less">
.nav-header {
  position: relative;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .l {
    font-size: 22px;
    cursor: pointer;
  }
  .left {
    color: #409eff;
  }
  .right {
    display: flex;
    justify-content: center;
    align-content: center;
    margin-right: 15px;
    .avatar {
      margin-right: 10px;
    }
    .name {
      line-height: 36px;
      cursor: pointer;
    }
  }
  .dialog {
    position: fixed;
    z-index: 9999;
  }
}
</style>
