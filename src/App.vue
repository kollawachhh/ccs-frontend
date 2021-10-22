<template>
  <div id="app">
      <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height:100vh;
  margin: 0px;
}
.flex{
  display: flex;
}
.bg-primary{
  background-color: #0B4870;
}
.font-bold{
  font-weight: bold;
}
.h-90{
  height: 90%;
}
.w-90{
  width: 90%;
}
</style>
