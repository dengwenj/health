<template>
  <div class="ChangePassword">
    <div class="content">
      <h1 class="health">Health</h1>
      <el-form
        ref="ChangePassword_form"
        :rules="rules"
        :model="form"
        label-width="100px"
      >
        <el-form-item label="旧密码" prop="password">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword1">
          <el-input v-model="form.newPassword1" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="newPassword2">
          <el-input v-model="form.newPassword2" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit"
            :loading="ChangePasswordLonding"
          >
            {{ text }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// 网络请求
import { changePassword } from 'api/user'

export default {
  name: 'ChangePassword',
  components: {},
  props: {},
  data() {
    return {
      form: {
        password: '',
        newPassword1: '',
        newPassword2: '',
      },
      ChangePasswordLonding: false, // 修改密码 loading
      text: '修改密码',
      rules: {
        password: [
          { required: true, message: '请输入旧密码', trigger: 'blur' },
          {
            min: 8,
            max: 20,
            message: '长度在 8 到 20 个字符',
            trigger: 'blur',
          },
        ],
        newPassword1: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          {
            min: 8,
            max: 20,
            message: '长度在 8 到 20 个字符',
            trigger: 'blur',
          },
        ],
        newPassword2: [
          { required: true, message: '请确认新密码', trigger: 'blur' },
          {
            min: 8,
            max: 20,
            message: '长度在 8 到 20 个字符',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onSubmit() {
      this.ChangePasswordLonding = true
      this.text = '修改中'

      this.$refs['ChangePassword_form'].validate((v) => {
        // console.log(v)
        // v 为 false 表示不通过要求  为 true 表示通过 要求
        if (v) {
          // 判断密码是否一致 一致才发送请求 不一致提示用户
          if (this.form.newPassword1 !== this.form.newPassword2) {
            this.$message.error('输入新密码不一致，请重新输入')
            this.form.newPassword1 = ''
            this.form.newPassword2 = ''
            this.ChangePasswordLonding = false
            this.text = '修改密码'
            return
          } else if (this.form.password === this.form.newPassword1) {
            this.$message.error('新旧密码不能相同，请重新输入')
            this.form.password = ''
            this.form.newPassword1 = ''
            this.form.newPassword2 = ''
            this.ChangePasswordLonding = false
            this.text = '修改密码'
            return
          }
          // 发送请求 密码输入一直了
          this._changePassword()
        }

        this.ChangePasswordLonding = false
        this.text = '修改密码'
      })
    },

    // 修改密码
    async _changePassword() {
      const res = await changePassword(this.form)
      // console.log(res)
      // 修改成功过后
      if (res.data.msg === 'SUCCESS') {
        this.$message({
          type: 'success',
          message: '修改成功',
        })
        this.$router.push('/login')
        this.text = '修改密码'
        this.ChangePasswordLonding = false
        return
      }

      // 原密码输入错误
      this.$message.error('原密码错误，请重新输入')
      this.form.password = ''
      this.form.newPassword1 = ''
      this.form.newPassword2 = ''
      this.text = '修改密码'
      this.ChangePasswordLonding = false
    },
  },
}
</script>

<style scoped lang="less">
.ChangePassword {
  position: fixed;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  background: url('../../assets/changepassword.jpg') no-repeat;
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
  left: 72%;
  font-size: 12px;
  color: #57a3f5;
  cursor: pointer;
}
.admin {
  position: absolute;
  top: 91%;
  left: 4%;
  font-size: 12px;
  color: #57a3f5;
  cursor: pointer;
}
</style>
