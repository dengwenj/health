<template>
  <div class="settings">
    <el-form
      ref="settings_form"
      :rules="rules"
      :model="settings"
      label-width="80px"
    >
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="settings.nickname"></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model.number="settings.age"></el-input>
      </el-form-item>

      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="settings.gender">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="身高cm" prop="height">
        <el-input v-model.number="settings.height"></el-input>
      </el-form-item>
      <el-form-item label="体重kg" prop="weight">
        <el-input v-model.number="settings.weight"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="settingsLoading">
          {{
            user.nickname
              ? '更新'
              : '提交 ( 注册后第一次登录还没填写信息呢，赶紧填写吧 ~ )'
          }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getUserSettings, updateUserSettings } from 'api/user'
import { mapState } from 'vuex'

export default {
  name: 'MySetting',
  components: {},
  props: {},
  data() {
    return {
      settings: {
        nickname: '',
        age: null,
        gender: '',
        height: null,
        weight: null,
      },
      rules: {
        nickname: [
          { required: true, message: '请填写昵称', trigger: 'blur' },
          {
            min: 2,
            max: 20,
            message: '长度在 2 到 20 个字符',
            trigger: 'blur',
          },
        ],
        gender: [{ required: true, message: '请勾选性别', trigger: 'blur' }],
        age: [
          { required: true, message: '请填写年龄' },
          { type: 'number', message: '年龄必须为数字值' },
        ],
        height: [
          { required: true, message: '请填写身高' },
          { type: 'number', message: '年龄必须为数字值' },
        ],
        weight: [
          { required: true, message: '请填写体重' },
          { type: 'number', message: '年龄必须为数字值' },
        ],
      },
      settingsLoading: false,
    }
  },
  computed: {
    ...mapState(['user']),
  },
  watch: {},
  created() {
    // 发送请求
    this._getUserSettings()
  },
  mounted() {},
  methods: {
    // 个人信息
    onSubmit() {
      // loading
      this.settingsLoading = true

      this.$refs['settings_form'].validate((valid) => {
        if (valid) {
          // 发送请求
          this._updateUserSettings()
        }

        // 没填完就提交了
        this.settingsLoading = false
      })
    },

    // 获取个人信息  新人第一次没有数据 提交了才有
    async _getUserSettings() {
      const res = await getUserSettings()
      const { data } = res
      this.settings = data
    },

    // 点击提交或者更新
    async _updateUserSettings() {
      const res = await updateUserSettings(this.settings)

      this.settingsLoading = false

      // 点击提交了 就有数据了 然后在获取数据 保存到 vuex 里面
      const res1 = await getUserSettings(this.settings)
      this.$store.commit('setUser', res1.data)

      this.$message({
        type: 'success',
        message: '保存成功',
      })
    },
  },
}
</script>

<style scoped lang="less"></style>
