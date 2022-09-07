<template>
  <div>
    <!-- <router-view></router-view> -->
    <h1>{{ count }}</h1>
    <h1>count10倍:{{ bigNum }}</h1>
    <button @click="SET_COUNT(10)">点击+1</button>
  </div>
</template>

<script>
// mapState-->将vuex里面的state映射到computed
// 使用  -引入mapState：函数，返回一个对象
//   -参数：['映射的属性']
// mapGetters-->将vuex里面的getters映射到computed
// mapMutations-->将vuex里面的mutations映射到methods
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  methods: {
    // increment() {
    //   this.$store.commit('SET_COUNT', 10)
    // }

    ...mapMutations(['SET_COUNT'])
  },
  computed: {
    // count() {
    //   return this.$store.state.count
    // }
    // 展开运算
    ...mapState(['count']),
    ...mapGetters(['bigNum'])
  }
}
</script>

<style>
.box {
  width: 700px;
  height: 88px;
  background-color: skyblue;
}
</style>
