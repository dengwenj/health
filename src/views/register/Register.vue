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
  <div class="login">
    <div class="content">
      <h1 class="health">Health</h1>
      <el-form
        ref="register_form"
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
          <el-button
            type="primary"
            @click="onSubmit"
            :loading="registerLonding"
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
import { userRegister } from 'api/user'
// import { setItem, getItem } from 'utils/storage'

export default {
  name: 'Register',
  components: {},
  props: {},
  data() {
    return {
      form: {
        username: '',
        password: '',
        type: [],
      },
      registerLonding: false, // 登录 loading
      text: '立即注册',
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
      this.$refs['register_form'].validate((v) => {
        console.log(v)
        // v 为 false 表示不通过要求  为 true 表示通过 要求
        if (v) {
          // loading
          this.registerLonding = true
          this.text = '注册中'

          // 发送请求
          this._userRegister()
        }
      })
    },

    // 发送请求 用户注册
    async _userRegister() {
      await userRegister({
        username: this.form.username,
        password: this.form.password,
      })
      // 因为res返回的data是null不行 不能直接进入 必须要登录了才可以进去
      // 所有这里注册好了跳转回登录页
      this.registerLonding = false
      this.text = '立即注册'

      this.$message({
        message: '注册成功，可以登录啦',
        type: 'success',
      })
      this.$router.push('/login')
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
  background: url('./lijizhuce.jpg') no-repeat;
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
