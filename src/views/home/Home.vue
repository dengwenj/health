<template>
  <div class="home">
    <el-carousel trigger="click" :interval="5000">
      <el-carousel-item v-for="(item, index) in 4" :key="item">
        <img src="./xintiao.jpg" v-if="index === 0" alt="" />
        <img src="./tiwen.jpg" v-if="index === 1" alt="" />
        <img src="./xueyang.jpg" v-if="index === 2" alt="" />
        <img src="./jiankangtishi.jpg" v-if="index === 3" alt="" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
}
</script>

<style scoped lang="less">
.home {
  width: 100%;
  height: 100%;
  // background: url('../../assets/jiankang.png') no-repeat;
  background-size: cover;
}
img {
  height: 100%;
  width: 100%;
  background-size: cover;
}
/deep/.el-carousel--horizontal {
  height: 100%;
}
/deep/.el-carousel__container {
  height: 100%;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
