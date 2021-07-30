<template>
  <div class="login">
    <div class="content">
      <h1 class="health">Health</h1>
      <el-form
        ref="adminLogin_form"
        :rules="rules"
        :model="form"
        label-width="90px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="" prop="type">
          <el-checkbox-group v-model="form.type">
            <el-checkbox
              label="我已阅读并同意用户协议和隐私条款"
              name="type"
            ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" :loading="adminLonding">
            {{ text }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// 网络请求
import { adminLogin } from 'api/user'

export default {
  name: 'Register',
  components: {},
  props: {},
  data() {
    return {
      form: {
        username: 'halo',
        password: '12345678',
        type: [],
      },
      adminLonding: false, // 登录 loading
      text: '管理员登录',
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 2,
            max: 20,
            message: '长度在 2 到 20 个字符',
            trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 8,
            max: 20,
            message: '长度在 8 到 20 个字符',
            trigger: 'blur',
          },
        ],
        type: [{ required: true, message: '请勾选同意', trigger: 'blur' }],
      },
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 点击立即注册
    onSubmit() {
      this.$refs['adminLogin_form'].validate((v) => {
        // v 为 false 表示不通过要求  为 true 表示通过 要求
        if (v) {
          this.adminLonding = true
          this.text = '登录中'
          // 发送请求
          this._adminLogin()
        }

        this.adminLonding = false
      })
    },

    // 管理员登录
    async _adminLogin() {
      const res = await adminLogin({
        username: this.form.username,
        password: this.form.password,
      })

      // console.log(res)

      // 不是管理员 提示用户
      if (res.data.msg === '无管理员权限') {
        this.$message({
          message: '非管理员账号',
          type: 'warning',
        })
        this.adminLonding = false
        this.text = '管理员登录'
        return
      }

      // 存储管理员账号的信息
      this.$store.commit('setUser', res.data.data)
      // 是管理员 登录成功 跳转到首页
      this.$router.push('/admin')

      this.adminLonding = false
      this.text = '管理员登录'
    },
  },
}
</script>

<style scoped lang="less">
.login {
  position: fixed;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  background: url('./adminlogin.jpg') no-repeat;
  background-size: cover;
  z-index: -1;
  .content {
    position: fixed;
    top: 50%;
    transform: translate(-50%, -50%);
    left: 50%;
    width: 430px;
    height: 350px;
    background-color: #fff;
    border-radius: 10px;

    h1 {
      margin-top: 10px;
      margin-bottom: 20px;
      text-align: center;
      color: #57a3f5;
      font-weight: 400;
      font-size: 25px;
    }
  }
}
.el-input {
  width: 280px;
}
.el-form-item__content {
  margin: 0 !important;
}
.el-button {
  width: 77%;
}
.zhuce {
  position: absolute;
  top: 91%;
  left: 85%;
  font-size: 12px;
  color: #57a3f5;
  cursor: pointer;
}
</style>
