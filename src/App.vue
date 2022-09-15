<template>
  <div>
    <transition name="van-slide-left" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {}
</script>

<style>
.box {
  width: 700px;
  height: 88px;
  background-color: skyblue;
}
</style>
