<!--渲染整个应用的内容-->
<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;/*设置字体 */
  -webkit-font-smoothing: antialiased;/*抗锯齿 */
  -moz-osx-font-smoothing: grayscale;/*字体颜色*/
  text-align: center;
  color: #2c3e50;
}
</style>