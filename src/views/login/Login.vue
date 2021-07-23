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
      <el-form ref="login_form" :rules="rules" :model="form" label-width="90px">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="form.name"></el-input>
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
          <el-button type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  components: {},
  props: {},
  data() {
    return {
      form: {
        name: '',
        password: '',
        type: [],
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 20,
            message: '长度在 6 到 20 个字符',
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
    onSubmit() {
      this.$refs['login_form'].validate((v) => {
        // v 为 false 表示不通过要求  为 true 表示通过 要求
        if (v) {
          // 发送请求 登录进去
          this.$router.replace('/')
          return
        }
      })
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
  background: url('../../assets/jiankang.png') no-repeat;
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
</style>